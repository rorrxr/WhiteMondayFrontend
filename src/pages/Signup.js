import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, sendVerificationEmail, verifyEmail } from "../services/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();

  const handleSendVerificationEmail = async () => {
    try {
      const response = await sendVerificationEmail(email);
      setIsEmailSent(true);
      setError("");
      setSuccess("인증 코드가 전송되었습니다. 콘솔을 확인하세요.");
    } catch (err) {
      setError("인증 이메일 전송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleVerifyEmail = async () => {
    try {
      await verifyEmail(email, verificationCode);
      setIsEmailVerified(true);
      setError("");
      setSuccess("이메일 인증이 완료되었습니다!");
    } catch (err) {
      setError("이메일 인증에 실패했습니다. 코드를 확인하고 다시 시도해주세요.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!isEmailVerified) {
      setError("회원가입 전에 이메일을 인증해주세요.");
      return;
    }
    
    try {
      await signUp({ email, password, name, phone });
      setSuccess("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-5 text-center">회원가입</h2>
      {error && <p className="text-red-500 mb-5 text-center">{error}</p>}
      {success && <p className="text-green-500 mb-5 text-center">{success}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            이메일
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isEmailVerified}
            placeholder="user@example.com"
          />
          {!isEmailVerified && (
            <button
              type="button"
              onClick={handleSendVerificationEmail}
              className="mt-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition-colors"
              disabled={isEmailSent}
            >
              {isEmailSent ? "이메일 전송됨" : "인증 이메일 보내기"}
            </button>
          )}
        </div>
        
        {isEmailSent && !isEmailVerified && (
          <div>
            <label htmlFor="verificationCode" className="block mb-1 font-medium">
              인증 코드
            </label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="6자리 인증코드"
            />
            <button
              type="button"
              onClick={handleVerifyEmail}
              className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-colors"
            >
              인증하기
            </button>
          </div>
        )}
        
        {isEmailVerified && (
          <>
            <div>
              <label htmlFor="password" className="block mb-1 font-medium">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="비밀번호"
              />
            </div>
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                이름
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="홍길동"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1 font-medium">
                전화번호
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="01012345678"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              회원가입
            </button>
          </>
        )}
      </form>
      
      <div className="mt-6 p-4 bg-gray-50 rounded">
        <p className="text-sm text-gray-600 font-medium">참고:</p>
        <p className="text-sm text-gray-600">• 인증 코드는 브라우저 콘솔에서 확인할 수 있습니다</p>
        <p className="text-sm text-gray-600">• 이미 존재하는 이메일로는 가입할 수 없습니다</p>
      </div>
    </div>
  );
};

export default Signup;
