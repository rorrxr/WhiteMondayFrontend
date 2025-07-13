# 백엔드 API 연동 가이드

이 프로젝트의 백엔드 API와 연동하기 위한 서비스 함수들이 준비되어 있습니다.

## 파일 구조

```
lib/
├── api.ts           # 기존 API 함수들 (업데이트됨)
├── auth.ts          # 인증 관련 API (업데이트됨)
├── user-api.ts      # 회원가입/로그인 API
├── email-api.ts     # 이메일 인증 API
├── wishlist-api.ts  # 위시리스트 API
├── product-api.ts   # 상품 관리 API
├── payment-api.ts   # 결제 API
├── order-api.ts     # 주문 관리 API
└── README.md        # 이 파일
```

## API 서비스 별 기능

### 1. 회원 관리 API (`user-api.ts`)
- **signUp**: 회원가입
- **login**: 로그인
- **logout**: 로그아웃
- **getUserInfo**: 사용자 정보 조회
- **checkServiceStatus**: 서비스 상태 확인

### 2. 이메일 인증 API (`email-api.ts`)
- **sendVerificationEmail**: 인증 이메일 발송
- **verifyEmail**: 이메일 인증 (POST)
- **verifyEmailByLink**: 이메일 인증 (GET 링크)
- **generateVerificationToken**: 인증 토큰 생성
- **validateVerificationToken**: 인증 토큰 검증

### 3. 위시리스트 API (`wishlist-api.ts`)
- **getWishLists**: 위시리스트 조회
- **addWishList**: 위시리스트 추가
- **updateWishList**: 위시리스트 수정
- **deleteWishList**: 위시리스트 삭제

### 4. 상품 관리 API (`product-api.ts`)
- **getAllProducts**: 전체 상품 조회
- **getProductById**: 상품 상세 조회
- **addProduct**: 상품 등록
- **getRemainingStock**: 남은 재고 조회
- **restoreStock**: 재고 복구
- **decreaseStock**: 재고 감소
- **triggerScheduledTask**: 스케줄링 작업 실행

### 5. 결제 API (`payment-api.ts`)
- **enterPayment**: 결제 진입
- **processPayment**: 결제 처리

### 6. 주문 관리 API (`order-api.ts`)
- **createOrder**: 주문 생성
- **getOrders**: 주문 내역 조회
- **cancelOrder**: 주문 취소
- **returnOrder**: 주문 반품
- **updateOrderStatus**: 주문 상태 업데이트

## 사용 예시

### 1. 회원가입
```typescript
import { signUp } from "@/lib/user-api"

const handleSignUp = async () => {
  try {
    const result = await signUp({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
      name: "테스트 사용자",
      phone: "01012345678"
    })
    console.log("회원가입 성공:", result)
  } catch (error) {
    console.error("회원가입 실패:", error)
  }
}
```

### 2. 로그인
```typescript
import { login } from "@/lib/user-api"

const handleLogin = async () => {
  try {
    const result = await login({
      username: "testuser",
      password: "password123"
    })
    
    // 토큰 저장 (이미 함수 내에서 처리됨)
    localStorage.setItem("accessToken", result.token)
    localStorage.setItem("refreshToken", result.refreshToken)
    
    console.log("로그인 성공:", result)
  } catch (error) {
    console.error("로그인 실패:", error)
  }
}
```

### 3. 위시리스트 추가
```typescript
import { addWishList } from "@/lib/wishlist-api"

const handleAddToWishList = async (productId: number) => {
  try {
    const userId = parseInt(localStorage.getItem("userId") || "0")
    const result = await addWishList(userId, { productId })
    console.log("위시리스트 추가 성공:", result)
  } catch (error) {
    console.error("위시리스트 추가 실패:", error)
  }
}
```

### 4. 상품 조회
```typescript
import { getAllProducts } from "@/lib/product-api"

const handleGetProducts = async () => {
  try {
    const products = await getAllProducts()
    console.log("상품 목록:", products)
  } catch (error) {
    console.error("상품 조회 실패:", error)
  }
}
```

### 5. 주문 생성
```typescript
import { createOrder } from "@/lib/order-api"

const handleCreateOrder = async () => {
  try {
    const userId = parseInt(localStorage.getItem("userId") || "0")
    const result = await createOrder(userId, {
      items: [
        { productId: 1, quantity: 2 }
      ],
      shippingInfo: {
        name: "홍길동",
        phone: "01012345678",
        address: "서울시 강남구",
        detailAddress: "테헤란로 123",
        postalCode: "12345",
        memo: "문앞에 놓아주세요"
      },
      totalAmount: 20000,
      paymentMethod: "CARD"
    })
    console.log("주문 생성 성공:", result)
  } catch (error) {
    console.error("주문 생성 실패:", error)
  }
}
```

## 환경 설정

### 1. 환경 변수 설정
`.env.local` 파일에 다음 환경 변수를 설정하세요:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 2. 토큰 관리
로그인 성공 시 다음 정보를 localStorage에 저장해야 합니다:
- `accessToken`: API 요청 시 사용할 액세스 토큰
- `refreshToken`: 토큰 갱신 시 사용할 리프레시 토큰
- `userId`: 사용자 ID (일부 API에서 필요)

### 3. 에러 처리
모든 API 함수는 `try-catch` 블록으로 에러를 처리하도록 구현되어 있습니다.

## 주의사항

1. **사용자 ID**: 일부 API에서는 `X-User-Id` 헤더가 필요합니다. 로그인 시 사용자 ID를 별도로 저장해야 합니다.

2. **토큰 갱신**: 현재 토큰 자동 갱신 기능은 구현되어 있지 않습니다. 필요에 따라 추가 구현이 필요합니다.

3. **CORS**: 백엔드 서버에서 CORS 설정이 필요할 수 있습니다.

4. **타입 안전성**: 모든 API 함수는 TypeScript 타입이 정의되어 있어 타입 안전성을 보장합니다.

## 추가 개발 필요 사항

1. **토큰 자동 갱신**: 액세스 토큰 만료 시 자동으로 갱신하는 기능
2. **에러 핸들링**: 공통 에러 처리 로직
3. **로딩 상태 관리**: API 호출 시 로딩 상태 관리
4. **캐싱**: API 응답 캐싱 기능

이 가이드를 참고하여 백엔드 API와 연동하시기 바랍니다. 