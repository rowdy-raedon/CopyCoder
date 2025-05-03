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
            {[...Array(5)].map((_, i) => (
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

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Panel - 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* File Upload Area Skeleton */}
              <div className="bg-gradient-to-b from-[#1c1f26]/80 to-[#1c1f26] rounded-2xl border border-[#2a2f3a]/50 p-8 h-[340px] flex flex-col items-center justify-center gap-6">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="text-center space-y-2 w-full">
                  <Skeleton className="h-6 w-48 mx-auto" />
                  <Skeleton className="h-4 w-64 mx-auto" />
                </div>
                <Skeleton className="h-10 w-32 rounded-full" />
              </div>

              {/* Project Information Form Skeleton */}
              <div className="bg-gradient-to-b from-[#1c1f26]/80 to-[#1c1f26] rounded-2xl border border-[#2a2f3a]/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Skeleton className="h-1 w-1 rounded-full" />
                  <Skeleton className="h-5 w-40" />
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-24 w-full rounded-md" />
                  </div>
                </div>
              </div>

              {/* Quick Tools Skeleton */}
              <div className="bg-gradient-to-b from-[#1c1f26]/80 to-[#1c1f26] rounded-2xl border border-[#2a2f3a]/50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-8 w-24 rounded-full" />
                  ))}
                </div>
              </div>

              {/* Prompt Display Skeleton */}
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

            {/* Right Panel - 2 columns */}
            <div className="lg:col-span-2">
              {/* Control Panel Skeleton */}
              <div className="bg-gradient-to-b from-[#1c1f26]/80 to-[#1c1f26] rounded-2xl p-8 border border-[#2a2f3a]/50 h-full flex flex-col">
                <div className="space-y-8 flex-1">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>

                  <div className="space-y-3">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-11 w-full rounded-lg" />
                  </div>

                  <div className="space-y-5 pt-2">
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

                  <div className="space-y-4 pt-2">
                    <Skeleton className="h-5 w-36" />
                    <div className="grid grid-cols-1 gap-3">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-20 w-full rounded-lg" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-10">
                  <Skeleton className="h-14 w-full rounded-xl" />
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
