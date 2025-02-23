import { LogOut, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function WriteupZone() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Trending");
  const [writeups, setWriteups] = useState({ Trending: [], Newest: [], Favorites: [] });
  const [favorites, setFavorites] = useState([]);
  const userId = localStorage.getItem("userLoginId");

  useEffect(() => {
    const fetchWriteups = async () => {
      try {
        const res = await fetch("http://localhost:5001/writeups");
        const data = await res.json();

        if (data.success) {
          const sortedNewest = [...data.writeups].sort((a, b) => b.UserWriteUpid - a.UserWriteUpid);
          const sortedTrending = [...data.writeups].sort(
            (a, b) => ((b.Upvotes ?? 0) - (b.Downvotes ?? 0)) - ((a.Upvotes ?? 0) - (a.Downvotes ?? 0))
          );

          setWriteups({
            Trending: sortedTrending,
            Newest: sortedNewest,
            Favorites: [],
          });
        }
      } catch (error) {
        console.error("❌ Error fetching writeups:", error);
      }
    };

    const fetchFavorites = async () => {
      try {
        const res = await fetch(`http://localhost:5001/favorites/${userId}`);
        const data = await res.json();
        if (data.success) {
          setFavorites(data.favorites.map((fav) => fav.UserWriteUpid));

          // ✅ Ensure favorites are stored in the state properly
          setWriteups((prevWriteups) => ({
            ...prevWriteups,
            Favorites: prevWriteups.Newest.filter((w) => data.favorites.some((fav) => fav.UserWriteUpid === w.UserWriteUpid)),
          }));
        }
      } catch (error) {
        console.error("❌ Error fetching favorites:", error);
      }
    };

    fetchWriteups();
    fetchFavorites();
  }, [userId]);

  const toggleFavorite = async (writeupId) => {
    try {
      const response = await fetch("http://localhost:5001/favorites/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, writeupId }),
      });

      const data = await response.json();
      if (data.success) {
        setFavorites((prevFavorites) => {
          const isFavorited = prevFavorites.includes(writeupId);

          // ✅ Update favorites in real-time UI
          setWriteups((prevWriteups) => ({
            ...prevWriteups,
            Favorites: isFavorited
              ? prevWriteups.Favorites.filter((w) => w.UserWriteUpid !== writeupId) // Remove
              : [...prevWriteups.Favorites, prevWriteups.Newest.find((w) => w.UserWriteUpid === writeupId)], // Add
          }));

          return isFavorited ? prevFavorites.filter((id) => id !== writeupId) : [...prevFavorites, writeupId];
        });
      }
    } catch (error) {
      console.error("❌ Error toggling favorite:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col">
      {/* ✅ Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl shadow-sm z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* ✅ Clickable Title "Blue Jack" */}
          <h1 
            className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition"
            onClick={() => navigate("/home")}
          >
            Blue Jack
          </h1>

          <div className="flex items-center space-x-6">
            {/* ✅ Home Button */}
            <button 
              onClick={() => navigate("/home")} 
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition"
            >
              Home
            </button>

            {/* ✅ Logout Button */}
            <button 
              onClick={handleLogout} 
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <LogOut className="h-6 w-6 text-red-500" />
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Page Content */}
      <div className="container mx-auto p-8 mt-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">WriteupZone</h1>

        {/* ✅ Tab Buttons */}
        <div className="flex space-x-4 mb-6">
          {["Trending", "Newest", "Favorites"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg transition ${
                activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ✅ Writeup List */}
        <div className="flex-grow bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{activeTab} Writeups</h2>
          <ul className="space-y-4">
            {writeups[activeTab].map((writeup) => (
              <li key={writeup.UserWriteUpid} className="p-4 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center">
                <div>
                  {/* ✅ Clickable Writeup Title */}
                  <Link to={`/writeup/${writeup.UserWriteUpid}`} className="block text-lg font-bold text-blue-600 hover:underline">
                    {writeup.Title}
                  </Link>
                  <p className="text-sm text-gray-600">By {writeup.Author}</p>
                  <p className="text-sm text-gray-500">📅 {new Date(writeup.Date).toDateString()}</p>
                  <p className="text-sm text-gray-500">🚀 {(writeup.Upvotes ?? 0) - (writeup.Downvotes ?? 0)} Votes</p>
                </div>
                {/* ✅ Favorite Button */}
                <button onClick={() => toggleFavorite(writeup.UserWriteUpid)}>
                  <Star className={`h-6 w-6 transition ${
                    favorites.includes(writeup.UserWriteUpid) ? "text-red-500 fill-current" : "text-gray-400"
                  }`} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
