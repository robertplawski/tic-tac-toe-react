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
    algorithmDifficulty,
    setAlgorithmDifficulty,
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
              <select
                value={algorithmDifficulty}
                onInput={({ target }) => setAlgorithmDifficulty(target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="impossible">Impossible</option>
              </select>
            )}
          </div>
        </>
      )}
    </div>
  );
}
