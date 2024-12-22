import { useRef, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import { PropTypes } from "prop-types";

export default function GameContextProvider({ children }) {
  const [board, setBoard] = useState([]);
  const [turn, setTurn] = useState("O");
  const [winner, setWinner] = useState("");
  const [canPlay, setCanPlay] = useState(false);
  const lineRef = useRef();
  const [againstComputer, setAgainstComputer] = useState(true);

  const restartGame = () => {
    startGame();
    setCanPlay(false);
  };

  const startGame = () => {
    setCanPlay(true);
    setWinner("");
    setBoard([]);
    setTurn("O");
    lineRef.current.classList.add("hidden");
  };

  const checkWinner = (board) => {
    const getCombinationStyles = (index) => {
      if (index == 3) {
        return "rotate:45deg";
      }
      if (index === 4) {
        return "rotate:135deg";
      }
      if (index < 3) {
        return `rotate:0deg;transform:translateY(${65 * (index - 1)}px)`;
      }
      if (index < 8) {
        return `rotate:90deg;transform:translateY(${-66 * (index - 6)}px)`;
      }
    };
    const winningCombinations = [
      [0, 1, 2], // 0 0deg
      [3, 4, 5], // 1 0deg
      [6, 7, 8], // 2 0deg

      [0, 4, 8], // 3 45deg
      [2, 4, 6], // 4 135deg

      [0, 3, 6], // 5 90deg
      [1, 4, 7], // 6 90deg
      [2, 5, 8], // 7 90deg
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return {
          winner: board[a],
          combinationStyle: getCombinationStyles(i),
        };
      }
    }
    if (board.filter((value) => !!value).length == 9) {
      return { winner: "Tie" };
    }
    return { winner: null };
  };
  const placeMark = (index) => {
    if (winner || !canPlay) {
      return;
    }
    const newBoard = [...board];
    if (!newBoard[index]) {
      newBoard[index] = turn;
      setBoard(newBoard);

      const { winner, combinationStyle } = checkWinner(newBoard);
      if (winner) {
        if (combinationStyle) {
          lineRef.current.classList.remove("hidden");
          lineRef.current.style = combinationStyle;
        }
        setTurn(null);
        setWinner(winner);
        setCanPlay(false);
        return;
      }
      setTurn(turn == "X" ? "O" : "X");
    }
  };

  return (
    <GameContext.Provider
      value={{
        restartGame,
        canPlay,
        board,
        winner,
        lineRef,
        startGame,
        setBoard,
        turn,
        setTurn,
        placeMark,
        againstComputer,
        setAgainstComputer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

GameContextProvider.propTypes = {
  children: PropTypes.node,
};
