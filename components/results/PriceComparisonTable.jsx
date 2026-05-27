"use client";
import React from "react";
import { ExternalLink, Star } from "lucide-react";

export default function PriceComparisonTable({ prices }) {
  if (!prices || prices.length === 0) return null;

  const normalizedPrices = prices
    .map((priceRow) => ({
      ...priceRow,
      price: Number(priceRow.price),
      rating: Number(priceRow.rating) || 4.2,
    }))
    .filter((priceRow) => Number.isFinite(priceRow.price));

  if (normalizedPrices.length === 0) return null;

  const minPrice = Math.min(...normalizedPrices.map(p => p.price));
  const maxRating = Math.max(...normalizedPrices.map(p => p.rating));

  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-background mt-4">
      <div className="grid grid-cols-4 md:grid-cols-12 gap-2 p-4 border-b border-border bg-card/50 text-xs font-mono text-muted uppercase tracking-wider">
        <div className="col-span-2 md:col-span-4">Store</div>
        <div className="col-span-1 md:col-span-3 text-right">Price</div>
        <div className="col-span-1 md:col-span-2 text-center">Rating</div>
        <div className="hidden md:block md:col-span-3 text-right">Action</div>
      </div>
      
      <div className="flex flex-col">
        {normalizedPrices.map((store, idx) => {
          const isLowestPrice = store.price === minPrice;
          const isHighestRated = store.rating === maxRating;
          
          let rowHighlight = "";
          let badge = null;
          
          if (isLowestPrice) {
            rowHighlight = "border-l-4 border-l-accent2 bg-accent2/5";
            badge = <span className="ml-2 text-[10px] bg-accent2 text-background px-1.5 py-0.5 rounded-md font-bold uppercase tracking-widest hidden sm:inline-block">Lowest</span>;
          } else if (isHighestRated) {
            rowHighlight = "border-l-4 border-l-accent bg-accent/5";
            badge = <span className="ml-2 text-[10px] bg-accent text-background px-1.5 py-0.5 rounded-md font-bold uppercase tracking-widest hidden sm:inline-block">Top Rated</span>;
          } else {
            rowHighlight = "border-l-4 border-l-transparent";
          }
          
          return (
            <div key={idx} className={`grid grid-cols-4 md:grid-cols-12 gap-2 p-4 border-b border-border/50 items-center last:border-b-0 transition-colors hover:bg-card/30 ${rowHighlight}`}>
              <div className="col-span-2 md:col-span-4 flex items-center font-display font-bold text-text text-sm sm:text-base">
                <span className="truncate">{store.name}</span>
                {badge}
              </div>
              <div className="col-span-1 md:col-span-3 text-right font-mono font-bold text-text">
                {formatINR(store.price)}
              </div>
              <div className="col-span-1 md:col-span-2 flex items-center justify-center gap-1 text-accent font-mono text-xs sm:text-sm">
                <Star size={12} fill="currentColor" /> {store.rating.toFixed(1)}
              </div>
              <div className="col-span-4 md:col-span-3 mt-3 md:mt-0 flex justify-end">
                <a 
                  href={store.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-accent text-background font-display text-sm font-bold hover:bg-accent/90 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-sm hover:shadow-md"
                >
                  Buy Now <ExternalLink size={14} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
