import { Edit, ExternalLink, FileText, Github, Instagram, Linkedin, LogOut, MessageCircle, Shield } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // ✅ Clears authentication data
    navigate('/login'); // ✅ Redirect to login page
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl shadow-sm z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* ✅ Clickable Title "Blue Jack" that redirects to /home */}
          <h1 
            className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition"
            onClick={() => navigate('/home')}
          >
            Blue Jack
          </h1>

          <div className="flex items-center space-x-6">
            {/* ✅ Home Button */}
            <button 
              onClick={() => navigate('/home')} 
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
      </div>
    </nav>
  );
};


export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ firstName: "", lastName: "" });
  const [writeups, setWriteups] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ bio: "", gender: "", secondaryEmail: "", team: "Red" });
  const [projects, setProjects] = useState([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const [projectData, setProjectData] = useState({ title: "", description: "", tags: "" });
  const [achievements, setAchievements] = useState([]);
  const [isAddingAchievement, setIsAddingAchievement] = useState(false);
  const [editAchievement, setEditAchievement] = useState(null);
  const [achievementData, setAchievementData] = useState({ title: "", linkURL: "", achievementDate: "" });

    // ✅ Organization State
  const [isJoiningOrganization, setIsJoiningOrganization] = useState(false);
  const [organizationData, setOrganizationData] = useState({
    email: "",
    joinCode: "",
  });
  const [userOrganization, setUserOrganization] = useState(null);


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file); // ✅ Convert image to Base64
    }
  };
  
  
  const handleEditProfile = async () => {
    try {
      console.log("🟢 Submitting profile update:", editData); // ✅ Log the data before sending
  
      const response = await fetch("http://localhost:5001/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: localStorage.getItem("userLoginId"),
          bio: editData.bio,
          gender: editData.gender,
          secondaryEmail: editData.secondaryEmail,
          team: editData.team,
          profilePicture: editData.profilePicture, // ✅ Include profile picture
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setUser((prevUser) => ({
          ...prevUser,
          bio: editData.bio,
          gender: editData.gender,
          secondaryEmail: editData.secondaryEmail,
          team: editData.team,
          profilePicture: editData.profilePicture, // ✅ Update state
        }));
  
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("❌ Failed to update profile: " + data.message);
      }
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
  
  
  const handleSaveProject = async () => {
    const userLoginId = localStorage.getItem("userLoginId");
  
    const endpoint = editProject ? "edit" : "add";
    const projectPayload = {
      userLoginId,
      projectId: editProject?.Projectid || null, // ✅ Send projectId only if editing
      title: projectData.title,
      description: projectData.description,
      tags: projectData.tags,
    };
  
    console.log("🟢 Submitting project:", projectPayload); // ✅ Debugging log
  
    try {
      const response = await fetch(`http://localhost:5001/projects/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectPayload),
      });
  
      console.log("📨 Server response status:", response.status);
  
      const data = await response.json();
      console.log("📨 Server response data:", data);
  
      if (data.success) {
        alert(editProject ? "Project updated!" : "Project added!");
        setIsAddingProject(false);
        setEditProject(null);
        window.location.reload();
      } else {
        alert("❌ Failed to save project.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  const handleSaveAchievement = async () => {
    const userLoginId = localStorage.getItem("userLoginId");
  
    const endpoint = editAchievement ? "edit" : "add";
    const achievementPayload = {
      userLoginId,
      achievementId: editAchievement ? editAchievement.AchievementsID || editAchievement.achievementId : null,  // ✅ Ensure correct ID
      title: achievementData.title,
      linkURL: achievementData.linkURL,
      achievementDate: achievementData.achievementDate,
    };
  
    console.log("🟢 Sending Achievement Data:", achievementPayload); // ✅ Log request
  
    try {
      const response = await fetch(`http://localhost:5000/achievements/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(achievementPayload),
      });
  
      const data = await response.json();
      console.log("📨 Server Response:", data); // ✅ Log response
  
      if (data.success) {
        alert(editAchievement ? "Achievement updated!" : "Achievement added!");
  
        // Refresh achievements
        const updatedAchievements = editAchievement
          ? achievements.map((a) =>
              a.AchievementsID === editAchievement.AchievementsID ? { ...a, ...achievementData } : a
            )
          : [...achievements, { ...achievementData, AchievementsID: data.achievementId }];
  
        setAchievements(updatedAchievements);
        setIsAddingAchievement(false);
        setEditAchievement(null);
      } else {
        alert("❌ Failed to save achievement.");
      }
    } catch (error) {
      console.error("❌ Error saving achievement:", error);
    }
  };
  

  // ✅ Handle Joining an Organization
  const handleJoinOrganization = async () => {
    if (!organizationData.email && !organizationData.joinCode) {
      alert("Please enter either an organization email or join code.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/organization/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userLoginId: localStorage.getItem("userLoginId"),
          email: organizationData.email,
          joinCode: organizationData.joinCode,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert("Successfully joined organization!");
        setUserOrganization(data.organization); // ✅ Update state immediately
        setIsJoiningOrganization(false);
      } else {
        alert("❌ Failed to join: " + data.message);
      }
    } catch (error) {
      console.error("❌ Error joining organization:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  const handleLeaveOrganization = async () => {
    const confirmLeave = window.confirm("Are you sure you want to leave this organization?");
    if (!confirmLeave) return;
  
    try {
      const response = await fetch("http://localhost:5000/organization/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userLoginId: localStorage.getItem("userLoginId"),
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert("Successfully left the organization.");
        setUserOrganization(null); // ✅ Ensure UI updates
      } else {
        alert("❌ Failed to leave: " + data.message);
      }
    } catch (error) {
      console.error("❌ Error leaving organization:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
  

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
    const userLoginId = localStorage.getItem("userLoginId");

    if (!token) {
        navigate("/login"); 
        return;
    }

    setUser({
        firstName: storedFirstName || "User",
        lastName: storedLastName || "",
    });

      // Fetch user projects
      const fetchProjects = async () => {
        try {
          const response = await fetch(`http://localhost:5001/projects/user/${userLoginId}`);
          const data = await response.json();
    
          console.log("🟢 Projects received in frontend:", data); // ✅ Debugging log
    
          if (data.success) {
            setProjects(data.projects);
          } else {
            console.error("❌ Failed to fetch projects");
          }
        } catch (error) {
          console.error("❌ Error fetching projects:", error);
        }
      };
    
      fetchProjects();

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5001/profile/${userLoginId}`);
        const data = await response.json();
  
        if (data.success) {
          setUser({
            firstName: data.user.firstName || "User",
            lastName: data.user.lastName || "",
            bio: data.user.bio || "No bio added.",
            gender: data.user.gender || "Not specified",
            secondaryEmail: data.user.secondaryEmail || "Not added",
            team: data.user.team || "Not assigned",
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
  
    fetchUserProfile();
  

    // Fetch user writeups
    const fetchWriteups = async () => {
        try {
            const response = await fetch(`http://localhost:5001/writeup/user/${userLoginId}`);
            const data = await response.json();

            if (data.success) {
                setWriteups(data.writeups);
            }
        } catch (error) {
            console.error("Error fetching writeups:", error);
        }
    };
    
    fetchWriteups();

    const fetchAchievements = async () => {
      try {
        const userLoginId = localStorage.getItem("userLoginId");
        const response = await fetch(`http://localhost:5000/achievements/user/${userLoginId}`);
        const data = await response.json();
    
        console.log("🟢 Achievements received:", data); // ✅ Debugging log
    
        if (data.success) {
          setAchievements(data.achievements);
        }
      } catch (error) {
        console.error("❌ Error fetching achievements:", error);
      }
    };
    
    fetchAchievements();

    const fetchUserOrganization = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/organization/user/${localStorage.getItem("userLoginId")}`
        );
        const data = await response.json();
  
        console.log("🟢 Fetched Organization Data:", data);
  
        if (data.success) {
          setUserOrganization(data.organization);
        } else {
          setUserOrganization(null);
        }
      } catch (error) {
        console.error("❌ Error fetching user organization:", error);
      }
    };
  
    fetchUserOrganization();

  }, [navigate]);

  return (
    
<div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50">
      <NavBar />
      <div className="container mx-auto p-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ✅ Profile Info Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8 flex flex-col items-center">
              <img
                src={user.profilePicture}
                alt="User Avatar"
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />

              <h2 className="text-2xl font-bold text-gray-800">{`${user.firstName} ${user.lastName}`}</h2>
              <p className="text-gray-500">Cybersecurity Analyst</p>

              <p className="text-gray-600 text-center mt-4">{user.bio || "No bio added."}</p>
              <p className="text-gray-500 mt-2">Gender: {user.gender || "Not specified"}</p>
              <p className="text-gray-500">Team: <span className="font-semibold text-blue-600">{user.team}</span></p>
              <p className="text-gray-500">Secondary Email: {user.secondaryEmail || "Not added"}</p>
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg flex items-center"
                onClick={() => {
                  setEditData({
                    bio: user.bio || "",
                    gender: user.gender || "",
                    secondaryEmail: user.secondaryEmail || "",
                    team: user.team || "Red",
                  });
                  setIsEditing(true);
                }}
              >
                <Edit className="h-5 w-5 mr-2" /> Edit Profile
              </button>

              {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            {/* Profile Picture Upload */}
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg p-2 mb-3"
              onChange={(e) => handleImageUpload(e)}
            />

            {/* Display the selected image preview */}
            {editData.profilePicture && (
              <img
                src={editData.profilePicture}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover mt-2"
              />
            )}
            {/* Bio */}
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea 
              className="w-full border rounded-lg p-2 mb-3"
              value={editData.bio}
              onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
            />

            {/* Gender */}
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select 
              className="w-full border rounded-lg p-2 mb-3"
              value={editData.gender}
              onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {/* Secondary Email */}
            <label className="block text-sm font-medium text-gray-700">Secondary Email</label>
            <input 
              type="email" 
              className="w-full border rounded-lg p-2 mb-3"
              value={editData.secondaryEmail}
              onChange={(e) => setEditData({ ...editData, secondaryEmail: e.target.value })}
            />

            {/* Team */}
            <label className="block text-sm font-medium text-gray-700">Team</label>
            <select 
              className="w-full border rounded-lg p-2 mb-3"
              value={editData.team}
              onChange={(e) => setEditData({ ...editData, team: e.target.value })}
            >
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Purple">Purple</option>
            </select>

            {/* Save & Cancel Buttons */}
            <div className="flex justify-between">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleEditProfile}>Save</button>
              <button className="bg-gray-400 text-white px-4 py-2 rounded-lg" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}    

              <div className="mt-6 space-x-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <MessageCircle className="h-5 w-5 inline-block mr-2" /> Message
                </button>
                <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <Shield className="h-5 w-5 inline-block mr-2" /> Follow
                </button>
              </div>

              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-pink-600">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Github className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Organization Card - New Section */}
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Current Organization</h3>

            {userOrganization ? (
              // ✅ Show Organization Info if User is Part of One
              <div className="group flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src={userOrganization.logo || "/Icons/org-placeholder.png"}
                  alt={userOrganization.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4
                    className="font-semibold text-gray-800 cursor-pointer group-hover:text-blue-600 flex items-center gap-2"
                    onClick={() => navigate("/organization")}
                  >
                    {userOrganization.name}
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-gray-600">{userOrganization.role}</p>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  onClick={handleLeaveOrganization}
                >
                  Leave
                </button>
              </div>
            ) : (
              // ✅ Show Placeholder if Not Part of Any Organization
              <div className="flex flex-col items-center text-gray-500">
                <p className="text-sm">You are not part of any organization.</p>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg"
                  onClick={() => setIsJoiningOrganization(true)}
                >
                  Join Organization
                </button>
              </div>
            )}

            {/* ✅ Join Organization Modal */}
            {isJoiningOrganization && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-xl font-bold mb-4">Join Organization</h2>

                  <label className="block text-sm font-medium text-gray-700">Organization Email</label>
                  <input
                    type="email"
                    className="w-full border rounded-lg p-2 mb-3"
                    value={organizationData.email}
                    onChange={(e) => setOrganizationData({ ...organizationData, email: e.target.value })}
                  />

                  <label className="block text-sm font-medium text-gray-700">Join Code</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2 mb-3"
                    value={organizationData.joinCode}
                    onChange={(e) => setOrganizationData({ ...organizationData, joinCode: e.target.value })}
                  />

                  <div className="flex justify-between">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleJoinOrganization}>
                      Join
                    </button>
                    <button className="bg-gray-400 text-white px-4 py-2 rounded-lg" onClick={() => setIsJoiningOrganization(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

              <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Certifications & Achievements</h3>

                {/* ✅ Add Achievement Button */}
                <button 
                  onClick={() => { 
                    setIsAddingAchievement(true);
                    setEditAchievement(null);
                    setAchievementData({ title: "", linkURL: "", achievementDate: "" });
                  }}
                  className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mt-2"
                >
                  <FaPlus className="h-5 w-5 mr-2" /> Add Achievement
                </button>

                <div className="space-y-4 mt-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <p className="font-semibold text-gray-800">{achievement.Title}</p>
                        <p className="text-sm text-gray-500">
                          {achievement.achievementDate && !isNaN(new Date(achievement.achievementDate))
                            ? new Date(achievement.achievementDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              })
                            : "No Date Available"}
                        </p>
                        <a href={achievement.LinkURL} className="text-blue-500 hover:underline text-sm">
                          View Certificate
                        </a>
                      </div>
                      <div>
                        <button 
                          onClick={() => { 
                            setEditAchievement({
                              AchievementsID: achievement.AchievementsID || achievement.achievementId, // ✅ Ensure ID is set
                              title: achievement.Title,
                              linkURL: achievement.LinkURL,
                              achievementDate: achievement.AchievementDate,
                            });                            
                            setAchievementData({
                              title: achievement.Title,
                              linkURL: achievement.LinkURL,
                              achievementDate: achievement.AchievementDate,
                            });
                            setIsAddingAchievement(true);
                            
                          }}
                          className="text-yellow-500 hover:text-yellow-600 px-3"
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={async () => {
                            if (window.confirm("Are you sure you want to delete this achievement?")) {
                              await fetch(`http://localhost:5000/achievements/delete/${achievement.AchievementsID}`, {
                                method: "DELETE",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                              })
                              .then(response => {
                                if (!response.ok) {
                                  throw new Error(`Server error: ${response.status}`);
                                }
                                return response.json();
                              })
                              .then(data => {
                                if (data.success) {
                                  setAchievements(achievements.filter(a => a.AchievementsID !== achievement.AchievementsID));
                                } else {
                                  alert("Failed to delete achievement: " + data.message);
                                }
                              })
                              .catch(error => {
                                console.error("❌ Error deleting achievement:", error);
                                alert("An error occurred while deleting. Check console.");
                              });
                              
                              setAchievements(achievements.filter((a) => a.AchievementsID !== achievement.Achievements));
                            }
                          }}
                          className="text-red-500 hover:text-red-600 px-3"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ✅ Achievement Modal */}
                {isAddingAchievement && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                      <h2 className="text-xl font-bold mb-4">{editAchievement ? "Edit Achievement" : "Add Achievement"}</h2>

                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input 
                        type="text" 
                        className="w-full border rounded-lg p-2 mb-3"
                        value={achievementData.title}
                        onChange={(e) => setAchievementData({ ...achievementData, title: e.target.value })}
                      />

                      <label className="block text-sm font-medium text-gray-700">Certificate Link</label>
                      <input 
                        type="text" 
                        className="w-full border rounded-lg p-2 mb-3"
                        value={achievementData.linkURL}
                        onChange={(e) => setAchievementData({ ...achievementData, linkURL: e.target.value })}
                      />

                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input 
                        type="date" 
                        className="w-full border rounded-lg p-2 mb-3"
                        value={achievementData.achievementDate}
                        onChange={(e) => setAchievementData({ ...achievementData, achievementDate: e.target.value })}
                      />

                      <div className="flex justify-between">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleSaveAchievement}>
                          {editAchievement ? "Update" : "Save"}
                        </button>
                        <button className="bg-gray-400 text-white px-4 py-2 rounded-lg" onClick={() => setIsAddingAchievement(false)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>


              {/* ✅ Projects Section  */}
              <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8">
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Projects</h3>

                  {/* Add Project Button */}
                  <button 
                    onClick={() => { 
                      setIsAddingProject(true); 
                      setEditProject(null); 
                      setProjectData({ title: "", description: "", tags: "" }); 
                    }}
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mt-2"
                  >
                    <FaPlus className="h-5 w-5 mr-2" /> Add Project
                  </button>
                </div>  
                <div className="space-y-6">
                  {projects.length > 0 ? (
                    projects.map((project, index) => (
                      <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0 flex justify-between items-start">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800">{project.Title}</h4>
                          <p className="text-gray-600 mt-2">{project.Description}</p>
                          <div className="flex gap-2 mt-3">
                            {project.Tags?.split(",").map((tag, tagIndex) => (
                              <span key={tagIndex} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button 
                          onClick={() => { 
                            setEditProject(project); // ✅ Set project to be edited
                            setProjectData({
                              title: project.Title || "",
                              description: project.Description || "",
                              tags: project.Tags || "",
                            }); 
                            setIsAddingProject(true);
                          }}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No projects added yet.</p>
                  )}
                </div>
              </div>
            
            {/* ✅ Writeups Section */}
            <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8 mt-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Writeups</h3>
              {writeups.length === 0 ? (
                <p className="text-gray-500">No writeups yet.</p>
              ) : (
                <div className="overflow-x-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-500">
                  <div className="flex space-x-6 p-4">
                    {writeups.slice().reverse().map((writeup, index) => ( 
                      <Link 
                        to={`/writeup/${writeup.UserWriteupid}`} // ✅ Use correct column name
                        key={index} 
                        className="min-w-[300px] max-w-[400px] bg-gray-200 rounded-lg p-4 shadow-lg transition hover:bg-gray-300"
                      >
                        <h4 className="text-lg font-semibold text-gray-800">{writeup.Title || "Untitled"}</h4>
                        <p className="text-sm text-gray-500">{new Date(writeup.Date).toDateString() || "Unknown Date"}</p>
                        <p className="text-gray-600 mt-2">
                          {writeup.Content ? writeup.Content.slice(0, 100) + "..." : "No content available"}
                        </p>
                        <span className="text-blue-500 font-semibold">{writeup.Category || "Uncategorized"}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

        {/* ✅ Recent Activity Section */}
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {writeups.length > 0 ? (
              writeups.slice(-3).reverse().map((writeup, index) => ( // ✅ Take last 3 and reverse
                <div key={index} className="flex items-center">
                  <FileText className="h-6 w-6 text-blue-500 mr-4" /> 
                  <p className="text-gray-600">
                    Posted writeup on <span className="font-semibold">{writeup.Title}</span> -{" "}
                    <span className="text-blue-600">
                      {writeup.Category === "THM" ? "TryHackMe" : writeup.Category === "HTB" ? "HackTheBox" : writeup.Category}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent activity.</p>
            )}
          </div>
        </div>

              {/*Adding post */}
            <button
              onClick = {() => navigate('/Writeup')}
              className = 'fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition'
            >
              <FaPlus size = {24} />
            </button>
            {/* ✅ Project Modal - Place it Here, Below the Grid Layout */}
            {isAddingProject && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-xl font-bold mb-4">{editProject ? "Edit Project" : "Add Project"}</h2>

                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input 
                    type="text" 
                    className="w-full border rounded-lg p-2 mb-3"
                    value={projectData.title}
                    onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                  />

                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea 
                    className="w-full border rounded-lg p-2 mb-3"
                    value={projectData.description}
                    onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                  />

                  <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                  <input 
                    type="text" 
                    className="w-full border rounded-lg p-2 mb-3"
                    value={projectData.tags}
                    onChange={(e) => setProjectData({ ...projectData, tags: e.target.value })}
                  />

                  <div className="flex justify-between">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleSaveProject}>
                      {editProject ? "Update" : "Save"}
                    </button>
                    <button className="bg-gray-400 text-white px-4 py-2 rounded-lg" onClick={() => setIsAddingProject(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
