import { useAuth } from "../hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  const { user, isLoading } = useAuth();

  return (
    <Route path={path}>
      {(params) => {
        // Show loading state while checking authentication
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <Loader2 className="h-8 w-8 animate-spin text-border" />
            </div>
          );
        }

        // Redirect to login if not authenticated
        if (!user) {
          // Store the attempted path to redirect back after login
          sessionStorage.setItem('redirectPath', path);
          return <Redirect to="/auth" />;
        }

        // If user is authenticated but not admin, redirect to home
        if (!user.isAdmin) {
          return <Redirect to="/" />;
        }

        // Render the protected component
        return <Component {...params} />;
      }}
    </Route>
  );
}