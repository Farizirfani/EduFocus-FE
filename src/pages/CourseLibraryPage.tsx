import { useEffect, useState, useMemo } from 'react';
import { getCourses, getProgress } from '@/services/api';
import type { Course, Progress } from '@/types';
import CourseCard from '@/components/ui/CourseCard';
import { useSearchParams } from 'react-router-dom';

const categories = ['All Subjects', 'Science', 'Mathematics', 'Languages', 'Social Studies'];

export default function CourseLibraryPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
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

  const filteredCourses = useMemo(() => {
    if (!searchQuery) return courses;
    return courses.filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.subtitle && course.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (course.category && course.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [courses, searchQuery]);

  const getStatus = (progress: number): 'In Progress' | 'Almost Done' | 'Completed' => {
    if (progress >= 100) return 'Completed';
    if (progress >= 75) return 'Almost Done';
    return 'In Progress';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-900 mb-1">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Course Library'}
        </h1>
        <p className="text-dark-500 text-sm">
          {searchQuery 
            ? `Found ${filteredCourses.length} result${filteredCourses.length !== 1 ? 's' : ''}`
            : 'Explore your courses and track your progress'
          }
        </p>
      </div>

      {/* Category Filters - Hide if searching? Or allow filtering search results? Let's allow filtering */}
      {!searchQuery && (
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                  : 'bg-white dark:bg-dark-100 text-dark-600 dark:text-dark-400 border border-dark-200 dark:border-dark-100 hover:border-dark-300 dark:hover:border-dark-200 hover:bg-dark-50 dark:hover:bg-dark-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          // Loading skeletons
          [...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-dark-100 rounded-2xl border border-dark-100 p-5 animate-pulse h-[200px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-dark-100 dark:bg-dark-200" />
                <div>
                  <div className="h-4 bg-dark-100 dark:bg-dark-200 rounded w-24 mb-2" />
                  <div className="h-3 bg-dark-50 dark:bg-dark-300 rounded w-32" />
                </div>
              </div>
              <div className="h-2 bg-dark-100 dark:bg-dark-200 rounded-full mb-6" />
              <div className="flex justify-between items-center">
                 <div className="h-6 bg-dark-50 dark:bg-dark-200 rounded-lg w-20" />
                 <div className="h-8 w-16 bg-dark-50 dark:bg-dark-200 rounded-full" />
              </div>
            </div>
          ))
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => {
            const progress = progressMap[course._id]?.percentage ?? 0;
            const status = getStatus(progress);
            return (
              <CourseCard
                key={course._id}
                id={course._id}
                title={course.title}
                subtitle={course.subtitle || course.category}
                progress={progress}
                status={status}
                icon={course.icon || ''}
                classmatesCount={course.isBookmarked ? 12 : 5} // Mock data for now
                isBookmarked={course.isBookmarked}
              />
            );
          })
        ) : (
          <div className="col-span-full py-16 text-center">
            <div className="w-20 h-20 bg-dark-50 dark:bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-4 text-dark-300 dark:text-dark-500">
               <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-lg font-bold text-dark-900 mb-1">
              {searchQuery ? `No results found for "${searchQuery}"` : 'No courses found'}
            </h3>
            <p className="text-dark-500">
              {searchQuery ? 'Try checking for typos or using different keywords.' : 'Try selecting a different category or check back later.'}
            </p>
            {searchQuery && (
               <button 
                 onClick={() => window.history.back()}
                 className="mt-4 text-primary-600 dark:text-primary-400 font-medium hover:underline"
               >
                 Clear search
               </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
