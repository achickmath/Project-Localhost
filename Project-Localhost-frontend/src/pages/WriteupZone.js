import React, {act, useState} from 'react';
import { Link } from "react-router-dom";

export default function WriteupZone() {
    const[activeTab, setActiveTab] = useState("Trending");
    const writeups = {
    Trending: [
        { id: 1, title: "SQL Injection Walkthrough", author: "CyberGuru", upvotes: 120},
        { id: 2, title : "How I Hacked a CTF Challenge", author: "H4ck3r", upvotes: 95},
    ],
    Newest: [
        { id: 3, title: "XSS Attack Explained", author: "JaneDoe", upvotes : 21},
        {id: 4, title: "DeepSeek Cyber Attack??", author: "amohanty66", upvotes: 31},
    ],
    Favorites: [
        {id: 5, title:"Butter Overflow Basics", author: "P Diddy", upvotes: 43},
    ],
};
return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col p-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">WriteupZone</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        {["Trending", "Newest", "Favorites"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg transition ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Container (Expands to Full Height) */}
      <div className="flex-grow bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{activeTab} Writeups</h2>

        {/* Writeup List */}
        <ul className="space-y-4">
          {writeups[activeTab].map((writeup, index) => (
            <li key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm">
              {/* Link to Writeup Details Page */}
              <Link to={`/writeup/${writeup.id}`} className="block text-lg font-bold text-blue-600 hover:underline">
                {writeup.title}
              </Link>
              <p className="text-sm text-gray-600">By {writeup.author}</p>
              <p className="text-sm text-gray-500">🚀 {writeup.upvotes} upvotes</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
