/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/api/userApi";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { userSlice } from "../redux/slices/userSlice";

interface AuthError {
  message: string;
}

interface AuthResult {
  error?: AuthError;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginUser] = useLoginUserMutation();

  const token = useAppSelector((state) => state.user.token);

  const signIn = async (username: string): Promise<AuthResult> => {
    try {
      await loginUser({ username }).unwrap();
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

  const signOut = () => {
    dispatch(userSlice.actions.logOut());
    navigate("/login");
  };

  const isLoggedIn = token !== undefined;

  const user = useAppSelector((state) => state.user.user);

  return {
    signIn,
    isLoggedIn,
    signOut,
    user,
  };
};
