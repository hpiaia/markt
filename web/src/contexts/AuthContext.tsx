import { createContext, ReactNode, useState } from 'react';

import {
  clearStorage, getFromStorage, saveToStorage, User,
} from '../lib/auth';

interface AuthContextData {
  token: string | null;
  user: User | null;

  signIn: (token: string, user: User) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const stored = getFromStorage();

  const [token, setToken] = useState<string | null>(stored.token);
  const [user, setUser] = useState<User | null>(stored.user);

  const signIn = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);

    saveToStorage(newToken, newUser);
  };

  const signOut = () => {
    setToken(null);
    setUser(null);

    clearStorage();
  };

  return (
    <AuthContext.Provider value={{
      token, user, signIn, signOut,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
