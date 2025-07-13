import type { PaymentRequest } from "@/types"

const API_BASE_URL = "http://localhost:8000/payment-service"

// 헤더 설정 함수
const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken")
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  }
}

// 결제 진입 API
export const enterPayment = async (paymentRequestDto: PaymentRequest): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/api/payment/enter`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(paymentRequestDto)
  })
  
  if (!response.ok) {
    throw new Error("Payment entry validation failed")
  }
  
  return response.text()
}

// 결제 처리 API
export const processPayment = async (requestDto: PaymentRequest): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/api/payment/process`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(requestDto)
  })
  
  if (!response.ok) {
    throw new Error("Payment processing failed")
  }
  
  return response.text()
} 