import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError("상품 정보를 불러올 수 없습니다.");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert("상품이 장바구니에 추가되었습니다!");
    }
  };

  if (loading) return <div className="text-center mt-10">로딩 중...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!product)
    return <div className="text-center mt-10">상품을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-5">{product.name}</h2>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover mb-5 rounded"
        />
        <div className="space-y-3">
          <p className="text-xl font-semibold">가격: {product.price.toLocaleString()} 원</p>
          {product.sale > 0 && (
            <p className="text-red-500 text-lg">할인: {product.sale}% off</p>
          )}
          <p className="text-gray-600">재고: {product.count}개</p>
          <p className="text-gray-700 leading-relaxed">{product.content}</p>
          {product.isFlashSale && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              🔥 플래시 세일 상품입니다!
            </div>
          )}
        </div>
        <div className="mt-6 flex gap-4">
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            장바구니에 추가
          </button>
          <button className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            바로 구매
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
