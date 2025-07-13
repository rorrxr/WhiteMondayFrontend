"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Server, 
  Database, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Package, 
  Heart, 
  ShoppingCart, 
  CreditCard 
} from "lucide-react"

// 실제 API 함수들 import
import { signUp, login, getUserInfo } from "@/lib/user-api"
import { getAllProducts, getProductById } from "@/lib/product-api"
import { getWishLists, addWishList } from "@/lib/wishlist-api"
import { getOrders, createOrder } from "@/lib/order-api"
import { processPayment } from "@/lib/payment-api"

// Mock API 함수들 import
import { getMockProducts, getMockCategories, getMockWishList, getMockOrders } from "@/lib/mock-data"

export default function ApiTestPage() {
  const [apiMode, setApiMode] = useState<"mock" | "real">("mock")
  const [testResults, setTestResults] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)
  const [testData, setTestData] = useState({
    email: "test@example.com",
    password: "password123",
    username: "testuser",
    name: "테스트 사용자",
    phone: "01012345678"
  })

  const runApiTest = async (testName: string, testFunc: () => Promise<any>) => {
    setLoading(true)
    const startTime = Date.now()
    
    try {
      const result = await testFunc()
      const endTime = Date.now()
      
      setTestResults(prev => ({
        ...prev,
        [testName]: {
          success: true,
          data: result,
          responseTime: endTime - startTime,
          timestamp: new Date().toISOString()
        }
      }))
    } catch (error: any) {
      const endTime = Date.now()
      
      setTestResults(prev => ({
        ...prev,
        [testName]: {
          success: false,
          error: error.message,
          responseTime: endTime - startTime,
          timestamp: new Date().toISOString()
        }
      }))
    }
    
    setLoading(false)
  }

  const testBackendConnection = async () => {
    await runApiTest("connection", async () => {
      const response = await fetch("http://localhost:8000/user-service/api/user/test")
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.text()
    })
  }

  const testUserSignup = async () => {
    await runApiTest("signup", () => signUp({
      username: testData.username,
      email: testData.email,
      password: testData.password,
      name: testData.name,
      phone: testData.phone
    }))
  }

  const testUserLogin = async () => {
    await runApiTest("login", () => login({
      username: testData.username,
      password: testData.password
    }))
  }

  const testProductList = async () => {
    if (apiMode === "mock") {
      await runApiTest("products", () => getMockProducts())
    } else {
      await runApiTest("products", () => getAllProducts())
    }
  }

  const testWishList = async () => {
    if (apiMode === "mock") {
      await runApiTest("wishlist", () => getMockWishList())
    } else {
      await runApiTest("wishlist", () => getWishLists(1))
    }
  }

  const testOrderList = async () => {
    if (apiMode === "mock") {
      await runApiTest("orders", () => getMockOrders())
    } else {
      await runApiTest("orders", () => getOrders(1))
    }
  }

  const runAllTests = async () => {
    if (apiMode === "real") {
      await testBackendConnection()
      await testUserSignup()
      await testUserLogin()
    }
    await testProductList()
    await testWishList()
    await testOrderList()
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">API 연동 테스트</h1>
        <p className="text-gray-600">Mock 데이터와 실제 백엔드 API 연동을 테스트합니다.</p>
      </div>

      {/* API 모드 선택 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            API 모드 선택
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant={apiMode === "mock" ? "default" : "outline"}
              onClick={() => setApiMode("mock")}
              className="flex items-center gap-2"
            >
              <Database className="h-4 w-4" />
              Mock 데이터
            </Button>
            <Button
              variant={apiMode === "real" ? "default" : "outline"}
              onClick={() => setApiMode("real")}
              className="flex items-center gap-2"
            >
              <Server className="h-4 w-4" />
              실제 백엔드 API
            </Button>
          </div>
          <div className="mt-4">
            <Badge variant={apiMode === "mock" ? "secondary" : "default"}>
              현재 모드: {apiMode === "mock" ? "Mock 데이터" : "실제 백엔드 API"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="quick-test" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quick-test">빠른 테스트</TabsTrigger>
          <TabsTrigger value="detailed-test">상세 테스트</TabsTrigger>
          <TabsTrigger value="test-data">테스트 데이터</TabsTrigger>
        </TabsList>

        <TabsContent value="quick-test" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={runAllTests} disabled={loading} size="lg">
              {loading ? "테스트 중..." : "전체 테스트 실행"}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setTestResults({})}
              size="lg"
            >
              결과 초기화
            </Button>
          </div>

          {/* 빠른 상태 확인 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-sm font-medium">백엔드 연결</div>
                    <div className="text-xs text-gray-600">
                      {testResults.connection?.success ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          연결됨
                        </span>
                      ) : testResults.connection?.error ? (
                        <span className="text-red-600 flex items-center gap-1">
                          <XCircle className="h-3 w-3" />
                          연결 실패
                        </span>
                      ) : (
                        <span className="text-gray-500">미테스트</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-sm font-medium">상품 API</div>
                    <div className="text-xs text-gray-600">
                      {testResults.products?.success ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {Array.isArray(testResults.products.data) ? testResults.products.data.length : 0}개
                        </span>
                      ) : testResults.products?.error ? (
                        <span className="text-red-600 flex items-center gap-1">
                          <XCircle className="h-3 w-3" />
                          오류
                        </span>
                      ) : (
                        <span className="text-gray-500">미테스트</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <div>
                    <div className="text-sm font-medium">위시리스트</div>
                    <div className="text-xs text-gray-600">
                      {testResults.wishlist?.success ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {Array.isArray(testResults.wishlist.data) ? testResults.wishlist.data.length : 0}개
                        </span>
                      ) : testResults.wishlist?.error ? (
                        <span className="text-red-600 flex items-center gap-1">
                          <XCircle className="h-3 w-3" />
                          오류
                        </span>
                      ) : (
                        <span className="text-gray-500">미테스트</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-purple-500" />
                  <div>
                    <div className="text-sm font-medium">주문 내역</div>
                    <div className="text-xs text-gray-600">
                      {testResults.orders?.success ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {Array.isArray(testResults.orders.data) ? testResults.orders.data.length : 0}개
                        </span>
                      ) : testResults.orders?.error ? (
                        <span className="text-red-600 flex items-center gap-1">
                          <XCircle className="h-3 w-3" />
                          오류
                        </span>
                      ) : (
                        <span className="text-gray-500">미테스트</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detailed-test" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {apiMode === "real" && (
              <>
                <Button onClick={testBackendConnection} disabled={loading}>
                  백엔드 연결 테스트
                </Button>
                <Button onClick={testUserSignup} disabled={loading}>
                  회원가입 테스트
                </Button>
                <Button onClick={testUserLogin} disabled={loading}>
                  로그인 테스트
                </Button>
              </>
            )}
            <Button onClick={testProductList} disabled={loading}>
              상품 목록 테스트
            </Button>
            <Button onClick={testWishList} disabled={loading}>
              위시리스트 테스트
            </Button>
            <Button onClick={testOrderList} disabled={loading}>
              주문 내역 테스트
            </Button>
          </div>

          {/* 테스트 결과 상세 */}
          <div className="space-y-4">
            {Object.entries(testResults).map(([testName, result]) => (
              <Card key={testName}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {result.success ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      {testName} 테스트
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {result.responseTime}ms
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {result.success ? (
                    <div className="space-y-2">
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          테스트 성공! 응답 시간: {result.responseTime}ms
                        </AlertDescription>
                      </Alert>
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm text-blue-600">
                          응답 데이터 보기
                        </summary>
                        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </details>
                    </div>
                  ) : (
                    <Alert variant="destructive">
                      <XCircle className="h-4 w-4" />
                      <AlertDescription>
                        테스트 실패: {result.error}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="test-data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>테스트 데이터 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    value={testData.email}
                    onChange={(e) => setTestData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="username">사용자명</Label>
                  <Input
                    id="username"
                    value={testData.username}
                    onChange={(e) => setTestData(prev => ({ ...prev, username: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    value={testData.password}
                    onChange={(e) => setTestData(prev => ({ ...prev, password: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    value={testData.name}
                    onChange={(e) => setTestData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">전화번호</Label>
                  <Input
                    id="phone"
                    value={testData.phone}
                    onChange={(e) => setTestData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API 엔드포인트 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div><strong>Gateway:</strong> http://localhost:8000</div>
                <div><strong>User Service:</strong> http://localhost:8000/user-service/api/user/**</div>
                <div><strong>Product Service:</strong> http://localhost:8000/product-service/api/products/**</div>
                <div><strong>Wishlist Service:</strong> http://localhost:8000/wishlist-service/api/wishlist/**</div>
                <div><strong>Order Service:</strong> http://localhost:8000/order-service/api/orders/**</div>
                <div><strong>Payment Service:</strong> http://localhost:8000/payment-service/api/payment/**</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 