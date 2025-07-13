import type { 
  SignupRequest,
  LoginRequest,
  LoginResponse,
  UserInfo
} from "@/types"

const API_BASE_URL = "http://localhost:8000/user-service"

// 헤더 설정 함수
const getHeaders = () => {
  return {
    "Content-Type": "application/json",
  }
}

const getAuthHeaders = (userId?: number) => {
  const token = localStorage.getItem("accessToken")
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
  
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  
  if (userId) {
    headers["X-User-Id"] = userId.toString()
  }
  
  return headers
}

// 회원가입
export const signUp = async (userData: SignupRequest): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/user/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(userData)
  })
  
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Signup failed: ${errorText}`)
  }
  
  return response.text()
}

// 로그인
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(credentials)
  })
  
  if (!response.ok) {
    throw new Error("Login failed")
  }
  
  return response.json()
}

// 로그아웃
export const logout = async (): Promise<void> => {
  const refreshToken = localStorage.getItem("refreshToken")
  if (!refreshToken) {
    return
  }
  
  const response = await fetch(`${API_BASE_URL}/user/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${refreshToken}`
    }
  })
  
  if (!response.ok) {
    throw new Error("Logout failed")
  }
}

// 사용자 정보 조회
export const getUserInfo = async (userId: number): Promise<UserInfo> => {
  const response = await fetch(`${API_BASE_URL}/user/info`, {
    method: "GET",
    headers: getAuthHeaders(userId)
  })
  
  if (!response.ok) {
    throw new Error("Failed to fetch user info")
  }
  
  return response.json()
}

// 서비스 상태 확인
export const checkServiceStatus = async (): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/user/test`, {
    method: "GET",
    headers: getHeaders()
  })
  
  if (!response.ok) {
    throw new Error("Service check failed")
  }
  
  return response.text()
} 