"use client"

import { useState, useEffect } from "react"
import { getMockWishList } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { WishListItem } from "@/types"

export default function WishlistPage() {
  const [wishList, setWishList] = useState<WishListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const data = await getMockWishList()
        setWishList(data)
        setLoading(false)
      } catch (err) {
        setError("위시리스트를 불러오는데 실패했습니다.")
        setLoading(false)
      }
    }
    fetchWishList()
  }, [])

  const handleRemoveFromWishList = (id: number) => {
    setWishList(prev => prev.filter(item => item.id !== id))
  }

  const handleAddToCart = (item: WishListItem) => {
    // 장바구니에 추가하는 로직
    console.log("장바구니에 추가:", item)
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse" />
                <CardContent className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
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
          <Heart className="h-16 w-16 text-gray-400 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">오류가 발생했습니다</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (wishList.length === 0) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <div className="space-y-4">
          <Heart className="h-16 w-16 text-gray-400 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">위시리스트가 비어있습니다</h2>
          <p className="text-gray-600">관심있는 상품을 위시리스트에 추가해보세요!</p>
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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">위시리스트</h1>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span className="text-sm text-gray-600">{wishList.length}개 상품</span>
          </div>
        </div>
        <p className="text-gray-600">관심있는 상품들을 모아보세요</p>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishList.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <Link href={`/product/${item.productId}`}>
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={item.productImage || "/placeholder.svg?height=300&width=300"}
                    alt={item.productName}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
              </Link>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={() => handleRemoveFromWishList(item.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
              
              <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                <Heart className="h-3 w-3 mr-1" />
                관심상품
              </Badge>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                <Link href={`/product/${item.productId}`}>
                  <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors line-clamp-2">
                    {item.productName}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-red-600">
                      {item.productPrice.toLocaleString()}원
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">
                        4.{Math.floor(Math.random() * 5) + 3} (리뷰 {Math.floor(Math.random() * 100) + 10})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  추가일: {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    장바구니
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <Link href={`/product/${item.productId}`}>
                      상세보기
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-8">
        <Button
          variant="outline"
          onClick={() => {
            // 모든 상품을 장바구니에 추가
            wishList.forEach(item => handleAddToCart(item))
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          전체 장바구니 담기
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            // 위시리스트 전체 삭제
            if (confirm("위시리스트를 모두 삭제하시겠습니까?")) {
              setWishList([])
            }
          }}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          전체 삭제
        </Button>
      </div>
    </div>
  )
} 