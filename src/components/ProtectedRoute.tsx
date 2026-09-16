import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ADMIN_EMAIL = "srinivasanprashanth16@gmail.com";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={adminOnly ? "/admin-login" : "/login"} replace />;
  }

  // Check admin access
  if (adminOnly && user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};