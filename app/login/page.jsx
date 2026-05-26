"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const login = useStore((state) => state.login);
  const [email, setEmail] = useState("user@specmatch.app");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email.trim() || "user@specmatch.app");
    router.push("/settings");
  };

  return (
    <main className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 pb-24 pt-24">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card/90 p-6 shadow-2xl backdrop-blur-2xl sm:p-8"
      >
        <div className="mb-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
            <ShieldCheck size={22} />
          </div>
          <h1 className="font-display text-3xl font-extrabold text-text">Login</h1>
          <p className="mt-2 font-body text-sm leading-relaxed text-muted">
            Enter the cockpit and keep your presets, profile, and recommendation preferences aligned.
          </p>
        </div>

        <label className="mb-4 block">
          <span className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
            <Mail size={14} /> Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-border bg-background/70 px-4 py-3 font-body text-text outline-none transition-colors placeholder:text-muted/40 focus:border-accent"
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="mb-6 block">
          <span className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
            <LockKeyhole size={14} /> Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-border bg-background/70 px-4 py-3 font-body text-text outline-none transition-colors placeholder:text-muted/40 focus:border-accent"
            placeholder="Demo password"
          />
        </label>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3.5 font-display font-bold text-background transition-colors hover:bg-accent/90"
        >
          Continue <ArrowRight size={18} />
        </button>
      </motion.form>
    </main>
  );
}
