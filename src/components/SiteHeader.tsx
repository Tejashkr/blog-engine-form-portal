import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="relative z-10">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5 pl-14 sm:pl-20 sm:pr-8">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-[#001b3d]">
          Form Portal
        </Link>

        <button
          type="button"
          className="rounded-full p-2 text-[#001b3d]/70 transition hover:bg-[#001b3d]/5"
          aria-label="Menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}
