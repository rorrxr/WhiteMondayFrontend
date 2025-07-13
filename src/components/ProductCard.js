import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.price.toLocaleString()} 원</p>
      {product.sale > 0 && (
        <p className="text-red-500 mb-2">할인: {product.sale}% off</p>
      )}
      <div className="flex gap-2">
        <Link
          to={`/product/${product.productId}`}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
        >
          상세보기
        </Link>
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          장바구니
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
