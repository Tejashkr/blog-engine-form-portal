import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-6 pb-16 pl-14 pt-10 sm:pl-20 sm:pr-8">
      <Link
        href="/"
        className="mb-8 inline-flex font-hand text-lg text-[#001b3d]/55 transition hover:text-[#ff7067]"
      >
        ← back
      </Link>

      <header className="mb-8">
        <h1 className="font-display text-4xl font-bold text-[#001b3d]">Sign in</h1>
        <p className="mt-2 text-sm text-[#001b3d]/65">
          This portal is private. Ask your admin for the password.
        </p>
      </header>

      <Suspense fallback={<p className="text-sm text-[#001b3d]/50">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
