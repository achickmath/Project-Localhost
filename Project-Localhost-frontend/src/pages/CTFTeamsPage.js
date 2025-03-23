import { Code, Filter, MessageCircle, PlusCircle, Search, Send, Shield, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';

export default function CTFTeamsPage() {
  // State management
  const [stage, setStage] = useState('initial'); // initial, enterPool, searchTeam, teamResults, chat
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    specialty: '',
    lookingFor: [],
    teamSize: 2
  });
  
  // Track whether user came from pool entry or direct search
  const [cameFromPool, setCameFromPool] = useState(false);
  
  // Mock data for team members (this would come from backend)
  const availableTeammates = [
    { id: 1, name: 'Alex Chen', email: 'alex.chen@example.com', specialty: 'Crypto' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', specialty: 'Web Exploitation' },
    { id: 3, name: 'Marcus Williams', email: 'marcus.w@example.com', specialty: 'Reverse Engineering' },
    { id: 4, name: 'Jamie Black', email: 'jamie.b@example.com', specialty: 'Forensics' },
    { id: 5, name: 'Dana Lee', email: 'dana.l@example.com', specialty: 'Binary Exploitation' },
    { id: 6, name: 'Jordan Patel', email: 'jordan.p@example.com', specialty: 'OSINT' },
    { id: 7, name: 'Taylor Smith', email: 'taylor.s@example.com', specialty: 'Crypto' },
    { id: 8, name: 'Robin Zhang', email: 'robin.z@example.com', specialty: 'Web Exploitation' },
    { id: 9, name: 'Casey Wilson', email: 'casey.w@example.com', specialty: 'Binary Exploitation' },
  ];
  
  // Mock chat data
  const [messages, setMessages] = useState([
    { sender: 'Alex Chen', text: 'Hey team! Looking forward to our first CTF together!', time: '10:30 AM' },
    { sender: 'Sarah Johnson', text: 'Me too! Anyone want to practice on some challenges this weekend?', time: '10:32 AM' },
    { sender: 'System', text: 'Marcus Williams has joined the chat', time: '10:40 AM' },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [selectedTeammates, setSelectedTeammates] = useState([]);
  
  // Handler for form submissions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (stage === 'enterPool') {
      // This would send data to backend to add to pool
      console.log('Adding to pool:', userData);
      // Move to team search after adding to pool
      setCameFromPool(true);
      setStage('searchTeam');
    } else if (stage === 'searchTeam') {
      // Find team members based on criteria
      const matches = findTeamMembers();
      setSelectedTeammates(matches);
      setStage('teamResults');
    }
  };
  
  // Handler for specialty selection
  const handleSpecialtyChange = (e) => {
    setUserData({ ...userData, specialty: e.target.value });
  };
  
  // Handler for looking for skills selection
  const handleSkillsChange = (skill) => {
    if (userData.lookingFor.includes(skill)) {
      setUserData({ 
        ...userData, 
        lookingFor: userData.lookingFor.filter(s => s !== skill) 
      });
    } else {
      setUserData({ 
        ...userData, 
        lookingFor: [...userData.lookingFor, skill] 
      });
    }
  };
  
  // Handler for sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const message = {
      sender: userData.name || 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };
  
  // Function to find team members based on criteria
  const findTeamMembers = () => {
    // Filter by specialties user is looking for
    let filtered = availableTeammates;
    
    if (userData.lookingFor.length > 0) {
      filtered = availableTeammates.filter(teammate => 
        userData.lookingFor.includes(teammate.specialty)
      );
    }
    
    // Randomize and limit to team size
    return shuffleArray(filtered).slice(0, userData.teamSize);
  };
  
  // Utility function to shuffle array
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  // List of CTF specialties
  const specialties = [
    'Crypto', 
    'Web Exploitation',
    'Reverse Engineering',
    'Forensics',
    'Binary Exploitation',
    'OSINT'
  ];
  
  // Initial selection screen
  if (stage === 'initial') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto p-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">CTF Team Finder</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect teammates for your next Capture The Flag competition
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Looking for a Team */}
            <div className="bg-white/90 backdrop-blur-xl shadow-lg rounded-xl p-8 transition-all hover:shadow-xl flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-blue-50 rounded-full">
                <UserPlus className="h-12 w-12 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Join Existing Teams</h2>
              <p className="text-gray-600 mb-6">
                Find teams that are looking for someone with your skills and experience
              </p>
              <button 
                onClick={() => {
                  setCameFromPool(false);
                  setStage('searchTeam');
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors w-full"
              >
                Find a Team
              </button>
            </div>
            
            {/* Enter Name into Pool */}
            <div className="bg-white/90 backdrop-blur-xl shadow-lg rounded-xl p-8 transition-all hover:shadow-xl flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-purple-50 rounded-full">
                <PlusCircle className="h-12 w-12 text-purple-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Add Yourself to Pool</h2>
              <p className="text-gray-600 mb-6">
                Make yourself available for teams looking for members with your expertise
              </p>
              <button 
                onClick={() => setStage('enterPool')}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors w-full"
              >
                Join the Pool
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Enter pool information screen
  if (stage === 'enterPool') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Join the Talent Pool</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Add your information to make yourself discoverable by teams looking for your skills
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-xl shadow-lg rounded-xl p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Your Name</label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Your Specialty</label>
                  <select
                    value={userData.specialty}
                    onChange={handleSpecialtyChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Select your specialty</option>
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => setStage('initial')}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Add to Pool & Find Team
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Search for team screen
  if (stage === 'searchTeam') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Find Team Members</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Search for the perfect teammates based on your requirements
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-xl shadow-lg rounded-xl p-8">
              <form onSubmit={handleSubmit}>
                {/* Only show these fields if not coming from pool */}
                {!cameFromPool && (
                  <>
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2 font-medium">Your Name</label>
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2 font-medium">Your Specialty</label>
                      <select
                        value={userData.specialty}
                        onChange={handleSpecialtyChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      >
                        <option value="">Select your specialty</option>
                        {specialties.map((specialty) => (
                          <option key={specialty} value={specialty}>
                            {specialty}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Team Size</label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={userData.teamSize}
                      onChange={(e) => setUserData({...userData, teamSize: parseInt(e.target.value)})}
                      className="w-full mr-4"
                    />
                    <span className="text-lg font-semibold text-gray-700">{userData.teamSize}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">Number of teammates you need</p>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Skills Needed</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {specialties.map((specialty) => (
                      <div 
                        key={specialty}
                        onClick={() => handleSkillsChange(specialty)}
                        className={`
                          p-3 rounded-lg border cursor-pointer transition-colors flex items-center
                          ${userData.lookingFor.includes(specialty) 
                            ? 'bg-blue-50 border-blue-300 text-blue-700' 
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}
                        `}
                      >
                        <Code className="h-4 w-4 mr-2" />
                        {specialty}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => setStage('initial')}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Find Teammates
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Team results screen
  if (stage === 'teamResults') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Perfect Team</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've found {selectedTeammates.length} potential teammates that match your criteria
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-xl shadow-lg rounded-xl p-8 mb-8">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Users className="h-6 w-6 mr-2 text-blue-500" /> 
                  Potential Teammates
                </h2>
                <button 
                  onClick={() => setStage('chat')}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Start Team Chat
                </button>
              </div>
              
              <div className="space-y-4">
                {selectedTeammates.map((teammate) => (
                  <div 
                    key={teammate.id}
                    className="bg-gray-50 rounded-lg p-6 flex flex-col sm:flex-row sm:items-center gap-4 border border-gray-100"
                  >
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800">{teammate.name}</h3>
                      <p className="text-gray-600">{teammate.email}</p>
                    </div>
                    
                    <div className="bg-blue-50 px-4 py-2 rounded-lg flex items-center self-start">
                      <Shield className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="font-medium text-blue-700">{teammate.specialty}</span>
                    </div>
                    
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors sm:self-center self-end">
                      Contact
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between">
                  <button
                    onClick={() => setStage('searchTeam')}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg transition-colors flex items-center"
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    Refine Search
                  </button>
                  <button
                    onClick={() => setStage('chat')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Start Team Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Team chat screen
  if (stage === 'chat') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex flex-col">
        <div className="container mx-auto p-6 flex-1 flex flex-col">
          <div className="flex-1 flex flex-col">
            <div className="bg-white/90 backdrop-blur-xl shadow-lg rounded-xl p-6 mb-6 flex justify-between items-center">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-full mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Team Chat</h1>
                  <p className="text-gray-600">Your new CTF team ({selectedTeammates.length + 1} members)</p>
                </div>
              </div>
              <button
                onClick={() => setStage('teamResults')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Back to Team
              </button>
            </div>
            
            <div className="bg-white/90 backdrop-blur-xl shadow-lg rounded-xl flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Team Discussion</h2>
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    {messages.length} messages
                  </span>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.sender === 'System' ? 'justify-center' : 'flex-col'}`}
                  >
                    {message.sender === 'System' ? (
                      <div className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                        {message.text}
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center mb-1">
                          <span className="font-semibold text-gray-800">{message.sender}</span>
                          <span className="ml-2 text-xs text-gray-500">{message.time}</span>
                        </div>
                        <div className={`p-3 rounded-lg max-w-md ${
                          message.sender === (userData.name || 'You')
                            ? 'bg-blue-500 text-white self-end'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {message.text}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Type your message..."
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-r-lg transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Fallback (shouldn't happen)
  return <div>Loading...</div>;
}