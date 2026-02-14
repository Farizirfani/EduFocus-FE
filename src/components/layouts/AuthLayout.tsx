import { Outlet } from 'react-router-dom';
import { Moon } from 'lucide-react';
import { useThemeStore } from '@/stores/useThemeStore';

export default function AuthLayout() {
  const { toggleTheme } = useThemeStore();

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel — Form */}
      <div className="w-full lg:w-[48%] flex flex-col min-h-screen">
        {/* Logo */}
        <div className="px-8 pt-8 lg:px-28 lg:pt-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
              E
            </div>
            <span className="font-bold text-xl text-dark-800 tracking-tight">EduFocus</span>
          </div>
        </div>

        {/* Form Content — vertically centered */}
        <div className="flex-1 flex items-center justify-center px-8 lg:px-16 xl:px-24">
          <div className="w-full max-w-[420px]">
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-6 lg:px-12">
          <p className="text-xs text-dark-400">© 2026 EduFocus. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel — Hero Image & Testimonial */}
      <div className="hidden lg:block w-[52%] relative m-3 ml-0 rounded-3xl overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-dark-900">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
            alt="Students studying together"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent" />
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md 
            flex items-center justify-center text-white hover:bg-white/25 transition-colors z-10 cursor-pointer"
        >
          <Moon size={18} />
        </button>

        {/* Testimonial Card — bottom right */}
        <div className="absolute bottom-8 left-8 right-8 z-10">
          <div className="bg-white/92 backdrop-blur-2xl rounded-2xl p-7 shadow-2xl max-w-[480px] ml-auto border border-white/50">
            <div className="text-primary-500 mb-3">
              <svg width="32" height="24" viewBox="0 0 32 24" fill="currentColor">
                <path d="M0 24V14.4C0 10.4 0.8 7.2 2.4 4.8C4 2.4 6.8 0.8 10.8 0L12.4 3.6C10 4.4 8.2 5.6 7 7.2C5.8 8.8 5.2 10.4 5.2 12.4H10V24H0ZM18 24V14.4C18 10.4 18.8 7.2 20.4 4.8C22 2.4 24.8 0.8 28.8 0L30.4 3.6C28 4.4 26.2 5.6 25 7.2C23.8 8.8 23.2 10.4 23.2 12.4H28V24H18Z" />
              </svg>
            </div>
            <p className="text-dark-700 text-[15px] leading-relaxed italic mb-5">
              Pendidikan bukan sekadar mengisi wadah, melainkan menyalakan api. Di
              EduFocus, kami membantu menyalakan potensimu.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center shadow-sm">
                <span className="text-primary-800 font-semibold text-sm">SA</span>
              </div>
              <div>
                <p className="font-semibold text-dark-800 text-sm">Sarah Amalia</p>
                <p className="text-dark-500 text-xs">
                  Siswa Kelas 12, SMAN 1 Jakarta
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
