import { Award, Calendar, MapPin, MessageCircle, Shield, TrendingUp, Trophy, Users } from 'lucide-react';
import { useState } from 'react';

export default function OrganizationPage() {
  const [selectedOrg, setSelectedOrg] = useState(null);
  
  // Organizations data
  const organizations = [
    {
      id: 1,
      name: "CyberGuard Solutions",
      description: "Leading cybersecurity consulting and services",
      location: "San Francisco, CA",
      employees: "50-200 employees",
      founded: "Founded 2020",
      logo: "/api/placeholder/200/200",
      teamMembers: [
        {
          name: "Alex Chen",
          role: "Lead Security Analyst",
          avatar: "/api/placeholder/100/100"
        },
        {
          name: "Sarah Johnson",
          role: "Penetration Tester",
          avatar: "/api/placeholder/100/100"
        },
        {
          name: "Marcus Williams",
          role: "Security Engineer",
          avatar: "/api/placeholder/100/100"
        }
      ],
      projects: [
        {
          title: "Cloud Security Assessment",
          description: "Comprehensive security assessment of AWS infrastructure for Fortune 500 client"
        },
        {
          title: "Vulnerability Management Program",
          description: "Developed and implemented enterprise vulnerability management system"
        }
      ],
      achievements: [
        "2023 Cybersecurity Excellence Award",
        "SANS Top Security Consultancy 2022",
        "ISO 27001 Certified"
      ]
    },
    {
      id: 2,
      name: "HackMasters Elite",
      description: "Ethical hacking and penetration testing specialists",
      location: "Austin, TX",
      employees: "20-50 employees",
      founded: "Founded 2018",
      logo: "/api/placeholder/200/200",
      teamMembers: [
        {
          name: "Jamie Black",
          role: "Red Team Lead",
          avatar: "/api/placeholder/100/100"
        },
        {
          name: "Taylor Smith",
          role: "Exploit Developer",
          avatar: "/api/placeholder/100/100"
        },
        {
          name: "Dana Lee",
          role: "Social Engineering Specialist",
          avatar: "/api/placeholder/100/100"
        }
      ],
      projects: [
        {
          title: "Government Infrastructure Testing",
          description: "Conducted red team exercises for state-level infrastructure"
        },
        {
          title: "Banking Security Protocol Development",
          description: "Developed secure transaction protocols for banking applications"
        }
      ],
      achievements: [
        "DEF CON CTF Finalists 2023",
        "Black Hat Arsenal Presenter",
        "OSCP Certified Team"
      ]
    },
    {
      id: 3,
      name: "Digital Defenders Collective",
      description: "Community-focused cybersecurity education and research",
      location: "Seattle, WA",
      employees: "10-30 employees",
      founded: "Founded 2021",
      logo: "/api/placeholder/200/200",
      teamMembers: [
        {
          name: "Robin Zhang",
          role: "Education Director",
          avatar: "/api/placeholder/100/100"
        },
        {
          name: "Jordan Patel",
          role: "Research Coordinator",
          avatar: "/api/placeholder/100/100"
        },
        {
          name: "Casey Wilson",
          role: "Community Manager",
          avatar: "/api/placeholder/100/100"
        }
      ],
      projects: [
        {
          title: "Cybersecurity Education Platform",
          description: "Open-source learning platform for cybersecurity fundamentals"
        },
        {
          title: "Public Vulnerability Disclosure Program",
          description: "Coordinated disclosure program for public service organizations"
        }
      ],
      achievements: [
        "Community Choice Award 2022",
        "Educational Excellence in Cybersecurity",
        "Open Source Contribution Recognition"
      ]
    }
  ];

  // If an organization is selected, show its detailed page
  if (selectedOrg) {
    const org = organizations.find(o => o.id === selectedOrg);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto p-6">
          {/* Back button */}
          <button 
            onClick={() => setSelectedOrg(null)}
            className="mb-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            ← Back to Organizations
          </button>
          
          {/* Organization Detail Header */}
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <img
                src={org.logo}
                alt={`${org.name} Logo`}
                className="w-32 h-32 rounded-xl object-cover"
              />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-800">{org.name}</h1>
                <p className="text-gray-600 mt-2">{org.description}</p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    {org.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    {org.employees}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    {org.founded}
                  </div>
                </div>
                
                <div className="mt-6 flex gap-4 justify-center md:justify-start">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                    <MessageCircle className="h-5 w-5 inline-block mr-2" /> Contact
                  </button>
                  <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                    <Users className="h-5 w-5 inline-block mr-2" /> Follow
                  </button>
                  <a
                    href="/leaderboard"
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                  >
                    <TrendingUp className="h-5 w-5 mr-2" /> View Leaderboard
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Team Members Section */}
          <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Users className="h-6 w-6 mr-2 text-blue-500" /> Team Members
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {org.teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Projects Section */}
          <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-blue-500" /> Projects
            </h2>
            <div className="space-y-6">
              {org.projects.map((project, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Achievements Section */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-blue-500" /> Achievements
            </h2>
            <ul className="space-y-4">
              {org.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
  // Main organizations listing page
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto p-6">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">CTF Organizations</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover top cybersecurity teams and organizations participating in Capture The Flag competitions
          </p>
        </div>
        
        {/* Organizations List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {organizations.map(org => (
            <div key={org.id} className="bg-white/90 backdrop-blur-xl shadow-lg rounded-xl p-6 transition-all hover:shadow-xl">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={org.logo}
                  alt={`${org.name} Logo`}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                
                <div className="flex-1 text-center sm:text-left">
                  <h2 
                    className="text-2xl font-bold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors"
                    onClick={() => setSelectedOrg(org.id)}
                  >
                    {org.name}
                  </h2>
                  <p className="text-gray-600 mt-1">{org.description}</p>
                  
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start mt-3">
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {org.location}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      {org.employees}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-3 justify-center sm:justify-start">
                    <button 
                      onClick={() => setSelectedOrg(org.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-sm rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 text-sm rounded-lg transition-colors">
                      <Users className="h-4 w-4 inline-block mr-1" /> Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Leaderboard Link */}
        <div className="text-center">
          <a
            href="/leaderboard"
            className="inline-flex items-center bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors text-lg font-semibold"
          >
            <TrendingUp className="h-5 w-5 mr-2" /> View Global Leaderboard
          </a>
        </div>
      </div>
    </div>
  );
}
