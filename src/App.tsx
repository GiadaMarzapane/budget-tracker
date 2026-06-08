import { useConvexAuth } from "@convex-dev/auth/react";
import { LoginPage } from "./pages/LoginPages";
import { AppScreens } from "./pages/AppScreens";

export default function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-ink-muted">
        Caricamento...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <AppScreens />
  );
}