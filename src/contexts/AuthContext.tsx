
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'student' | 'company';
  profile?: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'student' | 'company') => Promise<boolean>;
  register: (userData: any, userType: 'student' | 'company') => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('internconnect_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, userType: 'student' | 'company') => {
    // Simulate login - in real app, this would connect to your database
    const mockUser: User = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      userType,
    };
    
    setUser(mockUser);
    localStorage.setItem('internconnect_user', JSON.stringify(mockUser));
    return true;
  };

  const register = async (userData: any, userType: 'student' | 'company') => {
    // Simulate registration - in real app, this would connect to your database
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      userType,
      profile: userData,
    };
    
    setUser(newUser);
    localStorage.setItem('internconnect_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('internconnect_user');
  };

  const updateProfile = (profileData: any) => {
    if (user) {
      const updatedUser = { ...user, profile: { ...user.profile, ...profileData } };
      setUser(updatedUser);
      localStorage.setItem('internconnect_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
