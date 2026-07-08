import { BottomNav } from "@/components/BottomNav";
import { SiteHeader } from "@/components/SiteHeader";
import Link from "next/link";

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="notebook-page relative min-h-screen pb-24 sm:pb-8">
      <SiteHeader />
      <div className="relative">{children}</div>

      {/* FAB — quick new submission */}
      <Link
        href="/forms/weekly-blogs"
        className="fab fixed bottom-20 right-5 z-40 flex h-14 w-14 items-center justify-center text-2xl font-light sm:bottom-8"
        aria-label="New submission"
      >
        +
      </Link>

      <BottomNav />

      <footer className="relative mt-12 hidden text-center text-xs text-[#001b3d]/40 sm:block">
        scribbled with care · synced to n8n
      </footer>
    </div>
  );
}
