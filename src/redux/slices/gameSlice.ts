/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  gameSessionId?: string;
  gameUsername?: string;
}

const initialState: GameState = {
  gameSessionId: undefined,
  gameUsername: undefined,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameSessionId: (state, action: PayloadAction<string>) => {
      state.gameSessionId = action.payload;
    },
    setGameUsername: (state, action: PayloadAction<string>) => {
      state.gameUsername = action.payload;
    },
  },
});
