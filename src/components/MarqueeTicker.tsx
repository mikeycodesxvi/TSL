"use client";

import React from "react";

export default function MarqueeTicker() {
  const tickerItems = [
    "🔥 JAKHAN FLAGSHIP OPEN TILL 11:30 PM",
    "🥟 100% HAND-PLEATED ARTISANAL MOMOS",
    "🍲 18-HOUR SLOW-SIMMERED DUMPLING BROTH",
    "🌶️ LEGENDARY HOMEMADE JAKHAN CHILI CHUTNEY",
    "⛰️ CRAFTED IN THE FOOTHILLS OF DEHRADUN",
    "⭐ 35 YEARS OF UNCOMPROMISED CULINARY HERITAGE",
    "🥢 CRISPY KOTHEY & GOLDEN KURKURE SPECIALS",
    "🫖 AUTHENTIC TIBETAN BUTTER TEA & THUKPA",
  ];

  return (
    <div className="w-full bg-gradient-to-r from-amber-600 via-red-600 to-amber-600 py-3 overflow-hidden text-zinc-950 font-black text-xs sm:text-sm tracking-wider uppercase select-none border-y border-amber-400/30 shadow-lg">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {tickerItems.concat(tickerItems).map((text, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="flex items-center gap-2">{text}</span>
            <span className="text-zinc-950/60 font-normal">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
