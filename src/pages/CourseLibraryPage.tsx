import { useEffect, useState } from 'react';
import { getCourses, getProgress } from '@/services/api';
import type { Course, Progress } from '@/types';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';

const categories = ['All Subjects', 'Science', 'Mathematics', 'Languages', 'Social Studies'];

export default function CourseLibraryPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Subjects');
  const [courses, setCourses] = useState<Course[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, Progress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const category = activeCategory === 'All Subjects' ? undefined : activeCategory;
        const [coursesData, progressData] = await Promise.all([
          getCourses(category),
          getProgress().catch(() => [] as Progress[]),
        ]);
        setCourses(coursesData);
        
        // Build progress map by courseId
        const pMap: Record<string, Progress> = {};
        progressData.forEach((p) => {
          pMap[p.courseId] = p;
        });
        setProgressMap(pMap);
      } catch {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeCategory]);

  const getStatus = (progress: number): 'In Progress' | 'Almost Done' | 'Completed' => {
    if (progress >= 100) return 'Completed';
    if (progress >= 75) return 'Almost Done';
    return 'In Progress';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-success/10 text-success';
      case 'Almost Done': return 'bg-warning/10 text-warning';
      default: return 'bg-primary-50 text-primary-700';
    }
  };

  const getProgressColor = (status: string): 'primary' | 'warning' | 'success' => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Almost Done': return 'warning';
      default: return 'primary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-900 mb-1">Course Library</h1>
        <p className="text-dark-500 text-sm">
          Explore your courses and track your progress
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                : 'bg-white text-dark-600 border border-dark-200 hover:border-dark-300 hover:bg-dark-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading ? (
          // Loading skeletons
          [...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-dark-100 p-5 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-dark-100" />
                <div>
                  <div className="h-4 bg-dark-100 rounded w-24 mb-2" />
                  <div className="h-3 bg-dark-50 rounded w-32" />
                </div>
              </div>
              <div className="h-2 bg-dark-100 rounded-full mb-4" />
              <div className="h-6 bg-dark-50 rounded-lg w-20" />
            </div>
          ))
        ) : courses.length > 0 ? (
          courses.map((course) => {
            const progress = progressMap[course._id]?.percentage ?? 0;
            const status = getStatus(progress);
            return (
              <div
                key={course._id}
                onClick={() => navigate(`/courses/${course._id}`)}
                className="bg-white rounded-2xl border border-dark-100 p-5 cursor-pointer 
                  hover:shadow-lg hover:border-dark-200 hover:-translate-y-0.5 transition-all duration-300 group shadow-xs"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-dark-50 flex items-center justify-center text-2xl">
                      {course.icon || '📚'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-800 text-[15px]">{course.title}</h3>
                      <p className="text-xs text-dark-400 mt-0.5">{course.subtitle || course.category}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-dark-300 group-hover:text-dark-500 transition-colors mt-1" />
                </div>
                <div className="mb-4">
                  <ProgressBar progress={progress} color={getProgressColor(status)} size="sm" showLabel />
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-lg ${getStatusColor(status)}`}>
                    {status}
                  </span>
                  <span className="text-xs text-dark-400">{course.category}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12 text-dark-400">
            <p className="text-lg font-medium mb-1">No courses found</p>
            <p className="text-sm">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
}
