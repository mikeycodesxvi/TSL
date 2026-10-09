"use client";

import React, { useState } from "react";
import { MapPin, Phone, Clock, Navigation, ExternalLink, CheckCircle2, Store } from "lucide-react";
import { OUTLETS, Outlet } from "../data/restaurantData";

interface OutletsSectionProps {
  onReserveTable?: (outlet: Outlet) => void;
}

export default function OutletsSection({ onReserveTable }: OutletsSectionProps) {
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet>(OUTLETS[0]);

  return (
    <section id="outlets" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Store className="w-3.5 h-3.5" />
          <span>Dehradun Foothill Locations</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Visit Our <span className="text-gold-gradient">Outlets</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          From our historic Rajpur Road flagship nestled under mountain pines to our high-energy express junctions across the Doon valley.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Outlet Selector List */}
        <div className="lg:col-span-5 space-y-4">
          {OUTLETS.map((outlet) => {
            const isSelected = selectedOutlet.id === outlet.id;
            return (
              <div
                key={outlet.id}
                onClick={() => setSelectedOutlet(outlet)}
                className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300 relative ${
                  isSelected
                    ? "bg-zinc-900 border-amber-500 shadow-xl shadow-amber-500/10"
                    : "bg-zinc-950/60 border-white/5 hover:border-white/10 hover:bg-zinc-900/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      {outlet.subtitle}
                    </span>
                    {outlet.isFlagship && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-zinc-950">
                        FLAGSHIP
                      </span>
                    )}
                  </div>
                  {/* Live status badge */}
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Open Now
                  </span>
                </div>

                <h3 className="text-lg font-black text-white">{outlet.name}</h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{outlet.address}</p>

                <div className="flex items-center gap-4 mt-3 text-xs text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Till 11:30 PM</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{outlet.phone}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Outlet Showcase & Map Action */}
        <div className="lg:col-span-7">
          <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedOutlet.landmark}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{selectedOutlet.name}</h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedOutlet.phone}`}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-white border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Store</span>
                </a>
                <a
                  href={selectedOutlet.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-xs font-bold text-zinc-950 flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Address & Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-zinc-900/60 p-4 rounded-2xl border border-white/5">
                <span className="text-xs font-bold text-zinc-400 block mb-1">Complete Address</span>
                <p className="text-sm text-zinc-200 leading-relaxed">{selectedOutlet.address}</p>
              </div>
              <div className="bg-zinc-900/60 p-4 rounded-2xl border border-white/5">
                <span className="text-xs font-bold text-zinc-400 block mb-1">Operating Hours</span>
                <p className="text-sm text-zinc-200 leading-relaxed">{selectedOutlet.hours}</p>
                <span className="text-[11px] text-amber-400 font-medium block mt-1">
                  Seating: {selectedOutlet.seating}
                </span>
              </div>
            </div>

            {/* Special Features */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                Outlet Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedOutlet.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2.5 bg-zinc-900/40 rounded-xl border border-white/5 text-xs text-zinc-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reservation CTA */}
            <div className="pt-2">
              <button
                onClick={() => onReserveTable && onReserveTable(selectedOutlet)}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-red-500 hover:from-amber-400 hover:to-red-400 text-zinc-950 font-black text-xs sm:text-sm tracking-wide transition-all shadow-xl shadow-amber-500/20 active:scale-98"
              >
                Reserve a Table / Tasting at {selectedOutlet.name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
