"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { createOrder } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CountdownTimer from "@/components/countdown-timer"
import type { OrderData } from "@/types"
import { CreditCard, MapPin, Clock, AlertTriangle, CheckCircle } from "lucide-react"

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: "",
    detailAddress: "",
    postalCode: "",
    memo: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    if (cart.length === 0) {
      router.push("/cart")
      return
    }
  }, [user, cart, router])

  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = item.sale > 0 ? item.price * (1 - item.sale / 100) : item.price
    return sum + itemPrice * item.quantity
  }, 0)

  const shippingFee = subtotal >= 30000 ? 0 : 3000
  const total = subtotal + shippingFee

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const orderData: OrderData = {
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        shippingInfo,
        total,
        paymentMethod,
      }

      await createOrder(orderData)
      clearCart()
      router.push("/order-success")
    } catch (err) {
      setError("주문 처리 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setLoading(false)
    }
  }

  const hasFlashSaleItems = cart.some((item) => item.count <= 10 || item.sale >= 30)

  if (!user || cart.length === 0) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Flash Sale Warning */}
      {hasFlashSaleItems && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>선착순 상품이 포함되어 있습니다. 빠르게 주문을 완료해주세요!</span>
            <CountdownTimer targetDate={new Date(Date.now() + 10 * 60 * 1000)} className="text-sm" />
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                배송 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">받는 분</Label>
                    <Input
                      id="name"
                      name="name"
                      value={shippingInfo.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">연락처</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="postalCode">우편번호</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleInputChange}
                      required
                      className="flex-1"
                    />
                    <Button type="button" variant="outline">
                      주소검색
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">주소</Label>
                  <Input
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="detailAddress">상세주소</Label>
                  <Input
                    id="detailAddress"
                    name="detailAddress"
                    value={shippingInfo.detailAddress}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="memo">배송 메모</Label>
                  <Input
                    id="memo"
                    name="memo"
                    value={shippingInfo.memo}
                    onChange={handleInputChange}
                    placeholder="배송 시 요청사항을 입력해주세요"
                    className="mt-1"
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                결제 방법
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">신용카드</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank">무통장입금</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kakao" id="kakao" />
                  <Label htmlFor="kakao">카카오페이</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>주문 요약</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {cart.map((item) => {
                  const itemPrice = item.sale > 0 ? item.price * (1 - item.sale / 100) : item.price
                  const isFlashSale = item.count <= 10 || item.sale >= 30

                  return (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg?height=64&width=64"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        {isFlashSale && (
                          <Badge className="absolute -top-1 -right-1 bg-red-500 text-xs px-1">특가</Badge>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {itemPrice.toLocaleString()}원 × {item.quantity}
                          </span>
                          <span className="font-semibold">{(itemPrice * item.quantity).toLocaleString()}원</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>상품금액</span>
                  <span>{subtotal.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>배송비</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-green-600">무료</span>
                    ) : (
                      `${shippingFee.toLocaleString()}원`
                    )}
                  </span>
                </div>
                {shippingFee > 0 && <p className="text-xs text-muted-foreground">3만원 이상 구매시 무료배송</p>}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>총 결제금액</span>
                <span className="text-red-600">{total.toLocaleString()}원</span>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleSubmit}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-6"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    주문 처리 중...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    {total.toLocaleString()}원 결제하기
                  </>
                )}
              </Button>

              {/* Security Info */}
              <div className="text-xs text-muted-foreground text-center space-y-1">
                <p>안전한 결제를 위해 SSL 보안을 적용하고 있습니다.</p>
                <p>주문 완료 후 취소/변경이 어려우니 신중히 확인해주세요.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Checkout
