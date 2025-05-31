import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ModuleRoadmap from '../components/features/ModuleRoadmap';
import { 
  BookOpen, 
  Award,
  CheckCircle,
  Clock,
  PlayCircle,
  MessageSquare,
  Filter,
  Search,
  ChevronRight,
  ArrowRight,
  Star
} from 'lucide-react';
import { fetchMockModules, fetchMockProgress, Module, mockModulesWithSections } from '../utils/mockData.ts';
import ChatbotInterface from '../components/features/ChatbotInterface';
import SubModuleContent from '../components/features/SubModuleContent';

// Trainee Dashboard Component
const TraineeDashboard: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState({
    completed: 0,
    inProgress: 0,
    notStarted: 0
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const moduleData = await fetchMockModules();
        const progressData = await fetchMockProgress('2'); // Using a mock trainee ID
        
        setModules(moduleData);
        setProgress(progressData);
      } catch (error) {
        console.error('Error loading trainee dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const filteredModules = modules.filter(module => {
    if (filter === 'all') return true;
    if (filter === 'completed') return module.completionRate === 100;
    if (filter === 'in-progress') return module.completionRate > 0 && module.completionRate < 100;
    if (filter === 'not-started') return module.completionRate === 0;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  const renderModuleTypeIcon = (type: '3d' | 'video' | 'text') => {
    switch (type) {
      case '3d':
        return <BookOpen size={18} />;
      case 'video':
        return <PlayCircle size={18} />;
      case 'text':
        return <MessageSquare size={18} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Training</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Track your progress and complete your assigned modules
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            as={Link} 
            to="/leaderboard"
            icon={<Award size={16} />}
          >
            View Leaderboard
          </Button>
        </div>
      </div>

      {/* Progress summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="flex items-center slide-up" style={{animationDelay: '0.1s'}}>
          <div className="mr-4 p-3 bg-green-100 dark:bg-green-900 rounded-full">
            <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{progress.completed}</p>
          </div>
        </Card>
        
        <Card className="flex items-center slide-up" style={{animationDelay: '0.2s'}}>
          <div className="mr-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Clock size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{progress.inProgress}</p>
          </div>
        </Card>
        
        <Card className="flex items-center slide-up" style={{animationDelay: '0.3s'}}>
          <div className="mr-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
            <BookOpen size={24} className="text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Not Started</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{progress.notStarted}</p>
          </div>
        </Card>
      </div>

      {/* Modules list with filters */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">My Modules</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search modules..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md w-full sm:w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full"
              >
                <option value="all">All Modules</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="not-started">Not Started</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredModules.map((module, index) => (
            <Card 
              key={module.id} 
              className="flex flex-col md:flex-row md:items-center slide-up hover:shadow-lg transition-shadow duration-200" 
              style={{animationDelay: `${0.4 + (index * 0.1)}s`}}
              hover
              onClick={() => navigate(`/trainee/modules/${module.id}`)}
            >
              <div className="md:w-40 h-32 md:h-full bg-gray-200 dark:bg-gray-700 rounded-t-lg md:rounded-l-lg md:rounded-tr-none overflow-hidden">
                <img 
                  src={module.image} 
                  alt={module.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                  <div className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded-md mb-2">
                    {renderModuleTypeIcon(module.type)}
                    <span className="ml-1">
                      {module.type === '3d' ? '3D Interactive' : module.type === 'video' ? 'Video' : 'Text'}
                    </span>
                  </div>
                  <div className="relative h-10 w-10">
                    <svg className="h-10 w-10" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                      <circle 
                        cx="18" 
                        cy="18" 
                        r="16" 
                        fill="none" 
                        stroke={
                          module.completionRate === 100 
                            ? '#10B981' 
                            : module.completionRate > 0 
                              ? '#3B82F6' 
                              : '#D1D5DB'
                        } 
                        strokeWidth="4" 
                        strokeDasharray={100} 
                        strokeDashoffset={100 - module.completionRate} 
                        strokeLinecap="round"
                        transform="rotate(-90 18 18)"
                      />
                      <text 
                        x="18" 
                        y="18" 
                        dy=".3em" 
                        textAnchor="middle" 
                        fontSize="10" 
                        fill="currentColor"
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {module.completionRate}%
                      </text>
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{module.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{module.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{module.duration}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    icon={module.completionRate > 0 ? <ArrowRight size={16} /> : <PlayCircle size={16} />}
                  >
                    {module.completionRate === 100 
                      ? 'Review' 
                      : module.completionRate > 0 
                        ? 'Continue' 
                        : 'Start'
                    }
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Achievements</h2>
          <Link to="/achievements" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6 slide-up" style={{animationDelay: '0.8s'}}>
            <div className="inline-flex items-center justify-center p-3 bg-amber-100 dark:bg-amber-900 rounded-full mb-4">
              <Star size={24} className="text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Safety First</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed safety training module with 100% score</p>
          </Card>
          
          <Card className="text-center p-6 slide-up" style={{animationDelay: '0.9s'}}>
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
              <Award size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Fast Learner</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed 2 modules in a single day</p>
          </Card>
          
          <Card className="text-center p-6 slide-up" style={{animationDelay: '1s'}}>
            <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900 rounded-full mb-4">
              <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Perfect Score</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Achieved 100% on machinery operation quiz</p>
          </Card>
          
          <Card className="text-center p-6 slide-up" style={{animationDelay: '1.1s'}}>
            <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
              <MessageSquare size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Team Player</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Participated in 3 group training sessions</p>
          </Card>
        </div>
      </div>

      {/* Chatbot assistant */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Training Assistant</h2>
        <Card className="p-0 overflow-hidden slide-up" style={{animationDelay: '1.2s'}}>
          <ChatbotInterface />
        </Card>
      </div>
    </div>
  );
};

// Module Detail Component
const ModuleDetailView: React.FC = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Use mockModulesWithSections for local mock
    const foundModule = mockModulesWithSections.find(m => m.id === moduleId);
    setModule(foundModule || null);
    setLoading(false);
  }, [moduleId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Module Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The module you're looking for could not be found.
        </p>
        <Button as={Link} to="/trainee">
          Return to Training
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="mb-8">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/trainee')}
          className="mb-4"
        >
          Back to Training
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{module.title}</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">{module.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">{module.duration}</span>
            <div className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded-md">
              {module.type === '3d' ? '3D Interactive' : module.type === 'video' ? 'Video' : 'Text'}
            </div>
          </div>
        </div>
      </div>

      {/* Module Roadmap */}
      <ModuleRoadmap moduleId={module.id} subModules={module.subModules} />
    </div>
  );
};

// Section video component with progress callback
const SectionVideo = ({ section, onProgress }) => {
  const videoRef = useRef(null);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      onProgress(video.currentTime, video.duration);
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        src={section.videoUrl}
        className="w-full rounded-lg mb-4 shadow-lg border border-gray-200 dark:border-gray-800"
        controls
        poster={section.thumbnail}
        onTimeUpdate={handleTimeUpdate}
      />
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white">{section.title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{section.duration}</p>
      </div>
    </div>
  );
};

// Section Detail Component
const SectionDetailView: React.FC = () => {
  const { sectionId, moduleId } = useParams();
  const navigate = useNavigate();
  const module = mockModulesWithSections.find(m => m.id === moduleId);
  const section = module?.subModules.find((s: any) => s.id === sectionId);

  const [activeTab, setActiveTab] = useState<'content' | 'resources' | 'assessment'>('content');
  // Use section.progress as initial value
  const [videoProgress, setVideoProgress] = useState(section ? section.progress : 0);

  const handleVideoTimeUpdate = (current: number, duration: number) => {
    if (duration) {
      const percent = (current / duration) * 100;
      setVideoProgress(percent);
    }
  };

  if (!section) return <div>Section not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <button
        className="mb-6 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
        onClick={() => navigate(`/trainee/modules/${moduleId}`)}
      >
        ← Back to Roadmap
      </button>
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{section.title}</h1>
      <div className="flex items-center mb-6">
        <span className="text-sm text-gray-600 dark:text-gray-400 mr-4">{section.duration}</span>
        <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded-md">
          {section.type === '3d' ? '3D Interactive' : section.type === 'video' ? 'Video' : 'Text'}
        </span>
      </div>
      {/* Section Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{Math.round(videoProgress)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${videoProgress}%` }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-0 bg-gray-50 dark:bg-gray-800 rounded-t-lg overflow-hidden">
        <button
          className={`py-3 px-6 focus:outline-none transition-colors duration-150 ${activeTab === 'content' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold bg-white dark:bg-gray-900' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'}`}
          onClick={() => setActiveTab('content')}
        >
          Content
        </button>
        <button
          className={`py-3 px-6 focus:outline-none transition-colors duration-150 ${activeTab === 'resources' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold bg-white dark:bg-gray-900' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'}`}
          onClick={() => setActiveTab('resources')}
        >
          Resources
        </button>
        <button
          className={`py-3 px-6 focus:outline-none transition-colors duration-150 ${activeTab === 'assessment' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold bg-white dark:bg-gray-900' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'}`}
          onClick={() => setActiveTab('assessment')}
        >
          Assessment
        </button>
      </div>

      {/* Tab Content Card */}
      <div className="bg-white dark:bg-gray-900 rounded-b-lg rounded-tr-lg shadow-md border border-gray-200 dark:border-gray-800 p-6 mt-0 mb-8">
        {activeTab === 'content' && (
          <div>
            {/* Video Section */}
            {section.type === 'video' && (
              <SectionVideo section={section} onProgress={handleVideoTimeUpdate} />
            )}
            {/* Add 3D or text content here if needed */}
          </div>
        )}

        {activeTab === 'resources' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
            <div className="space-y-4">
              {section.resources?.map((resource, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{resource.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{resource.description}</p>
                  </div>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                  >
                    {resource.type === 'link' ? 'Access' : 'Download'}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'assessment' && (
          <div>
            <p className="text-gray-600 dark:text-gray-400">Assessment content goes here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Trainee View that includes routes to all trainee pages
const TraineeView: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TraineeDashboard />} />
        <Route path="/modules/:moduleId" element={<ModuleDetailView />} />
        <Route path="/modules/:moduleId/sections/:sectionId" element={<SectionDetailView />} />
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Under Construction
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This page is currently being developed
            </p>
            <Button as={Link} to="/trainee">
              Return to Training Dashboard
            </Button>
          </div>
        } />
      </Routes>
    </Layout>
  );
};

export default TraineeView;