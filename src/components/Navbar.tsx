import { Search, Bell, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useThemeStore } from '@/stores/useThemeStore';

export default function Navbar() {
  const { user } = useAuthStore();
  const { toggleTheme, isDarkMode } = useThemeStore();

  return (
    <header className="h-[68px] bg-white border-b border-dark-100 flex items-center justify-between px-4 md:px-6 lg:px-8 sticky top-0 z-20 transition-all duration-300">
      {/* Search Bar */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            placeholder="Search for topics..."
            className="w-full pl-11 pr-4 py-2.5 bg-dark-50 rounded-xl text-sm text-dark-700 placeholder:text-dark-400 
              outline-none focus:bg-white focus:ring-3 focus:ring-primary-100 focus:border-primary-300 
              border border-transparent hover:border-dark-200 transition-all duration-200"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-xl flex items-center justify-center text-dark-500 
          hover:bg-dark-50 transition-colors cursor-pointer">
          <Bell size={19} strokeWidth={1.8} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-white" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-dark-500 
            hover:bg-dark-50 transition-colors cursor-pointer"
        >
          {isDarkMode ? <Sun size={19} strokeWidth={1.8} /> : <Moon size={19} strokeWidth={1.8} />}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 ml-3 pl-4 border-l border-dark-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-dark-800 leading-tight">
              {user?.name || 'Alex Morgan'}
            </p>
            <p className="text-xs text-dark-400 mt-0.5">
              Student • Grade {user?.grade || '12'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden ring-2 ring-primary-50">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-primary-700 font-bold text-sm">
                {(user?.name || 'AM').charAt(0)}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
