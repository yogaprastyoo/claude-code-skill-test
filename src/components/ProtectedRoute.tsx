import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { Loader2 } from 'lucide-react';
import { useCurrentUser } from '@/features/auth/hooks';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !data) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
