"use client";

import React from "react";
import Image from "next/image";
import { DumplingIcon, SoupBowlIcon, LeafHerbIcon } from "./FoodIcons";

export default function HeritageStory() {
  return (
    <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-screen-2xl mx-auto">
      <div className="bg-white/90 backdrop-blur-2xl border border-orange-100/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-orange-950/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Authentic Photography */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200 group shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1000&q=80"
              alt="Himalayan Food Heritage"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-xs font-semibold text-white drop-shadow">
              Rajpur Road, Jakhan • Serving the Doon Valley since 1989
            </div>
          </div>
        </div>

        {/* Right: Clean Story & Heritage Stats */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold border border-orange-200">
            <span>Our 1989 Origin</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900">
            The Story Behind the <span className="text-orange-gradient">Broth</span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
            Started in 1989 as a humble roadside haven on Rajpur Road, KC Soup Bar introduced Dehradun to the joy of piping hot momo dumpling soup on chilly foothill evenings.
          </p>

          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Over the past 35 years, generations of Doon school students, IMA cadets, and travelers heading to Mussoorie have gathered here for uncompromised Himalayan taste, hand-folded momos, and our signature slow-simmered herbal stock.
          </p>

          {/* 3 Clean Glassmorphic Food Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-orange-600 shadow-sm shrink-0">
                <DumplingIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-900 block">18 Pleats</span>
                <span className="text-[11px] text-zinc-500">Hand-folded daily</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-orange-600 shadow-sm shrink-0">
                <SoupBowlIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-900 block">18-Hour Broth</span>
                <span className="text-[11px] text-zinc-500">Copper cauldron</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                <LeafHerbIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-900 block">0% Artificial MSG</span>
                <span className="text-[11px] text-zinc-500">Pure hill herbs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
