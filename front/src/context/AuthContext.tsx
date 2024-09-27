import React, { createContext, useState, useContext, ReactNode, SetStateAction, Dispatch } from 'react';
import { Movie } from '../types/models';

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null, isAdmin: boolean) => void;
  logout: () => void;
  curMovie: Movie | null;
  setCurMovie: (movie: Movie | null) => void; 
  isAdmin: boolean,
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode; 
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(localStorage.getItem('token'));
  const [curMovie, setCurMovie] = useState<Movie | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(localStorage.getItem('isAdmin') === '1' ? true : false);


  const setToken = (token: string | null, isAdmin: boolean) => {
    if (token) {
      localStorage.setItem('token', token);
      if(isAdmin)
      localStorage.setItem('isAdmin', '1');
      else localStorage.setItem('isAdmin', '0');
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
    }
    setTokenState(token);
    setIsAdmin(isAdmin);
  };

  const logout = () => {
    setToken(null, false);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout, curMovie, setCurMovie, isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
