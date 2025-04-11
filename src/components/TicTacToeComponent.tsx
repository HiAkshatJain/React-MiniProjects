import TicTacToe from "./core/ticTacToe/TicTacToe";

const TicTacToeComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <TicTacToe boardSize={3} />
    </div>
  );
};

export default TicTacToeComponent;
