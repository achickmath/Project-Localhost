import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract search term from query params
  const searchTerm = new URLSearchParams(location.search).get("name");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!searchTerm) return;

      try {
        const res = await fetch(`http://localhost:5000/profiles/search?name=${searchTerm}`);
        const data = await res.json();

        if (data.success) {
          setResults(data.users);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error("Error fetching search results:", err);
        setResults([]);
      }
    };

    fetchUsers();
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 p-6 pt-28">
      <h2 className="text-2xl font-bold mb-6 text-center">Search Results for: "{searchTerm}"</h2>

      {results.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((user) => (
            <div
              key={user.UserLoginid}
              className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => navigate(`/profile/${user.UserLoginid}`)}
            >
              <img
                src={user.profilePicture || "/api/placeholder/40/40"}
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
