"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { login, logout, refreshToken, getUserInfo } from "@/lib/auth"
import type { User, AuthContextType, UserInfo } from "@/types"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken")
      const userId = localStorage.getItem("userId")
      
      if (token && userId) {
        try {
          // 토큰이 유효한지 확인하고 사용자 정보 가져오기
          const userInfo = await getUserInfo(parseInt(userId))
          setUser({
            id: userId,
            username: userInfo.username,
            email: "", // 백엔드 API에서 이메일 정보가 없으므로 빈 문자열
            name: userInfo.username,
            phone: "",
            role: userInfo.isAdmin ? "ADMIN" : "USER"
          })
        } catch (error) {
          console.error("Failed to get user info:", error)
          // 토큰이 유효하지 않으면 로그아웃
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("userId")
        }
      }
      setLoading(false)
    }
    initAuth()
  }, [])

  const loginUser = async (username: string, password: string) => {
    try {
      const loginResponse = await login({ username, password })
      
      // 로그인 성공 후 사용자 정보를 가져오기 위해 userId가 필요
      // 백엔드에서 userId를 반환하지 않으므로 토큰에서 추출하거나 별도 API로 가져와야 함
      // 여기서는 임시로 로컬스토리지에 저장된 userId를 사용
      const userId = localStorage.getItem("userId")
      if (userId) {
        const userInfo = await getUserInfo(parseInt(userId))
        setUser({
          id: userId,
          username: userInfo.username,
          email: "", // 백엔드 API에서 이메일 정보가 없으므로 빈 문자열
          name: userInfo.username,
          phone: "",
          role: userInfo.isAdmin ? "ADMIN" : "USER"
        })
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const logoutUser = async () => {
    try {
      await logout()
      setUser(null)
      localStorage.removeItem("userId")
    } catch (error) {
      console.error("Logout failed:", error)
      // 로그아웃 실패해도 클라이언트 측에서는 로그아웃 처리
      setUser(null)
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("userId")
    }
  }

  return <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>{children}</AuthContext.Provider>
}
