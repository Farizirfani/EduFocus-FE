import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProgressBar from './ProgressBar';
import { BookmarkPlus } from 'lucide-react';
import { getIconByName } from '@/utils/icons';

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
  const IconComponent = getIconByName(icon);
  
  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
        setIsBookmarked(!isBookmarked);
        // await toggleBookmark(id); 
    } catch (error) {
        setIsBookmarked(!isBookmarked); 
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
        "bg-white dark:bg-dark-100 rounded-2xl border border-dark-100 shadow-sm relative overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-dark-100/50 dark:hover:shadow-black/20 hover:border-dark-200 dark:hover:border-dark-50 hover:-translate-y-1 transition-all duration-300 group p-6",
        className
      )}
    >
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50/50 dark:bg-primary-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-colors duration-300 ${
            status === 'Completed' ? 'bg-success/10 text-success' : 
            status === 'Almost Done' ? 'bg-warning/10 text-warning' : 
            'bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/60'
          }`}>
            <IconComponent size={26} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-bold text-dark-900 text-[16px] leading-tight mb-1 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
              {title}
            </h3>
            <p className="text-xs text-dark-500 font-medium">{subtitle}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
             onClick={handleBookmark}
             className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm z-20 ${
                isBookmarked 
                  ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30' 
                  : 'text-dark-400 bg-white dark:bg-dark-50 border border-dark-100 hover:text-primary-600 hover:border-primary-200 dark:hover:border-primary-800'
             }`}
          >
            <BookmarkPlus size={18} strokeWidth={1.8} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-5 relative z-10">
        <ProgressBar progress={progress} color={progressColors[status]} size="sm" showLabel />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between relative z-10 pt-4 border-t border-dark-50 dark:border-dark-50/10">
        <span className={`text-[11px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider ${statusColors[status]}`}>
          {status}
        </span>

        {/* Classmates */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2.5">
            {[...Array(Math.min(classmatesCount, 3))].map((_, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full bg-white dark:bg-dark-100 ring-2 ring-white dark:ring-dark-100 flex items-center justify-center overflow-hidden"
              >
                <div className="w-full h-full bg-gradient-to-br from-dark-100 to-dark-200 dark:from-dark-50 dark:to-dark-100 flex items-center justify-center text-[9px] font-bold text-dark-600">
                    {String.fromCharCode(65 + i)}
                 </div>
              </div>
            ))}
          </div>
          {classmatesCount > 3 && (
            <div className="w-7 h-7 rounded-full bg-dark-50 dark:bg-dark-50/50 flex items-center justify-center text-[10px] font-bold text-dark-500 border border-white dark:border-dark-100 shadow-sm">
              +{classmatesCount - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
