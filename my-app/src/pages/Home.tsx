import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllExperiences } from "../api/experiencesApi";
import type { Experience } from "../api/experiencesApi";
import { useSearch } from "../hooks/useSearch";

const Home: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { query } = useSearch();

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await getAllExperiences();
        setExperiences(data);
      } catch (err) {
        console.error("Error fetching experiences:", err);
        setError("Failed to fetch experiences");
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const filtered = experiences.filter(
    (exp) =>
      exp.title.toLowerCase().includes(query.toLowerCase()) ||
      exp.location.toLowerCase().includes(query.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-18">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Experiences</h1>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No experiences found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((exp) => (
            <div
              key={exp._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
            >

              <img
                src={exp.images[0]}
                alt={exp.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {exp.title}
                  </h2>
                  <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                    {exp.location.split(",")[0]}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {exp.description}
                </p>

                <div className="flex justify-between items-center">

                  <span className="text-lg font-bold text-gray-900">
                    From ₹{exp.price}
                  </span>
                  <Link
                    to={`/experiences/${exp._id}`}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-4 py-1.5 rounded"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
