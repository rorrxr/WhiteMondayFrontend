import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import TestMock from "./pages/TestMock";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/test-mock" element={<TestMock />} />
              {/* 추가 라우트들 */}
              <Route path="/products" element={<Home />} />
              <Route path="/categories" element={<Home />} />
              <Route path="/wishlist" element={<div className="text-center py-8">위시리스트 기능은 준비 중입니다.</div>} />
              <Route path="/orders" element={<div className="text-center py-8">주문 내역 기능은 준비 중입니다.</div>} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App; 