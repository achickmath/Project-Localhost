import {
  ArrowRight, Bell, Home,
  LogOut,
  MessageCircle, Search, Upload, User
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userLoginId = localStorage.getItem("userLoginId");
        const response = await fetch(`http://localhost:5000/profile/${userLoginId}`);
        const data = await response.json();

        if (data.success) {
          setProfilePicture(data.user.profilePicture || "/api/placeholder/80/80");
        }
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.history.replaceState(null, "", "/login");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl shadow-sm z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 
            className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition"
            onClick={() => navigate("/home")}
          >
            Blue Jack
          </h1>
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
          {/* ✅ Display Profile Picture in NavBar */}
          <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full">
            <img
              src={profilePicture}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </Link>
          <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-full">
            <LogOut className="h-6 w-6 text-red-500" />
          </button>
        </div>
      </div>
    </nav>
  );
};

const ProfileCard = () => {
  const [user, setUser] = useState({ firstName: "", lastName: "", profilePicture: "/api/placeholder/80/80" });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userLoginId = localStorage.getItem("userLoginId");
        const response = await fetch(`http://localhost:5000/profile/${userLoginId}`);
        const data = await response.json();

        if (data.success) {
          setUser({
            firstName: data.user.firstName || "Your",
            lastName: data.user.lastName || "Name",
            profilePicture: data.user.profilePicture || "/api/placeholder/80/80",
          });
        }
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-xl p-6">
      <div className="flex flex-col items-center">
        {/* ✅ Display Profile Picture */}
        <img
          src={user.profilePicture}
          alt="Profile Avatar"
          className="w-20 h-20 rounded-full mb-4 object-cover"
        />
        <h2 className="text-xl font-semibold text-gray-800">{`${user.firstName} ${user.lastName}`}</h2>
        <p className="text-gray-500 mb-4">Security Professional</p>
      </div>
    </div>
  );
};

const NewsCard = ({ title, source, time }) => (
  <div className="bg-white/90 backdrop-blur-xl shadow p-4 rounded-xl mb-4">
    <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
    <div className="flex justify-between text-sm text-gray-500">
      <span>{source}</span>
      <span>{time}</span>
    </div>
  </div>
);

const FeedPost = ({ name, title, content }) => {
  return (
    <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-xl p-6 mb-6">
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
      <p className="text-gray-600">{content}</p>
      <div className="flex items-center justify-between mt-4">
        <button className="text-blue-500 hover:text-blue-600 transition-colors">
          <MessageCircle className="h-5 w-5 mr-2" />
          Comment
        </button>
        <button className="text-blue-500 hover:text-blue-600 transition-colors">
          <ArrowRight className="h-5 w-5 mr-2" />
          Share
        </button>
      </div>
    </div>
  );
};


const WriteupZonePreview = () => {
  const [writeups, setWriteups] = useState([]);
  const [viewMode, setViewMode] = useState("Trending");

  useEffect(() => {
    fetch("http://localhost:5001/writeups")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const sortedTrending = [...data.writeups]
            .sort((a, b) => (b.Upvotes - b.Downvotes) - (a.Upvotes - a.Downvotes))
            .slice(0, 5);
          const sortedNewest = [...data.writeups]
            .sort((a, b) => b.UserWriteUpid - a.UserWriteUpid)
            .slice(0, 5);

          setWriteups(viewMode === "Trending" ? sortedTrending : sortedNewest);
        }
      });
  }, [viewMode]);

  return (
    <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-xl p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">WriteupZone</h2>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              viewMode === "Trending" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setViewMode("Trending")}
          >
            Trending
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              viewMode === "Newest" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setViewMode("Newest")}
          >
            Newest
          </button>
        </div>
      </div>
      <div className="mt-4">
        {writeups.length > 0 ? (
          writeups.map((writeup) => (
            <div key={writeup.UserWriteUpid} className="border-b last:border-0 pb-3 mb-3">
              <Link to={`/writeup/${writeup.UserWriteUpid}`} className="text-lg font-bold text-blue-600 hover:underline">
                {writeup.Title}
              </Link>
              <p className="text-sm text-gray-600">By {writeup.Author}</p>
              <p className="text-sm text-gray-500">📅 {new Date(writeup.Date).toDateString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No writeups available.</p>
        )}
      </div>
      <div className="mt-4 text-right">
        <Link to="/writeupzone" className="text-blue-500 hover:text-blue-600">See All →</Link>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [user, setUser] = useState({ profilePicture: "/api/placeholder/40/40" })
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userLoginId = localStorage.getItem("userLoginId");
        const response = await fetch(`http://localhost:5000/profile/${userLoginId}`);
        const data = await response.json();

        if (data.success) {
          console.log("🟢 Profile Picture URL:", data.user.profilePicture); // ✅ Debugging log
          setUser({
            profilePicture: data.user.profilePicture || "/api/placeholder/40/40",
          });
        }
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 pt-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <div className="sticky top-24">
                <ProfileCard />
              </div>
            </div>
            <div className="col-span-6">
              {/* Main Content */}
            <div className="col-span-6">
              {/* Create Post Section */}
              <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-xl p-6 mb-6">
                <div className="flex items-center">
                  <img
                    src={user.profilePicture}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover mr-4"
                  />

                  <input
                    type="text"
                    placeholder="What's on your mind?"
                    className="flex-1 py-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors">
                    <Upload className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Feed Posts */}
              <div>
                <FeedPost
                  name="John Doe"
                  title="Cybersecurity Analyst"
                  content="Just finished an engaging discussion on the latest advancements in threat detection. Excited to put these insights into practice!"
                />
                <FeedPost
                  name="Jane Smith"
                  title="Security Engineer"
                  content="Shared a new blog post on best practices for implementing a Zero Trust architecture. Let me know what you think!"
                />
                <FeedPost
                  name="Michael Johnson"
                  title="Penetration Tester"
                  content="Attended a virtual conference on ethical hacking techniques. Learned some valuable new skills to add to my toolkit."
                />
              </div>
            </div>
            </div>
            <div className="col-span-3">
              <div className="sticky top-24">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Latest News</h2>
                <NewsCard title="New Vulnerability Discovered" source="CyberNews" time="2 hours ago" />
                <NewsCard title="Industry Leaders Announce Security Coalition" source="Tech Daily" time="4 hours ago" />
                <NewsCard title="Updates to Security Compliance Standards" source="Security Weekly" time="6 hours ago" />
                <WriteupZonePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
