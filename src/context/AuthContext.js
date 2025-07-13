import React, { createContext, useState, useEffect } from "react";
import { login, logout, refreshToken } from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("refreshToken");
      if (token) {
        try {
          const response = await refreshToken();
          setUser(response.user); // response.user로 수정
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const loginUser = async (email, password) => {
    const response = await login({ email, password });
    setUser(response.user); // response.user로 수정
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
