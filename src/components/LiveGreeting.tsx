"use client";

import { useEffect, useState } from "react";

function getGreeting(hour: number) {
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}

export function LiveGreeting() {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    setGreeting(getGreeting(new Date().getHours()));
  }, []);

  return (
    <h1
      className="font-display text-4xl font-bold leading-tight text-[#001b3d] sm:text-[2.75rem]"
      suppressHydrationWarning
    >
      {greeting}, writer.
    </h1>
  );
}
