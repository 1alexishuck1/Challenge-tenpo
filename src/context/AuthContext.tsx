import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { fakeLogin } from "../mocks/api";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers!["Authorization"] = `Bearer ${token}`; 
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fakeLogin(email, password);

      if (response.status === 200) {
        const newToken = response.data.token;
        setToken(newToken);
        localStorage.setItem("token", newToken);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    return true;
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
