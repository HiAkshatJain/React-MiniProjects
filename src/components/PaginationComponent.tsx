import { useEffect, useState } from "react";

const apiUrl = "https://fakestoreapi.com/products";

function PaginatedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const productsPerPage = 8;

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setProducts(data);
      setTotalItems(data.length);
      console.log(data); // You can remove this after debugging
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(totalItems / productsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get products for the current page
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Product List</h1>
      {loading && (
        <p className="text-center text-gray-500">Loading products...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Displaying the products on the current page */}
      {!loading && !error && (
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentProducts.map((product: any) => (
              <li
                key={product.id}
                className="bg-white border p-4 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p className="text-sm text-gray-500">{product.description}</p>
                <img src={product.image} alt={product.title} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pagination controls */}
      {!loading && !error && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

const PaginationComponent = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold py-6">
        Product Listing with Pagination
      </h1>
      <PaginatedProducts />
    </div>
  );
};

export default PaginationComponent;
