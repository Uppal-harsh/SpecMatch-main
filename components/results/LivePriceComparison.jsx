"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertCircle, KeyRound, Loader2 } from "lucide-react";
import { useStore } from "@/lib/store";
import PriceComparisonTable from "@/components/results/PriceComparisonTable";

export default function LivePriceComparison({ deviceName, fallbackPrices }) {
  const serpApiKey = useStore((state) => state.serpApiKey);
  const setSerpApiKey = useStore((state) => state.setSerpApiKey);
  const [prices, setPrices] = useState(fallbackPrices || []);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const effectiveKey = useMemo(() => {
    if (serpApiKey) return serpApiKey;
    if (typeof window === "undefined") return "";

    return window.localStorage.getItem("specmatch_serpapi_key") || "";
  }, [serpApiKey]);

  useEffect(() => {
    if (effectiveKey && serpApiKey !== effectiveKey) {
      setSerpApiKey(effectiveKey);
    }
  }, [effectiveKey, serpApiKey, setSerpApiKey]);

  useEffect(() => {
    if (!deviceName) return;

    if (!effectiveKey) {
      setStatus("missing-key");
      setMessage("Using sample prices. Add a SerpAPI key in Settings to fetch live store results.");
      setPrices(fallbackPrices || []);
      return;
    }

    const controller = new AbortController();

    async function loadPrices() {
      setStatus("loading");
      setMessage("Fetching live prices from configured store domains...");

      try {
        const response = await fetch(`/api/prices?query=${encodeURIComponent(deviceName)}`, {
          headers: { "x-serpapi-key": effectiveKey },
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Price lookup failed");
        }

        setPrices(data.prices?.length ? data.prices : fallbackPrices || []);
        setStatus(data.live ? "live" : "fallback");
        setMessage(data.message || "Live price lookup complete.");
      } catch (error) {
        if (error.name === "AbortError") return;
        setPrices(fallbackPrices || []);
        setStatus("error");
        setMessage(error.message || "Unable to fetch live prices right now.");
      }
    }

    loadPrices();
    return () => controller.abort();
  }, [deviceName, effectiveKey, fallbackPrices]);

  return (
    <div className="w-full">
      <div className="mb-3 flex flex-col gap-2 rounded-2xl border border-border bg-card/70 p-4 font-body text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {status === "loading" ? (
            <Loader2 size={16} className="animate-spin text-accent" />
          ) : status === "missing-key" ? (
            <KeyRound size={16} className="text-accent2" />
          ) : status === "error" ? (
            <AlertCircle size={16} className="text-accent3" />
          ) : (
            <span className="h-2.5 w-2.5 rounded-full bg-accent2" />
          )}
          <span>{message}</span>
        </div>
        <Link href="/settings" className="font-display text-xs font-bold uppercase tracking-widest text-accent hover:underline">
          Price API
        </Link>
      </div>
      <PriceComparisonTable prices={prices} />
    </div>
  );
}
