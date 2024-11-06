import React, { createContext, useState } from "react";

interface UserProviderProps {
  children: React.ReactNode;
}

export interface DashboardAdmin {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserContextType {
  user: DashboardAdmin | null;
  setUser: (user: DashboardAdmin | null) => void;
}

// Create the user context
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// Create a provider component for the user context
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<DashboardAdmin | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
