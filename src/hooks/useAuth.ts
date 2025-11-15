/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import {
  useSessionCreateMutation,
  useSignOutMutation,
} from "../redux/api/userApi";
import { useAppDispatch } from "../redux/store";
import { userSlice } from "../redux/slices/userSlice";
import { setCookie } from "../utils/cookies";

interface AuthError {
  message: string;
}

interface AuthResult {
  error?: AuthError;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [sessionCreate] = useSessionCreateMutation();
  const [logoutUser] = useSignOutMutation();

  const signIn = async (username: string): Promise<AuthResult> => {
    try {
      await sessionCreate({ username }).unwrap();
      setCookie("username", username);
      return {};
    } catch (err: any) {
      return {
        error: {
          message:
            err?.data?.message ||
            "Failed to sign in. Please check your credentials.",
        },
      };
    }
  };

  const signOut = async () => {
    localStorage.removeItem("isHost");
    await logoutUser().unwrap();
    dispatch(userSlice.actions.logOut());
    navigate("/login");
  };

  return {
    signIn,
    signOut,
  };
};
