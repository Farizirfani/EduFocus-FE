import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, BookOpen, PlayCircle, FileText, Pencil, BookmarkPlus, Share2, MoreHorizontal, CheckCircle } from 'lucide-react';
import { getChaptersByCourse, getChapterById, getCourseById, updateProgress } from '@/services/api';
import type { Chapter, Course } from '@/types';
import VideoPlayer from '@/components/ui/VideoPlayer';
import QuizApp from '@/components/ui/QuizApp';
import NoteApp from '@/components/ui/NoteApp';
import toast from 'react-hot-toast';

const tocItems = [
  { icon: BookOpen, label: 'Reading' },
  { icon: PlayCircle, label: 'Video Lesson' },
  { icon: FileText, label: 'Quiz' },
  { icon: Pencil, label: 'My Notes' },
];

export default function CourseContentPage() {
  const { courseId, chapterId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [activeTab, setActiveTab] = useState('Reading');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!courseId) return;
      setLoading(true);
      try {
        const [courseData, chaptersData] = await Promise.all([
          getCourseById(courseId),
          getChaptersByCourse(courseId),
        ]);
        setCourse(courseData);
        setChapters(chaptersData);

        // If chapterId is provided, load that chapter; otherwise load the first
        if (chapterId) {
          const chapter = await getChapterById(chapterId);
          setActiveChapter(chapter);
        } else if (chaptersData.length > 0) {
          const chapter = await getChapterById(chaptersData[0]._id);
          setActiveChapter(chapter);
        }
      } catch {
        // Stay on page with fallback content
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId, chapterId]);

  if (loading) {
    return (
      <div className="flex gap-6">
        <aside className="w-[220px] shrink-0 hidden xl:block">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-dark-100 dark:bg-dark-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </aside>
        <div className="flex-1">
          <div className="bg-white dark:bg-dark-100 rounded-2xl border border-dark-100 dark:border-dark-100 p-8 animate-pulse">
            <div className="h-6 bg-dark-100 dark:bg-dark-200 rounded w-48 mb-4" />
            <div className="h-8 bg-dark-100 dark:bg-dark-200 rounded w-64 mb-2" />
            <div className="h-4 bg-dark-50 dark:bg-dark-200 rounded w-96 mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-dark-50 dark:bg-dark-200 rounded w-full" />
              <div className="h-4 bg-dark-50 dark:bg-dark-200 rounded w-5/6" />
              <div className="h-4 bg-dark-50 dark:bg-dark-200 rounded w-4/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleProgressUpdate = async (percentage: number = 100) => {
    if (!courseId || !activeChapter) return;
    
    try {
      await updateProgress({
        courseId,
        chapterId: activeChapter._id,
        percentage,
        studyHours: 0.5 // Mock study time
      });
      toast.success('Progress updated!');
      // Optionally refresh progress data here
    } catch (error) {
      console.error('Failed to update progress', error);
      toast.error('Failed to update progress');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Video Lesson':
        return (
          <div className="space-y-6">
            <VideoPlayer 
              src={activeChapter?.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} 
              poster={activeChapter?.imageUrl}
              autoPlay={false}
              onEnded={() => handleProgressUpdate(100)}
            />
            <div className="px-1">
              <h2 className="text-xl font-bold text-dark-900 mb-2">{activeChapter?.title} (Video)</h2>
              <p className="text-dark-500 text-sm">
                Watch this lesson to understand the core concepts of {activeChapter?.title}.
              </p>
            </div>
          </div>
        );
      case 'Quiz':
        return (
          <QuizApp 
            chapterId={activeChapter?._id} 
            onComplete={(score, total) => {
                const percentage = Math.round((score / total) * 100);
                handleProgressUpdate(percentage > 70 ? 100 : percentage); // Mark complete if passed (mock threshold)
            }}
          />
        );
      case 'My Notes':
        return <NoteApp chapterId={activeChapter?._id} />;
      case 'Reading':
      default:
        return (
          <article className="prose max-w-none">
            {activeChapter?.content ? (
              <div 
                className="text-dark-600 text-[15px] leading-[1.8]"
                dangerouslySetInnerHTML={{ __html: activeChapter.content }}
              />
            ) : (
              <>
                <h2 className="text-lg font-bold text-dark-900 mb-4">Pendahuluan</h2>
                <p className="text-dark-600 text-[15px] leading-[1.8] mb-6">
                  Konten belum tersedia. Silakan pilih chapter dari daftar di sebelah kiri.
                </p>
              </>
            )}

            {/* Figure */}
            {activeChapter?.imageUrl && (
              <figure className="my-8 rounded-xl overflow-hidden border border-dark-100">
                <img src={activeChapter.imageUrl} alt={activeChapter.title} className="w-full" />
                <figcaption className="px-5 py-3 bg-dark-50 text-xs text-dark-500 text-center">
                  <span className="font-semibold">Gambar {activeChapter.order}</span> — {activeChapter.title}
                </figcaption>
              </figure>
            )}
            
            {/* Mark as Complete Button */}
            <div className="mt-12 pt-8 border-t border-dark-100 flex justify-end">
               <button
                 onClick={() => handleProgressUpdate(100)}
                 className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-600/25 active:scale-95"
               >
                 <CheckCircle size={18} />
                 Mark as Completed
               </button>
            </div>
          </article>
        );
    }
  };

  return (
    <div className="flex gap-6">
      {/* Left Sidebar — Table of Contents */}
      <aside className="w-[220px] shrink-0 hidden xl:block">
        <div className="sticky top-[92px] space-y-8">
          {/* Content Types */}
          <div>
            <h3 className="text-[11px] font-semibold text-dark-400 uppercase tracking-widest mb-3 px-1">
              Content
            </h3>
            <div className="space-y-1">
              {tocItems.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => setActiveTab(label)}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                    activeTab === label
                      ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400'
                      : 'text-dark-500 hover:bg-dark-50 dark:hover:bg-dark-100 hover:text-dark-700 dark:hover:text-dark-300'
                  }`}
                >
                  <Icon size={16} strokeWidth={1.8} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Chapters List */}
          <div>
            <h3 className="text-[11px] font-semibold text-dark-400 uppercase tracking-widest mb-3 px-1">
              Chapters
            </h3>
            <div className="space-y-0.5">
              {chapters.map((ch) => (
                <button
                  key={ch._id}
                  onClick={() => {
                    navigate(`/courses/${courseId}/${ch._id}`);
                    setActiveTab('Reading'); // Reset to reading on chapter change? Or keep?
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all duration-200 cursor-pointer ${
                    ch._id === activeChapter?._id
                      ? 'text-primary-700 dark:text-primary-400 font-semibold bg-primary-50/50 dark:bg-primary-900/20'
                      : 'text-dark-500 hover:text-dark-700 dark:hover:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-100 font-medium'
                  }`}
                >
                  {ch.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-dark-400 mb-6">
          <span 
            onClick={() => navigate('/courses')}
            className="hover:text-dark-600 dark:hover:text-dark-200 cursor-pointer transition-colors"
          >
            Courses
          </span>
          <ChevronRight size={12} />
          <span className="hover:text-dark-600 dark:hover:text-dark-200 cursor-pointer transition-colors">
            {course?.title ?? 'Course'}
          </span>
          <ChevronRight size={12} />
          <span className="text-dark-700 dark:text-dark-200 font-medium">
            {activeChapter?.title ?? 'Chapter'}
          </span>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-dark-100 rounded-2xl border border-dark-100 dark:border-dark-100/50 shadow-xs overflow-hidden">
          {/* Article Header */}
          <div className="px-8 pt-8 pb-6 border-b border-dark-100 dark:border-dark-100/50">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-semibold rounded-lg">
                {activeChapter ? `Bab ${activeChapter.order}` : 'Bab'}
              </span>
              <span className="text-xs text-dark-400">
                {activeChapter?.readingTime ?? '~12 min read'}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-dark-900 mb-2">
              {activeChapter?.title ?? 'Loading...'}
            </h1>
            <p className="text-dark-500 text-sm leading-relaxed">
              {course?.description ?? course?.subtitle ?? ''}
            </p>
          </div>

          {/* Article Body */}
          <div className="px-8 py-8">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Right Toolbar */}
      <div className="w-12 shrink-0 hidden lg:block">
        <div className="sticky top-[92px] flex flex-col items-center gap-2">
            <button
              onClick={() => {
                // Optimistic update
                if (course) {
                    setCourse({ ...course, isBookmarked: !course.isBookmarked });
                }
                // toggleBookmark(courseId!); 
              }}
              className={`w-10 h-10 rounded-xl bg-white dark:bg-dark-100 border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
                course?.isBookmarked 
                    ? 'text-primary-600 dark:text-primary-400 border-primary-200 dark:border-primary-800' 
                    : 'text-dark-400 border-dark-100 dark:border-dark-100 hover:text-dark-600 dark:hover:text-dark-200 hover:border-dark-200 dark:hover:border-dark-200'
              }`}
            >
              <BookmarkPlus size={17} strokeWidth={1.8} fill={course?.isBookmarked ? "currentColor" : "none"} />
            </button>
            
          {[Share2, MoreHorizontal].map((Icon, idx) => (
            <button
              key={idx}
              className="w-10 h-10 rounded-xl bg-white dark:bg-dark-100 border border-dark-100 dark:border-dark-100 flex items-center justify-center 
                text-dark-400 hover:text-dark-600 dark:hover:text-dark-200 hover:border-dark-200 dark:hover:border-dark-200 transition-all duration-200 cursor-pointer shadow-xs"
            >
              <Icon size={17} strokeWidth={1.8} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
