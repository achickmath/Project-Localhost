import { ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FullWriteup() {
  const { id } = useParams();
  const userId = localStorage.getItem("userLoginId");
  const [writeup, setWriteup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWriteup = async () => {
      try {
        const response = await fetch(`http://localhost:5000/writeup/${id}`);
        const data = await response.json();

        console.log("🟢 Writeup Received:", data);

        if (data.success) {
          setWriteup(data.writeup);
        } else {
          console.error("❌ Writeup not found:", data.message);
        }
      } catch (error) {
        console.error("❌ Error fetching writeup:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWriteup();
  }, [id]);

  const handleVote = async (type) => {
    try {
      const response = await fetch("http://localhost:5000/writeup/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ writeupId: id, userId, type }),
      });

      if (!response.ok) throw new Error("Failed to register vote");

      const data = await response.json();
      setWriteup((prev) => ({
        ...prev,
        Upvotes: data.Upvotes,
        Downvotes: data.Downvotes,
      }));
    } catch (error) {
      console.error("❌ Error voting:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col p-8">
      <div className="flex-grow bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8 w-full max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">{writeup.Title}</h1>
        <p className="text-sm text-gray-600">Category: {writeup.Category}</p>
        <p className="text-sm text-gray-500">📅 {new Date(writeup.Date).toDateString()}</p>

        <hr className="my-4 border-gray-300" />
        <p className="text-gray-700 leading-relaxed">{writeup.Content}</p>

        {/* ✅ Upvote & Downvote Buttons */}
        <div className="flex space-x-6 mt-6">
          <button onClick={() => handleVote("upvote")} className={`flex items-center ${writeup.Upvotes > 0 ? "text-green-600" : "text-gray-500"}`}>
            <ThumbsUp className="w-6 h-6 mr-2" /> {writeup.Upvotes} Upvotes
          </button>
          <button onClick={() => handleVote("downvote")} className={`flex items-center ${writeup.Downvotes > 0 ? "text-red-600" : "text-gray-500"}`}>
            <ThumbsDown className="w-6 h-6 mr-2" /> {writeup.Downvotes} Downvotes
          </button>
        </div>
      </div>
    </div>
  );
}
