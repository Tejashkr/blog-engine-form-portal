"use client";

import { SketchBox } from "@/components/NotebookDecor";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result = (await response.json()) as { success: boolean; message?: string };

      if (result.success) {
        router.push(from);
        router.refresh();
      } else {
        setError(result.message ?? "Wrong password.");
      }
    } catch {
      setError("Could not sign in. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SketchBox className="animate-fade-up">
      <p className="font-hand text-2xl text-[#001b3d]">Private notebook — enter the key</p>
      <p className="mt-1 text-sm text-[#001b3d]/60">
        Only people with the access password can open forms and submit to n8n.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="password" className="font-hand text-xl text-[#001b3d]">
            Access password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="input-field mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="rounded-lg border border-[#ef9a9a] bg-[#ffebee] px-3 py-2 font-hand text-lg text-[#c62828]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary inline-flex w-full items-center justify-center px-6 py-3 text-sm"
        >
          {isLoading ? "Checking…" : "Unlock portal"}
        </button>
      </form>
    </SketchBox>
  );
}
