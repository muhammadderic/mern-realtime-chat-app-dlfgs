import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
  authUser: any;
  setAuthUser: React.Dispatch<React.SetStateAction<any>>;
}
interface AuthContextProviderProps {
  children: ReactNode;
}

const storedUser = localStorage.getItem("chat-user");

export const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthContextProvider");
  }
  return context;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUser] = useState<any>(
    storedUser ? JSON.parse(storedUser) : null
  );

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>
    {children}
  </AuthContext.Provider>;
};
