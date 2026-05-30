// src/components/layout/AppBackground.tsx
// Decorative soft pastel blobs sitting behind the app shell.

export function AppBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-[120px] -top-[140px] h-[520px] w-[520px] rounded-full bg-lavender opacity-55 blur-[40px]" />
      <div className="absolute -right-[160px] top-[80px] h-[460px] w-[460px] rounded-full bg-pink opacity-45 blur-[50px]" />
      <div className="absolute -bottom-[180px] right-[220px] h-[540px] w-[540px] rounded-full bg-mint opacity-50 blur-[60px]" />
      <div className="absolute -bottom-[60px] left-[180px] h-[320px] w-[320px] rounded-full bg-cream opacity-60 blur-[50px]" />
    </div>
  );
}
