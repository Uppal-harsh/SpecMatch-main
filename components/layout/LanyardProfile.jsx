"use client";
import { ChevronDown, ChevronUp, User, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useStore } from "@/lib/store";

export default function LanyardProfile() {
  const profile = useStore((state) => state.profile);
  const lanyardMinimized = useStore((state) => state.lanyardMinimized);
  const toggleLanyard = useStore((state) => state.toggleLanyard);
  
  // Extract initials safely
  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "";

  return (
    <div className="fixed top-0 right-3 sm:right-8 md:right-14 z-50 flex w-[128px] flex-col items-center pointer-events-none">
      <button
        type="button"
        onClick={toggleLanyard}
        className="pointer-events-auto absolute right-0 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/90 text-muted shadow-lg backdrop-blur-md transition-colors hover:border-accent/50 hover:text-accent"
        aria-label={lanyardMinimized ? "Show profile lanyard" : "Minimize profile lanyard"}
        title={lanyardMinimized ? "Show lanyard" : "Minimize lanyard"}
      >
        {lanyardMinimized ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </button>
      <AnimatePresence initial={false}>
        {!lanyardMinimized && (
          <motion.div
            key="lanyard"
            className="pointer-events-auto origin-top flex flex-col items-center cursor-pointer"
            initial={{ opacity: 0, y: -18, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            exit={{ opacity: 0, y: -18, scale: 0.96 }}
            transition={{
              opacity: { duration: 0.2 },
              y: { duration: 0.25 },
              scale: { duration: 0.2 },
              rotate: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 3,
                ease: "easeInOut"
              }
            }}
            whileHover={{
              rotate: [0, -8, 6, -3, 2, 0],
              transition: { duration: 1.5, ease: "easeInOut" }
            }}
          >
            <Link href="/profile" className="flex flex-col items-center group pb-4">
              {/* Lanyard Strap / String */}
              <div className="flex gap-2 w-full justify-center h-16 pointer-events-none">
                {/* The string extending up out of the viewport */}
                <div className="w-1.5 h-24 bg-accent -mt-8 rounded-b-sm shadow-sm" />
                <div className="w-1.5 h-24 bg-accent -mt-8 rounded-b-sm shadow-sm" />
              </div>
              
              {/* Badge Clip (Metal part) */}
              <div className="w-8 h-4 bg-muted border border-border/80 rounded-sm -mt-1 z-10 flex items-center justify-center shadow-md">
                <div className="w-4 h-1 bg-background/50 rounded-full" />
              </div>
              
              {/* ID Badge Card */}
              <div className="mt-[-2px] bg-card/90 backdrop-blur-xl border border-border shadow-2xl rounded-xl p-3 w-[100px] flex flex-col items-center gap-3 transition-colors group-hover:border-accent group-hover:shadow-md relative overflow-hidden">
                {/* Hologram aesthetic reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                {/* Header Hole */}
                <div className="w-6 h-1.5 bg-background border border-border/50 rounded-full absolute top-1.5" />
                
                {/* Photo / Initials */}
                <div className="w-14 h-14 mt-4 rounded-full bg-background border-2 border-border flex items-center justify-center text-text font-bold font-display text-xl overflow-hidden group-hover:bg-accent group-hover:border-accent/50 group-hover:text-background transition-colors shadow-inner">
                  {profile?.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    initials || <User size={20} />
                  )}
                </div>

                {/* User Info */}
                <div className="flex flex-col items-center text-center w-full">
                  <span className="text-sm font-bold text-text leading-tight font-display line-clamp-1 w-full bg-background/50 py-0.5 rounded border border-border/30">
                    {profile?.name || "User"}
                  </span>
                  <span className="text-[10px] text-accent2 font-mono leading-tight mt-1.5 truncate w-full flex items-center justify-center gap-1">
                    <ShieldCheck size={10} /> PRO
                  </span>
                </div>
                
                {/* Barcode Mock */}
                <div className="w-full h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIzIiBoZWlnaHQ9IjIwIiBmaWxsPSJjdXJyZW50Q29sb3IiLz48cmVjdCB4PSI1IiB3aWR0aD0iMSIgaGVpZ2h0PSIyMCIgZmlsbD0iY3VycmVudENvbG9yIi8+PHJlY3QgeD0iOCIgd2lkdGg9IjIiIGhlaWdodD0iMjAiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxyZWN0IHg9IjEyIiB3aWR0aD0iNCIgaGVpZ2h0PSIyMCIgZmlsbD0iY3VycmVudENvbG9yIi8+PHJlY3QgeD0iMTgiIHdpZHRoPSIxIiBoZWlnaHQ9IjIwIiBmaWxsPSJjdXJyZW50Q29sb3IiLz48cmVjdCB4PSIyMCIgd2lkdGg9IjIiIGhlaWdodD0iMjAiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==')] bg-repeat-x opacity-30 mt-1" />
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
