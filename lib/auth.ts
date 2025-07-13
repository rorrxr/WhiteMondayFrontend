import api from "./api"
import type { 
  User, 
  SignupRequest, 
  LoginRequest, 
  LoginResponse, 
  UserInfo,
  EmailVerificationRequest,
  EmailVerificationResponse,
  TokenVerificationRequest,
  VerificationToken
} from "@/types"

// 사용자 회원가입
export const signUp = async (userData: SignupRequest): Promise<string> => {
  const response = await api.post("/user-service/api/user/signup", userData)
  return response.data
}

// 사용자 로그인
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/user-service/api/user/login", credentials)
  
  // 토큰 저장
  localStorage.setItem("accessToken", response.data.token)
  localStorage.setItem("refreshToken", response.data.refreshToken)
  
  return response.data
}

// 사용자 로그아웃
export const logout = async (): Promise<void> => {
  const refreshToken = localStorage.getItem("refreshToken")
  if (refreshToken) {
    await api.post("/user-service/api/user/logout", {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    })
  }
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}

// 사용자 정보 조회
export const getUserInfo = async (userId: number): Promise<UserInfo> => {
  const response = await api.get<UserInfo>("/user-service/api/user/info", {
    headers: {
      "X-User-Id": userId.toString()
    }
  })
  return response.data
}

// 이메일 인증 요청
export const sendVerificationEmail = async (email: string): Promise<EmailVerificationResponse> => {
  const response = await api.post<EmailVerificationResponse>("/user-service/api/v1/send-verification-email", { email })
  return response.data
}

// 이메일 인증 확인
export const verifyEmail = async (token: string): Promise<EmailVerificationResponse> => {
  const response = await api.post<EmailVerificationResponse>("/user-service/api/v1/verify-email", { token })
  return response.data
}

// 인증 토큰 생성
export const generateVerificationToken = async (email: string): Promise<string> => {
  const response = await api.post<string>("/user-service/api/verification/generate", null, {
    params: { email }
  })
  return response.data
}

// 인증 토큰 검증
export const validateVerificationToken = async (token: string): Promise<string> => {
  const response = await api.get<string>("/user-service/api/verification/validate", {
    params: { token }
  })
  return response.data
}

// 토큰 새로고침 (기존 함수 유지)
export const refreshToken = async (): Promise<LoginResponse> => {
  const refreshToken = localStorage.getItem("refreshToken")
  if (!refreshToken) {
    throw new Error("No refresh token available")
  }
  
  const response = await api.post<LoginResponse>("/user-service/api/user/refresh", {
    refreshToken
  })
  
  localStorage.setItem("accessToken", response.data.token)
  return response.data
}

// 이메일 중복 확인 (기존 함수 유지)
export const checkEmailAvailability = async (email: string): Promise<boolean> => {
  const response = await api.post("/user-service/api/user/check-email", { email })
  return response.data.isAvailable
}
