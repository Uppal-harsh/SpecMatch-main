"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Cpu, Laptop, MonitorSmartphone, Smartphone, X } from "lucide-react";
import DockNav from "@/components/layout/DockNav";
import FolderPresets from "@/components/layout/FolderPresets";
import LanyardProfile from "@/components/layout/LanyardProfile";

const deviceLinks = [
  {
    href: "/wizard/smartphone",
    title: "Smartphone",
    detail: "Camera, battery, display, storage",
    icon: Smartphone,
  },
  {
    href: "/wizard/laptop",
    title: "Laptop",
    detail: "Portability, OS, RAM, workload",
    icon: Laptop,
  },
  {
    href: "/wizard/pc-builder",
    title: "PC Builder",
    detail: "Parts, budget, gaming and creator rigs",
    icon: Cpu,
  },
];

export default function AppChrome({ children }) {
  const [devicePickerOpen, setDevicePickerOpen] = useState(false);

  return (
    <>
      <FolderPresets />
      <LanyardProfile />
      <div className="relative z-10 min-h-screen pb-32">{children}</div>
      <DockNav onChooseDevice={() => setDevicePickerOpen(true)} />

      <AnimatePresence>
        {devicePickerOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close device picker"
              className="fixed inset-0 z-[70] bg-background/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDevicePickerOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.96 }}
              transition={{ type: "spring", damping: 24, stiffness: 260 }}
              className="fixed left-1/2 top-1/2 z-[80] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-card/95 p-5 shadow-2xl backdrop-blur-2xl sm:p-6"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
                    <MonitorSmartphone size={20} />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-text">Choose Device</h2>
                  <p className="mt-1 font-body text-sm text-muted">
                    Jump into the matching flow that fits your next upgrade.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDevicePickerOpen(false)}
                  className="rounded-full border border-border bg-background/70 p-2 text-muted transition-colors hover:text-text"
                  aria-label="Close device picker"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {deviceLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDevicePickerOpen(false)}
                      className="group rounded-2xl border border-border bg-background/60 p-4 transition-colors hover:border-accent/60 hover:bg-accent/10"
                    >
                      <Icon size={22} className="mb-4 text-accent2 transition-colors group-hover:text-accent" />
                      <h3 className="font-display text-base font-bold text-text">{item.title}</h3>
                      <p className="mt-2 font-body text-xs leading-relaxed text-muted">{item.detail}</p>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
