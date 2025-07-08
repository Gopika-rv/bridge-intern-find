
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getValidationErrors } from '../utils/validation';

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
    // Simulate checking if user exists in database
    const registeredUsers = JSON.parse(localStorage.getItem('internconnect_registered_users') || '[]');
    const existingUser = registeredUsers.find((u: any) => 
      u.email === email && u.userType === userType && u.password === password
    );

    if (!existingUser) {
      throw new Error('Invalid credentials');
    }
    
    const loginUser: User = {
      id: existingUser.id,
      name: existingUser.name || existingUser.companyName,
      email: existingUser.email,
      userType,
      profile: existingUser,
    };
    
    setUser(loginUser);
    localStorage.setItem('internconnect_user', JSON.stringify(loginUser));
    return true;
  };

  const register = async (userData: any, userType: 'student' | 'company') => {
    // Validate form data
    const errors = getValidationErrors(userData, userType === 'company');
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    // Check if user already exists
    const registeredUsers = JSON.parse(localStorage.getItem('internconnect_registered_users') || '[]');
    const existingUser = registeredUsers.find((u: any) => u.email === userData.email);
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user record
    const newUserRecord = {
      id: Date.now().toString(),
      ...userData,
      userType,
      createdAt: new Date().toISOString(),
    };

    // Save to simulated database
    registeredUsers.push(newUserRecord);
    localStorage.setItem('internconnect_registered_users', JSON.stringify(registeredUsers));
    
    const newUser: User = {
      id: newUserRecord.id,
      name: userData.name || userData.companyName,
      email: userData.email,
      userType,
      profile: newUserRecord,
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
      
      // Update in registered users database
      const registeredUsers = JSON.parse(localStorage.getItem('internconnect_registered_users') || '[]');
      const userIndex = registeredUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...profileData };
        localStorage.setItem('internconnect_registered_users', JSON.stringify(registeredUsers));
      }
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
