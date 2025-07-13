import type { 
  WishListItem,
  WishListCreateRequest,
  WishListUpdateRequest
} from "@/types"

const API_BASE_URL = "http://localhost:8000/wishlist-service"

// 헤더 설정 함수
const getAuthHeaders = (userId: number) => {
  const token = localStorage.getItem("accessToken")
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
    "X-User-Id": userId.toString()
  }
}

// 위시리스트 조회
export const getWishLists = async (userId: number): Promise<WishListItem[]> => {
  const response = await fetch(`${API_BASE_URL}/api/wishlist`, {
    method: "GET",
    headers: getAuthHeaders(userId)
  })
  
  if (!response.ok) {
    throw new Error("Failed to fetch wish lists")
  }
  
  return response.json()
}

// 위시리스트 추가
export const addWishList = async (
  userId: number, 
  requestDto: WishListCreateRequest
): Promise<WishListItem> => {
  const response = await fetch(`${API_BASE_URL}/api/wishlist`, {
    method: "POST",
    headers: getAuthHeaders(userId),
    body: JSON.stringify(requestDto)
  })
  
  if (!response.ok) {
    throw new Error("Failed to add to wish list")
  }
  
  return response.json()
}

// 위시리스트 수정
export const updateWishList = async (
  id: number, 
  userId: number, 
  requestDto: WishListUpdateRequest
): Promise<WishListItem> => {
  const response = await fetch(`${API_BASE_URL}/api/wishlist/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(userId),
    body: JSON.stringify(requestDto)
  })
  
  if (!response.ok) {
    throw new Error("Failed to update wish list")
  }
  
  return response.json()
}

// 위시리스트 삭제
export const deleteWishList = async (id: number, userId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/wishlist/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(userId)
  })
  
  if (!response.ok) {
    throw new Error("Failed to delete wish list item")
  }
} 