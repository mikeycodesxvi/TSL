"use client";

import React from "react";
import { DumplingIcon, SoupBowlIcon, ChiliFlameIcon } from "./FoodIcons";

export default function MarqueeTicker() {
  const tickerItems = [
    { text: "Jakhan Flagship • Open Till 11:30 PM", icon: "🔥" },
    { text: "100% Hand-Pleated Artisanal Momos", icon: "🥟" },
    { text: "18-Hour Slow-Simmered Dumpling Broth", icon: "🍲" },
    { text: "Legendary Homemade Jakhan Chili Chutney", icon: "🌶️" },
    { text: "Crafted in the Foothills of Dehradun Since 1989", icon: "⛰️" },
  ];

  return (
    <div className="w-full bg-white/[0.02] border-y border-white/8 py-3 overflow-hidden text-zinc-300 font-medium text-xs tracking-wider uppercase backdrop-blur-md">
      <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
        {tickerItems.concat(tickerItems).map((item, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <span className="text-amber-400">{item.icon}</span>
              <span>{item.text}</span>
            </span>
            <span className="text-zinc-600 font-normal">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
