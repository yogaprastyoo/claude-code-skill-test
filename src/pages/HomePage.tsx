import { Loader2 } from 'lucide-react';
import { useCurrentUser, useLogout } from '@/features/auth/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const { data } = useCurrentUser();
  const logout = useLogout();
  const user = data?.data;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Dashboard</CardTitle>
            <CardDescription>You are signed in</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground mt-2">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
            >
              {logout.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              {logout.isPending ? 'Signing out…' : 'Sign out'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
