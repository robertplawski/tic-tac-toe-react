import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import "./Square";
import "./GameMenu.css";
import StatusDisplay from "./StatusDisplay";
export default function GameMenu() {
  const {
    startGame,
    canPlay,
    restartGame,
    againstComputer,
    setAgainstComputer,
  } = useContext(GameContext);
  return (
    <div className="game-menu">
      {canPlay ? (
        <>
          <button onClick={restartGame}>Stop</button>
          <StatusDisplay />
        </>
      ) : (
        <>
          <button onClick={startGame}>Start</button>
          <div className="game-menu__options">
            <label>AI?</label>
            <input
              checked={againstComputer}
              onChange={() => setAgainstComputer((val) => !val)}
              type="checkbox"
            ></input>
            {againstComputer && (
              <select>
                <option>Easy</option>
                <option>Medium</option>
                <option>Impossible</option>
              </select>
            )}
          </div>
        </>
      )}
    </div>
  );
}
