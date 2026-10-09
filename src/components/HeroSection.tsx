"use client";

import React from "react";
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
      icon: <DumplingIcon className="w-5 h-5 text-orange-400" />,
      title: "Hand-Folded Momos",
      desc: "18 artisanal pleats",
    },
    {
      icon: <SoupBowlIcon className="w-5 h-5 text-orange-400" />,
      title: "18-Hour Broths",
      desc: "Slow-simmered herbal stock",
    },
    {
      icon: <ChiliFlameIcon className="w-5 h-5 text-orange-400" />,
      title: "Jakhan Chili Chutney",
      desc: "Fiery mountain recipe",
    },
    {
      icon: <ChopsticksNoodlesIcon className="w-5 h-5 text-orange-400" />,
      title: "Himalayan Thukpa",
      desc: "Rustic hand-pulled noodles",
    },
  ];

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden">
      {/* Background Video Layer with Autoplay & Loop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
          src="/BGVIDEO.mp4"
        />
        {/* High-Contrast Scrim Overlay for Crystal-Clear Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Heritage Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-md mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-xs font-semibold text-orange-300 tracking-wider uppercase">
            Est. 1989 • Rajpur Road, Dehradun
          </span>
        </div>

        {/* High-Contrast Bold Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12] mb-6 drop-shadow-md">
          The Soul of <span className="text-orange-400">Dehradun</span>, <br />
          Hand-Folded Since <span className="text-orange-400">1989</span>.
        </h1>

        {/* Subtitle with High Contrast */}
        <p className="text-zinc-100 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-10 text-balance drop-shadow">
          Pioneering Dehradun&apos;s famous 18-hour slow-simmered Dumpling Soup, artisanal Tibetan momos, and piping hot thukpa in the Himalayan foothills.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-16">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/30 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20KC%20Soup%20Bar,%20I%20would%20like%20to%20order.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs uppercase tracking-wider border border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            <span>Order on WhatsApp</span>
          </a>
        </div>

        {/* 4 Clean Frosted Glass Food Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
          {foodHighlights.map((feat, i) => (
            <div
              key={i}
              className="bg-black/45 backdrop-blur-md border border-white/15 rounded-2xl p-4 transition-all duration-300 hover:bg-black/60 hover:border-orange-400/50 group"
            >
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                {feat.icon}
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white mb-0.5">{feat.title}</h3>
              <p className="text-[11px] text-zinc-300">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
