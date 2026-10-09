"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { MENU_ITEMS, MenuItem } from "../data/restaurantData";
import { SoupBowlIcon, DumplingIcon, ChiliFlameIcon } from "./FoodIcons";

interface FeaturedSignaturesProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function FeaturedSignatures({ onAddToCart }: FeaturedSignaturesProps) {
  const [addedId, setAddedId] = useState<string | null>(null);

  // Pick the top 3 iconic items
  const featured = [
    {
      item: MENU_ITEMS[0], // The Legendary Dumpling Soup
      tag: "Original 1989",
      icon: <SoupBowlIcon className="w-4 h-4 text-amber-400" />,
    },
    {
      item: MENU_ITEMS[4], // Classic Steamed Himalayan Chicken Momos
      tag: "18 Hand Pleats",
      icon: <DumplingIcon className="w-4 h-4 text-amber-400" />,
    },
    {
      item: MENU_ITEMS[7], // Golden Kurkure Crunch Momos
      tag: "Student Legend",
      icon: <ChiliFlameIcon className="w-4 h-4 text-red-400" />,
    },
  ];

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-2">
            Chef&apos;s Highlights
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            The Three <span className="text-gold-gradient">Icons</span> of KC
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mt-2 md:mt-0">
          The dishes that made Rajpur Road a mandatory pitstop for travelers, students, and locals since 1989.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map(({ item, tag, icon }) => (
          <div
            key={item.id}
            className="group bg-white/[0.03] backdrop-blur-xl border border-white/8 rounded-2xl overflow-hidden transition-all duration-300 hover:border-amber-500/30 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-black/50 flex flex-col justify-between"
          >
            <div>
              {/* Image Frame */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-zinc-200">
                  {icon}
                  <span>{tag}</span>
                </div>
              </div>

              {/* Text */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90">
                    {item.type === "veg" ? "Pure Veg" : "Poultry"}
                  </span>
                  <span className="text-xs text-zinc-400">{item.prepTime}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Price & Add */}
            <div className="p-5 pt-0 flex items-center justify-between border-t border-white/5 mt-2">
              <span className="text-lg font-black text-amber-400">₹{item.price}</span>
              <button
                onClick={() => handleAdd(item)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  addedId === item.id
                    ? "bg-emerald-500 text-zinc-950 scale-105"
                    : "bg-white/[0.06] hover:bg-amber-500 hover:text-zinc-950 text-white border border-white/10"
                }`}
              >
                {addedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Tray</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
