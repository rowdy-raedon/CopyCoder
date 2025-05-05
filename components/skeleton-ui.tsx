import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonUI() {
  // Sidebar width for content margin
  const sidebarWidth = 240

  return (
    <div className="min-h-screen bg-[#0f1117] text-white font-sans antialiased">
      {/* Skeleton Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 z-30 h-screen w-[240px] border-r border-[#1c1f26]/50 bg-[#0f1117]/95">
        {/* Logo section */}
        <div className="flex items-center p-4 h-[72px] border-b border-[#1c1f26]/50">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <div className="py-6 px-2">
          <div className="flex flex-col gap-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-lg" />
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[#1c1f26]/50 p-4 space-y-4">
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-40 p-4">
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>

      {/* Main content */}
      <div className="transition-all duration-300 min-h-screen" style={{ marginLeft: `${sidebarWidth}px` }}>
        <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          {/* Page title skeleton */}
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Generator View Skeleton - Vertical Layout */}
            <div className="space-y-6">
              {/* Control Panel Skeleton - Top */}
              <div className="bg-gradient-to-b from-[#1c1f26]/80 to-[#1c1f26] rounded-2xl p-6 border border-[#2a2f3a]/50">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left column */}
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-11 w-full rounded-lg" />
                  </div>

                  {/* Middle column */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-6 w-10" />
                    </div>
                    <Skeleton className="h-4 w-full rounded-full" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-36" />
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-24 w-full rounded-lg" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Generate button area */}
                <div className="mt-6 flex items-center justify-between">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-14 w-48 rounded-xl" />
                </div>
              </div>

              {/* Content Skeleton - Bottom */}
              <div className="bg-gradient-to-b from-[#1c1f26]/80 to-[#1c1f26] rounded-2xl border border-[#2a2f3a]/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-1 w-1 rounded-full" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-7 w-32" />
                </div>

                <div className="bg-[#0f1117]/70 rounded-lg p-4 h-[300px] border border-[#2a2f3a]/30">
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer Skeleton */}
        <footer className="mt-12 py-8 border-t border-[#1c1f26]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-7 rounded-full" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="flex gap-8">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
