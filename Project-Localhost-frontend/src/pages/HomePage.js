import { ArrowRight, Bell, Home, MessageCircle, Search, Upload, User } from 'lucide-react';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// ✅ Navigation Bar
const NavBar = () => (
  <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl shadow-sm z-50">
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-blue-600">BackDoor</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Home className="h-6 w-6 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="h-6 w-6 text-gray-600" />
          </button>
          <a href="/profile" className="p-2 hover:bg-gray-100 rounded-full">
            <User className="h-6 w-6 text-gray-600" />
          </a>
        </div>
      </div>
    </div>
  </nav>
);

// ✅ Profile Card
const ProfileCard = () => (
  <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-xl p-6">
    <div className="flex flex-col items-center">
      <img
        src="/api/placeholder/80/80"
        alt="Profile Avatar"
        className="w-20 h-20 rounded-full mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Name</h2>
      <p className="text-gray-500 mb-4">Security Professional</p>
    </div>
  </div>
);

// ✅ News Card
const NewsCard = ({ title, source, time }) => (
  <div className="bg-white/90 backdrop-blur-xl shadow p-4 rounded-xl mb-4">
    <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
    <div className="flex justify-between text-sm text-gray-500">
      <span>{source}</span>
      <span>{time}</span>
    </div>
  </div>
);

// ✅ Feed Post (with Commenting)
const FeedPost = ({ name, title, content }) => {
  const [comments, setComments] = useState([]); // Store comments
  const [newComment, setNewComment] = useState(""); // Track new comment input
  const [showComments, setShowComments] = useState(false); // Toggle comments

  // Handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]); // Update comments list
      setNewComment(""); // Clear input field
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-xl p-6 mb-6">
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <img
          src="/api/placeholder/40/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-500">{title}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-600">{content}</p>

      {/* Buttons (Comment & Share) */}
      <div className="flex items-center justify-between mt-4">
        <button
          className="text-blue-500 hover:text-blue-600 transition-colors flex items-center"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Comment
        </button>
        <button className="text-blue-500 hover:text-blue-600 transition-colors flex items-center">
          <ArrowRight className="h-5 w-5 mr-2" />
          Share
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-4">
          {/* Comment Input */}
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 py-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddComment}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
            >
              Post
            </button>
          </div>

          {/* Display Comments */}
          <ul className="mt-2 space-y-2">
            {comments.map((comment, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded-lg text-gray-700">
                {comment}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ✅ Home Page Component
export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 pt-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Profile Section */}
            <div className="col-span-3">
              <div className="sticky top-24">
                <ProfileCard />
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-6">
              {/* Create Post Section */}
              <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-xl p-6 mb-6">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="What's on your mind?"
                    className="flex-1 py-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition">
                    <Upload className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Feed Posts */}
              <FeedPost name="John Doe" title="Cybersecurity Analyst" content="Just finished an engaging discussion on the latest advancements in threat detection." />
              <FeedPost name="Jane Smith" title="Security Engineer" content="Shared a new blog post on best practices for implementing a Zero Trust architecture." />
              <FeedPost name="Michael Johnson" title="Penetration Tester" content="Attended a virtual conference on ethical hacking techniques." />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
