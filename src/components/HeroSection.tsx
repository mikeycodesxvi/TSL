"use client";

import React from "react";
import Hero3DCanvas from "./Hero3DCanvas";
import { ArrowRight, Send } from "lucide-react";
import { DumplingIcon, SoupBowlIcon, ChiliFlameIcon, ChopsticksNoodlesIcon } from "./FoodIcons";
import { RESTAURANT_INFO } from "../data/restaurantData";

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOpenOrder: () => void;
}

export default function HeroSection({ onExploreMenu, onOpenOrder }: HeroSectionProps) {
  const foodHighlights = [
    {
      icon: <DumplingIcon className="w-5 h-5 text-amber-400" />,
      title: "Hand-Folded Momos",
      desc: "18 artisanal pleats",
    },
    {
      icon: <SoupBowlIcon className="w-5 h-5 text-amber-400" />,
      title: "18-Hour Broths",
      desc: "Slow-simmered herbal stock",
    },
    {
      icon: <ChiliFlameIcon className="w-5 h-5 text-red-400" />,
      title: "Jakhan Chili Chutney",
      desc: "Fiery mountain recipe",
    },
    {
      icon: <ChopsticksNoodlesIcon className="w-5 h-5 text-amber-400" />,
      title: "Himalayan Thukpa",
      desc: "Rustic hand-pulled noodles",
    },
  ];

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden">
      {/* 3D WebGL Canvas Layer - Serene ambient backdrop */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Hero3DCanvas />
      </div>

      {/* Atmospheric Soft Blur Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-transparent to-[#070709] pointer-events-none z-1" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none z-1" />

      {/* Center Content with Glassmorphic Card */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Heritage Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-semibold text-amber-300 tracking-wider uppercase">
            Est. 1989 • Rajpur Road, Dehradun
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12] mb-6">
          The Soul of <span className="text-gold-gradient">Dehradun</span>, <br />
          Hand-Folded Since <span className="text-amber-400">1989</span>.
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-10 text-balance">
          Pioneering Dehradun&apos;s famous 18-hour slow-simmered Dumpling Soup, artisanal Tibetan momos, and piping hot thukpa in the Himalayan foothills.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-16">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20KC%20Soup%20Bar,%20I%20would%20like%20to%20order.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-xs uppercase tracking-wider border border-white/10 backdrop-blur-xl transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            <span>Order on WhatsApp</span>
          </a>
        </div>

        {/* 4 Clean Glassmorphic Food Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
          {foodHighlights.map((feat, i) => (
            <div
              key={i}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/8 rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.06] hover:border-amber-500/30 group"
            >
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/8 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                {feat.icon}
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white mb-0.5">{feat.title}</h3>
              <p className="text-[11px] text-zinc-400">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
