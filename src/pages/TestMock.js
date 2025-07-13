import React, { useState, useEffect } from 'react';
import { 
  getProducts, 
  getCategories, 
  getProductById,
  mockData
} from '../services/api';
import { mockAuthData } from '../services/auth';

const TestMock = () => {
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState({});

  const runTest = async (testName, testFunc) => {
    setLoading(true);
    try {
      const result = await testFunc();
      setTestResults(prev => ({ ...prev, [testName]: { success: true, data: result } }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, [testName]: { success: false, error: error.message } }));
    }
    setLoading(false);
  };

  const runAllTests = async () => {
    await runTest("products", () => getProducts());
    await runTest("categories", () => getCategories());
    await runTest("productById", () => getProductById("1"));
    await runTest("searchProducts", () => getProducts(0, 5, "맥북"));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Mock 데이터 테스트</h1>
        <p className="text-gray-600">백엔드 API 연동 전에 Mock 데이터가 올바르게 작동하는지 확인합니다.</p>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={runAllTests} 
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "테스트 중..." : "모든 테스트 실행"}
        </button>
        <button 
          onClick={() => setTestResults({})}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
        >
          결과 초기화
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 상품 데이터 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            📦 상품 데이터 ({mockData.products.length}개)
          </h2>
          <div className="space-y-3">
            {mockData.products.slice(0, 3).map(product => (
              <div key={product.id} className="p-3 border rounded-lg">
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-600">
                  {product.price.toLocaleString()}원
                  {product.sale > 0 && (
                    <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      {product.sale}% 할인
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  재고: {product.count}개 | 카테고리: {product.category?.name}
                  {product.isFlashSale && (
                    <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      플래시 세일
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div className="text-sm text-gray-500">
              ... 총 {mockData.products.length}개 상품
            </div>
          </div>
        </div>

        {/* 카테고리 데이터 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            🏷️ 카테고리 데이터 ({mockData.categories.length}개)
          </h2>
          <div className="space-y-2">
            {mockData.categories.map(category => (
              <div key={category.id} className="flex items-center gap-2 p-2 border rounded">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 사용자 데이터 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            👤 사용자 데이터 ({mockAuthData.users.length}명)
          </h2>
          <div className="space-y-3">
            {mockAuthData.users.map(user => (
              <div key={user.id} className="p-3 border rounded-lg">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
                <div className="text-xs text-gray-500">
                  {user.phone} | 
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    user.role === "ADMIN" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                  }`}>
                    {user.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 플래시 세일 상품 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            🔥 플래시 세일 상품
          </h2>
          <div className="space-y-3">
            {mockData.products.filter(p => p.isFlashSale).slice(0, 3).map(product => (
              <div key={product.id} className="p-3 border rounded-lg bg-red-50">
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-600">
                  <span className="line-through">
                    {product.price.toLocaleString()}원
                  </span>
                  <span className="ml-2 text-red-600 font-bold">
                    {Math.floor(product.price * (1 - product.sale / 100)).toLocaleString()}원
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  재고: {product.count}개 | {product.sale}% 할인
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* API 테스트 버튼들 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">API 테스트</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => runTest("products", () => getProducts())}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            상품 목록 API 테스트
          </button>
          <button 
            onClick={() => runTest("categories", () => getCategories())}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            카테고리 API 테스트
          </button>
          <button 
            onClick={() => runTest("productById", () => getProductById("1"))}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            상품 상세 API 테스트
          </button>
          <button 
            onClick={() => runTest("searchProducts", () => getProducts(0, 5, "맥북"))}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            상품 검색 API 테스트
          </button>
          <button 
            onClick={() => runTest("paginatedProducts", () => getProducts(1, 3))}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            페이지네이션 API 테스트
          </button>
          <button 
            onClick={() => runTest("categoryFilter", () => getProducts(0, 12, "", "1"))}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            카테고리 필터 API 테스트
          </button>
        </div>
      </div>

      {/* 테스트 결과 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">테스트 결과</h2>
        {Object.keys(testResults).length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500">아직 테스트를 실행하지 않았습니다.</div>
            <button 
              onClick={runAllTests} 
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              모든 테스트 실행
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(testResults).map(([testName, result]) => (
              <div key={testName} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{testName}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    result.success 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.success ? '성공' : '실패'}
                  </span>
                </div>
                {result.success ? (
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="bg-red-50 p-3 rounded text-sm text-red-700">
                    {result.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 개발자 정보 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">개발 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Mock 데이터 특징:</strong>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>• 15개의 상품 데이터 (플래시 세일 포함)</li>
              <li>• 8개의 카테고리</li>
              <li>• 2명의 사용자 (일반 사용자 + 관리자)</li>
              <li>• 실제 API 호출 지연 시뮬레이션 (500ms)</li>
            </ul>
          </div>
          <div>
            <strong>테스트 가능한 기능:</strong>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>• 상품 목록 조회 및 검색</li>
              <li>• 카테고리별 필터링</li>
              <li>• 페이지네이션</li>
              <li>• 상품 상세 조회</li>
              <li>• 사용자 인증 (email: user@example.com, pw: password123)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestMock; 