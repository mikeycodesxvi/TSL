"use client";

import React from "react";
import Hero3DCanvas from "./Hero3DCanvas";
import { Sparkles, Utensils, Droplets, ArrowRight, ShieldCheck, Flame } from "lucide-react";
import { RESTAURANT_INFO } from "../data/restaurantData";

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOpenAlchemy: () => void;
}

export default function HeroSection({ onExploreMenu, onOpenAlchemy }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Hero3DCanvas />
      </div>

      {/* Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-transparent to-zinc-950 pointer-events-none z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Heritage Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-amber-500/30 backdrop-blur-xl mb-6 shadow-2xl animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs sm:text-sm font-bold text-amber-300 tracking-wider uppercase">
            Est. 1989 • Rajpur Road, Dehradun
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-xs font-semibold text-zinc-300">The Himalayan Original</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.08] mb-6">
          The Soul of <span className="text-gold-gradient">Dehradun</span>,{" "}
          <br className="hidden sm:inline" />
          Hand-Folded Since <span className="text-fire-gradient">1989</span>.
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-300 text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed mb-10 text-balance">
          Pioneering the iconic <strong className="text-white">18-hour slow-simmered Dumpling Soup</strong>, handcrafted Tibetan momos, and mountain wok specialties in the Himalayan foothills.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-red-500 hover:from-amber-400 hover:to-red-400 text-zinc-950 font-black text-sm tracking-wide transition-all shadow-2xl shadow-amber-500/25 active:scale-95 flex items-center justify-center gap-2"
          >
            <Utensils className="w-4 h-4" />
            <span>Explore Signature Menu</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onOpenAlchemy}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-950/80 hover:bg-zinc-900 text-white font-bold text-sm tracking-wide border border-white/10 hover:border-amber-500/40 backdrop-blur-xl transition-all flex items-center justify-center gap-2"
          >
            <Droplets className="w-4 h-4 text-amber-400" />
            <span>Broth Alchemy Studio</span>
          </button>
        </div>

        {/* Live Heritage Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {RESTAURANT_INFO.stats.map((stat, i) => (
            <div
              key={i}
              className="bg-zinc-950/70 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl transition-transform hover:-translate-y-1"
            >
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
