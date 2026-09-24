'use client';

import React, { createContext, useContext, useState } from 'react';

export interface StudentUser {
  name: string;
  prn: string;
  email: string;
  isGuest: boolean;
  joinedAt: string;
}

interface AuthContextType {
  user: StudentUser | null;
  isLoading: boolean;
  signIn: (prnOrEmail: string, pass: string) => Promise<boolean>;
  signUp: (name: string, prn: string, email: string, pass: string) => Promise<boolean>;
  enterGuestMode: () => void;
  signOut: () => void;
}

const AUTH_STORAGE_KEY = 'dsl_student_session_v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StudentUser | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Default to demo student if not explicitly set
      const defaultStudent: StudentUser = {
        name: 'Alex Rivera',
        prn: 'PRN-2026-8492',
        email: 'student@datasciencelab.edu',
        isGuest: false,
        joinedAt: new Date().toISOString(),
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(defaultStudent));
      return defaultStudent;
    } catch {
      return null;
    }
  });

  const [isLoading] = useState(false);

  const saveUser = (u: StudentUser | null) => {
    setUser(u);
    try {
      if (u) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  };

  const signIn = async (prnOrEmail: string): Promise<boolean> => {
    const isEmail = prnOrEmail.includes('@');
    const newUser: StudentUser = {
      name: isEmail ? prnOrEmail.split('@')[0] : 'Student (' + prnOrEmail + ')',
      prn: isEmail ? 'PRN-' + Math.floor(100000 + Math.random() * 900000) : prnOrEmail,
      email: isEmail ? prnOrEmail : `${prnOrEmail.toLowerCase()}@datasciencelab.edu`,
      isGuest: false,
      joinedAt: new Date().toISOString(),
    };
    saveUser(newUser);
    return true;
  };

  const signUp = async (name: string, prn: string, email: string): Promise<boolean> => {
    const newUser: StudentUser = {
      name: name || 'Student',
      prn: prn || 'PRN-' + Math.floor(100000 + Math.random() * 900000),
      email: email || 'student@datasciencelab.edu',
      isGuest: false,
      joinedAt: new Date().toISOString(),
    };
    saveUser(newUser);
    return true;
  };

  const enterGuestMode = () => {
    const guestUser: StudentUser = {
      name: 'Guest Scholar',
      prn: 'GUEST-MODE',
      email: 'guest@datasciencelab.local',
      isGuest: true,
      joinedAt: new Date().toISOString(),
    };
    saveUser(guestUser);
  };

  const signOut = () => {
    saveUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, enterGuestMode, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
