import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import Card from '../components/common/Card';
import { 
  Award, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Calendar,
  Filter,
  Search
} from 'lucide-react';
import { fetchMockLeaderboard, LeaderboardEntry } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';

const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true);
      try {
        const data = await fetchMockLeaderboard();
        setEntries(data);
      } catch (error) {
        console.error('Error loading leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadLeaderboard();
  }, [timeRange]);

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-amber-500 text-white';
      case 2: return 'bg-gray-300 text-gray-800';
      case 3: return 'bg-amber-700 text-white';
      default: return 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getRankChange = (id: string) => {
    // This would normally use historical data from the API
    // For the demo, we'll return random values
    const options = [1, 0, -1, 2, -2];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };

  const renderRankChange = (change: number) => {
    if (change > 0) {
      return (
        <div className="flex items-center text-green-600 text-sm">
          <TrendingUp size={14} className="mr-1" /> +{change}
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="flex items-center text-red-600 text-sm">
          <TrendingDown size={14} className="mr-1" /> {change}
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-gray-500 text-sm">
          <Minus size={14} className="mr-1" /> 0
        </div>
      );
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Training Leaderboard</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              See how your training progress compares with your colleagues
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search trainees..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md w-full sm:w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <div className="relative flex items-center">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="alltime">All Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Top 3 winners podium */}
        <div className="mb-12">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {/* 2nd place */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-300 mb-2">
                <img
                  src={entries[1]?.avatar || "https://via.placeholder.com/80"}
                  alt={entries[1]?.name || "Second Place"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 text-gray-800 font-bold mb-2">
                2
              </div>
              <h3 className="font-medium text-center">{entries[1]?.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{entries[1]?.score} pts</p>
              <div className="h-24 w-full bg-gray-300 dark:bg-gray-700 rounded-t-lg mt-4 flex items-end justify-center">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200 pb-2">
                  {entries[1]?.completedModules} Modules
                </div>
              </div>
            </div>
            
            {/* 1st place */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 mb-2">
                <Award size={32} className="text-amber-500" />
              </div>
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-amber-500 mb-2">
                <img
                  src={entries[0]?.avatar || "https://via.placeholder.com/96"}
                  alt={entries[0]?.name || "First Place"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-500 text-white font-bold mb-2">
                1
              </div>
              <h3 className="font-medium text-center">{entries[0]?.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{entries[0]?.score} pts</p>
              <div className="h-32 w-full bg-amber-500 dark:bg-amber-600 rounded-t-lg mt-4 flex items-end justify-center">
                <div className="text-sm font-medium text-white pb-2">
                  {entries[0]?.completedModules} Modules
                </div>
              </div>
            </div>
            
            {/* 3rd place */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-amber-700 mb-2">
                <img
                  src={entries[2]?.avatar || "https://via.placeholder.com/64"}
                  alt={entries[2]?.name || "Third Place"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-700 text-white font-bold mb-2">
                3
              </div>
              <h3 className="font-medium text-center">{entries[2]?.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{entries[2]?.score} pts</p>
              <div className="h-16 w-full bg-amber-700 dark:bg-amber-800 rounded-t-lg mt-4 flex items-end justify-center">
                <div className="text-sm font-medium text-white pb-2">
                  {entries[2]?.completedModules} Modules
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full leaderboard */}
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Trainee
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Completed
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Progress
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {entries.map((entry) => {
                  const isCurrentUser = currentUser?.name === entry.name;
                  const rankChange = getRankChange(entry.id);
                  
                  return (
                    <tr 
                      key={entry.id} 
                      className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${isCurrentUser ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getMedalColor(entry.rank)}`}>
                          {entry.rank}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative">
                            <img className="h-10 w-10 rounded-full" src={entry.avatar} alt={entry.name} />
                            {isCurrentUser && (
                              <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full h-4 w-4 border-2 border-white dark:border-gray-800"></div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {entry.name} {isCurrentUser && <span className="text-xs text-blue-600 dark:text-blue-400">(You)</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {entry.completedModules} Modules
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1 max-w-[150px]">
                          <div 
                            className={`h-2.5 rounded-full ${
                              entry.progress >= 80 
                                ? 'bg-green-600' 
                                : entry.progress >= 40 
                                  ? 'bg-amber-500' 
                                  : 'bg-red-500'
                            }`} 
                            style={{ width: `${entry.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {entry.progress}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{entry.score} pts</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderRankChange(rankChange)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Leaderboard;