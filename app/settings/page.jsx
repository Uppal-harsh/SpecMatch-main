"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  Gauge,
  LogIn,
  LogOut,
  MonitorSmartphone,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useStore } from "@/lib/store";

const matchModes = [
  { id: "balanced", label: "Balanced", detail: "Price, power, and longevity" },
  { id: "performance", label: "Performance", detail: "Speed and premium specs first" },
  { id: "value", label: "Value", detail: "Maximum usefulness per rupee" },
];

function ToggleRow({ icon: Icon, title, detail, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/55 p-4">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/15 bg-accent/10 text-accent">
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-sm font-bold text-text">{title}</h3>
          <p className="mt-1 font-body text-xs leading-relaxed text-muted">{detail}</p>
        </div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors ${
          checked ? "border-accent/40 bg-accent" : "border-border bg-card"
        }`}
      >
        <span
          className={`absolute left-0 top-1 h-5 w-5 rounded-full bg-background shadow-md transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const {
    isAuthenticated,
    sessionEmail,
    preferences,
    setPreference,
    lanyardMinimized,
    toggleLanyard,
  } = useStore();

  return (
    <main className="relative z-10 flex min-h-screen w-full justify-center px-4 pb-24 pt-24 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-5xl"
      >
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent">
              <ScanLine size={14} /> Control Core
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-none text-text sm:text-5xl">
              Settings
            </h1>
            <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-muted sm:text-base">
              Tune SpecMatch for faster decisions, cleaner mobile use, and a more focused recommendation cockpit.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-xl">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Session</p>
            <p className="mt-1 max-w-[260px] truncate font-display text-lg font-bold text-text">
              {isAuthenticated ? sessionEmail : "Guest mode"}
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-3xl border border-border bg-card/80 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
                <Gauge size={20} />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-text">Recommendation Engine</h2>
                <p className="font-body text-xs text-muted">Select how aggressively matches should be ranked.</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {matchModes.map((mode) => {
                const active = preferences.matchMode === mode.id;

                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setPreference("matchMode", mode.id)}
                    className={`rounded-2xl border p-4 text-left transition-colors ${
                      active
                        ? "border-accent bg-accent/15 text-accent"
                        : "border-border bg-background/50 text-muted hover:border-accent/50 hover:text-text"
                    }`}
                  >
                    <Sparkles size={18} className="mb-4" />
                    <h3 className="font-display text-sm font-bold">{mode.label}</h3>
                    <p className="mt-2 font-body text-xs leading-relaxed">{mode.detail}</p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card/80 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-accent2/20 bg-accent2/10 text-accent2">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-text">Access</h2>
                <p className="font-body text-xs text-muted">Keep login and logout within reach.</p>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/login"
                className="flex items-center justify-between rounded-2xl border border-border bg-background/55 p-4 text-text transition-colors hover:border-accent/60"
              >
                <span className="flex items-center gap-3 font-display font-bold">
                  <LogIn size={18} /> Login
                </span>
                <ChevronRight size={18} className="text-muted" />
              </Link>
              <Link
                href="/logout"
                className="flex items-center justify-between rounded-2xl border border-border bg-background/55 p-4 text-text transition-colors hover:border-accent3/60"
              >
                <span className="flex items-center gap-3 font-display font-bold">
                  <LogOut size={18} /> Logout
                </span>
                <ChevronRight size={18} className="text-muted" />
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card/80 p-5 shadow-2xl backdrop-blur-xl sm:p-6 lg:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
                <MonitorSmartphone size={20} />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-text">Interface</h2>
                <p className="font-body text-xs text-muted">Controls tuned for desktop dashboards and mobile screens.</p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <ToggleRow
                icon={Bell}
                title="Price alert bias"
                detail="Prioritize products with noticeable price movement."
                checked={preferences.priceAlerts}
                onChange={(value) => setPreference("priceAlerts", value)}
              />
              <ToggleRow
                icon={Zap}
                title="Fast interface motion"
                detail="Keep scans, panels, and transitions snappy."
                checked={preferences.fastAnimations}
                onChange={(value) => setPreference("fastAnimations", value)}
              />
              <ToggleRow
                icon={MonitorSmartphone}
                title="Compact mobile controls"
                detail="Tighten controls so device selection remains reachable."
                checked={preferences.compactMobile}
                onChange={(value) => setPreference("compactMobile", value)}
              />
              <ToggleRow
                icon={ShieldCheck}
                title="Minimize floating lanyard"
                detail="Collapse the badge when it gets in the way of selections."
                checked={lanyardMinimized}
                onChange={toggleLanyard}
              />
            </div>
          </section>
        </div>
      </motion.div>
    </main>
  );
}
