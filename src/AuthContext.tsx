import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// กำหนด interface สำหรับค่าใน context
interface AuthContextType {
  user: any; // หรือกำหนด type ของ user ให้ชัดเจนกว่านี้ เช่น { id: string, username: string }
  setUser: React.Dispatch<React.SetStateAction<any>>; // type ของ setUser
  loading: boolean;
}

// สร้าง context พร้อม type
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null); // หรือกำหนด type ชัดเจน
  const [loading, setLoading] = useState<boolean>(true);
  const url = `${import.meta.env.VITE_REACT_API_URL}auth/verify`
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(url, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};