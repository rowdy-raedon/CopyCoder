export default function Page() {
  return (
    <div id="app-root" className="min-h-screen bg-[#0f1117]">
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
        <div className="animate-pulse text-white text-opacity-50">Loading application...</div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const script = document.createElement('script');
              script.src = '/client-app.js';
              script.type = 'module';
              script.onload = function() {
                console.log('Client app loaded');
              };
              document.body.appendChild(script);
            });
          `,
        }}
      />
    </div>
  )
}
