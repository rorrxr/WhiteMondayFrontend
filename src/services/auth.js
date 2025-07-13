// Mock 인증 데이터
const mockUsers = [
  {
    id: "1",
    email: "user@example.com",
    username: "testuser",
    name: "테스트 사용자",
    phone: "01012345678",
    role: "USER",
    password: "password123" // 실제 운영에서는 해시된 비밀번호를 사용해야 함
  },
  {
    id: "2",
    email: "admin@example.com",
    username: "admin",
    name: "관리자",
    phone: "01098765432",
    role: "ADMIN",
    password: "admin123"
  }
];

// Mock API 지연 시뮬레이션
const mockApiDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock 토큰 생성
const generateMockToken = (user) => {
  return `mock-token-${user.id}-${Date.now()}`;
};

export const login = async (credentials) => {
  await mockApiDelay();
  
  const { email, password } = credentials;
  const user = mockUsers.find(u => u.email === email);
  
  if (!user) {
    throw new Error("존재하지 않는 이메일입니다.");
  }
  
  if (user.password !== password) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }
  
  const accessToken = generateMockToken(user);
  const refreshToken = generateMockToken(user);
  
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("currentUser", JSON.stringify(user));
  
  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      phone: user.phone,
      role: user.role
    },
    accessToken,
    refreshToken
  };
};

export const logout = async () => {
  await mockApiDelay();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("currentUser");
};

export const refreshToken = async () => {
  await mockApiDelay();
  const refreshToken = localStorage.getItem("refreshToken");
  
  if (!refreshToken) {
    throw new Error("Refresh token not found");
  }
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    throw new Error("User not found");
  }
  
  const newAccessToken = generateMockToken(currentUser);
  localStorage.setItem("accessToken", newAccessToken);
  
  return {
    user: currentUser,
    accessToken: newAccessToken
  };
};

export const signUp = async (userData) => {
  await mockApiDelay();
  
  const { email, password, name, phone } = userData;
  
  // 이메일 중복 확인
  const existingUser = mockUsers.find(u => u.email === email);
  if (existingUser) {
    throw new Error("이미 사용 중인 이메일입니다.");
  }
  
  // 새 사용자 생성
  const newUser = {
    id: String(mockUsers.length + 1),
    email,
    username: email.split('@')[0],
    name,
    phone,
    role: "USER",
    password
  };
  
  mockUsers.push(newUser);
  
  return {
    user: {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      name: newUser.name,
      phone: newUser.phone,
      role: newUser.role
    },
    message: "회원가입이 완료되었습니다."
  };
};

// 이메일 인증 코드 요청
export const sendVerificationEmail = async (email) => {
  await mockApiDelay();
  
  // Mock 인증 코드 생성 (실제로는 서버에서 생성하고 이메일로 전송)
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  // 로컬 스토리지에 임시 저장 (실제로는 서버에서 관리)
  localStorage.setItem(`verification-${email}`, verificationCode);
  
  console.log(`Mock 인증 코드: ${verificationCode}`); // 개발용 로그
  
  return {
    message: "인증 코드가 이메일로 전송되었습니다.",
    code: verificationCode // 실제로는 이 값을 반환하지 않음
  };
};

// 이메일 인증 코드 확인
export const verifyEmail = async (email, authNum) => {
  await mockApiDelay();
  
  const storedCode = localStorage.getItem(`verification-${email}`);
  
  if (!storedCode) {
    throw new Error("인증 코드가 만료되었습니다. 다시 요청해주세요.");
  }
  
  if (storedCode !== authNum) {
    throw new Error("인증 코드가 일치하지 않습니다.");
  }
  
  // 인증 성공 시 코드 삭제
  localStorage.removeItem(`verification-${email}`);
  
  return {
    isVerified: true,
    message: "이메일 인증이 완료되었습니다."
  };
};

// 이메일 중복 확인
export const checkEmailAvailability = async (email) => {
  await mockApiDelay();
  
  const existingUser = mockUsers.find(u => u.email === email);
  return !existingUser;
};

// 회원가입 프로세스 (이메일 인증 포함)
export const signUpWithEmailVerification = async (userData) => {
  // 1. 이메일 중복 확인
  const isEmailAvailable = await checkEmailAvailability(userData.email);
  if (!isEmailAvailable) {
    throw new Error("이미 사용 중인 이메일입니다.");
  }

  // 2. 이메일 인증 코드 요청
  await sendVerificationEmail(userData.email);

  // 3. 이메일 인증 코드 확인 (이 단계는 사용자의 입력을 기다려야 하므로 실제 구현에서는 별도의 단계로 처리해야 합니다)
  // await verifyEmail(userData.email, userData.verificationCode);

  // 4. 회원가입 완료
  const response = await signUp(userData);
  return response;
};

// 현재 사용자 정보 가져오기
export const getCurrentUser = async () => {
  await mockApiDelay();
  
  const accessToken = localStorage.getItem("accessToken");
  const currentUser = localStorage.getItem("currentUser");
  
  if (!accessToken || !currentUser) {
    return null;
  }
  
  return JSON.parse(currentUser);
};

// 토큰 유효성 검사
export const validateToken = async (token) => {
  await mockApiDelay();
  
  // Mock 토큰 유효성 검사 (실제로는 서버에서 검증)
  const accessToken = localStorage.getItem("accessToken");
  return accessToken === token;
};

// Mock 데이터 export
export const mockAuthData = {
  users: mockUsers
};

export default {
  login,
  logout,
  refreshToken,
  signUp,
  sendVerificationEmail,
  verifyEmail,
  checkEmailAvailability,
  signUpWithEmailVerification,
  getCurrentUser,
  validateToken,
  mockAuthData
};
