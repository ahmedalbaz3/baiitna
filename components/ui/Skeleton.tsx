export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-gray-200/80 animate-pulse rounded-md ${className}`} />
  );
}
