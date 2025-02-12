import { ArrowLeft, Calendar, MessageCircle, Shield, Users } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function OrganizationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Organization data - In a real app, this would come from an API
  const organizationsData = {
    cyberguard: {
      name: "CyberGuard Solutions",
      type: "Company",
      description: "Leading cybersecurity solutions provider specializing in enterprise security",
      memberCount: 500,
      founded: "2018",
      logo: "/api/placeholder/100/100",
      events: [
        { title: "Security Workshop", date: "March 25, 2024" },
        { title: "Threat Analysis Seminar", date: "April 2, 2024" }
      ]
    },
    ehs: {
      name: "Ethical Hackers Society",
      type: "Club",
      description: "Community of security researchers and ethical hackers promoting cybersecurity awareness",
      memberCount: 250,
      founded: "2020",
      logo: "/api/placeholder/100/100",
      events: [
        { title: "Capture The Flag Event", date: "March 30, 2024" },
        { title: "Penetration Testing Workshop", date: "April 15, 2024" }
      ]
    },
    srl: {
      name: "Security Research Lab",
      type: "Research Group",
      description: "Academic research group focusing on emerging security threats and defenses",
      memberCount: 75,
      founded: "2019",
      logo: "/api/placeholder/100/100",
      events: [
        { title: "Research Symposium", date: "April 5, 2024" },
        { title: "Zero-Day Defense Workshop", date: "April 20, 2024" }
      ]
    }
  };

  const org = organizationsData[id];

  // Handle case where organization is not found
  if (!org) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800">Organization not found</h1>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50">
      <div className="container mx-auto p-6">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Profile
        </button>

        {/* Organization Header */}
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8 mb-6">
          <div className="flex items-center gap-6">
            <img
              src={org.logo}
              alt={org.name}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-800">{org.name}</h1>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {org.type}
                </span>
              </div>
              <p className="text-gray-600 mt-2">{org.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Members</p>
                <p className="font-semibold text-gray-800">{org.memberCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Founded</p>
                <p className="font-semibold text-gray-800">{org.founded}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                <MessageCircle className="h-5 w-5 inline-block mr-2" /> Message
              </button>
              <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Shield className="h-5 w-5 inline-block mr-2" /> Join
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            {org.events.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-800">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}