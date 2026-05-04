"use client";
import React, { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import Stepper from "@/components/ui/Stepper";
import ElasticSlider from "@/components/ui/ElasticSlider";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Data
const FILTERS = ["5G Support Required", "Water Resistance (IP Rating)", "Wireless Charging", "MicroSD Card Slot", "Headphone Jack", "Under ₹20,000 budget"];
const BRANDS = ["Samsung", "Apple", "OnePlus", "Nothing", "Realme", "Xiaomi"];

const USAGE = ["🎮 Gaming", "📸 Photography", "💼 Work & Productivity", "📺 Streaming", "📱 Everyday Use", "🎵 Music & Media"];
const CAMERA = ["Not Important", "Nice to Have", "Very Important", "It's Everything"];
const BATTERY = ["Half a day (light use)", "Full day (moderate use)", "2 days+ (heavy use / travel)"];
const DISPLAY = ["Compact (under 6.1\")", "Standard (6.1\"–6.5\")", "Large (6.5\"+)", "Don't care"];
const STORAGE = ["64GB", "128GB", "256GB", "512GB", "1TB"];

export default function SmartphoneWizard() {
  const router = useRouter();
  const { currentStep, setStep, wizardAnswers, setAnswer, filters, setFilters, clearWizard } = useStore();
  const [loading, setLoading] = useState(false);
  const [loadText, setLoadText] = useState("Analyzing your preferences...");

  useEffect(() => {
    // Reset wizard on mount if starting fresh
    if (currentStep > 8) setStep(0);
  }, [setStep, currentStep]);

  const handleNext = () => setStep(currentStep + 1);
  const handlePrev = () => setStep(currentStep - 1);

  const submitWizard = () => {
    setLoading(true);
    const texts = [
      "Analyzing your preferences...",
      "Scanning 2,400+ devices...",
      "Comparing prices across 5 stores...",
      "Calculating match scores...",
      "Almost ready..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < texts.length) setLoadText(texts[i]);
    }, 1200);

    setTimeout(() => {
      clearInterval(interval);
      router.push("/results/smartphone");
    }, 6000);
  };

  const OptionTag = ({ option, selected, onClick, multi = false }) => (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-xl border font-body text-sm font-medium transition-all duration-300 text-left ${
        selected 
          ? "bg-accent/20 border-accent text-accent shadow-md" 
          : "bg-card border-border text-muted hover:border-accent/50 hover:text-text"
      }`}
    >
      {option}
    </button>
  );

  // Full Screen Loading Takeover
  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden">
        {/* Animated Radar Pulse */}
        <div className="relative w-40 h-40 flex items-center justify-center mb-12">
           <motion.div 
             className="absolute inset-0 rounded-full border-2 border-accent/20"
             animate={{ scale: [1, 2.5], opacity: [1, 0] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
           />
           <motion.div 
             className="absolute inset-0 rounded-full border-2 border-accent/40"
             animate={{ scale: [1, 2], opacity: [1, 0] }}
             transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
           />
           <div className="w-12 h-12 bg-accent rounded-full shadow-md" />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.p 
            key={loadText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-mono text-sm text-text font-bold tracking-widest uppercase mt-4"
          >
            {loadText}
          </motion.p>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-24 z-10 relative">
      <div className="w-full max-w-2xl bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-6 md:p-10 shadow-2xl">
        
        {/* Global Progress */}
        {currentStep > 0 && <Stepper steps={8} currentStep={currentStep - 1} />}

        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <div className="mb-2">
                <h2 className="font-display text-2xl font-bold text-text mb-2">Before we begin</h2>
                <p className="font-body text-muted">Select any absolutely required features or brand preferences.</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {FILTERS.map(f => (
                  <OptionTag key={f} option={f} selected={filters.includes(f)} multi onClick={() => {
                    if (filters.includes(f)) setFilters(filters.filter(x => x !== f));
                    else setFilters([...filters, f]);
                  }} />
                ))}
              </div>

              <h3 className="font-body font-bold text-text mt-4">Brand Preference</h3>
              <div className="flex flex-wrap gap-3">
                {BRANDS.map(b => (
                  <OptionTag key={b} option={b} selected={filters.includes(b)} multi onClick={() => {
                    if (filters.includes(b)) setFilters(filters.filter(x => x !== b));
                    else setFilters([...filters, b]);
                  }} />
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={handleNext} 
                  disabled={filters.length === 0}
                  className={`px-8 py-3 rounded-xl font-display font-bold flex items-center gap-2 transition-all ${filters.length > 0 ? "bg-accent text-background hover:bg-accent/90" : "bg-border text-muted cursor-not-allowed"}`}
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-bold text-text text-center mb-6">What do you mainly use your phone for?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {USAGE.map(u => {
                  const selection = wizardAnswers[1] || [];
                  return (
                    <OptionTag key={u} option={u} selected={selection.includes(u)} multi onClick={() => {
                      if (selection.includes(u)) setAnswer(1, selection.filter(x => x !== u));
                      else setAnswer(1, [...selection, u]);
                    }} />
                  )
                })}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8 w-full">
              <h2 className="font-display text-3xl font-bold text-text text-center mb-4">What&apos;s your total budget?</h2>
              <ElasticSlider 
                min={5000} max={150000} step={1000} 
                value={wizardAnswers[2] || [20000, 80000]} 
                onChange={(val) => setAnswer(2, val)} 
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-bold text-text text-center mb-6">How important is camera quality?</h2>
              <div className="flex flex-col gap-3">
                {CAMERA.map(c => (
                  <OptionTag key={c} option={c} selected={wizardAnswers[3] === c} onClick={() => setAnswer(3, c)} />
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-bold text-text text-center mb-6">How long do you need your battery to last?</h2>
              <div className="flex flex-col gap-3">
                {BATTERY.map(b => (
                  <OptionTag key={b} option={b} selected={wizardAnswers[4] === b} onClick={() => setAnswer(4, b)} />
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-bold text-text text-center mb-6">Which display size do you prefer?</h2>
              <div className="flex flex-col gap-3">
                {DISPLAY.map(d => (
                  <OptionTag key={d} option={d} selected={wizardAnswers[5] === d} onClick={() => setAnswer(5, d)} />
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 6 && (
            <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-bold text-text text-center mb-2">How much storage do you need?</h2>
              <p className="text-center text-muted font-body text-sm mb-6">Note: 1 photo ≈ 4MB, 1 movie ≈ 2GB</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {STORAGE.map(s => (
                  <OptionTag key={s} option={s} selected={wizardAnswers[6] === s} onClick={() => setAnswer(6, s)} />
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 7 && (
            <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-bold text-text text-center mb-6">Pick what matters MORE to you:</h2>
              
              <div className="flex flex-col gap-6">
                 {[
                   ["Better Camera", "Longer Battery"],
                   ["Faster Processor", "Thinner Design"],
                   ["More Storage", "Lower Price"]
                 ].map((pair, idx) => {
                   const stepKey = `7_${idx}`;
                   return (
                     <div key={idx} className="flex flex-row items-center justify-center gap-2 sm:gap-4 w-full">
                       <OptionTag option={pair[0]} selected={wizardAnswers[stepKey] === pair[0]} onClick={() => setAnswer(stepKey, pair[0])} />
                       <span className="font-mono text-muted text-xs mx-1">VS</span>
                       <OptionTag option={pair[1]} selected={wizardAnswers[stepKey] === pair[1]} onClick={() => setAnswer(stepKey, pair[1])} />
                     </div>
                   );
                 })}
              </div>
            </motion.div>
          )}

          {currentStep === 8 && (
            <motion.div key="step8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
               <h2 className="font-display text-3xl font-bold text-text text-center mb-4">Anything else we should know?</h2>
               <textarea 
                 value={wizardAnswers[8] || ""}
                 onChange={(e) => setAnswer(8, e.target.value)}
                 placeholder="e.g. I want it to be compact and black..."
                 maxLength={140}
                 className="w-full bg-background border border-border rounded-xl p-4 text-text font-body focus:outline-none focus:border-accent transition-colors resize-none h-32 placeholder:text-muted/50"
               />
               <div className="text-right text-xs font-mono text-muted">
                 {(wizardAnswers[8] || "").length} / 140
               </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Navigation Actions */}
        {currentStep > 0 && (
          <div className="flex justify-between items-center mt-10 border-t border-border/50 pt-6">
            <button onClick={handlePrev} className="text-muted hover:text-text font-body text-sm flex items-center gap-1 transition-colors">
              <ArrowLeft size={16} /> Back
            </button>
            
            {currentStep < 8 ? (
              <button 
                onClick={handleNext}
                disabled={
                  currentStep === 7 
                    ? (!wizardAnswers["7_0"] || !wizardAnswers["7_1"] || !wizardAnswers["7_2"])
                    : (!wizardAnswers[currentStep] || (Array.isArray(wizardAnswers[currentStep]) && wizardAnswers[currentStep].length === 0))
                }
                className="px-6 py-2.5 rounded-xl bg-text text-background font-body font-bold hover:bg-muted transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            ) : (
              <button 
                onClick={submitWizard}
                className="px-8 py-3 rounded-xl bg-accent text-background font-display font-bold hover:bg-accent/90 transition-all shadow-md"
              >
                Find My Phone →
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
