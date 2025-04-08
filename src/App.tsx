import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import PaginationComponent from "./components/PaginationComponent";
import SearchComponent from "./components/SearchComponent";
import ToastComponent from "./components/ToastComponent";
import StarRatingComponent from "./components/StarRatingComponent";
import MemoryGame from "./components/MemoryGame";
import PasswordGenerator from "./components/PasswordGenerator";

const projects = [
  { name: "Search Component", element: <SearchComponent /> },
  { name: "Pagination Component", element: <PaginationComponent /> },
  { name: "Toast Component", element: <ToastComponent /> },
  { name: "Star Rating Component", element: <StarRatingComponent /> },
  { name: "Memory Game", element: <MemoryGame /> },
  { name: "Password Generator", element: <PasswordGenerator /> },
];

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
    <header className="bg-blue-600 text-white py-6 text-center shadow-lg">
      <h1 className="text-3xl font-bold tracking-wide">🚀 Browse Components</h1>
      <p className="text-sm mt-1 opacity-90">Click to view each feature</p>
    </header>

    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {projects.map((project) => (
          <Link
            key={project.name}
            to={`/${project.name}`}
            className="bg-white hover:bg-blue-100 p-5 rounded-xl shadow-md text-center text-blue-700 font-semibold transition-all duration-300 border border-blue-100 hover:shadow-lg"
          >
            {project.name}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

const PageWrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="min-h-screen bg-white py-8 px-4 md:px-10">
    <Link
      to="/"
      className="inline-block mb-4 text-blue-600 hover:underline font-medium"
    >
      ← Back to Home
    </Link>
    <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
    <div className="bg-gray-50 p-4 rounded-lg shadow">{children}</div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Dynamic Routes */}
        {projects.map(({ name, element }) => (
          <Route
            key={name}
            path={`/${name}`}
            element={<PageWrapper title={name}>{element}</PageWrapper>}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
