"use client";

import { useEffect, useState } from "react";

function formatDateStamp(date: Date) {
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = date.getDate();
  return `${month} ${day}`;
}

export function DateStamp() {
  const [stamp, setStamp] = useState<string | null>(null);

  useEffect(() => {
    setStamp(formatDateStamp(new Date()));
  }, []);

  return (
    <span
      className="inline-block rotate-[-6deg] rounded-full border border-[#ffcdd2] bg-[#fce4ec] px-3 py-0.5 font-hand text-sm font-semibold tracking-wide text-[#c62828] shadow-sm"
      suppressHydrationWarning
    >
      {stamp ?? "···"}
    </span>
  );
}
