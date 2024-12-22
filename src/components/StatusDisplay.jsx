import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

export default function StatusDisplay() {
  const { turn, winner, canPlay } = useContext(GameContext);
  return (
    <div>
      {!canPlay && !winner && <p>Click the button to play</p>}
      {canPlay && turn && <p>Turn: {turn}</p>}
      {winner && <p>Winner: {winner}</p>}
    </div>
  );
}
