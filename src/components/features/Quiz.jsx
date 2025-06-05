import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

const Quiz = ({ quiz, onBack }) => {
  const [currentAnswers, setCurrentAnswers] = useState(new Array(quiz.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (!isSubmitted) {
      const newAnswers = [...currentAnswers];
      newAnswers[questionIndex] = answerIndex;
      setCurrentAnswers(newAnswers);
    }
  };

  const handleSubmit = () => {
    if (currentAnswers.includes(null)) {
      alert('Please answer all questions before submitting.');
      return;
    }
    setIsSubmitted(true);
  };

  const calculateScore = () => {
    return quiz.reduce((score, question, index) => {
      return score + (question.correctAnswer === currentAnswers[index] ? 1 : 0);
    }, 0);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Roadmap
      </button>

      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Module Quiz</h2>
          
          {quiz.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-8 last:mb-0">
              <div className="flex items-start mb-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full mr-3">
                  {questionIndex + 1}
                </span>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {question.question}
                </h3>
              </div>
              
              <div className="space-y-3 ml-12">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`
                      relative flex items-center p-4 rounded-lg cursor-pointer
                      ${isSubmitted 
                        ? optionIndex === question.correctAnswer
                          ? 'bg-green-100 dark:bg-green-900/30 border-green-500'
                          : currentAnswers[questionIndex] === optionIndex
                            ? 'bg-red-100 dark:bg-red-900/30 border-red-500'
                            : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                        : currentAnswers[questionIndex] === optionIndex
                          ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500'
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                      }
                      border hover:shadow-sm transition-all
                    `}
                    onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                  >
                    <div className="flex-grow">
                      <p className="text-gray-900 dark:text-white">{option}</p>
                    </div>
                    
                    {isSubmitted && (
                      <div className="ml-4">
                        {optionIndex === question.correctAnswer ? (
                          <CheckCircle className="text-green-500\" size={20} />
                        ) : currentAnswers[questionIndex] === optionIndex ? (
                          <XCircle className="text-red-500" size={20} />
                        ) : null}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {isSubmitted ? (
            <div className="mt-8 text-center">
              <div className="mb-4">
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  Your Score: {calculateScore()} out of {quiz.length}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {calculateScore() === quiz.length 
                    ? 'Perfect score! Excellent work!' 
                    : calculateScore() >= quiz.length * 0.8 
                      ? 'Great job! Keep up the good work!' 
                      : 'Keep practicing to improve your score!'}
                </p>
              </div>
              <Button onClick={onBack}>Return to Roadmap</Button>
            </div>
          ) : (
            <div className="mt-8">
              <Button 
                fullWidth 
                onClick={handleSubmit}
                disabled={currentAnswers.includes(null)}
              >
                Submit Answers
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Quiz;