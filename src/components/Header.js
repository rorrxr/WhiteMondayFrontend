import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { cart } = useCart();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 장바구니 아이템 수 계산
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            WhiteMonday
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-purple-600">
            홈
          </Link>
          <Link to="/products" className="text-sm font-medium transition-colors hover:text-purple-600">
            상품
          </Link>
          <Link to="/categories" className="text-sm font-medium transition-colors hover:text-purple-600">
            카테고리
          </Link>
          <Link to="/cart" className="text-sm font-medium transition-colors hover:text-purple-600 relative">
            장바구니
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
          <Link to="/test-mock" className="text-sm font-medium transition-colors hover:text-purple-600 bg-yellow-100 px-2 py-1 rounded">
            🧪 테스트
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-purple-600"
              >
                <span>👤 {user.name}</span>
                <span>▼</span>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border">
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      프로필
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      주문 내역
                    </Link>
                    <Link
                      to="/wishlist"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      위시리스트
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        logoutUser();
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-sm font-medium transition-colors hover:text-purple-600"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                회원가입
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            <span className="sr-only">메뉴</span>
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className="w-4 h-0.5 bg-gray-600 mb-1"></span>
              <span className="w-4 h-0.5 bg-gray-600 mb-1"></span>
              <span className="w-4 h-0.5 bg-gray-600"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              to="/"
              className="block text-sm font-medium transition-colors hover:text-purple-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              홈
            </Link>
            <Link
              to="/products"
              className="block text-sm font-medium transition-colors hover:text-purple-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              상품
            </Link>
            <Link
              to="/categories"
              className="block text-sm font-medium transition-colors hover:text-purple-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              카테고리
            </Link>
            <Link
              to="/cart"
              className="block text-sm font-medium transition-colors hover:text-purple-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              장바구니 {cartItemsCount > 0 && `(${cartItemsCount})`}
            </Link>
            <Link
              to="/test-mock"
              className="block text-sm font-medium transition-colors hover:text-purple-600 bg-yellow-100 px-2 py-1 rounded w-fit"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🧪 테스트
            </Link>
            {!user && (
              <div className="pt-4 border-t space-y-2">
                <Link
                  to="/login"
                  className="block text-sm font-medium transition-colors hover:text-purple-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="block text-sm font-medium bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-fit"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  회원가입
                </Link>
              </div>
            )}
            {user && (
              <div className="pt-4 border-t space-y-2">
                <p className="text-sm font-medium">👤 {user.name}</p>
                <Link
                  to="/profile"
                  className="block text-sm text-gray-700 hover:text-purple-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  프로필
                </Link>
                <Link
                  to="/orders"
                  className="block text-sm text-gray-700 hover:text-purple-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  주문 내역
                </Link>
                <Link
                  to="/wishlist"
                  className="block text-sm text-gray-700 hover:text-purple-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  위시리스트
                </Link>
                <button
                  onClick={() => {
                    logoutUser();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-sm text-gray-700 hover:text-purple-600"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
