import { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, Trophy, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

// Mock data - in real app, fetch from API based on chapterId
const mockQuestions: Question[] = [
  {
    id: 1,
    text: "What is the primary function of the mitochondria?",
    options: [
      "Protein synthesis",
      "Energy production (ATP)",
      "Cell division",
      "Waste removal"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "Which of the following is NOT a type of RNA?",
    options: [
      "mRNA",
      "tRNA",
      "dRNA",
      "rRNA"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    text: "What is the process by which cells divide?",
    options: [
      "Mitosis",
      "Osmosis",
      "Diffusion",
      "Respiration"
    ],
    correctAnswer: 0
  }
];

interface QuizAppProps {
  chapterId?: string;
  onComplete?: (score: number, total: number) => void;
}

export default function QuizApp({ chapterId, onComplete }: QuizAppProps) {
  console.log("Rendering Quiz for chapter:", chapterId); // Use prop to fetch if real
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = mockQuestions[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      if (onComplete) {
        onComplete(score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0), mockQuestions.length);
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    const percentage = Math.round((score / mockQuestions.length) * 100);
    
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-24 h-24 bg-primary-50 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-6">
          <Trophy size={48} className="text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-2xl font-bold text-dark-900 mb-2">Quiz Completed!</h2>
        <p className="text-dark-500 mb-8">You scored {percentage}% ({score}/{mockQuestions.length})</p>
        
        <div className="w-full max-w-sm bg-dark-50 dark:bg-dark-100 rounded-full h-4 mb-8 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              percentage >= 70 ? 'bg-success' : percentage >= 40 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <button 
          onClick={handleRetry}
          className="flex items-center gap-2 px-6 py-3 bg-dark-800 dark:bg-dark-700 text-white rounded-xl hover:bg-dark-900 dark:hover:bg-dark-600 transition-colors shadow-lg"
        >
          <RefreshCw size={18} />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium text-dark-400 mb-2">
          <span>Question {currentQuestionIndex + 1} of {mockQuestions.length}</span>
          <span>Score: {score}</span>
        </div>
        <div className="h-1.5 bg-dark-50 dark:bg-dark-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-500 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / mockQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl font-bold text-dark-900 mb-6 leading-relaxed">
        {currentQuestion.text}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, index) => {
          let optionClass = "border-dark-100 dark:border-dark-100 hover:border-dark-300 dark:hover:border-dark-200 hover:bg-dark-50 dark:hover:bg-dark-100 bg-white dark:bg-dark-100";
          let icon = null;

          if (isAnswered) {
             if (index === currentQuestion.correctAnswer) {
               optionClass = "border-success bg-success/10 text-success-700 dark:text-success-400";
               icon = <CheckCircle size={20} className="text-success" />;
             } else if (index === selectedAnswer) {
               optionClass = "border-error bg-error/10 text-error-700 dark:text-error-400";
               icon = <XCircle size={20} className="text-error" />;
             } else {
               optionClass = "border-dark-100 dark:border-dark-100/30 opacity-50";
             }
          } else if (selectedAnswer === index) {
            optionClass = "border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400";
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${optionClass}`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border ${
                  isAnswered && index === currentQuestion.correctAnswer ? 'border-success text-success bg-white dark:bg-dark-100' :
                  isAnswered && index === selectedAnswer ? 'border-error text-error bg-white dark:bg-dark-100' :
                  'border-dark-200 dark:border-dark-100/50 text-dark-500 bg-white dark:bg-dark-200 group-hover:border-dark-300 dark:group-hover:border-dark-200'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="font-medium text-dark-800">{option}</span>
              </div>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <div className="flex justify-end h-12">
        {isAnswered && (
          <button
            onClick={handleNextQuestion}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-lg animate-in fade-in slide-in-from-bottom-2"
          >
            {currentQuestionIndex < mockQuestions.length - 1 ? 'Next Question' : 'View Results'}
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
