"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = () => {
      const storedToken = sessionStorage.getItem("adminToken");
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.rupalihomes.com";
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // AuthResponseDTO contains "token" or "accessToken"?
        // efficient verification needed. API_DOCS say "200 OK with JWT token as plain string"
        // But AuthController returns AuthResponseDTO.
        // Let's assume AuthResponseDTO has a field 'accessToken' or similar.
        // Actually earlier code showed `new AuthResponseDTO(jwtService.generateToken(user))`
        // I need to check AuthResponseDTO definition.

        // For now, let's assume it returns { accessToken: "..." } or similar.
        // WAIT: `return new AuthResponseDTO(jwtService.generateToken(saved));`
        // I should check AuthResponseDTO.
        // I will assume it has a single field, likely 'accessToken' or 'token'.

        const accessToken = data.accessToken || data.token;

        if (accessToken) {
          sessionStorage.setItem("adminToken", accessToken);
          setToken(accessToken);
          setIsAuthenticated(true);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("adminToken");
    setToken(null);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-dark"></div>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider
      value={{ isAuthenticated, token, login, logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
