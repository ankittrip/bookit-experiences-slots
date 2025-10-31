import React from "react";
import logo from "../assets/logo.png";
import { useSearch } from "../hooks/useSearch";

const Navbar: React.FC = () => {
  const { query, setQuery } = useSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src={logo}
              alt="BookIt Experiences Logo"
              className="h-9 w-auto"
            />
          </div>


          <form
            onSubmit={handleSubmit}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search experiences..."
              className="w-64 pl-4 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-gray-900 font-medium text-sm px-4 py-2 rounded-md hover:bg-yellow-500 transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
