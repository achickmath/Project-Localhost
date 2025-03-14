import { ArrowDown, ArrowUp, Award, ChevronLeft, Search, Shield, TrendingUp, Trophy } from 'lucide-react';
import React, { useState } from 'react';

export default function OrganizationLeaderboard() {
  const [timeFilter, setTimeFilter] = useState('month');
  const [categoryFilter, setCategoryFilter] = useState('overall');

  const leaderboardData = [
    {
      rank: 1,
      name: "CyberGuard Solutions",
      score: 9850,
      change: 2,
      achievements: 45,
      employees: "50-200",
      logo: "/api/placeholder/100/100"
    },
    {
      rank: 2,
      name: "SecureNet Systems",
      score: 9720,
      change: -1,
      achievements: 42,
      employees: "201-500",
      logo: "/api/placeholder/100/100"
    },
    {
      rank: 3,
      name: "Digital Fortress Inc",
      score: 9680,
      change: 1,
      achievements: 38,
      employees: "101-250",
      logo: "/api/placeholder/100/100"
    },
    // Add more organizations as needed
  ];

  const categories = [
    { id: 'overall', name: 'Overall Score', icon: Trophy },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'growth', name: 'Growth', icon: TrendingUp },
    { id: 'innovation', name: 'Innovation', icon: Shield },
  ];

  const timeframes = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'This Quarter' },
    { id: 'year', name: 'This Year' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <a 
            href="/organization" 
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to Organization
          </a>
          <h1 className="text-4xl font-bold text-gray-800">Organization Leaderboard</h1>
          <p className="text-gray-600 mt-2">Top performing organizations in cybersecurity</p>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search organizations..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setCategoryFilter(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    categoryFilter === category.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <category.icon className="h-5 w-5 mr-2" />
                  {category.name}
                </button>
              ))}
            </div>

            {/* Time Filter */}
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {timeframes.map(timeframe => (
                <option key={timeframe.id} value={timeframe.id}>
                  {timeframe.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4 p-8 border-b">
            {leaderboardData.slice(0, 3).map((org, index) => (
              <div 
                key={org.rank}
                className={`flex flex-col items-center ${
                  index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  index === 0 ? 'bg-yellow-100' : index === 1 ? 'bg-gray-100' : 'bg-orange-100'
                }`}>
                  <Trophy className={`h-8 w-8 ${
                    index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-500' : 'text-orange-500'
                  }`} />
                </div>
                <img
                  src={org.logo}
                  alt={org.name}
                  className="w-20 h-20 rounded-xl object-cover mb-4"
                />
                <h3 className="font-bold text-gray-800">{org.name}</h3>
                <p className="text-3xl font-bold mt-2">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </p>
                <p className="text-purple-600 font-bold mt-2">{org.score.toLocaleString()} pts</p>
              </div>
            ))}
          </div>

          {/* Rest of Rankings */}
          <div className="p-8">
            {leaderboardData.slice(3).map((org) => (
              <div 
                key={org.rank}
                className="flex items-center gap-6 py-4 border-b last:border-0"
              >
                <span className="text-2xl font-bold text-gray-400 w-12">
                  {org.rank}
                </span>
                <img
                  src={org.logo}
                  alt={org.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{org.name}</h3>
                  <p className="text-sm text-gray-600">{org.employees} employees</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600">{org.score.toLocaleString()} pts</p>
                  <div className={`flex items-center justify-end text-sm ${
                    org.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {org.change > 0 ? (
                      <ArrowUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(org.change)} positions
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}