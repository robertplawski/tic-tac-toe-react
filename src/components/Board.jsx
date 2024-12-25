import Square from "./Square.jsx";
import "./Board.css";
import "./Line.css";
import { useContext } from "react";
import { GameContext } from "../contexts/GameContext.jsx";
import WinnerOverlay from "./WinnerOverlay.jsx";

export default function Board() {
  const { lineRef, canPlay, startGame } = useContext(GameContext);

  return (
    <div
      className={`board ${!canPlay ? "disabled" : ""}`}
      onClick={!canPlay ? startGame : null}
    >
      {[...Array(9).keys()].map((index) => (
        <Square key={index} index={index} />
      ))}
      <WinnerOverlay />
      <div ref={lineRef} className="line hidden"></div>
    </div>
  );
}
