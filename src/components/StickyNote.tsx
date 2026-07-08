interface TapeProps {
  color?: "grey" | "pink";
  className?: string;
}

export function Tape({ color = "grey", className = "" }: TapeProps) {
  return (
    <div
      className={`absolute left-1/2 top-0 h-5 w-14 -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] rounded-sm opacity-70 shadow-sm ${className}`}
      style={{
        background:
          color === "pink"
            ? "linear-gradient(180deg, rgba(255,182,193,0.85), rgba(255,192,203,0.55))"
            : "linear-gradient(180deg, rgba(200,200,200,0.9), rgba(180,180,180,0.6))",
      }}
      aria-hidden
    />
  );
}

interface StickyNoteProps {
  children: React.ReactNode;
  color?: "yellow" | "blue";
  rotation?: string;
  tapeColor?: "grey" | "pink";
  className?: string;
}

export function StickyNote({
  children,
  color = "yellow",
  rotation = "rotate-[2deg]",
  tapeColor = "grey",
  className = "",
}: StickyNoteProps) {
  const bg = color === "yellow" ? "bg-[#fff9c4]" : "bg-[#e1f5fe]";

  return (
    <div
      className={`relative ${rotation} ${bg} shadow-[3px_4px_12px_rgba(0,27,61,0.12)] ${className}`}
      style={{ borderRadius: "2px 2px 20px 3px" }}
    >
      <Tape color={tapeColor} />
      <div className="p-5 pt-6">{children}</div>
    </div>
  );
}
