"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, LogIn } from "lucide-react";
import { useStore } from "@/lib/store";

export default function LogoutPage() {
  const logout = useStore((state) => state.logout);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <main className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 pb-24 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md rounded-3xl border border-border bg-card/90 p-6 text-center shadow-2xl backdrop-blur-2xl sm:p-8"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent2/20 bg-accent2/10 text-accent2">
          <Check size={24} />
        </div>
        <h1 className="font-display text-3xl font-extrabold text-text">Logged Out</h1>
        <p className="mx-auto mt-3 max-w-xs font-body text-sm leading-relaxed text-muted">
          Your local SpecMatch session has been cleared. You can continue as a guest or sign back in.
        </p>
        <Link
          href="/login"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3.5 font-display font-bold text-background transition-colors hover:bg-accent/90"
        >
          <LogIn size={18} /> Login Again
        </Link>
      </motion.div>
    </main>
  );
}
