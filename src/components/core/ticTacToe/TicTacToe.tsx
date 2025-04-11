import useTictacToe from "./useTictacToe";

interface TicTacToeProps {
  boardSize: number;
}

const TicTacToe = ({ boardSize }: TicTacToeProps) => {
  const { board, handleClick, resetGame, getStatusMessage } =
    useTictacToe(boardSize);

  return (
    <div className="p-6 bg-white rounded shadow text-center w-fit">
      <div className="mb-4 text-lg font-semibold text-gray-800">
        {getStatusMessage()}
      </div>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${boardSize}, 3rem)` }}
      >
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={value !== null}
            className="w-12 h-12 border text-xl font-bold flex items-center justify-center bg-gray-50 hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            {value}
          </button>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
