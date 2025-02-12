import { Award, ExternalLink, FileText, Github, Instagram, Linkedin, MessageCircle, Shield } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  // Updated organizations data
  const organizations = [
    {
      name: "CyberGuard Solutions",
      role: "Senior Security Analyst",
      logo: "/api/placeholder/100/100",
      id: "cyberguard",
      type: "Company"
    },
    {
      name: "Ethical Hackers Society",
      role: "Community Lead",
      logo: "/api/placeholder/100/100",
      id: "ehs",
      type: "Club"
    },
    {
      name: "Security Research Lab",
      role: "Research Associate",
      logo: "/api/placeholder/100/100",
      id: "srl",
      type: "Research Group"
    }
  ];

  // Function to handle organization click
  const handleOrgClick = (orgId) => {
    navigate(`/organizations/${orgId}`);
  };

  // Rest of your existing data objects (projects, writeups, certifications)
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

  const writeups = [
    {
      title: "Understanding Supply Chain Attacks",
      date: "March 15, 2024",
      image: "/api/placeholder/300/200",
      summary: "An in-depth analysis of recent supply chain attacks and mitigation strategies"
    },
    {
      title: "Zero Trust Architecture Implementation",
      date: "February 28, 2024",
      image: "/api/placeholder/300/200",
      summary: "Step-by-step guide to implementing Zero Trust in modern organizations"
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8 flex flex-col items-center">
              <img
                src="/api/placeholder/400/400"
                alt="User Avatar"
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h2 className="text-2xl font-bold text-gray-800">John Doe</h2>
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

            {/* Organizations Card - Updated Section */}
            <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Current Organizations</h3>
              <div className="space-y-4">
                {organizations.map((org) => (
                  <div 
                    key={org.id}
                    onClick={() => handleOrgClick(org.id)}
                    className="group flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
                  >
                    <img
                      src={org.logo}
                      alt={org.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 flex items-center gap-2">
                          {org.name}
                          <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {org.type}
                        </span>
                      </div>
                      <p className="text-gray-600">{org.role}</p>
                    </div>
                  </div>
                ))}
              </div>
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
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Projects Section */}
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
            <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Writeups</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {writeups.map((writeup, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={writeup.image}
                        alt={writeup.title}
                        className="w-full h-48 object-cover transform transition-transform group-hover:scale-105"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mt-3 group-hover:text-blue-600">
                      {writeup.title}
                    </h4>
                    <p className="text-sm text-gray-500">{writeup.date}</p>
                    <p className="text-gray-600 mt-2">{writeup.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Section */}
            <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-blue-500 mr-4" />
                  <p className="text-gray-600">Commented on "Securing Your Remote Workforce" discussion</p>
                </div>
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-blue-500 mr-4" />
                  <p className="text-gray-600">Shared a new blog post: "Implementing Zero Trust in Enterprise Networks"</p>
                </div>
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-blue-500 mr-4" />
                  <p className="text-gray-600">Joined the "Cybersecurity Professionals" group</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}