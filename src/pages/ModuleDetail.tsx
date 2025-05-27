import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ThreeDModuleViewer from '../components/features/ThreeDModuleViewer';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  Download, 
  Share2, 
  BookOpen,
  Award,
  Play,
  Pause,
  ChevronRight
} from 'lucide-react';
import { fetchMockModules, Module } from '../utils/mockData';

const ModuleDetail: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('content');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadModule = async () => {
      setLoading(true);
      try {
        const modules = await fetchMockModules();
        const foundModule = modules.find(m => m.id === moduleId);
        if (foundModule) {
          setModule(foundModule);
          setProgress(foundModule.completionRate);
        }
      } catch (error) {
        console.error('Error loading module:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadModule();
    
    // Clean up interval on unmount
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [moduleId]);

  const togglePlay = () => {
    if (isPlaying) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    } else {
      // Only increment progress if not already at 100%
      if (progress < 100) {
        progressIntervalRef.current = setInterval(() => {
          setProgress(prev => {
            const newProgress = prev + 1;
            if (newProgress >= 100) {
              if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
              }
              return 100;
            }
            return newProgress;
          });
        }, 500); // Update every half second for demo purposes
      }
    }
    setIsPlaying(!isPlaying);
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

  if (!module) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Module Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The module you're looking for could not be found.
          </p>
          <Button as={Link} to="/dashboard">
            Return to Dashboard
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
        {/* Module header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link to="/dashboard" className="mr-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{module.title}</h1>
              <div className="flex flex-wrap items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center mr-4">
                  <Clock size={16} className="mr-1" />
                  <span>{module.duration}</span>
                </div>
                <div className="flex items-center mr-4">
                  <BookOpen size={16} className="mr-1" />
                  <span>{module.type === '3d' ? '3D Interactive' : module.type === 'video' ? 'Video' : 'Text'}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={16} className="mr-1" />
                  <span>{progress}% Complete</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                progress === 100 
                  ? 'bg-green-600' 
                  : progress > 0 
                    ? 'bg-blue-600' 
                    : 'bg-gray-300 dark:bg-gray-600'
              }`} 
              style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Module content */}
            <Card className="mb-8 p-0 overflow-hidden">
              {/* Content tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  className={`flex-1 py-4 px-6 text-center focus:outline-none ${
                    activeTab === 'content'
                      ? 'border-b-2 border-blue-900 dark:border-blue-500 text-blue-900 dark:text-blue-500 font-medium'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                  onClick={() => setActiveTab('content')}
                >
                  Content
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center focus:outline-none ${
                    activeTab === 'resources'
                      ? 'border-b-2 border-blue-900 dark:border-blue-500 text-blue-900 dark:text-blue-500 font-medium'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                  onClick={() => setActiveTab('resources')}
                >
                  Resources
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center focus:outline-none ${
                    activeTab === 'assessment'
                      ? 'border-b-2 border-blue-900 dark:border-blue-500 text-blue-900 dark:text-blue-500 font-medium'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                  onClick={() => setActiveTab('assessment')}
                >
                  Assessment
                </button>
              </div>
              
              {/* Tab content */}
              <div className="p-6">
                {activeTab === 'content' && (
                  <div>
                    <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-6">
                      {module.type === '3d' ? (
                        <ThreeDModuleViewer isPlaying={isPlaying} />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gray-900">
                          <img 
                            src={module.image} 
                            alt={module.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button 
                              onClick={togglePlay}
                              className="w-16 h-16 flex items-center justify-center bg-blue-900 dark:bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 dark:hover:bg-blue-600 transition-colors"
                            >
                              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Controls overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="flex items-center justify-between text-white">
                          <button 
                            onClick={togglePlay}
                            className="flex items-center justify-center bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                          >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                          </button>
                          
                          <div className="text-sm font-medium">
                            {progress}% Complete
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="prose dark:prose-invert max-w-none">
                      <h2>Module Description</h2>
                      <p>{module.description}</p>
                      
                      <h3>Learning Objectives</h3>
                      <ul>
                        <li>Understand the key safety protocols for workplace equipment</li>
                        <li>Identify potential hazards and appropriate safety measures</li>
                        <li>Demonstrate proper usage of personal protective equipment</li>
                        <li>Apply correct procedures in emergency situations</li>
                      </ul>
                      
                      <h3>Key Concepts</h3>
                      <p>
                        This module covers essential safety principles that every employee must understand
                        before operating workplace equipment. You will learn about risk assessment,
                        preventative measures, and emergency procedures.
                      </p>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500 mt-6">
                        <h4 className="text-blue-900 dark:text-blue-400 font-medium mb-2">Note</h4>
                        <p className="text-blue-800 dark:text-blue-300 text-sm">
                          Please complete all interactive elements and the final assessment to receive your certification.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'resources' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Supplementary Resources
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Safety Manual PDF</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Complete reference guide for safety procedures</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          icon={<Download size={16} />}
                        >
                          Download
                        </Button>
                      </div>
                      
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Equipment Checklists</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Pre-operation verification forms</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          icon={<Download size={16} />}
                        >
                          Download
                        </Button>
                      </div>
                      
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Safety Video Library</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Additional training videos</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          icon={<ChevronRight size={16} />}
                        >
                          Access
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'assessment' && (
                  <div>
                    <div className="text-center py-6">
                      <div className="inline-flex items-center justify-center p-4 bg-amber-100 dark:bg-amber-900 rounded-full mb-4">
                        <Award size={32} className="text-amber-600 dark:text-amber-400" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Module Assessment
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
                        Complete the module content before taking the assessment to test your knowledge
                      </p>
                      <Button 
                        disabled={progress < 100}
                        className={progress < 100 ? 'opacity-50 cursor-not-allowed' : ''}
                      >
                        Start Assessment
                      </Button>
                      {progress < 100 && (
                        <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                          You need to complete the module before taking the assessment
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
          
          <div>
            {/* Module info sidebar */}
            <Card className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Module Information</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prerequisites</h4>
                  {module.prerequisites && module.prerequisites.length > 0 ? (
                    <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
                      {module.prerequisites.map((prereq, index) => (
                        <li key={index}>{prereq}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">No prerequisites required</p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills Covered</h4>
                  {module.skills && module.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {module.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">No specific skills listed</p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Completion Time</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{module.duration}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Certification</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Certificate awarded upon completion of assessment with 80% or higher score
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  fullWidth
                  icon={<Share2 size={16} />}
                >
                  Share Module
                </Button>
              </div>
            </Card>
            
            {/* Next modules */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Next in Your Path</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden mr-3">
                    <img 
                      src="https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Machinery Operation Basics"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">Machinery Operation Basics</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">1h 15min</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden mr-3">
                    <img 
                      src="https://images.pexels.com/photos/257636/pexels-photo-257636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Emergency Protocols"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">Emergency Protocols</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">30 min</p>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  fullWidth
                  as={Link}
                  to="/trainee"
                >
                  View Full Curriculum
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ModuleDetail;