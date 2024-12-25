import "./WinnerOverlay.css";
import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

export default function WinnerOverlay() {
  const { winner, canPlay, againstComputer } = useContext(GameContext);
  return (
    <div className={`winner-overlay ${canPlay && "hidden"}`}>
      {winner &&
        (winner == "Tie" ? (
          <p>Tie</p>
        ) : (
          <p>
            {!againstComputer
              ? winner + " wins"
              : winner == "O"
              ? "You win!"
              : "AI wins!"}{" "}
          </p>
        ))}
    </div>
  );
}
