/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type GameState } from "../../types";

export interface GameData {
  state?: GameState;
}

const initialState: GameData = {
  state: undefined,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<GameState>) => {
      state.state = action.payload;
    },
  },
});
