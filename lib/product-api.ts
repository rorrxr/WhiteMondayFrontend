import type { 
  ProductRequest,
  ProductResponse,
  StockResponse,
  DecreaseStockRequest
} from "@/types"

const API_BASE_URL = "http://localhost:8000/product-service"

// 헤더 설정 함수
const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken")
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  }
}

// 상품 전체 조회
export const getAllProducts = async (): Promise<ProductResponse[]> => {
  const response = await fetch(`${API_BASE_URL}/api/products`, {
    method: "GET",
    headers: getAuthHeaders()
  })
  
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  
  return response.json()
}

// 상품 상세 조회
export const getProductById = async (productId: number): Promise<ProductResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
    method: "GET",
    headers: getAuthHeaders()
  })
  
  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }
  
  return response.json()
}

// 상품 등록
export const addProduct = async (requestDto: ProductRequest): Promise<ProductResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/products`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(requestDto)
  })
  
  if (!response.ok) {
    throw new Error("Failed to add product")
  }
  
  return response.json()
}

// 상품 남은 재고 조회
export const getRemainingStock = async (id: number): Promise<number> => {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}/remaining-stock`, {
    method: "GET",
    headers: getAuthHeaders()
  })
  
  if (!response.ok) {
    throw new Error("Failed to fetch remaining stock")
  }
  
  return response.json()
}

// 재고 복구
export const restoreStock = async (id: number, count: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}/restore-stock?count=${count}`, {
    method: "POST",
    headers: getAuthHeaders()
  })
  
  if (!response.ok) {
    throw new Error("Failed to restore stock")
  }
}

// 재고 감소
export const decreaseStock = async (
  productId: number, 
  request: DecreaseStockRequest
): Promise<StockResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/products/${productId}/stock/decrease`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(request)
  })
  
  if (!response.ok) {
    throw new Error("Failed to decrease stock")
  }
  
  return response.json()
}

// 스케줄링 테스트 API
export const triggerScheduledTask = async (): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/api/products/scheduled`, {
    method: "GET",
    headers: getAuthHeaders()
  })
  
  if (!response.ok) {
    throw new Error("Failed to trigger scheduled task")
  }
  
  return response.json()
} 