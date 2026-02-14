import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'circle' | 'card';
}

export default function LoadingSkeleton({
  className = '',
  variant = 'text',
}: LoadingSkeletonProps) {
  const baseClass = 'animate-skeleton bg-dark-200 rounded';

  if (variant === 'circle') {
    return <div className={cn(baseClass, "rounded-full", className)} />;
  }

  if (variant === 'card') {
    return (
      <div className={cn(baseClass, "rounded-2xl p-6", className)}>
        <div className="space-y-4">
          <div className="h-10 w-10 rounded-xl bg-dark-300 animate-skeleton" />
          <div className="h-5 w-3/4 rounded bg-dark-300 animate-skeleton" />
          <div className="h-4 w-1/2 rounded bg-dark-300 animate-skeleton" />
          <div className="h-2 w-full rounded-full bg-dark-300 animate-skeleton mt-4" />
        </div>
      </div>
    );
  }

  return <div className={cn(baseClass, className)} />;
}
