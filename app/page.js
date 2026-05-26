"use client";
import React from "react";
import RotatingText from "@/components/ui/RotatingText";
import CountUp from "@/components/ui/CountUp";
import CategoryFlowingMenu from "@/components/ui/CategoryFlowingMenu";
import { motion } from "framer-motion";
import { CircuitBoard, Radar, ShieldCheck } from "lucide-react";

export default function Home() {
  const handleStartMatching = () => {
    // Scroll to FlowingMenu or just highlight it
    document.getElementById("category-selector")?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHowItWorks = () => {
    document.getElementById("about-specmatch")?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 relative">
      
      {/* Hero Content */}
      <div className="flex flex-col items-center text-center max-w-4xl w-full z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 font-display text-4xl md:text-5xl lg:text-5xl font-extrabold text-text tracking-tighter leading-none mb-6">
          <span>Find your perfect</span>
          <RotatingText
            texts={['Phone', 'Laptop', 'PC Build']}
            mainClassName="px-3 sm:px-4 md:px-5 bg-accent text-background overflow-hidden py-1 sm:py-2 md:py-3 justify-center rounded-xl font-bold"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={3000}
          />
        </div>
        
        <div className="h-4 md:h-4" />
        
        <motion.h1 
          className="font-display text-5xl md:text-[80px] font-extrabold text-text tracking-tighter leading-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          STOP SCROLLING.<br className="hidden md:block" />
          START MATCHING.
        </motion.h1>
        
        <div className="h-6 md:h-5" />
        
        <motion.p 
          className="font-body text-lg text-muted max-w-2xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Answer a few questions. Get the exact device you need.
          Compare prices across 5 stores instantly.
        </motion.p>
        
        <div className="h-10 md:h-10" />
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button 
            onClick={handleStartMatching}
            className="px-8 py-4 rounded-xl bg-accent text-background font-display font-semibold text-lg hover:bg-accent/90 transition-all shadow-md hover:shadow-md whitespace-nowrap"
          >
            Find My Device →
          </button>
          <button 
            onClick={handleHowItWorks}
            className="px-8 py-4 rounded-xl bg-transparent border border-border text-text font-display font-semibold text-lg hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
          >
            How It Works
          </button>
        </motion.div>
      </div>

      <div className="h-20 md:h-20" />

      {/* Stats Row */}
      <motion.div 
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-border/50 z-10 bg-background/20 backdrop-blur-sm rounded-3xl md:border md:border-border/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-5xl text-accent2 font-bold mb-2">
            <CountUp to={120} suffix="+" duration={2.5} />
          </div>
          <span className="font-body text-muted uppercase tracking-wider text-sm">Comparable Devices</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-5xl text-accent2 font-bold mb-2">
            <CountUp to={5} duration={2} />
          </div>
          <span className="font-body text-muted uppercase tracking-wider text-sm">Stores Compared</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-5xl text-accent2 font-bold mb-2">
            <CountUp to={3} duration={1.5} />
          </div>
          <span className="font-body text-muted uppercase tracking-wider text-sm">Device Categories</span>
        </div>
      </motion.div>

      <div className="h-20 md:h-20" id="category-selector" />

      {/* Flowing Menu Section */}
      <motion.div 
        className="w-full max-w-6xl px-4 z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-text mb-2">Select a Category</h2>
          <p className="text-muted font-body">Choose what you are looking for to begin the matching process.</p>
        </div>
        <CategoryFlowingMenu />
      </motion.div>

      <div className="h-20 md:h-24" />

      <motion.section
        id="about-specmatch"
        className="w-full max-w-6xl px-4 z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-border bg-card/75 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
              <CircuitBoard size={24} />
            </div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent2">About SpecMatch</p>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-text md:text-4xl">
              Built for people who want the right device without the noise.
            </h2>
          </div>

          <div className="rounded-3xl border border-border bg-background/55 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <p className="font-body text-base leading-relaxed text-text/90">
              SpecMatch is a futuristic buying cockpit for phones, laptops, and PC builds. Instead of pushing generic
              top-ten lists, it translates your budget, habits, workload, and must-have features into a short,
              explainable recommendation you can actually trust.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-muted">
              The experience is designed around clarity: guided questions, match scores, practical spec summaries,
              and price comparisons across stores. Whether you are choosing a daily phone, a creator laptop, or a
              performance PC, SpecMatch keeps the decision sharp, visual, and personal.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card/70 p-4">
                <Radar size={20} className="mb-3 text-accent2" />
                <h3 className="font-display text-sm font-bold text-text">Preference-led matching</h3>
                <p className="mt-2 font-body text-xs leading-relaxed text-muted">
                  Every result is shaped by how you actually plan to use the device.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card/70 p-4">
                <ShieldCheck size={20} className="mb-3 text-accent2" />
                <h3 className="font-display text-sm font-bold text-text">Decision confidence</h3>
                <p className="mt-2 font-body text-xs leading-relaxed text-muted">
                  Clear tradeoffs, saved presets, and direct price checks keep the final call simple.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

    </main>
  );
}
