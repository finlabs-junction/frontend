/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type RootState } from "../store";
import { userSlice } from "../slices/userSlice";

interface LoginResponse {
  sessionId: string;
  token: string;
}

interface LoginProps {
  username: string;
}

interface JoinLearningProps {
  sessionId: string;
  username: string;
}

interface JoinResponse {
  token: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_BACKEND_URL}/session`,
    credentials: "include", // Send cookies with every request
    prepareHeaders: (headers, { getState }) => {
      // Try to get token from localStorage first, then fall back to Redux state
      const localToken = localStorage.getItem("sessionToken");
      const reduxToken = (getState() as RootState).user.token;
      const token = localToken || reduxToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    sessionCreate: builder.mutation<LoginResponse, LoginProps>({
      query(data) {
        return {
          url: "create",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Save sessionToken to localStorage
          if (data.token) {
            localStorage.setItem("sessionToken", data.token);
            await dispatch(userSlice.actions.setToken(data.token));
          }
        } catch (error: any) {
          // Error handling is now done in components to avoid duplicates
        }
      },
    }),
    signOut: builder.mutation<void, void>({
      query() {
        return {
          url: "logout",
          method: "GET",
        };
      },
    }),
    joinLearning: builder.mutation<JoinResponse, JoinLearningProps>({
      query(data) {
        return {
          url: `${data.sessionId}/join`,
          method: "POST",
          body: {
            username: data.username,
          },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Save sessionToken to localStorage

          if (data.token) {
            localStorage.setItem("sessionToken", data.token);
            await dispatch(userSlice.actions.setToken(data.token));
          }
        } catch (error: any) {
          // Error handling is now done in components to avoid duplicates
        }
      },
    }),
  }),
});

export const {
  useSessionCreateMutation,
  useSignOutMutation,
  useJoinLearningMutation,
} = userApi;
