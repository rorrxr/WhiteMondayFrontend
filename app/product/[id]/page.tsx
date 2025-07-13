"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { getMockProductById } from "@/lib/mock-data"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import CountdownTimer from "@/components/countdown-timer"
import type { Product } from "@/types"
import { ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Users, Clock, Zap, AlertTriangle } from "lucide-react"

const ProductDetail: React.FC = () => {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getMockProductById(params.id as string)
        setProduct(data)
        setLoading(false)
      } catch (err) {
        setError("상품 정보를 불러오는데 실패했습니다.")
        setLoading(false)
      }
    }
    fetchProduct()
  }, [params.id])

  const handleAddToCart = async () => {
    if (!product) return

    setIsAddingToCart(true)
    try {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      // 성공 피드백을 위한 짧은 지연
      setTimeout(() => setIsAddingToCart(false), 500)
    } catch (error) {
      setIsAddingToCart(false)
    }
  }

  const handleBuyNow = () => {
    if (!user) {
      router.push("/login")
      return
    }
    handleAddToCart()
    router.push("/cart")
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square bg-muted animate-pulse rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded" />
            <div className="h-6 bg-muted animate-pulse rounded w-2/3" />
            <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-destructive">{error || "상품을 찾을 수 없습니다."}</p>
      </div>
    )
  }

  const discountedPrice = product.sale > 0 ? product.price * (1 - product.sale / 100) : product.price
  const isFlashSale = product.count <= 10 || product.sale >= 30
  const soldPercentage = Math.max(0, Math.min(100, ((100 - product.count) / 100) * 100))
  const isLowStock = product.count <= 5

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Flash Sale Alert */}
      {isFlashSale && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-red-500" />
                <div>
                  <h3 className="font-bold text-red-700">⚡ 번개세일 진행중!</h3>
                  <p className="text-sm text-red-600">한정 수량으로 빠르게 품절될 수 있습니다.</p>
                </div>
              </div>
              <CountdownTimer targetDate={new Date(Date.now() + 6 * 60 * 60 * 1000)} className="text-sm" />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.image || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.sale > 0 && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white text-lg px-3 py-1">
                {product.sale}% OFF
              </Badge>
            )}
            {isLowStock && (
              <Badge className="absolute top-4 right-4 bg-orange-500 text-white animate-pulse">마감임박</Badge>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {Math.floor(Math.random() * 500) + 100}명이 관심상품으로 등록
                </span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-red-600">{discountedPrice.toLocaleString()}원</span>
              {product.sale > 0 && (
                <span className="text-xl text-muted-foreground line-through">{product.price.toLocaleString()}원</span>
              )}
            </div>
            {product.sale > 0 && (
              <p className="text-green-600 font-semibold">
                {(product.price - discountedPrice).toLocaleString()}원 할인!
              </p>
            )}
          </div>

          {/* Stock Status */}
          <Card className={isLowStock ? "border-orange-200 bg-orange-50" : ""}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">재고 현황</span>
                  <span className={`font-bold ${isLowStock ? "text-orange-600" : "text-green-600"}`}>
                    {product.count}개 남음
                  </span>
                </div>
                <Progress value={soldPercentage} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">판매 진행률</span>
                  <span className="font-semibold text-red-600">{Math.round(soldPercentage)}%</span>
                </div>
                {isLowStock && (
                  <div className="flex items-center gap-2 text-orange-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-semibold">품절 임박! 서둘러 주문하세요!</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quantity Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-semibold">수량:</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <Input
                  type="number"
                  min="1"
                  max={product.count}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Math.min(product.count, Number.parseInt(e.target.value) || 1)))
                  }
                  className="w-20 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.count, quantity + 1))}
                  disabled={quantity >= product.count}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="text-lg font-semibold">
              총 금액: <span className="text-red-600">{(discountedPrice * quantity).toLocaleString()}원</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleBuyNow}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold text-lg py-6"
              disabled={product.count === 0 || isAddingToCart}
            >
              <Clock className="mr-2 h-5 w-5" />
              {product.count === 0 ? "품절" : "지금 바로 구매"}
            </Button>

            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="w-full font-semibold py-6 bg-transparent"
              disabled={product.count === 0 || isAddingToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {isAddingToCart ? "담는 중..." : "장바구니 담기"}
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="flex-1 bg-transparent">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="flex-1 bg-transparent">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Service Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span className="text-sm">무료배송 (3만원 이상 구매시)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">100% 정품보장</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-purple-600" />
                  <span className="text-sm">7일 무료 교환/반품</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Description */}
      <Card>
        <CardHeader>
          <CardTitle>상품 상세정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {product.content || "상품 상세 정보가 준비 중입니다."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductDetail
