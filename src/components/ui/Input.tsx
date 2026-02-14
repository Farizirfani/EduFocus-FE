import { cn } from '@/lib/utils';
import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, type, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-red-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={isPassword && showPassword ? 'text' : type}
            className={cn(
              "w-full h-8 rounded-2xl border border-dark-200 bg-white px-3 py-3.5 text-sm text-dark-800 placeholder:text-dark-400 outline-none transition-all duration-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 hover:border-dark-300",
              icon && "pl-11",
              isPassword && "pr-12",
              error && "border-error focus:border-error focus:ring-red-100",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-2 text-xs text-error font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
