import Square from "./Square.jsx";
import "./Board.css";
import "./Line.css";
import { useContext } from "react";
import { GameContext } from "../contexts/GameContext.jsx";

export default function Board() {
  const { lineRef } = useContext(GameContext);

  return (
    <div className="board">
      {[...Array(9).keys()].map((index) => (
        <Square key={index} index={index} />
      ))}

      <div ref={lineRef} className="line hidden"></div>
    </div>
  );
}
