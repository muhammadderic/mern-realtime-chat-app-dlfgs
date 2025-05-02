import { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
}
interface SocketContextProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within SocketContextProvider");
  }
  return context;
};

export const SocketContextProvider = ({ children }: SocketContextProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io(SOCKET_URL, {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // return () => socket.close(); // TypeScript thinks you are returning the socket, not void.
      return () => {
        // Now the return type is void, which useEffect expects.
        socket.close();
      }
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return <SocketContext.Provider value={{ socket, onlineUsers }}>
    {children}
  </SocketContext.Provider>;
};
