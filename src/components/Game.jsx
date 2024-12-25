import Board from "./Board";
import GameContextProvider from "./GameContextProvider";
import GameMenu from "./GameMenu";

export default function Game() {
  return (
    <GameContextProvider>
      <h1>Tic Tac Toe </h1>
      <Board />
      <GameMenu />
    </GameContextProvider>
  );
}
