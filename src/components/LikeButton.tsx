import { useState } from "react";

// Type the props for HeartIcon
type HeartIconProps = {
  filled: boolean;
};

// HeartIcon component
const HeartIcon = ({ filled }: HeartIconProps) => (
  <svg
    className={`w-5 h-5 transition-colors duration-300 ${
      filled ? "text-red-500" : "text-gray-400"
    }`}
    fill={filled ? "currentColor" : "none"}
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
    />
  </svg>
);

// SpinnerIcon component
const SpinnerIcon = () => (
  <svg
    className="animate-spin h-5 w-5 text-blue-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    ></path>
  </svg>
);

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLikeUnlike = async () => {
    setError(null);
    setIsFetching(true);

    try {
      const response = await fetch(
        "https://www.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: liked ? "unlike" : "like",
          }),
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setLiked(!liked);
      } else {
        const res = await response.json();
        setError(res.message);
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center space-y-4">
        <button
          onClick={handleLikeUnlike}
          disabled={isFetching}
          className={`inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-full transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
            liked
              ? "bg-pink-500 hover:bg-pink-600"
              : "bg-gray-600 hover:bg-gray-700"
          } ${isFetching ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isFetching ? <SpinnerIcon /> : <HeartIcon filled={liked} />}
          <span className="ml-2">{liked ? "Liked" : "Like"}</span>
        </button>
        {error && (
          <div className="text-sm text-red-500 font-medium">{error}</div>
        )}
      </div>
    </div>
  );
};

export default LikeButton;
