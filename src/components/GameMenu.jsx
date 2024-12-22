import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import "./Square";
import "./GameMenu.css";
export default function GameMenu() {
  const { startGame, canPlay, restartGame } = useContext(GameContext);
  return (
    <div className="game-menu">
      {canPlay ? (
        <button onClick={restartGame}>Stop</button>
      ) : (
        <>
          <button onClick={startGame}>Start</button>
          {/*
    againstComputer,
    setAgainstComputer,

          TO BE IMPLEMENTED
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
          )} */}
        </>
      )}
    </div>
  );
}
