import type { 
  Product, 
  Category, 
  User, 
  WishListItem,
  OrderResponse,
  ProductResponse 
} from "@/types"

// Mock 카테고리 데이터
export const mockCategories: Category[] = [
  { id: "1", name: "전자제품" },
  { id: "2", name: "패션" },
  { id: "3", name: "홈&리빙" },
  { id: "4", name: "뷰티" },
  { id: "5", name: "스포츠" },
  { id: "6", name: "도서" },
  { id: "7", name: "식품" },
  { id: "8", name: "반려동물" },
]

// Mock 상품 데이터
export const mockProducts: Product[] = [
  {
    id: "1",
    productId: "1",
    name: "MacBook Pro 14인치",
    price: 2590000,
    sale: 10,
    content: "M3 칩 탑재 MacBook Pro 14인치 모델입니다. 뛰어난 성능과 긴 배터리 수명을 자랑합니다.",
    count: 5,
    image: "/placeholder.jpg",
    category: mockCategories[0],
    isFlashSale: true,
    flashSaleEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000)
  },
  {
    id: "2",
    productId: "2",
    name: "iPhone 15 Pro",
    price: 1550000,
    sale: 15,
    content: "최신 A17 Pro 칩이 탑재된 iPhone 15 Pro입니다. 티타늄 소재로 제작되어 더욱 가벼워졌습니다.",
    count: 8,
    image: "/placeholder.jpg",
    category: mockCategories[0],
    isFlashSale: true,
    flashSaleEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000)
  },
  {
    id: "3",
    productId: "3",
    name: "나이키 에어 조던",
    price: 189000,
    sale: 25,
    content: "클래식한 디자인의 나이키 에어 조던 스니커즈입니다. 편안한 착용감과 스타일을 동시에 제공합니다.",
    count: 12,
    image: "/placeholder.jpg",
    category: mockCategories[1],
    isFlashSale: false
  },
  {
    id: "4",
    productId: "4",
    name: "삼성 갤럭시 버즈 Pro",
    price: 229000,
    sale: 20,
    content: "뛰어난 음질과 노이즈 캔슬링 기능을 제공하는 무선 이어폰입니다.",
    count: 3,
    image: "/placeholder.jpg",
    category: mockCategories[0],
    isFlashSale: true,
    flashSaleEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000)
  },
  {
    id: "5",
    productId: "5",
    name: "다이슨 헤어드라이어",
    price: 550000,
    sale: 30,
    content: "혁신적인 기술로 빠르고 부드러운 헤어 드라이 경험을 제공합니다.",
    count: 7,
    image: "/placeholder.jpg",
    category: mockCategories[3],
    isFlashSale: true,
    flashSaleEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000)
  },
  {
    id: "6",
    productId: "6",
    name: "레고 크리에이터",
    price: 89000,
    sale: 5,
    content: "창의력을 키울 수 있는 레고 크리에이터 시리즈입니다. 다양한 모델로 조립 가능합니다.",
    count: 15,
    image: "/placeholder.jpg",
    category: mockCategories[2],
    isFlashSale: false
  },
  {
    id: "7",
    productId: "7",
    name: "아이패드 Pro 11인치",
    price: 1249000,
    sale: 12,
    content: "M2 칩이 탑재된 iPad Pro 11인치 모델입니다. 프로급 성능과 휴대성을 모두 갖춘 제품입니다.",
    count: 6,
    image: "/placeholder.jpg",
    category: mockCategories[0],
    isFlashSale: true,
    flashSaleEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000)
  },
  {
    id: "8",
    productId: "8",
    name: "무지 후드티",
    price: 39000,
    sale: 0,
    content: "심플하고 편안한 무지 후드티입니다. 일상복으로 최적화된 디자인과 소재를 사용했습니다.",
    count: 20,
    image: "/placeholder.jpg",
    category: mockCategories[1],
    isFlashSale: false
  },
  {
    id: "9",
    productId: "9",
    name: "커피머신",
    price: 299000,
    sale: 18,
    content: "집에서 전문점 수준의 커피를 즐길 수 있는 에스프레소 머신입니다.",
    count: 4,
    image: "/placeholder.jpg",
    category: mockCategories[2],
    isFlashSale: true,
    flashSaleEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000)
  },
  {
    id: "10",
    productId: "10",
    name: "운동화",
    price: 129000,
    sale: 22,
    content: "러닝과 일상 착용에 모두 적합한 편안한 운동화입니다.",
    count: 9,
    image: "/placeholder.jpg",
    category: mockCategories[4],
    isFlashSale: false
  },
  {
    id: "11",
    productId: "11",
    name: "블루투스 스피커",
    price: 149000,
    sale: 35,
    content: "고음질 사운드와 강력한 베이스를 제공하는 휴대용 블루투스 스피커입니다.",
    count: 2,
    image: "/placeholder.jpg",
    category: mockCategories[0],
    isFlashSale: true,
    flashSaleEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000)
  },
  {
    id: "12",
    productId: "12",
    name: "향수",
    price: 89000,
    sale: 8,
    content: "상쾌하고 우아한 향이 특징인 유니섹스 향수입니다.",
    count: 11,
    image: "/placeholder.jpg",
    category: mockCategories[3],
    isFlashSale: false
  },
]

// Mock 사용자 데이터
export const mockUser: User = {
  id: "1",
  email: "user@example.com",
  username: "testuser",
  name: "테스트 사용자",
  phone: "01012345678",
  role: "USER"
}

// Mock 위시리스트 데이터
export const mockWishList: WishListItem[] = [
  {
    id: 1,
    productId: 1,
    productName: "MacBook Pro 14인치",
    productPrice: 2590000,
    productImage: "/placeholder.jpg",
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    productId: 4,
    productName: "삼성 갤럭시 버즈 Pro",
    productPrice: 229000,
    productImage: "/placeholder.jpg",
    createdAt: "2024-01-14T15:30:00Z"
  },
  {
    id: 3,
    productId: 9,
    productName: "커피머신",
    productPrice: 299000,
    productImage: "/placeholder.jpg",
    createdAt: "2024-01-13T09:45:00Z"
  }
]

// Mock 주문 데이터
export const mockOrders: OrderResponse[] = [
  {
    id: 1,
    userId: 1,
    items: [
      { productId: 1, quantity: 1, price: 2590000 },
      { productId: 4, quantity: 2, price: 229000 }
    ],
    totalAmount: 3048000,
    status: "CONFIRMED",
    shippingInfo: {
      name: "홍길동",
      phone: "01012345678",
      address: "서울시 강남구 테헤란로 123",
      detailAddress: "456호",
      postalCode: "12345",
      memo: "문앞에 놓아주세요"
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:05:00Z"
  },
  {
    id: 2,
    userId: 1,
    items: [
      { productId: 3, quantity: 1, price: 189000 }
    ],
    totalAmount: 189000,
    status: "PENDING",
    shippingInfo: {
      name: "홍길동",
      phone: "01012345678",
      address: "서울시 강남구 테헤란로 123",
      detailAddress: "456호",
      postalCode: "12345",
      memo: "배송 전 연락 부탁드립니다"
    },
    createdAt: "2024-01-14T15:30:00Z",
    updatedAt: "2024-01-14T15:30:00Z"
  }
]

// Mock 상품 응답 데이터 (백엔드 형식)
export const mockProductResponses: ProductResponse[] = mockProducts.map(product => ({
  id: parseInt(product.id),
  name: product.name,
  price: product.price,
  content: product.content,
  count: product.count,
  image: product.image,
  category: product.category,
  isFlashSale: product.isFlashSale,
  flashSaleEndTime: product.flashSaleEndTime?.toISOString()
}))

// Mock API 응답 함수들
export const mockApiDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

// 상품 목록 조회 Mock
export const getMockProducts = async (page: number = 0, size: number = 12, search: string = "", category: string | null = null): Promise<Product[]> => {
  await mockApiDelay()
  
  let filteredProducts = mockProducts
  
  // 카테고리 필터링
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category?.name === category
    )
  }
  
  // 검색 필터링
  if (search) {
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.content.toLowerCase().includes(search.toLowerCase())
    )
  }
  
  // 페이지네이션
  const startIndex = page * size
  const endIndex = startIndex + size
  
  return filteredProducts.slice(startIndex, endIndex)
}

// 상품 상세 조회 Mock
export const getMockProductById = async (id: string): Promise<Product> => {
  await mockApiDelay()
  
  const product = mockProducts.find(p => p.id === id)
  if (!product) {
    throw new Error(`Product with id ${id} not found`)
  }
  
  return product
}

// 카테고리 목록 조회 Mock
export const getMockCategories = async (): Promise<Category[]> => {
  await mockApiDelay()
  return mockCategories
}

// 위시리스트 조회 Mock
export const getMockWishList = async (): Promise<WishListItem[]> => {
  await mockApiDelay()
  return mockWishList
}

// 주문 목록 조회 Mock
export const getMockOrders = async (): Promise<OrderResponse[]> => {
  await mockApiDelay()
  return mockOrders
} 