import React, { createContext, ReactNode, useContext } from "react";
import useAuth from "../hooks/useAuth";

export interface AuthContextProps {
  loading: boolean;
  user: any;  // Replace `any` with a specific user type if available
  isAuth: boolean;
  handleLogin: (userData: any) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { loading, user, isAuth, handleLogin, handleLogout } = useAuth();

  return (
    <AuthContext.Provider
      value={{ loading, user, isAuth, handleLogin, handleLogout }}
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
