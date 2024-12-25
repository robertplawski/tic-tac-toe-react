import { useContext } from "react";
import "./Square.css";
import { PropTypes } from "prop-types";
import { GameContext } from "../contexts/GameContext";
export default function Square({ index }) {
  const { board, playerPlaceMark, canPlay } = useContext(GameContext);
  const onClick = () => {
    playerPlaceMark(index);
  };
  return (
    <button
      disabled={!canPlay}
      onClick={onClick}
      className={`square${board[index] != undefined ? " visible" : ""}`}
    >
      <span>{board[index]}</span>
    </button>
  );
}

Square.propTypes = {
  index: PropTypes.number.isRequired,
};
