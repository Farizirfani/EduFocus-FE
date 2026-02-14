import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer } from 'recharts';
import { BookOpen, Clock, TrendingUp, ChevronRight } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import { getDashboard } from '@/services/api';
import { useAuthStore } from '@/stores/useAuthStore';
import type { DashboardData } from '@/types';

const studyHoursChartData = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 3 },
  { day: 'Wed', hours: 5 },
  { day: 'Thu', hours: 2 },
  { day: 'Fri', hours: 4 },
  { day: 'Sat', hours: 3 },
  { day: 'Sun', hours: 1 },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch {
        // Use fallback data if API fails
        setDashboard(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const examReadiness = dashboard?.examReadiness ?? 75;
  const totalStudyHours = dashboard?.totalStudyHours ?? 42;
  const totalCourses = dashboard?.totalCourses ?? 6;
  const continueLearning = dashboard?.continueLearning ?? [];
  const userName = user?.name ?? 'Student';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-900 mb-1">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-dark-500 text-sm">{today}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Exam Readiness */}
        <div className="bg-white rounded-2xl p-6 border border-dark-100 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-dark-700">Exam Readiness</h3>
            <TrendingUp size={16} className="text-success" />
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e8edf3"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray={`${examReadiness}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-dark-900">{examReadiness}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-dark-500 leading-relaxed">
                Kamu sudah menguasai <span className="font-semibold text-dark-700">{examReadiness}%</span> materi. Terus belajar!
              </p>
            </div>
          </div>
        </div>

        {/* Continue Reading */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white shadow-lg shadow-primary-600/20">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-white/90">Continue Reading</h3>
            <BookOpen size={16} className="text-white/70" />
          </div>
          <div>
            <p className="text-lg font-bold mb-1">
              {dashboard?.continueReading?.chapter?.title ?? 'Bab 3: Biologi Sel'}
            </p>
            <p className="text-white/70 text-xs mb-5">
              {dashboard?.continueReading?.course?.title ?? 'Bagian 2: Struktur & Fungsi Sel'}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: `${dashboard?.continueReading?.progress ?? 65}%` }} />
                </div>
              </div>
              <button 
                onClick={() => {
                  if (dashboard?.continueReading?.course?._id && dashboard?.continueReading?.chapter?._id) {
                    navigate(`/courses/${dashboard.continueReading.course._id}/${dashboard.continueReading.chapter._id}`);
                  }
                }}
                className="w-9 h-9 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Study Time */}
        <div className="bg-white rounded-2xl p-6 border border-dark-100 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-dark-700">Study Summary</h3>
            <Clock size={16} className="text-primary-500" />
          </div>
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-4xl font-bold text-dark-900">{totalStudyHours}</span>
            <span className="text-lg font-semibold text-dark-400">hrs</span>
          </div>
          <p className="text-xs text-dark-500">
            <span className="text-success font-semibold">{totalCourses} courses</span> in progress
          </p>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-dark-100 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-dark-800">Continue Learning</h3>
            <button 
              onClick={() => navigate('/courses')}
              className="text-xs text-primary-600 font-semibold hover:text-primary-700 transition-colors cursor-pointer"
            >
              View All
            </button>
          </div>
          <div className="space-y-5">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex items-center gap-4 p-4 rounded-xl bg-dark-50/60">
                    <div className="w-10 h-10 bg-dark-200 rounded-lg" />
                    <div className="flex-1">
                      <div className="h-4 bg-dark-200 rounded w-32 mb-2" />
                      <div className="h-3 bg-dark-100 rounded w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : continueLearning.length > 0 ? (
              continueLearning.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(`/courses/${item.course._id}/content`)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-dark-50/60 hover:bg-dark-50 transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 text-lg">
                    {item.course.icon || '📚'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-dark-800 mb-0.5">{item.course.title}</p>
                    <p className="text-xs text-dark-400">{item.course.subtitle}</p>
                  </div>
                  <div className="w-32 flex-shrink-0">
                    <ProgressBar progress={item.percentage} color={item.percentage >= 80 ? 'success' : 'primary'} size="sm" showLabel />
                  </div>
                  <ChevronRight size={16} className="text-dark-300 group-hover:text-dark-500 transition-colors flex-shrink-0" />
                </div>
              ))
            ) : (
              // Fallback static data
              [
                { title: 'Biologi Sel', chapter: 'Bab 3 • Bagian 2', progress: 65, color: 'primary' as const },
                { title: 'Aljabar Linear', chapter: 'Bab 5 • Bagian 1', progress: 40, color: 'primary' as const },
                { title: 'Kimia Organik', chapter: 'Bab 2 • Bagian 4', progress: 85, color: 'success' as const },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-xl bg-dark-50/60 hover:bg-dark-50 transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen size={18} className="text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-dark-800 mb-0.5">{item.title}</p>
                    <p className="text-xs text-dark-400">{item.chapter}</p>
                  </div>
                  <div className="w-32 flex-shrink-0">
                    <ProgressBar progress={item.progress} color={item.color} size="sm" showLabel />
                  </div>
                  <ChevronRight size={16} className="text-dark-300 group-hover:text-dark-500 transition-colors flex-shrink-0" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Study Hours Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-dark-100 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-dark-800">Study Hours</h3>
            <span className="text-xs text-dark-400 font-medium">This Week</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyHoursChartData} barCategoryGap="25%">
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                  dy={8}
                />
                <YAxis hide />
                <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                  {studyHoursChartData.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 2 ? '#3b82f6' : '#dbeafe'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
