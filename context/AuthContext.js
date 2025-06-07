"use client";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    document.cookie = "admin-auth=true; path=/; max-age=86400"; // valid for 1 day
  };

  const logout = () => {
    setIsAuthenticated(false);
    document.cookie = "admin-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  // Check cookie on mount
  useEffect(() => {
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});
    if (cookies["admin-auth"] === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
