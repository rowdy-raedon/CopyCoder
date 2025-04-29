import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse rounded-md bg-[#1c1f26]/60 relative overflow-hidden", className)}>
      <div className="shimmer-effect" />
    </div>
  )
}
