import { useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { Camera, Save, User, Mail, Lock, Phone, MapPin } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { updateProfile, changePassword } from '@/services/api';

export default function ProfilePage() {
  const { user, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 000-0000',
    location: 'New York, USA',
    bio: 'Student at EduFocus High School. Passionate about Science and Mathematics.',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      await checkAuth(); // Refresh user data
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // basic validation
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error('Please fill in both password fields');
      return;
    }
    
    try {
      await changePassword(passwordData);
      toast.success('Password changed successfully');
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to change password');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-dark-900 mb-6">Edit Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Avatar & Basic Info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-dark-100 rounded-2xl border border-dark-100 dark:border-dark-100/50 p-6 flex flex-col items-center text-center">
            <div className="relative mb-4 group cursor-pointer">
              <div className="w-28 h-28 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-4xl font-bold text-primary-600 dark:text-primary-400 border-4 border-white dark:border-dark-100 shadow-sm overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  formData.name.charAt(0)
                )}
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" size={24} />
              </div>
            </div>
            <h2 className="text-lg font-bold text-dark-800">{formData.name}</h2>
            <p className="text-sm text-dark-500">Student</p>
          </div>

          {/* Quick Stats or something could go here */}
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-100 rounded-2xl border border-dark-100 dark:border-dark-100/50 p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-700">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-50 dark:bg-dark-50 rounded-xl border border-transparent focus:bg-white dark:focus:bg-dark-200 focus:border-primary-300 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 transition-all outline-none text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-700">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-50 dark:bg-dark-50 rounded-xl border border-transparent focus:bg-white dark:focus:bg-dark-200 focus:border-primary-300 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 transition-all outline-none text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-700">Phone Number</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-50 dark:bg-dark-50 rounded-xl border border-transparent focus:bg-white dark:focus:bg-dark-200 focus:border-primary-300 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 transition-all outline-none text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-700">Location</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-50 dark:bg-dark-50 rounded-xl border border-transparent focus:bg-white dark:focus:bg-dark-200 focus:border-primary-300 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 transition-all outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-700">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-dark-50 dark:bg-dark-50 rounded-xl border border-transparent focus:bg-white dark:focus:bg-dark-200 focus:border-primary-300 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 transition-all outline-none text-sm resize-none"
              />
            </div>

            <div className="pt-4 border-t border-dark-100 dark:border-dark-100/50 flex justify-end gap-3">
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl font-medium text-dark-600 hover:bg-dark-50 dark:hover:bg-dark-50/50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors flex items-center gap-2 shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={18} />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>

          <div className="mt-8 bg-white dark:bg-dark-100 rounded-2xl border border-dark-100 dark:border-dark-100/50 p-8">
             <h3 className="text-lg font-bold text-dark-900 mb-6 flex items-center gap-2">
               <Lock size={20} className="text-primary-500" />
               Change Password
             </h3>
             <form onSubmit={handlePasswordSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark-700">Current Password</label>
                  <input 
                    type="password" 
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••" 
                    className="w-full px-4 py-2.5 bg-dark-50 dark:bg-dark-50 rounded-xl border border-transparent focus:bg-white dark:focus:bg-dark-200 outline-none text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark-700">New Password</label>
                  <input 
                    type="password" 
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••" 
                    className="w-full px-4 py-2.5 bg-dark-50 dark:bg-dark-50 rounded-xl border border-transparent focus:bg-white dark:focus:bg-dark-200 outline-none text-sm" 
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                   <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl font-medium bg-dark-800 dark:bg-dark-700 text-white hover:bg-dark-900 dark:hover:bg-dark-600 transition-colors shadow-lg"
                  >
                    Update Password
                  </button>
                </div>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
}
