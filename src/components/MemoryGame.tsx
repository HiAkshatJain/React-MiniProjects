import { useEffect, useState, ChangeEvent } from "react";

type Card = {
  id: number;
  number: number;
};

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState<number>(4);
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);

  const handleGridSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) setGridSize(size);
  };

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
    setDisabled(false);
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  const checkMatch = (secondId: number) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      setSolved((prev) => [...prev, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 800);
    }
  };

  const handleClick = (id: number) => {
    if (disabled || won || flipped.includes(id)) return;

    if (flipped.length === 0) {
      setFlipped([id]);
    } else if (flipped.length === 1) {
      setFlipped((prev) => [...prev, id]);
      setDisabled(true);
      checkMatch(id);
    }
  };

  const isFlipped = (id: number) => flipped.includes(id) || solved.includes(id);
  const isSolved = (id: number) => solved.includes(id);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
    }
  }, [solved, cards]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-4">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-6 drop-shadow">
        🧠 Memory Game
      </h1>

      <div className="mb-4">
        <label
          htmlFor="gridSize"
          className="mr-2 text-lg font-medium text-gray-700"
        >
          Grid Size:
        </label>
        <input
          type="number"
          id="gridSize"
          min="2"
          max="10"
          value={gridSize}
          onChange={handleGridSizeChange}
          className="border-2 border-purple-400 rounded px-3 py-1 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div
        className={`grid gap-2 mb-6 transition-all`}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: `min(100%, ${gridSize * 5.2}rem)`,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleClick(card.id)}
            className={`aspect-square flex items-center justify-center text-2xl font-bold rounded-lg cursor-pointer transform transition-transform duration-300 select-none
              ${
                isFlipped(card.id)
                  ? isSolved(card.id)
                    ? "bg-green-400 text-white scale-105"
                    : "bg-blue-400 text-white scale-105"
                  : "bg-white text-transparent border border-gray-300 hover:bg-purple-100"
              }
            `}
          >
            {isFlipped(card.id) ? card.number : "?"}
          </div>
        ))}
      </div>

      {won && (
        <div className="mt-4 text-3xl font-bold text-green-600 animate-bounce">
          🎉 You Won!
        </div>
      )}

      <button
        onClick={initializeGame}
        className="mt-6 px-6 py-2 bg-purple-600 text-white text-lg rounded-lg shadow hover:bg-purple-700 transition-all"
      >
        {won ? "Play Again" : "Reset"}
      </button>
    </div>
  );
};

export default MemoryGame;
