import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { loginSchema, type LoginFormData } from '@/schemas/auth.schema';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof LoginFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await login(result.data);
      toast.success('Login berhasil!');
      navigate('/dashboard');
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <div>
      {/* Heading */}
      <h1 className="text-[32px] font-bold text-dark-900 leading-tight mb-2">
        Selamat Datang
      </h1>
      <p className="text-dark-500 text-[15px] mb-10 leading-relaxed">
        Masuk untuk melanjutkan pembelajaranmu<br />hari ini.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-5">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />
          <Input
            name="password"
            type="password"
            placeholder="Kata Sandi"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
          />
        </div>

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-dark-300 text-primary-600 focus:ring-primary-500 accent-primary-600"
            />
            <span className="text-sm text-dark-600">Ingat saya</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Lupa kata sandi?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full"
          size="lg"
        >
          Masuk
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-dark-200" />
        <span className="text-xs text-dark-400 whitespace-nowrap">Atau lanjutkan dengan</span>
        <div className="flex-1 h-px bg-dark-200" />
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="social" size="md" icon={
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
        }>
          Google
        </Button>
        <Button variant="social" size="md" icon={
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        }>
          Facebook
        </Button>
      </div>

      {/* Register Link */}
      <p className="text-center mt-8 text-sm text-dark-500">
        Belum punya akun?{' '}
        <Link
          to="/register"
          className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
        >
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
}
