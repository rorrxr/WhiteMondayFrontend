"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Home, Package, Clock } from "lucide-react"

const OrderSuccess: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    // 주문 완료 후 뒤로가기 방지
    const handlePopState = () => {
      router.push("/")
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [router])

  return (
    <div className="max-w-2xl mx-auto py-16">
      <Card className="text-center">
        <CardHeader className="pb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">주문이 완료되었습니다!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-muted-foreground">선착순 상품 주문이 성공적으로 처리되었습니다.</p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-700">
                <strong>주문번호:</strong> #{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <p className="text-sm text-green-700 mt-1">주문 확인 메일이 발송되었습니다.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Package className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <p className="font-semibold text-sm">배송 준비</p>
                <p className="text-xs text-muted-foreground">1-2일 내 발송</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Clock className="h-5 w-5 text-orange-600" />
              <div className="text-left">
                <p className="font-semibold text-sm">배송 예정</p>
                <p className="text-xs text-muted-foreground">2-3일 내 도착</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/orders">주문 내역 확인</Link>
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>문의사항이 있으시면 고객센터(1588-0000)로 연락주세요.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderSuccess
