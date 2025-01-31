import React from "react";
import { useParams } from "react-router-dom";

export default function FullWriteup() {
  const { id } = useParams(); // ✅ Get the writeup ID from the URL

  // Sample Writeups Data (Replace with API call)
  const writeups = [
    { id: "1", title: "SQL Injection Walkthrough", author: "CyberGuru", date: "1/31/2025", upvotes: 120, content: "SQL Injection (SQLi) is a common attack where an attacker injects malicious SQL code..." },
    { id: "2", title: "How I Hacked a CTF Challenge", author: "H4ck3r", date: "2/01/2025", upvotes: 95, content: "This is a step-by-step guide on how I solved a real-world CTF challenge..." },
    { id: "3", title: "XSS Attack Explained", author: "JaneDoe", date: "2/02/2025", upvotes: 30, content: "Cross-Site Scripting (XSS) allows attackers to inject malicious scripts..." },
  ];


  const writeup = writeups.find((w) => w.id === id);

  if (!writeup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50 p-8">
        <h1 className="text-3xl font-bold text-gray-800">Writeup Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col p-8">
      {/* Content Container */}
      <div className="flex-grow bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8 w-full max-w-5xl mx-auto overflow-y-auto">
        <h1 className="text-4xl font-bold text-gray-800">{writeup.title}</h1>
        <p className="text-sm text-gray-600">By {writeup.author} • {writeup.date}</p>
        <p className="text-sm text-gray-500 mt-2">🚀 {writeup.upvotes} upvotes</p>
        <hr className="my-4 border-gray-300" />
        <p className="text-gray-700 leading-relaxed">{writeup.content}</p>
      </div>
    </div>
  );
}