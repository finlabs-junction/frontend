/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type RootState } from "../store";
import { gameSlice } from "../slices/gameSlice";
import type { GameState, StockPrices } from "../../types";

export const gameApi = createApi({
  reducerPath: "gameApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_BACKEND_URL}/`,
    credentials: "include", // Send cookies with every request
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
    timeout: 5000, // 5 seconds timeout
  }),
  endpoints: (builder) => ({
    getGameState: builder.mutation<GameState, void>({
      query(data) {
        return {
          url: "poll",
          method: "GET",
          body: data,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          await dispatch(gameSlice.actions.setGameState(data));
        } catch (error: any) {
          // Error handling is now done in components to avoid duplicates
        }
      },
    }),
    startGame: builder.mutation<void, boolean>({
      query(data) {
        return {
          url: "start",
          method: "POST",
          params: { resume: data },
        };
      },
    }),
    pauseGame: builder.mutation<void, void>({
      query() {
        return {
          url: "pause",
          method: "POST",
        };
      },
    }),
    stopGame: builder.mutation<void, void>({
      query() {
        return {
          url: "stop",
          method: "POST",
        };
      },
    }),
    setTimeMultiplier: builder.mutation<void, number>({
      query(data) {
        return {
          url: "set-time-progression-multiplier",
          method: "POST",
          body: data,
        };
      },
    }),
    setMonthlyGroceryExpense: builder.mutation<void, number>({
      query(data) {
        return {
          url: "set-monthly-grocery-expense",
          method: "POST",
          body: data,
        };
      },
    }),
    setLeisureExpense: builder.mutation<void, number>({
      query(data) {
        return {
          url: "set-monthly-leisure-expense",
          method: "POST",
          body: data,
        };
      },
    }),
    getStockPrices: builder.mutation<StockPrices, void>({
      query() {
        return {
          url: "stock-prices",
          method: "GET",
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await dispatch(gameSlice.actions.setStockPrices(data));
        } catch (error: any) {
          // Error handling is now done in components to avoid duplicates
        }
      },
    }),
    buyStocks: builder.mutation<void, { symbol: string; quantity: number }>({
      query(data) {
        return {
          url: `stock/${data.symbol}/buy`,
          method: "POST",
          body: data.quantity,
        };
      },
    }),
    sellStocks: builder.mutation<void, { symbol: string; quantity: number }>({
      query(data) {
        return {
          url: `stock/${data.symbol}/sell`,
          method: "POST",
          body: data.quantity,
        };
      },
    }),
  }),
});

export const {
  useGetGameStateMutation,
  useStartGameMutation,
  useSetTimeMultiplierMutation,
  usePauseGameMutation,
  useStopGameMutation,
  useSetMonthlyGroceryExpenseMutation,
  useSetLeisureExpenseMutation,
  useGetStockPricesMutation,
  useBuyStocksMutation,
  useSellStocksMutation,
} = gameApi;
