"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { getMockProducts } from "@/lib/mock-data"
import ProductList from "@/components/product-list"
import CategoryList from "@/components/category-list"
import FlashSaleSection from "@/components/flash-sale-section"
import CountdownTimer from "@/components/countdown-timer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ChevronLeft, ChevronRight, Zap, Clock, FlameIcon as Fire } from "lucide-react"
import type { Product } from "@/types"

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [category, setCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getMockProducts(currentPage, 12, searchTerm, category)
      setProducts(response)

      // 선착순 상품 필터링 (재고가 적거나 할인율이 높은 상품)
      const flashSale = response.filter((product: Product) => product.count <= 10 || product.sale >= 30).slice(0, 6)
      setFlashSaleProducts(flashSale)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, category, searchTerm])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(0)
    fetchProducts()
  }

  return (
    <div className="space-y-8">
      {/* Hero Section with Flash Sale */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 px-8 py-16 text-white">
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Fire className="h-8 w-8 text-yellow-300" />
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">선착순 특가!</h1>
          </div>
          <p className="mt-6 text-xl leading-8 text-orange-100">
            한정 수량! 놓치면 후회하는 특가 상품들을 지금 바로 만나보세요.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Clock className="h-6 w-6" />
            <CountdownTimer targetDate={new Date(Date.now() + 24 * 60 * 60 * 1000)} />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-orange-600/90" />
        <div className="absolute -top-4 -right-4 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-8 -left-8 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </section>

      {/* Flash Sale Section */}
      {flashSaleProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-yellow-500" />
              <h2 className="text-3xl font-bold">⚡ 번개세일</h2>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                한정수량
              </span>
            </div>
            <CountdownTimer targetDate={new Date(Date.now() + 6 * 60 * 60 * 1000)} />
          </div>
          <FlashSaleSection products={flashSaleProducts} />
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="space-y-6">
            <CategoryList onSelectCategory={setCategory} selectedCategory={category} />

            {/* Search */}
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="상품 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    검색
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">실시간 현황</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">오늘 판매</span>
                    <span className="font-semibold text-green-600">1,234개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">접속자</span>
                    <span className="font-semibold text-blue-600">5,678명</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">남은 특가</span>
                    <span className="font-semibold text-red-600">{flashSaleProducts.length}개</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">전체 상품</h2>
              <div className="text-sm text-muted-foreground">총 {products.length}개 상품</div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-square bg-muted animate-pulse" />
                    <CardContent className="p-4 space-y-2">
                      <div className="h-4 bg-muted rounded animate-pulse" />
                      <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <ProductList products={products} />
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 text-sm">페이지 {currentPage + 1}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={products.length < 12}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
