/* eslint-disable @typescript-eslint/no-unused-vars */
import { type FC, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import LoadingScreen from "../components/LoadingScreen";
import { useGetGameStateMutation } from "../redux/api/gameApi";

export const Router: FC = () => {
  const { signOut } = useAuth();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [getGameState] = useGetGameStateMutation();

  useEffect(() => {
    const checkAuth = async () => {
      // Try to fetch game state
      try {
        await getGameState().unwrap();
        // If successful, user is authenticated
        setIsAuthenticated(true);
      } catch (error) {
        // If error, logout and redirect to login
        signOut();
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <PrivateRoutes />;
  }

  return <PublicRoutes />;
};
