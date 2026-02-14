import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FlaskConical,
  Calculator,
  Atom,
  Target,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';

const learningLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/courses/biology', icon: FlaskConical, label: 'Biology' },
  { to: '/courses/mathematics', icon: Calculator, label: 'Mathematics' },
  { to: '/courses/chemistry', icon: Atom, label: 'Chemistry - Atom' },
  { to: '/focus-mode', icon: Target, label: 'Focus Mode' },
];

const accountLinks = [
  { to: '/settings', icon: Settings, label: 'Settings' },
  { to: '/support', icon: HelpCircle, label: 'Support' },
];

export default function Sidebar() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
      isActive
        ? 'bg-primary-50 text-primary-700 shadow-sm'
        : 'text-dark-500 hover:bg-dark-50 hover:text-dark-700'
    }`;

  return (
    <aside className="hidden lg:flex w-[260px] h-screen bg-white border-r border-dark-100 flex-col fixed left-0 top-0 z-30 transition-all duration-300">
      {/* Logo */}
      <div className="px-6 pt-7 pb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
            E
          </div>
          <span className="font-bold text-lg text-dark-800 tracking-tight">EduFocus</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto">
        {/* Learning Section */}
        <p className="px-4 text-[11px] font-semibold text-dark-400 uppercase tracking-widest mb-3">
          Learning
        </p>
        <div className="space-y-1 mb-8">
          {learningLinks.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className={linkClass}>
              <Icon size={18} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </div>

        {/* Account Section */}
        <p className="px-4 text-[11px] font-semibold text-dark-400 uppercase tracking-widest mb-3">
          Account
        </p>
        <div className="space-y-1">
          {accountLinks.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className={linkClass}>
              <Icon size={18} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-dark-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-dark-500 
            hover:bg-red-50 hover:text-error transition-all duration-200 w-full cursor-pointer"
        >
          <LogOut size={18} strokeWidth={1.8} />
          Log Out
        </button>
      </div>
    </aside>
  );
}
