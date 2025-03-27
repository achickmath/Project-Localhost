import { 
  ArrowRight, Bell, Home, MessageCircle, Search, Upload, User, LogOut, ImagePlus, Flag, UserSearch 
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa"; // Import FaPlus from react-icons

const API_URL = "http://localhost:5000"; // Backend URL

const NavBar = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);



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
          value={searchTerm}
          onChange={async (e) => {
            const value = e.target.value;
            setSearchTerm(value);

            if (value.length > 1) {
              try {
                const res = await fetch(`http://localhost:5000/profiles/search?name=${value}`);
                const data = await res.json();
                if (data.success) {
                  setSuggestions(data.users);
                }
              } catch (err) {
                console.error("Error fetching suggestions:", err);
              }
            } else {
              setSuggestions([]);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchTerm.trim()) {
              navigate(`/search-results?name=${encodeURIComponent(searchTerm.trim())}`);
              setSuggestions([]);
            }
          }}
          placeholder="Search users..."
          className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />

          {suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-b-xl z-50 max-h-60 overflow-y-auto">
            {suggestions.map((user) => (
              <div
                key={user.UserLoginid}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  navigate(`/profile/${user.userLoginId}`);
                  setSuggestions([]);
                  setSearchTerm("");
                }}
              >
                <img
                  src={user.profilePicture || "/api/placeholder/40/40"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full mr-3 object-cover"
                />
                <span className="text-gray-700 font-medium">{user.firstName} {user.lastName}</span>
              </div>
            ))}
          </div>
        )}

            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* ✅ Exact spacing and sizes retained */}
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Home className="h-6 w-6 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="h-6 w-6 text-gray-600" />
          </button>
          <button onClick={() => navigate("/SuggestedUsers")} className="p-2 hover:bg-gray-100 rounded-full">
            <UserSearch className="h-6 w-6 text-gray-600" />
          </button>
          <button onClick={() => navigate("/CTFEvents")} className="p-2 hover:bg-gray-100 rounded-full">
            <Flag className="h-5 w-5" />
          </button>
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
    fetch("http://localhost:5000/writeups")
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
  const [user, setUser] = useState({ profilePicture: "/api/placeholder/40/40" });
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");  // ✅ Fix: Declare newPost
  const [image, setImage] = useState(null);    // ✅ Fix: Declare image
  const userProfileid = localStorage.getItem("userProfileid"); // ✅ Fix: Get userProfileid from localStorage
  const navigate = useNavigate();


  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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

  const handlePostSubmit = async () => {
    console.log("🔵 handlePostSubmit triggered");

    const userLoginId = localStorage.getItem("userLoginId");

    if (!newPost.trim()) {
        console.log("⚠️ No post content entered.");
        alert("Please enter some text before posting.");
        return;
    }

    console.log("🔵 userLoginId:", userLoginId);
    console.log("🔵 newPost:", newPost);
    console.log("🔵 image:", image);

    if (!userLoginId) {
        console.error("❌ userLoginId not found! Post request cannot proceed.");
        alert("Error: User not found. Please log in again.");
        return;
    }

    const formData = new FormData();
    formData.append("userLoginId", userLoginId);
    formData.append("content", newPost);

    // ✅ Only append image if it's not null
    if (image) {
        formData.append("image", image);
    }

    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: "POST",
            body: formData,
        });

        console.log("🔵 Fetch request sent...");

        const responseData = await response.json(); // Get response data for debugging

        if (response.ok) {
            console.log("🟢 Post uploaded successfully!", responseData);
            setNewPost("");
            setImage(null);
            fetchPosts();
        } else {
            console.log("❌ Post upload failed:", responseData);
            alert(`Post failed: ${responseData.message || "Unknown error"}`);
        }
    } catch (error) {
        console.error("❌ Error posting:", error);
        alert("Something went wrong. Please try again.");
    }
};

const [organizations, setOrganizations] = useState([]);

useEffect(() => {
  setOrganizations([
    { id: 1, name: "GT GreyHat Club" },
    { id: 2, name: "Millennium Project" },
    { id: 3, name: "Ethical Hacking" },
  ]);
}, []);

const handleOrgClick = (orgId) => {
  navigate('/OrganizationPage');
};

const [showModal, setShowModal] = useState(false);
const [joinCode, setJoinCode] = useState("");

const handleJoinOrganization = async () => {
  if (!joinCode) return alert("Please enter a join code.");

  try {
    const response = await fetch("http://localhost:5000/join-organization", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ joinCode }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Successfully joined the organization!");
      setShowModal(false);
      setJoinCode("");
    } else {
      alert("Invalid join code. Please try again.");
    }
  } catch (error) {
    console.error("Error joining organization:", error);
    alert("Something went wrong. Please try again.");
  }
};



  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 pt-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
            <div className="sticky top-24">
            <ProfileCard />

            {/* ✅ Your Organizations List - Inserted Below ProfileCard */}
            <div className="bg-white shadow-md p-4 rounded-lg mt-6">
              <h2 className="text-lg font-semibold mb-3">Your Organizations</h2>
              <div className="space-y-4">
                {organizations.map((org) => (
                  <div
                    key={org.id}
                    onClick={() => handleOrgClick(org.id)}
                    className="cursor-pointer p-4 bg-blue-50 hover:bg-blue-100 transition rounded-lg shadow-md"
                  >
                    <h3 className="text-blue-700 font-semibold">{org.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

            </div>
            <div className="col-span-6">
              {/* Main Content */}
            <div className="col-span-6">
              {/* Create Post Section */}
              <div className="flex items-center">
                <img
                  src={user.profilePicture}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover mr-4"
                />

                <input
                  type="text"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind?"
                  className="flex-1 py-2 px-4 border rounded-full focus:ring-2 focus:ring-blue-500"
                />

                {/* ✅ Image Upload Button */}
                <label className="cursor-pointer p-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="hidden"
                  />
                  <ImagePlus className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                </label>

                {/* ✅ Submit Button */}
                <button type="button" onClick={handlePostSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full">
                  <Upload className="h-5 w-5" />
                </button>
              </div>

              {/* ✅ Show selected image preview */}
              {image && <p className="text-sm text-gray-600 mt-2">Selected image: {image.name}</p>}


              {/* Feed Posts */}
              <div>
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div key={post.post_id} className="bg-white/90 backdrop-blur-xl shadow-xl rounded-xl p-6 mb-6">
                      <div className="flex items-center mb-4">
                        <img
                          src={post.ProfilePicture || "/api/placeholder/40/40"}
                          alt="User Avatar"
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{post.firstname} {post.lastname}</h3>
                          <p className="text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{post.content}</p>

                      {/* ✅ Show the post image if available */}
                      {post.image_url && (
                        <img src={post.image_url} alt="Post" className="mt-4 rounded-lg max-w-full" />
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No posts yet. Be the first to post something!</p>
                )}
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
              {/* Floating Add Button */}
            <button
              onClick={() => setShowModal(true)} // ✅ Opens modal when clicked
              className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
            >
              <FaPlus size={24} />
            </button>

            </div>
          </div>
        </div>
      </div>
          {/* ✅ Modal for Actions */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96">
              <h2 className="text-xl font-semibold mb-4">Choose an Action</h2>
              
              {/* ✅ Clicking this navigates to /Writeup */}
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate('/Writeup'); // ✅ Redirects after closing modal
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg mb-4 transition"
              >
                Post a Writeup
              </button>

              <input
                type="text"
                placeholder="Enter Join Code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="w-full p-2 border rounded-lg mb-2"
              />

              <button
                onClick={handleJoinOrganization}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mb-4 transition"
              >
                Join Organization
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-300 hover:bg-gray-400 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
    </>
  );
}
