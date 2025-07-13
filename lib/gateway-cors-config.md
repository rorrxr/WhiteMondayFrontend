# Gateway Service CORS 설정 안내

백엔드 Gateway Service에서 CORS 문제를 해결하기 위해 다음 설정을 추가해주세요.

## 1. Gateway Service application.yml 설정

```yaml
spring:
  cloud:
    gateway:
      globalcors:
        corsConfigurations:
          '[/**]':
            allowedOriginPatterns: "*"
            allowedMethods:
              - GET
              - POST
              - PUT
              - DELETE
              - OPTIONS
            allowedHeaders: "*"
            allowCredentials: true
            maxAge: 3600
```

## 2. 또는 Java Configuration 클래스 추가

```java
@Configuration
public class CorsConfiguration {

    @Bean
    public CorsWebFilter corsWebFilter() {
        org.springframework.web.cors.CorsConfiguration corsConfig = 
            new org.springframework.web.cors.CorsConfiguration();
        
        corsConfig.setAllowCredentials(true);
        corsConfig.addAllowedOriginPattern("*");
        corsConfig.addAllowedHeader("*");
        corsConfig.addAllowedMethod("*");
        corsConfig.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = 
            new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);
        
        return new CorsWebFilter(source);
    }
}
```

## 3. 프론트엔드 요청 URL 구조

프론트엔드에서는 다음과 같은 구조로 API를 호출합니다:

- Gateway: `http://localhost:8000`
- User Service: `http://localhost:8000/user-service/api/user/**`
- Product Service: `http://localhost:8000/product-service/api/products/**`
- Wishlist Service: `http://localhost:8000/wishlist-service/api/wishlist/**`
- Order Service: `http://localhost:8000/order-service/api/orders/**`
- Payment Service: `http://localhost:8000/payment-service/api/payment/**`

## 4. AuthorizationFilter 예외 경로 설정

Gateway Service의 AuthorizationFilter에서 다음 경로들은 인증 제외하도록 설정:

```java
private final List<String> EXCLUDE_PATHS = Arrays.asList(
    "/user-service/api/user/signup",
    "/user-service/api/user/login",
    "/user-service/api/v1/send-verification-email",
    "/user-service/api/v1/verify-email",
    "/user-service/api/verification/**",
    "/product-service/api/products/**",
    "/product-service/api/categories/**"
);
```

## 5. 환경별 CORS 설정

### 개발 환경
```yaml
cors:
  allowed-origins: 
    - http://localhost:3000
    - http://localhost:3001
```

### 프로덕션 환경
```yaml
cors:
  allowed-origins: 
    - https://your-frontend-domain.com
``` 