/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type GameState, type StockPrices } from "../../types";

export interface GameData {
  state?: GameState;
  stockPrices?: StockPrices;
}

const initialState: GameData = {
  state: undefined,
  stockPrices: undefined,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<GameState>) => {
      state.state = action.payload;
    },
    setStockPrices: (state, action: PayloadAction<StockPrices>) => {
      state.stockPrices = action.payload;
    },
  },
});
