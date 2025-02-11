import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Info, CheckCircle } from "lucide-react";

export default function CTFEvents() {
  const navigate = useNavigate();


  const upcomingCTFs = [
    { id: 1, name: "PwnQuest 2025", date: "March 10, 2025", difficulty: "Intermediate", organizer: "CyberWarriors" },
    { id: 2, name: "HackTheNight", date: "March 25, 2025", difficulty: "Advanced", organizer: "DarkSec" },
    { id: 3, name: "CryptoMasters", date: "April 5, 2025", difficulty: "Beginner", organizer: "CryptoLabs" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 text-gray-900 p-8">
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-6">
        Upcoming CTF Challenges
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {upcomingCTFs.map((ctf) => (
          <div key={ctf.id} className="bg-white/90 backdrop-blur-xl shadow-xl rounded-xl p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-blue-500">{ctf.name}</h2>
              <p className="text-gray-600 flex items-center"><Calendar className="h-5 w-5 mr-2" /> {ctf.date}</p>
              <p className="text-gray-500">Organizer: {ctf.organizer}</p>
              <p className="text-gray-500">Difficulty: {ctf.difficulty}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate(`/ctf/${ctf.id}`)}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center text-white transition"
              >
                <Info className="h-5 w-5 mr-2" />
                More Info
              </button>
              <button
                onClick={() => alert(`Registered for ${ctf.name}!`)}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg flex items-center text-white transition"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Register
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}