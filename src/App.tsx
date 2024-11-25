import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import PaginationComponent from "./components/PaginationComponent";
import SearchComponent from "./components/SearchComponent";
import ToastComponent from "./components/ToastComponent";

const projects = [
  { name: "SearchComponent", component: <SearchComponent /> },
  { name: "PaginationComponent", component: <PaginationComponent /> },
  { name: "ToastComponent", component: <ToastComponent /> },
];

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-2xl font-bold">Browse Projects</h1>
        </header>

        <div className="p-4">
          {/* Links to All Projects */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg hover:bg-blue-50"
              >
                <Link
                  to={`/${project.name}`}
                  className="text-blue-600 hover:underline text-center block"
                >
                  {project.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Routes */}
        <Routes>
          {projects.map((project, index) => (
            <Route
              key={index}
              path={`/${project.name}`}
              element={project.component}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
