"use client";

import React from "react";

export default function MarqueeTicker() {
  const tickerItems = [
    { text: "Jakhan Flagship • Open Till 11:30 PM", icon: "🔥" },
    { text: "100% Hand-Pleated Artisanal Momos", icon: "🥟" },
    { text: "18-Hour Slow-Simmered Dumpling Broth", icon: "🍲" },
    { text: "Legendary Homemade Jakhan Chili Chutney", icon: "🌶️" },
    { text: "Crafted in the Foothills of Dehradun Since 1989", icon: "⛰️" },
    { text: "Fresh Daily Batches • Zero Artificial MSG", icon: "✨" },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 py-3.5 overflow-hidden text-white font-bold text-xs tracking-wider uppercase shadow-sm">
      <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
        {tickerItems.concat(tickerItems).map((item, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <span className="text-white drop-shadow">{item.icon}</span>
              <span className="text-white">{item.text}</span>
            </span>
            <span className="text-orange-200/80 font-normal">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
