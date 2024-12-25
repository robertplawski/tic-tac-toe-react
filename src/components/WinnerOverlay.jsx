import "./WinnerOverlay.css";
import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

export default function WinnerOverlay() {
  const { winner, canPlay } = useContext(GameContext);
  return (
    <div className={`winner-overlay ${canPlay && "hidden"}`}>
      {winner && (winner == "Tie" ? <p>Tie</p> : <p>{winner} wins!</p>)}
    </div>
  );
}
