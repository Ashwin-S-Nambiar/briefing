'use client';

export function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[1400px] min-h-[calc(100vh-4rem)] paper-texture rounded-3xl flex flex-col overflow-hidden relative shadow-2xl mx-auto my-8">
      {children}
    </div>
  );
}
