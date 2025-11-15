/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type RootState } from "../store";
import { gameSlice } from "../slices/gameSlice";

interface GameStateResponse {
  sessionId: string;
  username: string;
}

export const gameApi = createApi({
  reducerPath: "gameApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_BACKEND_URL}/poll`,
    credentials: "include", // Send cookies with every request
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
    timeout: 5000, // 5 seconds timeout
  }),
  endpoints: (builder) => ({
    getGameState: builder.mutation<GameStateResponse, void>({
      query(data) {
        return {
          url: "",
          method: "GET",
          body: data,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          await dispatch(gameSlice.actions.setGameSessionId(data.sessionId));
          await dispatch(gameSlice.actions.setGameUsername(data.username));
        } catch (error: any) {
          // Error handling is now done in components to avoid duplicates
        }
      },
    }),
  }),
});

export const { useGetGameStateMutation } = gameApi;
