import React, { ReactNode } from 'react';
import { useAuth } from './AuthProvider';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireRoles?: string[];
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  fallback = null, 
  requireRoles = [] 
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <>{fallback}</>;
  }

  if (requireRoles.length > 0) {
    const userRoles = user.roles?.map(role => role.role_type) || [];
    const hasRequiredRole = requireRoles.some(role => userRoles.includes(role));
    
    if (!hasRequiredRole) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
};