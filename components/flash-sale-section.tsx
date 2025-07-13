"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/types"
import { ShoppingCart, Users, Clock } from "lucide-react"

interface FlashSaleSectionProps {
  products: Product[]
}

const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({ products }) => {
  const { addToCart } = useCart()

  const handleQuickBuy = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const discountedPrice = product.sale > 0 ? product.price * (1 - product.sale / 100) : product.price
        const soldPercentage = Math.max(0, Math.min(100, ((100 - product.count) / 100) * 100))
        const isLowStock = product.count <= 5

        return (
          <Card
            key={product.id}
            className="group overflow-hidden border-2 border-red-200 hover:border-red-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <Link href={`/product/${product.productId}`}>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg?height=300&width=300"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Sale Badge */}
                {product.sale > 0 && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white font-bold animate-pulse">
                    {product.sale}% OFF
                  </Badge>
                )}

                {/* Low Stock Warning */}
                {isLowStock && (
                  <Badge className="absolute top-2 right-2 bg-orange-500 text-white font-bold">마감임박</Badge>
                )}

                {/* Quick Buy Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    onClick={(e) => handleQuickBuy(product, e)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold"
                    disabled={product.count === 0}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    즉시구매
                  </Button>
                </div>
              </div>
            </Link>

            <CardContent className="p-4 space-y-3">
              <Link href={`/product/${product.productId}`}>
                <h3 className="font-semibold text-lg line-clamp-2 hover:text-red-600 transition-colors">
                  {product.name}
                </h3>
              </Link>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-red-600">{discountedPrice.toLocaleString()}원</span>
                {product.sale > 0 && (
                  <span className="text-sm text-muted-foreground line-through">{product.price.toLocaleString()}원</span>
                )}
              </div>

              {/* Stock Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    판매 진행률
                  </span>
                  <span className="font-semibold text-red-600">{Math.round(soldPercentage)}%</span>
                </div>
                <Progress value={soldPercentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>남은 수량: {product.count}개</span>
                  <span className="text-red-600 font-semibold">
                    {product.count <= 3 ? "품절임박!" : "서둘러 주문하세요!"}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={(e) => handleQuickBuy(product, e)}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold"
                disabled={product.count === 0}
              >
                {product.count === 0 ? (
                  "품절"
                ) : (
                  <>
                    <Clock className="mr-2 h-4 w-4" />
                    지금 구매하기
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default FlashSaleSection
