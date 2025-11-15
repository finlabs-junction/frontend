/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type RootState } from "../store";
import { gameSlice } from "../slices/gameSlice";
import type { Accomodation, GameState, StockPrices } from "../../types";

interface ExplainEventRequest {
  context: string;
  text: string;
}

interface ExplainEventResponse {
  explanation: string;
}

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  reply: string;
}

interface GetAllAccomodationsResponse {
  currentAccommodationId: string;
  accommodations: Accomodation[];
}

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
    explainEvent: builder.mutation<ExplainEventResponse, ExplainEventRequest>({
      query(data) {
        return {
          url: `explain-text`,
          method: "POST",
          body: data,
        };
      },
    }),
    chatWithAI: builder.mutation<ChatResponse, ChatRequest>({
      query(data) {
        return {
          url: `chat`,
          method: "POST",
          body: data,
        };
      },
    }),
    getAllAccomodations: builder.query<GetAllAccomodationsResponse, void>({
      query() {
        return {
          url: `lifestyle/accommodations`,
          method: "GET",
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await dispatch(
            gameSlice.actions.setAccomodations(data.accommodations)
          );
          await dispatch(
            gameSlice.actions.setCurrentAccommodationId(
              data.currentAccommodationId
            )
          );
        } catch (error: any) {
          // Error handling is now done in components to avoid duplicates
        }
      },
    }),
    moveAccommodation: builder.mutation<void, string>({
      query(accommodationId) {
        return {
          url: `lifestyle/accommodations/move`,
          method: "POST",
          body: { accommodationId },
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
  useExplainEventMutation,
  useChatWithAIMutation,
  useGetAllAccomodationsQuery,
  useMoveAccommodationMutation,
} = gameApi;
