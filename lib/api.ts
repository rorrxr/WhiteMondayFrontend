import axios, { AxiosRequestConfig } from "axios"
import type { 
  User, 
  Product, 
  Category, 
  OrderData,
  WishListItem,
  WishListCreateRequest,
  WishListUpdateRequest,
  ProductRequest,
  ProductResponse,
  StockResponse,
  DecreaseStockRequest,
  PaymentRequest,
  OrderRequest,
  OrderResponse
} from "@/types"

const API_URL = "http://localhost:8000"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to include auth token and user ID
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken")
  const userId = localStorage.getItem("userId")
  
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }
  
  if (userId) {
    config.headers = {
      ...config.headers,
      "X-User-Id": userId
    }
  }
  
  return config
})

// 기존 API 함수들
export const getUserByEmail = async (email: string): Promise<User> => {
  const response = await api.get("/user-service/api/users", {
    params: { emailRequestDto: { email } },
  })
  return response.data
}

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  const response = await api.put("/user-service/api/users", userData)
  return response.data
}

export const getProducts = async (
  page: number,
  size: number,
  search = "",
  category: string | null = null,
): Promise<Product[]> => {
  const response = await api.get("/product-service/api/products", {
    params: { page, size, search, category },
  })
  return response.data
}

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/product-service/api/products/${id}`)
  return response.data
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/product-service/api/categories")
  return response.data
}

export const updateCategory = async (id: string, categoryData: Partial<Category>): Promise<Category> => {
  const response = await api.put(`/product-service/api/categories/${id}`, categoryData)
  return response.data
}

export const createCategory = async (categoryData: Omit<Category, "id">): Promise<Category> => {
  const response = await api.post("/product-service/api/categories", categoryData)
  return response.data
}

export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/product-service/api/categories/${id}`)
}

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
  const response = await api.put(`/product-service/api/products/${id}`, productData)
  return response.data
}

export const createProduct = async (productData: Omit<Product, "id" | "productId">): Promise<Product> => {
  const response = await api.post("/product-service/api/products", productData)
  return response.data
}

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/product-service/api/products/${id}`)
}

export const createOrder = async (orderData: OrderData): Promise<any> => {
  const response = await api.post("/order-service/api/orders", orderData)
  return response.data
}

// 새로운 API 함수들

// === 위시리스트 API ===
export const getWishLists = async (userId: number): Promise<WishListItem[]> => {
  const response = await api.get("/wishlist-service/api/wishlist", {
    headers: { "X-User-Id": userId.toString() }
  })
  return response.data
}

export const addWishList = async (
  userId: number, 
  requestDto: WishListCreateRequest
): Promise<WishListItem> => {
  const response = await api.post("/wishlist-service/api/wishlist", requestDto, {
    headers: { "X-User-Id": userId.toString() }
  })
  return response.data
}

export const updateWishList = async (
  id: number, 
  userId: number, 
  requestDto: WishListUpdateRequest
): Promise<WishListItem> => {
  const response = await api.put(`/wishlist-service/api/wishlist/${id}`, requestDto, {
    headers: { "X-User-Id": userId.toString() }
  })
  return response.data
}

export const deleteWishList = async (id: number, userId: number): Promise<void> => {
  await api.delete(`/wishlist-service/api/wishlist/${id}`, {
    headers: { "X-User-Id": userId.toString() }
  })
}

// === 상품 API (추가) ===
export const getAllProducts = async (): Promise<ProductResponse[]> => {
  const response = await api.get("/product-service/api/products")
  return response.data
}

export const getProductByIdNew = async (productId: number): Promise<ProductResponse> => {
  const response = await api.get(`/product-service/api/products/${productId}`)
  return response.data
}

export const addProduct = async (requestDto: ProductRequest): Promise<ProductResponse> => {
  const response = await api.post("/product-service/api/products", requestDto)
  return response.data
}

export const getRemainingStock = async (id: number): Promise<number> => {
  const response = await api.get(`/product-service/api/products/${id}/remaining-stock`)
  return response.data
}

export const restoreStock = async (id: number, count: number): Promise<void> => {
  await api.post(`/product-service/api/products/${id}/restore-stock`, null, {
    params: { count }
  })
}

export const decreaseStock = async (
  productId: number, 
  request: DecreaseStockRequest
): Promise<StockResponse> => {
  const response = await api.post(`/product-service/api/products/${productId}/stock/decrease`, request)
  return response.data
}

export const triggerScheduledTask = async (): Promise<string> => {
  const response = await api.get("/product-service/api/products/scheduled")
  return response.data
}

// === 결제 API ===
export const enterPayment = async (paymentRequestDto: PaymentRequest): Promise<string> => {
  const response = await api.post("/payment-service/api/payment/enter", paymentRequestDto)
  return response.data
}

export const processPayment = async (requestDto: PaymentRequest): Promise<string> => {
  const response = await api.post("/payment-service/api/payment/process", requestDto)
  return response.data
}

// === 주문 API ===
export const createOrderNew = async (
  userId: number, 
  requestDto: OrderRequest
): Promise<string> => {
  const response = await api.post("/order-service/api/orders", requestDto, {
    headers: { "X-User-Id": userId.toString() }
  })
  return response.data
}

export const getOrders = async (userId: number): Promise<OrderResponse[]> => {
  const response = await api.get("/order-service/api/orders", {
    headers: { "X-User-Id": userId.toString() }
  })
  return response.data
}

export const cancelOrder = async (orderId: number, userId: number): Promise<OrderResponse> => {
  const response = await api.put(`/order-service/api/orders/${orderId}/cancel`, null, {
    headers: { "X-User-Id": userId.toString() }
  })
  return response.data
}

export const returnOrder = async (orderId: number, userId: number): Promise<OrderResponse> => {
  const response = await api.put(`/order-service/api/orders/${orderId}/return`, null, {
    headers: { "X-User-Id": userId.toString() }
  })
  return response.data
}

export const updateOrderStatus = async (): Promise<void> => {
  await api.put("/order-service/api/orders/update-status")
}

export default api
