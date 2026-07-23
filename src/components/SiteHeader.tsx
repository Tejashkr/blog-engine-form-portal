import { AuthSignOut } from "@/components/AuthSignOut";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="relative z-10">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5 pl-14 sm:pl-20 sm:pr-8">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-[#001b3d]">
          Form Portal
        </Link>

        <AuthSignOut />
      </div>
    </header>
  );
}
