import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  color?: string;
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

const colorMap: Record<string, string> = {
  blue: 'bg-primary-500',
  green: 'bg-success',
  orange: 'bg-warning',
  red: 'bg-error',
  cyan: 'bg-info',
};

export default function ProgressBar({
  progress,
  color = 'blue',
  size = 'sm',
  showLabel = false,
  className,
}: ProgressBarProps) {
  const barColor = colorMap[color] || color;
  const height = size === 'sm' ? 'h-1.5' : 'h-2.5';

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-dark-500">Progress</span>
          <span className="text-xs font-semibold text-dark-700">{progress}%</span>
        </div>
      )}
      <div className={`w-full ${height} bg-dark-100 rounded-full overflow-hidden`}>
        <div
          className={cn(height, barColor, "rounded-full transition-all duration-500 ease-out")}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}
