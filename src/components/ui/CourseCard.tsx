import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProgressBar from './ProgressBar';
import { ChevronRight, BookmarkPlus } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  status: 'In Progress' | 'Almost Done' | 'Completed';
  icon: string;
  classmatesCount: number;
  className?: string;
  isBookmarked?: boolean;
}

export default function CourseCard({
  id,
  title,
  subtitle,
  progress,
  status,
  icon,
  classmatesCount,
  className,
  isBookmarked: initialIsBookmarked = false,
}: CourseCardProps) {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  
  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
        setIsBookmarked(!isBookmarked);
        // await toggleBookmark(id); // Import this
        // toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
    } catch (error) {
        setIsBookmarked(!isBookmarked); // Revert
    }
  };

  const statusColors = {
    'In Progress': 'bg-primary-50 text-primary-700',
    'Almost Done': 'bg-warning/10 text-warning',
    'Completed': 'bg-success/10 text-success',
  };

  const progressColors = {
    'In Progress': 'primary' as const,
    'Almost Done': 'warning' as const,
    'Completed': 'success' as const,
  };

  return (
    <div
      onClick={() => navigate(`/courses/${id}`)}
      className={cn(
        "bg-white rounded-2xl border border-dark-100 p-5 cursor-pointer hover:shadow-lg hover:border-dark-200 hover:-translate-y-0.5 transition-all duration-300 group shadow-xs",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-dark-50 flex items-center justify-center text-2xl">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-dark-800 text-[15px]">{title}</h3>
            <p className="text-xs text-dark-400 mt-0.5">{subtitle}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
             onClick={handleBookmark}
             className={`w-8 h-8 rounded-full bg-white border flex items-center justify-center transition-all shadow-sm opacity-0 group-hover:opacity-100 ${
                isBookmarked 
                  ? 'text-primary-600 border-primary-200' 
                  : 'text-dark-400 border-dark-100 hover:text-primary-600 hover:border-primary-200'
             }`}
          >
            <BookmarkPlus size={14} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
          <ChevronRight size={16} className="text-dark-300 group-hover:text-dark-500 transition-colors mt-1" />
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <ProgressBar progress={progress} color={progressColors[status]} size="sm" showLabel />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold px-3 py-1 rounded-lg ${statusColors[status]}`}>
          {status}
        </span>

        {/* Classmates */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[...Array(Math.min(classmatesCount, 3))].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-white flex items-center justify-center"
              >
                <span className="text-[9px] font-bold text-primary-700">
                  {String.fromCharCode(65 + i)}
                </span>
              </div>
            ))}
          </div>
          {classmatesCount > 3 && (
            <span className="text-[11px] text-dark-400 font-medium">
              +{classmatesCount - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
