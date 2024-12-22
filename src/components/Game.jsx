import Board from "./Board";
import GameContextProvider from "./GameContextProvider";
import GameMenu from "./GameMenu";
import StatusDisplay from "./StatusDisplay";

export default function Game() {
  return (
    <GameContextProvider>
      <StatusDisplay />
      <Board />
      <GameMenu />
    </GameContextProvider>
  );
}
