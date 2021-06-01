import {
  createContext, ReactNode, useEffect,
} from 'react';
import io, { Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface SocketContextData {
  socket: Socket
}

const socket = io(SOCKET_URL, { autoConnect: false });

export const SocketContext = createContext<SocketContextData>({ socket });

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
