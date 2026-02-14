import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-dark-50">
      <Sidebar />
      <div className="lg:ml-[260px] transition-all duration-300">
        <Navbar />
        <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
