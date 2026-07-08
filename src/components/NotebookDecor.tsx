export function DateStamp() {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = now.getDate();

  return (
    <span className="inline-block rotate-[-6deg] rounded-full border border-[#ffcdd2] bg-[#fce4ec] px-3 py-0.5 font-hand text-sm font-semibold tracking-wide text-[#c62828] shadow-sm">
      {month} {day}
    </span>
  );
}

export function HandUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        className="absolute -bottom-1 left-0 w-full text-[#d32f2f]"
        height="6"
        viewBox="0 0 100 6"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M2 4 C 20 1, 40 5, 60 3 S 90 2, 98 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function SketchBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`sketch-box relative p-6 ${className}`}>
      {children}
    </div>
  );
}
