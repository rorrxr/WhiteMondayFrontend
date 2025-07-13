export interface User {
  id: string
  email: string
  username: string
  name: string
  phone: string
  role: "USER" | "ADMIN"
}

export interface Product {
  id: string
  productId: string
  name: string
  price: number
  sale: number
  content: string
  count: number
  image: string
  category?: Category
  isFlashSale?: boolean
  flashSaleEndTime?: Date
}

export interface Category {
  id: string
  name: string
  parentCategory?: Category
}

export interface CartItem extends Product {
  quantity: number
}

export interface AuthContextType {
  user: User | null
  loginUser: (email: string, password: string) => Promise<void>
  logoutUser: () => Promise<void>
  loading: boolean
}

export interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export interface OrderData {
  items: Array<{
    productId: string
    quantity: number
  }>
  shippingInfo: ShippingInfo
  total: number
  paymentMethod?: string
}

export interface ShippingInfo {
  name: string
  phone: string
  address: string
  detailAddress: string
  postalCode: string
  memo: string
}

export interface FlashSaleProduct extends Product {
  originalPrice: number
  saleEndTime: Date
  soldCount: number
  totalCount: number
}

// 새로운 타입들 추가
export interface SignupRequest {
  username: string
  email: string
  password: string
  name: string
  phone: string
  role?: "USER" | "ADMIN"
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  refreshToken: string
}

export interface UserInfo {
  username: string
  isAdmin: boolean
}

export interface WishListItem {
  id: number
  productId: number
  productName: string
  productPrice: number
  productImage: string
  createdAt: string
}

export interface WishListCreateRequest {
  productId: number
}

export interface WishListUpdateRequest {
  productId: number
}

export interface EmailVerificationRequest {
  email: string
}

export interface EmailVerificationResponse {
  message: string
  error?: string
}

export interface TokenVerificationRequest {
  token: string
}

export interface VerificationToken {
  token: string
  email: string
  expiresAt: string
  verified: boolean
}

export interface ProductRequest {
  name: string
  price: number
  content: string
  count: number
  image: string
  categoryId?: number
  isFlashSale?: boolean
  flashSaleEndTime?: string
}

export interface ProductResponse {
  id: number
  name: string
  price: number
  content: string
  count: number
  image: string
  category?: Category
  isFlashSale?: boolean
  flashSaleEndTime?: string
}

export interface StockResponse {
  productId: number
  remainingStock: number
  success: boolean
}

export interface DecreaseStockRequest {
  quantity: number
}

export interface PaymentRequest {
  orderId: number
  amount: number
  paymentMethod: string
  userId: number
}

export interface OrderRequest {
  items: Array<{
    productId: number
    quantity: number
  }>
  shippingInfo: ShippingInfo
  totalAmount: number
  paymentMethod: string
}

export interface OrderResponse {
  id: number
  userId: number
  items: Array<{
    productId: number
    quantity: number
    price: number
  }>
  totalAmount: number
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "RETURNED"
  shippingInfo: ShippingInfo
  createdAt: string
  updatedAt: string
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED"
}

export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}
