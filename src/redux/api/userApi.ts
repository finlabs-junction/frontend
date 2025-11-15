/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type RootState } from "../store";

interface LoginResponse {
  sessionId: string;
}

interface LoginProps {
  username: string;
}

interface JoinLearningProps {
  sessionId: string;
  username: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_BACKEND_URL}/session`,
    credentials: "include", // Send cookies with every request
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      headers.set("Authorization", `Bearer ${token}`);

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
      async onQueryStarted(_) {
        try {
          /* const { data } = await queryFulfilled;

          await dispatch(userSlice.actions.setUser(data.user));
          await dispatch(userSlice.actions.setToken(data.access_token));*/
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
    joinLearning: builder.mutation<void, JoinLearningProps>({
      query(data) {
        return {
          url: `${data.sessionId}/join`,
          method: "POST",
          body: {
            username: data.username,
          },
        };
      },
    }),
  }),
});

export const {
  useSessionCreateMutation,
  useSignOutMutation,
  useJoinLearningMutation,
} = userApi;
