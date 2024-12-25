import { useCallback, useEffect, useRef, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import { PropTypes } from "prop-types";

export default function GameContextProvider({ children }) {
  const [board, setBoard] = useState([]);
  const [turn, setTurn] = useState("O");
  const [winner, setWinner] = useState("");
  const [canPlay, setCanPlay] = useState(false);
  const lineRef = useRef();
  const [algorithmDifficulty, setAlgorithmDifficulty] = useState("impossible");
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
  const nextTurn = useCallback(() => {
    setTurn(turn == "X" ? "O" : "X");
  }, [setTurn, turn]);

  const playerPlaceMark = (index) => {
    if (!canPlay) {
      return;
    }
    if (board[index]) {
      return;
    }
    if (!placeMark(index)) nextTurn();
  };

  const placeMark = useCallback(
    (index) => {
      const newBoard = [...board];

      if (newBoard[index]) {
        return false;
      }

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
        return true;
      }
    },
    [setBoard, setTurn, turn, board]
  );

  useEffect(() => {
    const getAvailableMoves = (boardState) => {
      const markedSquares = boardState.reduce((acc, value, index) => {
        if (value === "O" || value === "X") acc.push(index);
        return acc;
      }, []);

      const availableSquares = [...Array(9).keys()].filter(
        (value) => !markedSquares.includes(value)
      );

      return { markedSquares, availableSquares };
    };

    const isGameOver = (boardState) =>
      boardState.filter((value) => value).length == 9;

    const minMaxEvaluate = (boardState) => {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 4, 8],
        [2, 4, 6],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ];
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (
          boardState[a] &&
          boardState[a] === boardState[b] &&
          boardState[a] === boardState[c]
        ) {
          return boardState[a] == "X" ? 1 : -1; // 1 if x wins -1 if o wins
        }
      }
      if (isGameOver(boardState)) {
        return 0; // TIE
      }
      return null;
    };

    const minimax = (boardState, player, depth = 0) => {
      // Base case 1 if game is over return 1 if x wins -1 if o wins

      const result = minMaxEvaluate(boardState);
      if (result !== null) return result;

      const { availableSquares } = getAvailableMoves(boardState);

      // Base case 2 if no more moves available return 0 - tie
      if (availableSquares.length === 0) return 0;

      let bestScore = player === "X" ? -Infinity : Infinity;
      let bestMove = null;

      // Recursive state evaluate all possible moves
      availableSquares.forEach((square) => {
        const copy = [...boardState];
        copy[square] = player;

        // Opponents move
        const score = minimax(copy, player === "X" ? "O" : "X", depth + 1);
        // If the player is X then score has to be greater than best score, else lesser
        if (player === "X" ? score > bestScore : score < bestScore) {
          bestScore = score;
          bestMove = square;
        }
      });
      // ROOT OF RECURSION, return best move if depth == 0, else return best score to propagate recursive call (backtrack)
      return depth === 0 ? { bestMove } : bestScore;
    };

    const computerPlaceMark = () => {
      if (!canPlay) {
        return;
      }

      const { availableSquares } = getAvailableMoves(board);
      const randomMove =
        availableSquares[Math.floor(Math.random() * availableSquares.length)];
      const { bestMove } = minimax([...board], "X");
      if (algorithmDifficulty == "easy") {
        placeMark(randomMove);
      }
      if (algorithmDifficulty == "medium") {
        // LMAO
        if (Math.random() > 0.35) {
          placeMark(bestMove);
        } else {
          placeMark(randomMove);
        }
      }
      if (algorithmDifficulty == "impossible") {
        placeMark(bestMove);
      }
      nextTurn();
      return;
    };

    if (againstComputer && turn == "X") {
      computerPlaceMark();
    }
  }, [nextTurn, placeMark, board, againstComputer, turn, canPlay]);

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
        playerPlaceMark,
        algorithmDifficulty,
        setAlgorithmDifficulty,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

GameContextProvider.propTypes = {
  children: PropTypes.node,
};
