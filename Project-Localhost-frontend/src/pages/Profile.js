import { Award, ExternalLink, FileText, Github, Instagram, Linkedin, MessageCircle, Shield, LogOut } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa';

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
          <h1 className="text-2xl font-bold text-blue-600">LocalHost</h1>
          <div className="flex items-center space-x-6">
            {/* ✅ Logout Button on the Right Side */}
            <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-full">
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

    // Fetch user writeups
    const fetchWriteups = async () => {
        try {
            const response = await fetch(`http://localhost:5000/writeup/user/${userLoginId}`);
            const data = await response.json();

            if (data.success) {
                setWriteups(data.writeups);
            }
        } catch (error) {
            console.error("Error fetching writeups:", error);
        }
    };

    fetchWriteups();
}, [navigate]);

  const projects = [
    {
      title: "Network Security Scanner",
      description: "Developed an automated security scanning tool for identifying vulnerabilities in enterprise networks",
      tags: ["Python", "Security", "Automation"]
    },
    {
      title: "Threat Detection System",
      description: "Built a real-time threat detection system using machine learning algorithms",
      tags: ["ML", "Python", "Security"]
    }
  ];


  const certifications = [
    {
      title: "Certified Information Systems Security Professional (CISSP)",
      date: "2023",
      link: "#"
    },
    {
      title: "Certified Ethical Hacker (CEH)",
      date: "2022",
      link: "#"
    }
  ];

  const organization = {
    name: "CyberGuard Solutions",
    role: "Senior Security Analyst",
    logo: "/api/placeholder/100/100",
    link: "/orgs"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50">
      <NavBar /> {/* ✅ Navigation Bar with Logout Button */}
      <div className="container mx-auto p-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8 flex flex-col items-center">
              <img
                src="/api/placeholder/400/400"
                alt="User Avatar"
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h2 className="text-2xl font-bold text-gray-800">{`${user.firstName} ${user.lastName}`}</h2>
              <p className="text-gray-500">Cybersecurity Analyst</p>

              <p className="text-gray-600 text-center mt-4">
                Passionate about cybersecurity and helping organizations stay protected in an evolving threat landscape.
              </p>

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
              <a 
                href={organization.link}
                className="group flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src={organization.logo}
                  alt={organization.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 flex items-center gap-2">
                    {organization.name}
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-gray-600">{organization.role}</p>
                </div>
              </a>
            </div>

             {/* Certifications */}
             <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Certifications</h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{cert.title}</p>
                      <p className="text-sm text-gray-500">{cert.date}</p>
                    </div>
                    <a href={cert.link} className="text-blue-500 hover:text-blue-600">
                      <Award className="h-5 w-5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

          {/* Projects Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Projects</h3>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <h4 className="text-xl font-semibold text-gray-800">{project.title}</h4>
                    <p className="text-gray-600 mt-2">{project.description}</p>
                    <div className="flex gap-2 mt-3">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Writeups Section */}
            <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8 mt-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Writeups</h3>
              {writeups.length === 0 ? (
                <p className="text-gray-500">No writeups yet.</p>
              ) : (
                <div className="overflow-x-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-500">
                  <div className="flex space-x-6 p-4">
                    {writeups.map((writeup, index) => (
                      <div key={index} className="min-w-[300px] max-w-[400px] bg-gray-200 rounded-lg p-4 shadow-lg">
                        <h4 className="text-lg font-semibold text-gray-800">{writeup.Title || "Untitled"}</h4>
                        <p className="text-sm text-gray-500">{new Date(writeup.Date).toDateString() || "Unknown Date"}</p>
                        <p className="text-gray-600 mt-2">
                          {writeup.Content ? writeup.Content.slice(0, 100) : "No content available"}...
                        </p>
                        <span className="text-blue-500 font-semibold">{writeup.Category || "Uncategorized"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          {/* Recent Activity Section */}
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {/* ✅ Dynamic Writeup Activity */}
              {writeups.length > 0 && writeups.slice(0, 3).map((writeup, index) => (
                <div key={index} className="flex items-center">
                  <FileText className="h-6 w-6 text-blue-500 mr-4" /> {/* ✅ Same icon */}
                  <p className="text-gray-600">
                    Posted writeup on <span className="font-semibold">{writeup.Title}</span> -{" "}
                    <span className="text-blue-600">
                      {writeup.Category === "THM" ? "TryHackMe" : writeup.Category === "HTB" ? "HackTheBox" : writeup.Category}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

              {/*Adding post */}
            <button
              onClick = {() => navigate('/Writeup')}
              className = 'fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition'
            >
              <FaPlus size = {24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
