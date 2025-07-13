"use client"

import { useState, useEffect } from "react"
import { getMockOrders } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, MapPin, Clock, CreditCard, RefreshCw, RotateCcw } from "lucide-react"
import Link from "next/link"
import type { OrderResponse } from "@/types"

const statusText = {
  PENDING: "주문 접수",
  CONFIRMED: "주문 확인",
  CANCELLED: "주문 취소",
  RETURNED: "반품 완료"
}

const statusColor = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  RETURNED: "bg-gray-100 text-gray-800"
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMockOrders()
        setOrders(data)
        setLoading(false)
      } catch (err) {
        setError("주문 내역을 불러오는데 실패했습니다.")
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const handleCancelOrder = (orderId: number) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: "CANCELLED" as const }
        : order
    ))
  }

  const handleReturnOrder = (orderId: number) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: "RETURNED" as const }
        : order
    ))
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <div className="space-y-4">
          <Package className="h-16 w-16 text-gray-400 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">오류가 발생했습니다</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <div className="space-y-4">
          <Package className="h-16 w-16 text-gray-400 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">주문 내역이 없습니다</h2>
          <p className="text-gray-600">첫 주문을 시작해보세요!</p>
          <Button asChild>
            <Link href="/">상품 둘러보기</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">주문 내역</h1>
        <p className="text-gray-600">총 {orders.length}개의 주문이 있습니다</p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">주문 #{order.id}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                    </div>
                    <div className="flex items-center gap-1">
                      <CreditCard className="h-4 w-4" />
                      {order.totalAmount.toLocaleString()}원
                    </div>
                  </div>
                </div>
                <Badge className={statusColor[order.status]}>
                  {statusText[order.status]}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Order Items */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">주문 상품</h3>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium">상품 ID: {item.productId}</p>
                          <p className="text-sm text-gray-600">수량: {item.quantity}개</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.price.toLocaleString()}원</p>
                        <p className="text-sm text-gray-600">개당 {(item.price / item.quantity).toLocaleString()}원</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Shipping Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    배송 정보
                  </h3>
                  <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <p className="font-medium">{order.shippingInfo.name}</p>
                    <p className="text-sm text-gray-600">{order.shippingInfo.phone}</p>
                    <p className="text-sm text-gray-600">
                      ({order.shippingInfo.postalCode}) {order.shippingInfo.address}
                    </p>
                    <p className="text-sm text-gray-600">{order.shippingInfo.detailAddress}</p>
                    {order.shippingInfo.memo && (
                      <p className="text-sm text-gray-600 italic">메모: {order.shippingInfo.memo}</p>
                    )}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">상품 금액</span>
                    <span>{order.totalAmount.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">배송비</span>
                    <span>무료</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>총 결제 금액</span>
                    <span className="text-red-600">{order.totalAmount.toLocaleString()}원</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  {order.status === "PENDING" && (
                    <Button
                      variant="outline"
                      onClick={() => handleCancelOrder(order.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      주문 취소
                    </Button>
                  )}
                  {order.status === "CONFIRMED" && (
                    <Button
                      variant="outline"
                      onClick={() => handleReturnOrder(order.id)}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      반품 요청
                    </Button>
                  )}
                  <Button variant="outline" asChild>
                    <Link href={`/orders/${order.id}`}>
                      상세보기
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-sm text-gray-600">
          더 많은 주문 내역이 필요하시면 고객센터로 문의해주세요.
        </p>
      </div>
    </div>
  )
} 