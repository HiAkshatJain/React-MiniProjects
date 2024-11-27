import { useState } from "react";

interface StarRatingProps {
  maxRating?: number;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  maxRating = 5,
  initialRating = 0,
  onRatingChange,
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const handleClick = (newRating: number) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxRating }, (_, index) => {
        const starRating = index + 1;
        return (
          <svg
            key={starRating}
            onClick={() => handleClick(starRating)}
            className={`w-6 h-6 cursor-pointer ${
              starRating <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 15l-5.881 3.09 1.12-6.529-4.736-4.116 6.56-.95L10 0l2.937 6.535 6.56.95-4.736 4.116 1.12 6.529L10 15z"
              clipRule="evenodd"
            />
          </svg>
        );
      })}
    </div>
  );
};

const StarRatingComponent = () => {
  const [rating, setRating] = useState<number>(0);
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-semibold mb-4">Rate This Product</h1>
      <StarRating initialRating={rating} onRatingChange={handleRatingChange} />
      <div className="mt-4 text-lg">Your Rating: {rating} Stars</div>
    </div>
  );
};

export default StarRatingComponent;
