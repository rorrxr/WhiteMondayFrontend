// Mock 데이터 - 백엔드 서버 없이 테스트용
const mockCategories = [
  { id: "1", name: "전자제품" },
  { id: "2", name: "패션" },
  { id: "3", name: "홈&리빙" },
  { id: "4", name: "뷰티" },
  { id: "5", name: "스포츠" },
  { id: "6", name: "도서" },
  { id: "7", name: "식품" },
  { id: "8", name: "반려동물" },
];

const mockProducts = [
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
  {
    id: "13",
    productId: "13",
    name: "게이밍 키보드",
    price: 159000,
    sale: 40,
    content: "기계식 스위치로 제작된 게이밍 키보드입니다. RGB 백라이트 지원.",
    count: 1,
    image: "/placeholder.jpg",
    category: mockCategories[0],
    isFlashSale: true,
    flashSaleEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000)
  },
  {
    id: "14",
    productId: "14",
    name: "무선 충전기",
    price: 45000,
    sale: 50,
    content: "고속 무선 충전을 지원하는 스마트폰 충전기입니다.",
    count: 2,
    image: "/placeholder.jpg",
    category: mockCategories[0],
    isFlashSale: true,
    flashSaleEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000)
  },
  {
    id: "15",
    productId: "15",
    name: "스마트 워치",
    price: 350000,
    sale: 45,
    content: "건강 관리와 피트니스 트래킹이 가능한 스마트 워치입니다.",
    count: 1,
    image: "/placeholder.jpg",
    category: mockCategories[0],
    isFlashSale: true,
    flashSaleEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000)
  }
];

const mockUser = {
  id: "1",
  email: "user@example.com",
  username: "testuser",
  name: "테스트 사용자",
  phone: "01012345678",
  role: "USER"
};

// Mock API 지연 시뮬레이션
const mockApiDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// API 함수들 - Mock 데이터 사용
export const getUserByEmail = async (email) => {
  await mockApiDelay();
  return mockUser;
};

export const updateUser = async (userData) => {
  await mockApiDelay();
  return { ...mockUser, ...userData };
};

export const getProducts = async (page = 0, size = 12, search = "", category = null) => {
  await mockApiDelay();
  
  let filteredProducts = mockProducts;
  
  // 검색 필터링
  if (search) {
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.content.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // 카테고리 필터링
  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter(product => 
      product.category.id === category
    );
  }
  
  // 페이지네이션 (간단하게 처리)
  const start = page * size;
  const end = start + size;
  const paginatedProducts = filteredProducts.slice(start, end);
  
  // 단순히 배열만 반환 (Home.js에서 기대하는 형태)
  return paginatedProducts;
};

export const getProductById = async (id) => {
  await mockApiDelay();
  const product = mockProducts.find(p => p.id === id);
  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }
  return product;
};

export const getCategories = async () => {
  await mockApiDelay();
  return mockCategories;
};

export const updateCategory = async (id, categoryData) => {
  await mockApiDelay();
  const categoryIndex = mockCategories.findIndex(c => c.id === id);
  if (categoryIndex !== -1) {
    mockCategories[categoryIndex] = { ...mockCategories[categoryIndex], ...categoryData };
    return mockCategories[categoryIndex];
  }
  throw new Error(`Category with id ${id} not found`);
};

export const createCategory = async (categoryData) => {
  await mockApiDelay();
  const newCategory = {
    id: String(mockCategories.length + 1),
    ...categoryData
  };
  mockCategories.push(newCategory);
  return newCategory;
};

export const deleteCategory = async (id) => {
  await mockApiDelay();
  const categoryIndex = mockCategories.findIndex(c => c.id === id);
  if (categoryIndex !== -1) {
    mockCategories.splice(categoryIndex, 1);
    return { message: "Category deleted successfully" };
  }
  throw new Error(`Category with id ${id} not found`);
};

export const updateProduct = async (id, productData) => {
  await mockApiDelay();
  const productIndex = mockProducts.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    mockProducts[productIndex] = { ...mockProducts[productIndex], ...productData };
    return mockProducts[productIndex];
  }
  throw new Error(`Product with id ${id} not found`);
};

export const createProduct = async (productData) => {
  await mockApiDelay();
  const newProduct = {
    id: String(mockProducts.length + 1),
    productId: String(mockProducts.length + 1),
    ...productData
  };
  mockProducts.push(newProduct);
  return newProduct;
};

export const deleteProduct = async (id) => {
  await mockApiDelay();
  const productIndex = mockProducts.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    mockProducts.splice(productIndex, 1);
    return { message: "Product deleted successfully" };
  }
  throw new Error(`Product with id ${id} not found`);
};

export const createOrder = async (orderData) => {
  await mockApiDelay();
  const newOrder = {
    id: Date.now(),
    userId: mockUser.id,
    items: orderData.items,
    totalAmount: orderData.totalAmount,
    status: "PENDING",
    shippingInfo: orderData.shippingInfo,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  return newOrder;
};

// Mock 데이터 export
export const mockData = {
  categories: mockCategories,
  products: mockProducts,
  user: mockUser
};

export default {
  getUserByEmail,
  updateUser,
  getProducts,
  getProductById,
  getCategories,
  updateCategory,
  createCategory,
  deleteCategory,
  updateProduct,
  createProduct,
  deleteProduct,
  createOrder,
  mockData
};
