# WhiteMonday Frontend - 선착순 구매 e-commerce

## 📖 목차

1. [🔎 프로젝트 소개](#-프로젝트-소개)  
2. [🎯 프로젝트 기간 및 인원](#-프로젝트-기간-및-인원)  
3. [📁 프로젝트 실행 방법](#-프로젝트-실행-방법)  
4. [💻 기술 스택](#-기술-스택)  
5. [💡 주요 기능](#-주요-기능)  
6. [⚙️ 기술적 의사결정](#-기술적-의사결정)  
7. [📈 성능 최적화](#-성능-최적화)  
8. [🚨 트러블슈팅](#-트러블슈팅)  
9. [🗂 폴더 구조](#-폴더-구조)  
10. [🛠️ 향후 개선 방안](#-향후-개선-방안)

---

## 🔎 프로젝트 소개

WhiteMonday는 빠르게 변화하는 이커머스 환경에서 실시간 재고 관리와 선착순 구매 기능을 제공하는 MSA 기반 커머스 플랫폼입니다.  
해당 레포지토리는 **프론트엔드 애플리케이션**으로, React 기반 SPA 형태로 구성되었으며 백엔드 API와 연동하여 상품 조회, 장바구니, 구독, 결제 등을 제공합니다.

👉 백엔드 레포지토리: [WhiteMonday Backend](https://github.com/rorrxr/WhiteMonday)

---

##🎯 프로젝트 목표
- 사용자 경험을 최우선으로 하는 고성능 이커머스 플랫폼 구축 

## 🎯 프로젝트 기간 및 인원

- 1차 Front MVP 개발: 2024.12.18 ~ 2025.01.31  
- 개발 인원: 1인 (개인 프로젝트)

## 📁 프로젝트 실행 방법

```bash
git clone https://github.com/rorrxr/WhiteMondayFrontend.git
cd WhiteMondayFrontend
npm install
npm start
```

**포트 정보**: http://localhost:3002

## 💻 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | React 18, Next.js 15.2.4 |
| Language | TypeScript, JavaScript |
| State Management | React Context API |
| Style | Tailwind CSS, CSS Modules |
| UI Components | Radix UI, Lucide React |
| 폼 관리 | React Hook Form |
| API 연동 | Axios, Mock API |
| 라우팅 | React Router DOM |
| 배포 | 개발 환경 (로컬) |

## 💡 주요 기능

### ☑️ 회원기능
- 로그인/회원가입
- 이메일 인증 시뮬레이션
- 사용자 세션 관리

### ☑️ 상품
- 상품 목록 및 상세 페이지 
- 카테고리별 상품 조회
- 장바구니 담기, 수량 조절 기능
- 검색 및 필터링

### ☑️ 플래시 세일
- 실시간 카운트다운 타이머
- 재고 진행률 표시바
- 할인율 표시 및 특별 UI

### ☑️ 장바구니 및 결제
- 실시간 장바구니 업데이트
- 상품 수량 변경 및 삭제
- 총 금액 계산
- 결제 페이지 (Mock)

### ☑️ 관리자 기능
- 상품 관리 (CRUD)
- 카테고리 관리
- 테스트 페이지 (/test-mock)

## ⚙️ 기술적 의사결정

- **React Context API**: 전역 상태 관리 (AuthContext, CartContext)로 prop drilling 방지
- **Mock API 시스템**: 백엔드 의존성 제거로 독립적인 프론트엔드 개발 환경 구축
- **Tailwind CSS + Radix UI**: 디자인 시스템 일관성과 접근성 확보
- **React Router DOM**: SPA 라우팅으로 빠른 페이지 전환

## 📈 성능 최적화

### 🔄 Mock API 응답 최적화

```javascript
// 실제 API 호출 시뮬레이션 (500ms 지연)
const simulateNetworkDelay = () => {
  return new Promise(resolve => setTimeout(resolve, 500));
};

// 검색 및 필터링 최적화
export const searchProducts = async (query, category = '', page = 1, limit = 8) => {
  await simulateNetworkDelay();
  
  let filtered = mockProducts.filter(product => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === '' || product.category === category;
    return matchesQuery && matchesCategory;
  });
  
  return {
    products: filtered.slice((page - 1) * limit, page * limit),
    totalPages: Math.ceil(filtered.length / limit),
    currentPage: page
  };
};
```

### 🎯 실시간 장바구니 최적화

```javascript
// Context를 통한 효율적인 상태 관리
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  const addToCart = useCallback((product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);
  
  return (
    <CartContext.Provider value={{ cart, addToCart, /* ... */ }}>
      {children}
    </CartContext.Provider>
  );
};
```

### ⏱️ 플래시 세일 카운트다운 최적화

```javascript
// 메모리 누수 방지를 위한 cleanup
useEffect(() => {
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetTime - now;
    
    if (distance > 0) {
      setTimeLeft({
        hours: Math.floor(distance / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    } else {
      setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
    }
  }, 1000);

  return () => clearInterval(timer); // cleanup
}, [targetTime]);
```

## 🚨 트러블슈팅

### 1️⃣ Framework 마이그레이션 이슈

**문제**: Next.js에서 Vite로 전환 중 `response.filter is not a function` 오류 발생

```javascript
// ❌ 문제 코드
const response = await getProducts();
const flashSaleProducts = response.filter(product => product.isFlashSale);

// ✅ 해결 코드  
const getProducts = async () => {
  // 배열을 직접 반환하도록 수정
  return mockProducts; // pagination 객체 대신 배열 반환
};
```

**해결**: API 응답 구조를 명확히 정의하고 배열 타입 반환 보장

### 2️⃣ 포트 충돌 문제

**문제**: `Error: listen EADDRINUSE: address already in use :::3002`

```bash
# 문제 진단
netstat -ano | findstr :3002
# PID 42672 프로세스 발견

# 해결
taskkill /PID 42672 /F
npm start
```

**해결**: 기존 프로세스 종료 후 서버 재시작

### 3️⃣ Context API 구조화 오류

**문제**: `Cannot destructure property 'cart' of 'useCart(...)' as it is undefined`

```javascript
// ❌ 문제 코드
const { cart } = useCart(); // Context가 제대로 래핑되지 않음

// ✅ 해결 코드
// App.js에서 Provider 적용
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* 컴포넌트들 */}
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
```

**해결**: Context Provider를 앱 최상단에서 적절히 래핑

### 4️⃣ 라우팅 네비게이션 문제

**문제**: `navigate.push is not a function` 오류

```javascript
// ❌ 문제 코드
navigate.push('/login');

// ✅ 해결 코드
navigate('/login'); // React Router DOM v6 문법
```

**해결**: React Router DOM v6 네비게이션 문법으로 수정

### 5️⃣ TypeScript/JavaScript 혼용 문제

**문제**: `.tsx` 파일에서 TypeScript 파서 오류

```javascript
// 해결: 확장자를 .js로 변경하고 JavaScript로 통일
// Home.tsx → Home.js
// 점진적 TypeScript 도입 계획
```

**해결**: 일관된 언어 사용과 점진적 마이그레이션 계획 수립

## 🗂 폴더 구조

```
src/
├── components/              # 재사용 가능한 컴포넌트
│   ├── Header.js           # 헤더 (로고, 네비게이션, 장바구니)
│   ├── ProductCard.js      # 상품 카드 컴포넌트
│   ├── ProductList.js      # 상품 목록 컴포넌트
│   ├── CategoryList.js     # 카테고리 목록
│   ├── ProductManagement.js # 상품 관리 (관리자)
│   ├── CategoryManagement.js # 카테고리 관리 (관리자)
│   └── Modal.js            # 모달 컴포넌트
├── context/                # Context API 상태 관리
│   ├── AuthContext.js      # 인증 상태 관리
│   └── CartContext.js      # 장바구니 상태 관리
├── pages/                  # 페이지 컴포넌트
│   ├── Home.js            # 메인 페이지 (플래시 세일, 상품 목록)
│   ├── Login.js           # 로그인 페이지
│   ├── Signup.js          # 회원가입 페이지
│   ├── Cart.js            # 장바구니 페이지
│   ├── Checkout.js        # 결제 페이지
│   ├── ProductDetail.js   # 상품 상세 페이지
│   ├── UserProfile.js     # 사용자 프로필
│   └── Admin.js           # 관리자 페이지
├── services/               # API 및 비즈니스 로직
│   ├── api.js             # Mock API (상품, 카테고리, 검색)
│   └── auth.js            # 인증 서비스 (Mock)
├── App.js                 # 앱 진입점 및 라우팅
├── index.js               # React DOM 렌더링
└── App.css               # 전역 스타일
```

### 🎯 컴포넌트 설계 철학

- **단일 책임 원칙**: 각 컴포넌트는 하나의 명확한 역할
- **재사용성**: 공통 UI 요소의 컴포넌트화
- **상태 분리**: 전역 상태는 Context, 지역 상태는 useState
- **Mock 우선**: 백엔드 독립적인 개발 환경

## 🛠️ 향후 개선 방안

### ✅ 완료된 개선 사항
- **Mock 데이터 시스템 구축**: 백엔드 의존성 제거로 독립적 개발 환경 확보
- **실시간 장바구니 기능**: Context API 기반 전역 상태 관리 구현  
- **플래시 세일 시스템**: 카운트다운 타이머와 시각적 피드백 구현
- **한국어 UI/UX**: 실제 서비스 사용성을 고려한 로컬라이제이션
- **반응형 디자인**: 모바일/데스크톱 호환 인터페이스

### 🔄 진행 중인 개선 사항
- **TypeScript 점진적 도입**: JavaScript에서 TypeScript로 안전한 마이그레이션
- **컴포넌트 최적화**: React.memo와 useCallback을 통한 렌더링 최적화
- **접근성 개선**: ARIA 라벨과 키보드 네비게이션 지원

### 📋 향후 계획

#### 🎯 단기 목표 (1-2개월)
- **실제 백엔드 연동**: Mock API에서 REST API로 전환
- **상태 관리 업그레이드**: Context API에서 Zustand/Redux Toolkit으로 마이그레이션
- **테스트 코드 작성**: Jest + Testing Library 기반 단위/통합 테스트
- **성능 모니터링**: React DevTools Profiler를 통한 성능 측정 및 최적화

#### 🚀 중기 목표 (3-6개월)  
- **PWA 전환**: 서비스 워커 기반 오프라인 지원 및 푸시 알림
- **실시간 기능**: WebSocket 연동으로 실시간 재고 업데이트
- **마이크로 프론트엔드**: 모듈 페더레이션 기반 확장 가능한 아키텍처
- **GraphQL 도입**: RESTful API 대신 효율적인 데이터 페칭

#### 🎪 장기 목표 (6개월+)
- **React Server Components**: Next.js 13+ App Router를 통한 SSR 최적화
- **Web Vitals 최적화**: Lighthouse 성능 측정 기반 Core Web Vitals 개선
- **AI 기능 통합**: 개인화 추천 시스템 및 챗봇 고객 서비스
- **글로벌 서비스**: 다국어 지원 및 다중 통화 결제 시스템

### 💡 기술 부채 해결 계획
- **코드 일관성**: ESLint + Prettier 설정으로 코딩 스타일 통일
- **문서화**: Storybook 도입으로 컴포넌트 문서화
- **CI/CD 파이프라인**: GitHub Actions를 통한 자동 배포 및 테스트
- **모니터링**: Sentry 연동으로 에러 추적 및 성능 모니터링

---

## 💬 백엔드와의 연동

현재는 Mock API로 동작하며, 향후 다음 API들과 연동 예정:
- 상품 관리 API (CRUD)
- 사용자 인증 API (JWT)
- 주문 및 결제 API
- 실시간 재고 관리 API
- Kafka 기반 이벤트 처리

## 🏃‍♂️ 개발자를 위한 가이드

### 개발 서버 실행
```bash
npm start  # http://localhost:3002
```

### 테스트 페이지 접근
```bash
http://localhost:3002/test-mock  # Mock 데이터 확인용
```

### Mock 계정 정보
```
일반 사용자: user@example.com / password123
관리자: admin@example.com / admin123
```

---
