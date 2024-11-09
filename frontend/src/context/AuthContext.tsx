import React, { createContext, ReactNode, useContext } from "react";
import useAuth from "../hooks/useAuth";
import { DashboardAdmin } from "../interface";

export interface AuthContextProps {
  loading: boolean;
  user: DashboardAdmin | null;  
  isAuth: boolean;
  handleLogin: (userData: any) => Promise<void>;
  setUser: (admin: DashboardAdmin) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { loading, user, setUser, isAuth, handleLogin, handleLogout } = useAuth();

  return (
    <AuthContext.Provider
      value={{ loading, user, setUser, isAuth, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access to AuthContext values with TypeScript safety
export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider };
