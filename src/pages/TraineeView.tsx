import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ModuleRoadmap from '../components/features/ModuleRoadmap';
import Quiz from '../components/features/Quiz';
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
import { fetchMockModules, fetchMockProgress, Module, mockModulesWithSections } from '../utils/mockData';
import ChatbotInterface from '../components/features/ChatbotInterface';
import SubModuleContent from '../components/features/SubModuleContent';

// TraineeDashboard component remains the same as in original file

// Module Detail Component
const ModuleDetailView: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadModule = async () => {
      setLoading(true);
      try {
        const modules = await fetchMockModules();
        const foundModule = modules.find(m => m.id === moduleId);
        setModule(foundModule || null);
      } catch (error) {
        console.error('Error loading module:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadModule();
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

  if (showQuiz && module.quiz) {
    return <Quiz quiz={module.quiz} onBack={() => setShowQuiz(false)} />;
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
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">{module.duration}</span>
            <div className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded-md">
              {module.type === '3d' ? '3D Interactive' : module.type === 'video' ? 'Video' : 'Text'}
            </div>
            {module.quiz && (
              <Button 
                variant="outline"
                onClick={() => setShowQuiz(true)}
              >
                Take Quiz
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Module Roadmap */}
      <ModuleRoadmap moduleId={module.id} subModules={mockModulesWithSections.find(m => m.id === module.id)?.subModules || []} />
    </div>
  );
};

// Section video component and SectionDetailView component remain the same as in original file

// TraineeView component remains the same as in original file

export default TraineeView;