import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserPlus, UserCheck} from 'lucide-react';

export default function SuggestedUsers() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([
      { id: 1, name: "Walter White", role: "Penetration Tester", isFollowing: false },
      { id: 2, name: "Atharva Umbre", role: "Security Engineer", isFollowing: false },
      { id: 3, name: "Aditya Chikunath", role: "CTF Enthusiast", isFollowing: false },
    ]);

    const toggleFollow = (id) => {
      setUsers(users.map(user =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      ));
    };
    return (
        <div className = "min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 p-8">
            <h1 className = "text-4xl font-bold text-blue-600 text-center mb-6">Discover Users</h1>
            <div className="max-w-3xl mx-auto space-y-6">
        {users.map(user => (
          <div key={user.id} className="bg-white/90 backdrop-blur-xl shadow-xl rounded-xl p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-500">{user.role}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate(`/profile/${user.id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                View Profile
              </button>

              {/* Follow/Unfollow Button */}
              <button
                onClick={() => toggleFollow(user.id)}
                className={`px-4 py-2 rounded-lg transition flex items-center ${
                  user.isFollowing ? "bg-gray-500 hover:bg-gray-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {user.isFollowing ? <UserCheck className="h-5 w-5 mr-2" /> : <UserPlus className="h-5 w-5 mr-2" />}
                {user.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          </div>
        ))}
      </div>
        </div>

    )

}