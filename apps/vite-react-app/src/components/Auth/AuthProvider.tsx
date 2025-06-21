import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { 
  fetchCurrentUser, 
  verifyToken, 
  refreshToken, 
  clearAuth,
  setTokens 
} from '@/redux/features/authSlice';
import type { UserData } from '@/redux/features/authSlice';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  loading: boolean;
  error: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { 
    isAuthenticated, 
    user, 
    loading, 
    error, 
    accessToken, 
    tokenExpiration 
  } = useAppSelector((state) => state.auth);

  const login = (accessToken: string, refreshToken: string) => {
    dispatch(setTokens({ accessToken, refreshToken }));
    dispatch(fetchCurrentUser());
  };

  const logout = () => {
    dispatch(clearAuth());
  };

  const checkAuth = async () => {
    if (!accessToken) {
      return;
    }

    try {
      if (tokenExpiration && tokenExpiration < Date.now()) {
        await dispatch(refreshToken()).unwrap();
      }
      
      await dispatch(verifyToken()).unwrap();
      
      if (!user) {
        await dispatch(fetchCurrentUser()).unwrap();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      dispatch(clearAuth());
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      checkAuth();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (accessToken && tokenExpiration) {
      const timeUntilExpiry = tokenExpiration - Date.now();
      const refreshTime = Math.max(timeUntilExpiry - 5 * 60 * 1000, 0);

      if (refreshTime > 0) {
        const timer = setTimeout(() => {
          dispatch(refreshToken());
        }, refreshTime);

        return () => clearTimeout(timer);
      }
    }
  }, [accessToken, tokenExpiration, dispatch]);

  const value: AuthContextType = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};