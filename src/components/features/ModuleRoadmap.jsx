import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Play, 
  Lock, 
  ChevronRight, 
  Video, 
  BookOpen, 
  Clock,
  Star,
  ChevronDown,
  Cuboid as Cube
} from 'lucide-react';
import Card from '../common/Card';

const DifficultyBadge = ({ level }) => {
  const colors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    advanced: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${colors[level]}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
};

const ModuleRoadmap = ({ moduleId, subModules }) => {
  const [expandedModule, setExpandedModule] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'locked':
        return <Lock size={20} className="text-gray-400" />;
      default:
        return <Play size={20} className="text-blue-500" />;
    }
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video size={20} />;
      case '3d':
        return <Cube size={20} />;
      default:
        return <BookOpen size={20} />;
    }
  };

  const toggleExpand = (id) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  // Calculate overall progress
  const totalProgress = subModules.reduce((acc, module) => acc + module.progress, 0) / subModules.length;

  return (
    <div className="space-y-6">
      {/* Overall progress */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Overall Progress</h3>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{Math.round(totalProgress)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </div>

      {/* Module path */}
      <div className="relative">
        {/* Vertical connection line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

        {subModules.map((subModule, index) => (
          <div key={subModule.id} className="relative mb-4">
            {/* Connection dot */}
            <div 
              className={`absolute left-6 top-8 w-3 h-3 rounded-full transform -translate-x-1.5 ${
                subModule.status === 'completed' ? 'bg-green-500' :
                subModule.status === 'locked' ? 'bg-gray-400' :
                'bg-blue-500'
              }`}
            />

            <Card
              className={`ml-12 transition-all duration-200 ${
                subModule.status !== 'locked' ? 'hover:shadow-lg cursor-pointer' : 'opacity-75'
              }`}
              onClick={() => subModule.status !== 'locked' && toggleExpand(subModule.id)}
            >
              <div className="flex items-start">
                <div className={`p-3 rounded-lg mr-4 ${
                  subModule.status === 'completed' ? 'bg-green-100 dark:bg-green-900' :
                  subModule.status === 'locked' ? 'bg-gray-100 dark:bg-gray-800' :
                  'bg-blue-100 dark:bg-blue-900'
                }`}>
                  {getStatusIcon(subModule.status)}
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Section {index + 1}
                      </span>
                      <DifficultyBadge level={subModule.difficulty} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock size={16} className="mr-1" />
                        <span className="text-sm">{subModule.duration}</span>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform duration-200 ${
                          expandedModule === subModule.id ? 'transform rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {subModule.title}
                  </h3>

                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      {getContentTypeIcon(subModule.type)}
                      <span className="ml-1 text-sm">
                        {subModule.type === '3d' ? 'Interactive' : 
                         subModule.type === 'video' ? 'Video' : 'Reading'}
                      </span>
                    </div>
                    {subModule.estimatedTime && (
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Clock size={16} className="mr-1" />
                        <span className="text-sm">{subModule.estimatedTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded content */}
              {expandedModule === subModule.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {subModule.description}
                  </p>
                  
                  {subModule.prerequisites && subModule.prerequisites.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Prerequisites</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                        {subModule.prerequisites.map((prereq, idx) => (
                          <li key={idx}>{prereq}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Preview thumbnail */}
                  {subModule.thumbnail && (
                    <div className="mb-4">
                      <img
                        src={subModule.thumbnail}
                        alt={`Preview of ${subModule.title}`}
                        className="rounded-lg w-full h-40 object-cover"
                      />
                    </div>
                  )}

                  {subModule.status !== 'locked' && (
                    <button
                      className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/modules/${moduleId}/sub/${subModule.id}`;
                      }}
                    >
                      {subModule.status === 'completed' ? 'Review' : 'Start Learning'}
                      <ChevronRight size={16} className="ml-2" />
                    </button>
                  )}
                </div>
              )}

              {/* Progress bar */}
              {subModule.progress > 0 && subModule.progress < 100 && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${subModule.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {subModule.progress}% Complete
                  </p>
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleRoadmap;