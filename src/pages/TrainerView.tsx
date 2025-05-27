import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { 
  Users, 
  BookOpen, 
  BarChart2, 
  Settings, 
  PlusCircle,
  Search,
  Filter,
  ChevronRight,
  Edit,
  Eye,
  UserPlus
} from 'lucide-react';
import { fetchMockTrainees, fetchMockModules } from '../utils/mockData';

// Trainer Dashboard Component
const TrainerDashboard: React.FC = () => {
  const [trainees, setTrainees] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const traineeData = await fetchMockTrainees();
        const moduleData = await fetchMockModules();
        
        setTrainees(traineeData);
        setModules(moduleData);
      } catch (error) {
        console.error('Error loading trainer dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trainer Dashboard</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage your training program and monitor trainee progress
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            icon={<UserPlus size={16} />}
            onClick={() => navigate('/trainer/trainees/add')}
          >
            Add Trainee
          </Button>
          <Button 
            icon={<PlusCircle size={16} />}
            onClick={() => navigate('/trainer/modules/create')}
          >
            Create Module
          </Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="flex items-center slide-up" style={{animationDelay: '0.1s'}}>
          <div className="mr-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Users size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Trainees</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{trainees.length}</p>
          </div>
        </Card>
        
        <Card className="flex items-center slide-up" style={{animationDelay: '0.2s'}}>
          <div className="mr-4 p-3 bg-teal-100 dark:bg-teal-900 rounded-full">
            <BookOpen size={24} className="text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Modules</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{modules.length}</p>
          </div>
        </Card>
        
        <Card className="flex items-center slide-up" style={{animationDelay: '0.3s'}}>
          <div className="mr-4 p-3 bg-amber-100 dark:bg-amber-900 rounded-full">
            <BarChart2 size={24} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Completion</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">58%</p>
          </div>
        </Card>
        
        <Card className="flex items-center slide-up" style={{animationDelay: '0.4s'}}>
          <div className="mr-4 p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
            <Settings size={24} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Assessments</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
          </div>
        </Card>
      </div>

      {/* Recent trainees */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Trainees</h2>
          <Link to="/trainer/trainees" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        
        <Card className="overflow-hidden rounded-lg slide-up" style={{animationDelay: '0.5s'}}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Trainee
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Progress
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Modules
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {trainees.map((trainee) => (
                  <tr key={trainee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={trainee.avatar} alt={trainee.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{trainee.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{trainee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                        <div 
                          className={`h-2.5 rounded-full ${
                            trainee.progress >= 80 
                              ? 'bg-green-600' 
                              : trainee.progress >= 40 
                                ? 'bg-amber-500' 
                                : 'bg-red-500'
                          }`} 
                          style={{ width: `${trainee.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {trainee.progress}% Complete
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {trainee.completedModules} / {trainee.totalModules}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {trainee.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          onClick={() => navigate(`/trainer/trainees/${trainee.id}`)}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                          onClick={() => navigate(`/trainer/trainees/${trainee.id}/edit`)}
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Modules section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Training Modules</h2>
          <Link to="/trainer/modules" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.slice(0, 3).map((module, index) => (
            <Card 
              key={module.id} 
              className="flex flex-col h-full slide-up hover:shadow-lg transition-shadow duration-200" 
              style={{animationDelay: `${0.6 + (index * 0.1)}s`}}
              hover
              onClick={() => navigate(`/trainer/modules/${module.id}`)}
            >
              <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
                <img 
                  src={module.image} 
                  alt={module.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-grow">
                <div className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded-md mb-2">
                  {module.type === '3d' ? '3D Interactive' : module.type === 'video' ? 'Video' : 'Text'}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{module.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{module.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{module.duration}</span>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                      <Eye size={16} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                      <Edit size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Trainer View that includes routes to all trainer pages
const TrainerView: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TrainerDashboard />} />
        {/* Additional routes would be defined here */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Under Construction
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This page is currently being developed
            </p>
            <Button as={Link} to="/trainer">
              Return to Trainer Dashboard
            </Button>
          </div>
        } />
      </Routes>
    </Layout>
  );
};

export default TrainerView;