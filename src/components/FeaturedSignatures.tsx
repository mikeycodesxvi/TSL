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

  const featured = [
    {
      item: MENU_ITEMS[0], // The Legendary Dumpling Soup
      tag: "Original 1989",
      icon: <SoupBowlIcon className="w-4 h-4 text-orange-500" />,
    },
    {
      item: MENU_ITEMS[4], // Classic Steamed Himalayan Chicken Momos
      tag: "18 Hand Pleats",
      icon: <DumplingIcon className="w-4 h-4 text-orange-500" />,
    },
    {
      item: MENU_ITEMS[7], // Golden Kurkure Crunch Momos
      tag: "Student Legend",
      icon: <ChiliFlameIcon className="w-4 h-4 text-orange-600" />,
    },
  ];

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-2">
            Chef&apos;s Highlights
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900">
            The Three <span className="text-orange-gradient">Icons</span> of KC
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-md mt-2 md:mt-0 leading-relaxed">
          The dishes that made Rajpur Road a mandatory pitstop for travelers, students, and locals since 1989.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map(({ item, tag, icon }) => (
          <div
            key={item.id}
            className="group bg-white/90 backdrop-blur-xl border border-zinc-200/90 rounded-2xl overflow-hidden transition-all duration-300 hover:border-orange-400 hover:bg-white hover:shadow-xl hover:shadow-orange-500/10 flex flex-col justify-between shadow-sm"
          >
            <div>
              {/* Image Frame */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200 text-[11px] font-bold text-zinc-800 shadow-sm">
                  {icon}
                  <span>{tag}</span>
                </div>
              </div>

              {/* Text */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                    {item.type === "veg" ? "Pure Veg" : "Poultry"}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">{item.prepTime}</span>
                </div>

                <h3 className="text-base font-bold text-zinc-900 group-hover:text-orange-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-zinc-600 mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Price & Add */}
            <div className="p-5 pt-0 flex items-center justify-between border-t border-zinc-100 mt-2">
              <span className="text-lg font-black text-orange-600">₹{item.price}</span>
              <button
                onClick={() => handleAdd(item)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  addedId === item.id
                    ? "bg-emerald-600 text-white scale-105"
                    : "bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-500/25 active:scale-95"
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
