"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function safeReturnTo(raw: string | null) {
  if (!raw) return "/";
  // Only allow same-site relative paths.
  if (!raw.startsWith("/")) return "/";
  if (raw.startsWith("//")) return "/";
  return raw;
}

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = useMemo(() => safeReturnTo(searchParams.get("returnTo")), [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Login failed");
        return;
      }

      router.replace(returnTo);
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#d1d3c7] text-[#181619] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-sm rounded-custom-xl shadow-xl border border-[#181619]/10 p-8">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Honor Role</h1>
          <p className="text-sm text-[#181619]/70">Enter credentials to continue.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-[#181619]/20 bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-[#729bd9] focus:border-transparent"
              placeholder="hi@honorrole.com"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-[#181619]/20 bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-[#729bd9] focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <div className="rounded-lg border border-red-500/20 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-[#181619] text-[#d1d3c7] px-4 py-3 font-semibold disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-xs text-[#181619]/60">
            Return to: <span className="font-mono">{returnTo}</span>
          </p>
        </form>
      </div>
    </main>
  );
}

