/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  type Accomodation,
  type GameState,
  type StockPrices,
} from "../../types";

export interface GameData {
  state?: GameState;
  stockPrices?: StockPrices;
  accomodations: Accomodation[];
  currentAccommodationId?: string;
  evaluation?: string;
}

const initialState: GameData = {
  state: undefined,
  stockPrices: undefined,
  accomodations: [],
  currentAccommodationId: undefined,
  evaluation: undefined,
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
    setAccomodations: (state, action: PayloadAction<Accomodation[]>) => {
      state.accomodations = action.payload;
    },
    setCurrentAccommodationId: (state, action: PayloadAction<string>) => {
      state.currentAccommodationId = action.payload;
    },
    setEvaluation: (state, action: PayloadAction<string>) => {
      state.evaluation = action.payload;
    },
  },
});
