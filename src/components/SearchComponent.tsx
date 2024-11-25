import React, { useEffect, useRef, useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("car");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const API = `https://dummyjson.com/products/search?q=${query}`;

  const debounceTimeout = useRef<any | null>(null);

  // Debounce delay
  const DEBOUNCE_DELAY = 500; // 500ms debounce

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API);
      const res = await response.json();
      setResult(res.products);
      console.log("API called");
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Clear the previous debounce timeout when query changes
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout to call the API after the debounce delay
    debounceTimeout.current = setTimeout(() => {
      fetchProductData();
    }, DEBOUNCE_DELAY);

    // Cleanup the timeout on component unmount
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query]); // Trigger the effect whenever query changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // Update the query and trigger debounce effect
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="enter the product name here"
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {loading && <p className="py-2 px-4 text-gray-500">Loading.....</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
      <ul>
        {result?.length > 0 && !loading && !error
          ? result.map((item: any) => (
              <li
                key={item.id}
                className="py-2 px-4 border-b border-gray-200 hover:bg-gray-100"
              >
                {item.title}
              </li>
            ))
          : !loading && <li className="py-2 px-4 text-gray-500">No results</li>}
      </ul>
    </div>
  );
}

const SearchComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-4">Search</h1>
        <SearchBar />
      </div>
    </div>
  );
};

export default SearchComponent;
