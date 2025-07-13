"use client"

import { useState, useEffect } from "react"
import { 
  getMockProducts, 
  getMockCategories, 
  getMockWishList, 
  getMockOrders,
  getMockProductById,
  mockProducts,
  mockCategories,
  mockWishList,
  mockOrders,
  mockUser 
} from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Package, Heart, ShoppingCart, User, Tag, Star } from "lucide-react"

export default function TestMockPage() {
  const [loading, setLoading] = useState(false)
  const [testResults, setTestResults] = useState<Record<string, any>>({})

  const runTest = async (testName: string, testFunc: () => Promise<any>) => {
    setLoading(true)
    try {
      const result = await testFunc()
      setTestResults(prev => ({ ...prev, [testName]: { success: true, data: result } }))
    } catch (error) {
      setTestResults(prev => ({ ...prev, [testName]: { success: false, error: error.message } }))
    }
    setLoading(false)
  }

  const runAllTests = async () => {
    await runTest("products", () => getMockProducts())
    await runTest("categories", () => getMockCategories())
    await runTest("wishlist", () => getMockWishList())
    await runTest("orders", () => getMockOrders())
    await runTest("productById", () => getMockProductById("1"))
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Mock 데이터 테스트</h1>
        <p className="text-gray-600">백엔드 API 연동 전에 Mock 데이터가 올바르게 작동하는지 확인합니다.</p>
      </div>

      <div className="flex gap-4">
        <Button onClick={runAllTests} disabled={loading}>
          {loading ? "테스트 중..." : "모든 테스트 실행"}
        </Button>
        <Button variant="outline" onClick={() => setTestResults({})}>
          결과 초기화
        </Button>
      </div>

      <Tabs defaultValue="static" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="static">정적 데이터</TabsTrigger>
          <TabsTrigger value="api">API 테스트</TabsTrigger>
          <TabsTrigger value="results">테스트 결과</TabsTrigger>
        </TabsList>

        <TabsContent value="static" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 상품 데이터 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  상품 데이터 ({mockProducts.length}개)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockProducts.slice(0, 3).map(product => (
                    <div key={product.id} className="p-3 border rounded-lg">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-600">
                        {product.price.toLocaleString()}원
                        {product.sale > 0 && (
                          <Badge variant="destructive" className="ml-2">
                            {product.sale}% 할인
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        재고: {product.count}개 | 카테고리: {product.category?.name}
                      </div>
                    </div>
                  ))}
                  <div className="text-sm text-gray-500">
                    ... 총 {mockProducts.length}개 상품
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 카테고리 데이터 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  카테고리 데이터 ({mockCategories.length}개)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockCategories.map(category => (
                    <div key={category.id} className="flex items-center gap-2 p-2 border rounded">
                      <Badge variant="outline">{category.name}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 위시리스트 데이터 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  위시리스트 데이터 ({mockWishList.length}개)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockWishList.map(item => (
                    <div key={item.id} className="p-3 border rounded-lg">
                      <div className="font-medium">{item.productName}</div>
                      <div className="text-sm text-gray-600">
                        {item.productPrice.toLocaleString()}원
                      </div>
                      <div className="text-xs text-gray-500">
                        추가일: {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 주문 데이터 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  주문 데이터 ({mockOrders.length}개)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockOrders.map(order => (
                    <div key={order.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">주문 #{order.id}</div>
                          <div className="text-sm text-gray-600">
                            {order.totalAmount.toLocaleString()}원
                          </div>
                        </div>
                        <Badge 
                          variant={order.status === "CONFIRMED" ? "default" : "secondary"}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        주문일: {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 사용자 데이터 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                사용자 데이터
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">이름</div>
                    <div className="font-medium">{mockUser.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">이메일</div>
                    <div className="font-medium">{mockUser.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">전화번호</div>
                    <div className="font-medium">{mockUser.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">역할</div>
                    <Badge variant={mockUser.role === "ADMIN" ? "default" : "secondary"}>
                      {mockUser.role}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={() => runTest("products", () => getMockProducts())}>
              상품 목록 API 테스트
            </Button>
            <Button onClick={() => runTest("categories", () => getMockCategories())}>
              카테고리 API 테스트
            </Button>
            <Button onClick={() => runTest("wishlist", () => getMockWishList())}>
              위시리스트 API 테스트
            </Button>
            <Button onClick={() => runTest("orders", () => getMockOrders())}>
              주문 내역 API 테스트
            </Button>
            <Button onClick={() => runTest("productById", () => getMockProductById("1"))}>
              상품 상세 API 테스트
            </Button>
            <Button onClick={() => runTest("searchProducts", () => getMockProducts(0, 5, "맥북"))}>
              상품 검색 API 테스트
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {Object.keys(testResults).length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500">아직 테스트를 실행하지 않았습니다.</div>
              <Button onClick={runAllTests} className="mt-4">
                모든 테스트 실행
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(testResults).map(([testName, result]) => (
                <Card key={testName}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {result.success ? (
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      ) : (
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                      )}
                      {testName} 테스트
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result.success ? (
                      <div>
                        <div className="text-green-600 font-medium mb-2">✓ 성공</div>
                        <div className="text-sm text-gray-600">
                          데이터 개수: {Array.isArray(result.data) ? result.data.length : 1}개
                        </div>
                        <details className="mt-2">
                          <summary className="cursor-pointer text-sm text-blue-600">
                            데이터 보기
                          </summary>
                          <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </details>
                      </div>
                    ) : (
                      <div>
                        <div className="text-red-600 font-medium mb-2">✗ 실패</div>
                        <div className="text-sm text-red-600">{result.error}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 