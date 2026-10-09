"use client";

import React, { useState } from "react";
import Image from "next/image";
import { History, Award, CheckCircle2, ChevronRight, Sparkles, MapPin } from "lucide-react";
import { TIMELINE_EVENTS } from "../data/restaurantData";

export default function HeritageStory() {
  const [activeTab, setActiveTab] = useState(0);
  const currentEvent = TIMELINE_EVENTS[activeTab];

  return (
    <section id="heritage" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <History className="w-3.5 h-3.5" />
          <span>The Dehradun Chronicle Since 1989</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          A 35-Year Himalayan <span className="text-gold-gradient">Love Affair</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Before Rajpur Road became a bustling avenue of modern cafes, there stood a humble wooden steamer releasing aromatic steam into the crisp foothill air. This is how a local street cart became Dehradun’s culinary heartbeat.
        </p>
      </div>

      {/* Interactive Timeline Tabs */}
      <div className="relative mb-12">
        {/* Timeline Connecting Line */}
        <div className="hidden md:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-zinc-800 via-amber-500/40 to-zinc-800 -translate-y-1/2 z-0" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {TIMELINE_EVENTS.map((item, index) => (
            <button
              key={item.year}
              onClick={() => setActiveTab(index)}
              className={`text-left p-5 rounded-3xl border transition-all duration-300 relative ${
                activeTab === index
                  ? "bg-zinc-900 border-amber-500 shadow-xl shadow-amber-500/15 scale-102"
                  : "bg-zinc-950/80 border-white/5 hover:border-white/10 hover:bg-zinc-900/50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-2xl font-black ${
                    activeTab === index ? "text-amber-400" : "text-zinc-500"
                  }`}
                >
                  {item.year}
                </span>
                {activeTab === index && (
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                )}
              </div>
              <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">{item.title}</h4>
              <p className="text-xs text-zinc-400 line-clamp-1">{item.subtitle}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Epoch Card */}
      <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Image / Visual */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group">
            <Image
              src="https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1000&q=80"
              alt="Himalayan Food Heritage"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <span className="text-xs font-bold text-amber-400 block mb-0.5">Rajpur Road, Jakhan</span>
              <span className="text-[11px] text-zinc-300">
                Where generations of Doon school alumni, IMA cadets, and mountain travelers unite.
              </span>
            </div>
          </div>
        </div>

        {/* Story Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chapter {activeTab + 1}: The Era of {currentEvent.year}</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-white">{currentEvent.title}</h3>
          
          <h4 className="text-base sm:text-lg text-amber-300 font-medium">
            {currentEvent.subtitle}
          </h4>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            {currentEvent.description}
          </p>

          <div className="bg-zinc-900/80 border border-white/5 rounded-2xl p-4 flex items-start gap-3">
            <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-white block">Key Milestone</span>
              <span className="text-xs text-zinc-400">{currentEvent.highlight}</span>
            </div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>18 Hand-Pleats Per Momo</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Artificial MSG</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Tehri Garhwal Spices</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
