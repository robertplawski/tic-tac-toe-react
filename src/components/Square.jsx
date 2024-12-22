import { useContext } from "react";
import "./Square.css";
import { PropTypes } from "prop-types";
import { GameContext } from "../contexts/GameContext";
export default function Square({ index }) {
  const { board, placeMark } = useContext(GameContext);
  const onClick = () => {
    placeMark(index);
  };
  return (
    <div onClick={onClick} className="square">
      {board[index]}
    </div>
  );
}

Square.propTypes = {
  index: PropTypes.number.isRequired,
};
