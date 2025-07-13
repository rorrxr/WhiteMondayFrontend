import type { OrderRequest, OrderResponse } from "@/types"

const API_BASE_URL = "http://localhost:8000/order-service"

// 헤더 설정 함수
const getAuthHeaders = (userId: number) => {
  const token = localStorage.getItem("accessToken")
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
    "X-User-Id": userId.toString()
  }
}

// 주문 생성
export const createOrder = async (
  userId: number, 
  requestDto: OrderRequest
): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    method: "POST",
    headers: getAuthHeaders(userId),
    body: JSON.stringify(requestDto)
  })
  
  if (!response.ok) {
    throw new Error("Failed to create order")
  }
  
  return response.text()
}

// 주문 내역 조회
export const getOrders = async (userId: number): Promise<OrderResponse[]> => {
  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    method: "GET",
    headers: getAuthHeaders(userId)
  })
  
  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
  
  return response.json()
}

// 주문 취소
export const cancelOrder = async (orderId: number, userId: number): Promise<OrderResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/cancel`, {
    method: "PUT",
    headers: getAuthHeaders(userId)
  })
  
  if (!response.ok) {
    throw new Error("Failed to cancel order")
  }
  
  return response.json()
}

// 주문 반품
export const returnOrder = async (orderId: number, userId: number): Promise<OrderResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/return`, {
    method: "PUT",
    headers: getAuthHeaders(userId)
  })
  
  if (!response.ok) {
    throw new Error("Failed to return order")
  }
  
  return response.json()
}

// 주문 상태 업데이트
export const updateOrderStatus = async (): Promise<void> => {
  const token = localStorage.getItem("accessToken")
  const response = await fetch(`${API_BASE_URL}/api/orders/update-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : "",
    }
  })
  
  if (!response.ok) {
    throw new Error("Failed to update order status")
  }
} 