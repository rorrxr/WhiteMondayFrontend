import React from "react";
import { Link } from "react-router-dom";

const FlashSaleSection = ({ products }) => {
  const handleQuickBuy = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    // 장바구니 추가 로직 (나중에 구현)
    alert(`${product.name}을(를) 장바구니에 추가했습니다!`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const discountedPrice = product.sale > 0 ? product.price * (1 - product.sale / 100) : product.price;
        const soldPercentage = Math.max(0, Math.min(100, ((100 - product.count) / 100) * 100));
        const isLowStock = product.count <= 5;

        return (
          <div
            key={product.id}
            className="group overflow-hidden border-2 border-red-200 hover:border-red-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white rounded-lg"
          >
            <Link to={`/product/${product.productId || product.id}`}>
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Sale Badge */}
                {product.sale > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white font-bold px-2 py-1 rounded animate-pulse text-sm">
                    {product.sale}% OFF
                  </span>
                )}

                {/* Low Stock Warning */}
                {isLowStock && (
                  <span className="absolute top-2 right-2 bg-orange-500 text-white font-bold px-2 py-1 rounded text-sm">
                    마감임박
                  </span>
                )}

                {/* Quick Buy Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={(e) => handleQuickBuy(product, e)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded"
                    disabled={product.count === 0}
                  >
                    🛒 즉시구매
                  </button>
                </div>
              </div>
            </Link>

            <div className="p-4 space-y-3">
              <Link to={`/product/${product.productId || product.id}`}>
                <h3 className="font-semibold text-lg line-clamp-2 hover:text-red-600 transition-colors">
                  {product.name}
                </h3>
              </Link>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-red-600">
                  {Math.floor(discountedPrice).toLocaleString()}원
                </span>
                {product.sale > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.price?.toLocaleString()}원
                  </span>
                )}
              </div>

              {/* Stock Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1">
                    👥 판매 진행률
                  </span>
                  <span className="font-semibold text-red-600">{Math.round(soldPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${soldPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>남은 수량: {product.count}개</span>
                  <span className="text-red-600 font-semibold">
                    {product.count <= 3 ? "품절임박!" : "서둘러 주문하세요!"}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={(e) => handleQuickBuy(product, e)}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-2 px-4 rounded transition-all duration-300"
                disabled={product.count === 0}
              >
                {product.count === 0 ? (
                  "품절"
                ) : (
                  <>
                    ⏰ 지금 구매하기
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FlashSaleSection; 