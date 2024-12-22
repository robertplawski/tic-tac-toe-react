import { createContext } from "react";

export const GameContext = createContext({
  board: [],
  setBoard: () => {},
  turn: null,
  setTurn: () => {},
});
