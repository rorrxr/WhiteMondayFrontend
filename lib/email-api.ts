import type { 
  EmailVerificationRequest,
  EmailVerificationResponse,
  TokenVerificationRequest
} from "@/types"

const API_BASE_URL = "http://localhost:8000/user-service"

// 헤더 설정 함수
const getHeaders = () => {
  return {
    "Content-Type": "application/json",
  }
}

// 이메일 인증 요청
export const sendVerificationEmail = async (email: string): Promise<EmailVerificationResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/send-verification-email`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email })
  })
  
  if (!response.ok) {
    throw new Error("Failed to send verification email")
  }
  
  return response.json()
}

// 이메일 인증 확인 (POST)
export const verifyEmail = async (token: string): Promise<EmailVerificationResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/verify-email`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ token })
  })
  
  if (!response.ok) {
    throw new Error("Failed to verify email")
  }
  
  return response.json()
}

// 이메일 인증 확인 (GET - 링크 클릭 방식)
export const verifyEmailByLink = async (token: string): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/verify-email?token=${token}`, {
    method: "GET",
    headers: getHeaders()
  })
  
  if (!response.ok) {
    throw new Error("Failed to verify email by link")
  }
  
  return response.text()
}

// 인증 토큰 생성
export const generateVerificationToken = async (email: string): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/api/verification/generate?email=${email}`, {
    method: "POST",
    headers: getHeaders()
  })
  
  if (!response.ok) {
    throw new Error("Failed to generate verification token")
  }
  
  return response.text()
}

// 인증 토큰 검증
export const validateVerificationToken = async (token: string): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/api/verification/validate?token=${token}`, {
    method: "GET",
    headers: getHeaders()
  })
  
  if (!response.ok) {
    throw new Error("Failed to validate verification token")
  }
  
  return response.text()
} 