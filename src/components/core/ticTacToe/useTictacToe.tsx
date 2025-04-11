import { useState } from "react";
import { Player } from "./type";

const generateBoard = (size: number): Player[] => Array(size * size).fill(null);

const useTictacToe = (boardSize: number) => {
  const [board, setBoard] = useState<Player[]>(generateBoard(boardSize));
  const [isXNext, setIsXNext] = useState(true);

  const generateWinningPatterns = (size: number): number[][] => {
    const patterns: number[][] = [];

    // Rows
    for (let i = 0; i < size; i++) {
      const row = Array.from({ length: size }, (_, j) => i * size + j);
      patterns.push(row);
    }

    // Columns
    for (let i = 0; i < size; i++) {
      const col = Array.from({ length: size }, (_, j) => i + j * size);
      patterns.push(col);
    }

    // Diagonals
    const mainDiagonal = Array.from({ length: size }, (_, i) => i * size + i);
    const antiDiagonal = Array.from(
      { length: size },
      (_, i) => (i + 1) * (size - 1)
    );

    patterns.push(mainDiagonal, antiDiagonal);

    return patterns;
  };

  const WINNING_PATTERNS = generateWinningPatterns(boardSize);

  const calculateWinner = (currentBoard: Player[]): Player => {
    for (const pattern of WINNING_PATTERNS) {
      const [first, ...rest] = pattern;
      if (
        currentBoard[first] &&
        rest.every((i) => currentBoard[i] === currentBoard[first])
      ) {
        return currentBoard[first];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    const winner = calculateWinner(board);
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatusMessage = (): string => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw!`;
    return `Player ${isXNext ? "X" : "O"}'s turn`;
  };

  const resetGame = () => {
    setBoard(generateBoard(boardSize));
    setIsXNext(true);
  };

  return {
    board,
    handleClick,
    calculateWinner,
    getStatusMessage,
    resetGame,
  };
};

export default useTictacToe;
