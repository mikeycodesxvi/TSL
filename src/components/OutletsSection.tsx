"use client";

import React from "react";
import { MapPin, Phone, Clock, ExternalLink, Calendar } from "lucide-react";
import { OUTLETS, Outlet } from "../data/restaurantData";

interface OutletsSectionProps {
  onReserveTable: (outlet: Outlet) => void;
}

export default function OutletsSection({ onReserveTable }: OutletsSectionProps) {
  return (
    <section id="outlets" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-2">
          Dehradun Locations
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Our <span className="text-gold-gradient">Outlets</span>
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm">
          Visit us across the Doon valley or order fresh to your doorstep.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {OUTLETS.map((outlet) => (
          <div
            key={outlet.id}
            className="bg-white/[0.025] backdrop-blur-xl border border-white/8 rounded-2xl p-6 transition-all duration-300 hover:border-amber-500/30 hover:bg-white/[0.05] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {outlet.subtitle}
                </span>
                <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Open Now
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{outlet.name}</h3>

              <div className="space-y-2 text-xs text-zinc-400 mb-6">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{outlet.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>{outlet.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>{outlet.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/6 flex items-center gap-2">
              <a
                href={outlet.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-white border border-white/8 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => onReserveTable(outlet)}
                className="py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-xs font-semibold text-amber-300 border border-amber-500/30 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Calendar className="w-3 h-3" />
                <span>Reserve</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
