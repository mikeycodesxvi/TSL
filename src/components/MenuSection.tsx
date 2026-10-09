"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, Plus, Check, X, Flame } from "lucide-react";
import { MENU_ITEMS, MenuItem } from "../data/restaurantData";
import {
  SoupBowlIcon,
  DumplingIcon,
  ChopsticksNoodlesIcon,
  TeaCupIcon,
  LeafHerbIcon,
} from "./FoodIcons";

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterVegOnly, setFilterVegOnly] = useState<boolean>(false);
  const [activeModalItem, setActiveModalItem] = useState<MenuItem | null>(null);
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "All", icon: null },
    { id: "soups", name: "Soups", icon: <SoupBowlIcon className="w-4 h-4" /> },
    { id: "momos", name: "Momos", icon: <DumplingIcon className="w-4 h-4" /> },
    { id: "thukpa", name: "Thukpa", icon: <ChopsticksNoodlesIcon className="w-4 h-4" /> },
    { id: "wok", name: "Wok & Sides", icon: <ChopsticksNoodlesIcon className="w-4 h-4" /> },
    { id: "beverages", name: "Brews", icon: <TeaCupIcon className="w-4 h-4" /> },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (filterVegOnly && item.type !== "veg") {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, filterVegOnly]);

  const handleQuickAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemId(item.id);
    setTimeout(() => {
      setAddedItemId(null);
    }, 1200);
  };

  return (
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-2">
          Dehradun Menu
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Our Full <span className="text-gold-gradient">Menu</span>
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm">
          Prepared fresh every day with secret 1989 broths and hand-folded hill dumplings.
        </p>
      </div>

      {/* Clean Glassmorphic Controls Bar */}
      <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/8 rounded-2xl p-3 sm:p-4 mb-8 flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? "bg-amber-500 text-zinc-950 border-amber-400 font-bold shadow-sm"
                  : "bg-white/[0.02] hover:bg-white/[0.06] text-zinc-300 border-transparent"
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Right Search & Veg Toggle */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Veg Only Toggle */}
          <button
            onClick={() => setFilterVegOnly(!filterVegOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
              filterVegOnly
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-white/[0.02] text-zinc-400 border-white/5 hover:text-white"
            }`}
          >
            <LeafHerbIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Veg Only</span>
          </button>

          {/* Search Box */}
          <div className="relative flex-1 md:w-60">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.03] border border-white/8 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Menu Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white/[0.025] backdrop-blur-xl border border-white/8 rounded-2xl overflow-hidden transition-all duration-300 hover:border-amber-500/30 hover:bg-white/[0.05] flex flex-col justify-between"
          >
            <div>
              {/* Photo */}
              <div
                className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-900 cursor-pointer"
                onClick={() => setActiveModalItem(item)}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-zinc-200 border border-white/10">
                  {item.type === "veg" ? "🌱 Pure Veg" : "🍗 Poultry"}
                </div>
              </div>

              {/* Text */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3
                    onClick={() => setActiveModalItem(item)}
                    className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {item.name}
                  </h3>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="p-4 sm:p-5 pt-0 flex items-center justify-between border-t border-white/5 mt-1">
              <div>
                <span className="text-base font-black text-amber-400">₹{item.price}</span>
                <span className="text-[10px] text-zinc-500 ml-1.5">• {item.prepTime}</span>
              </div>

              <button
                onClick={() => handleQuickAdd(item)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  addedItemId === item.id
                    ? "bg-emerald-500 text-zinc-950"
                    : "bg-white/[0.05] hover:bg-amber-500 hover:text-zinc-950 text-white border border-white/10"
                }`}
              >
                {addedItemId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dish Details Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border border-white/10 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative w-full h-48 bg-zinc-900">
              <Image src={activeModalItem.image} alt={activeModalItem.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-zinc-950">
                  {activeModalItem.category.toUpperCase()}
                </span>
                <h3 className="text-lg font-black text-white mt-1">{activeModalItem.name}</h3>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activeModalItem.longDescription}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-xl font-black text-amber-400">₹{activeModalItem.price}</span>
                <button
                  onClick={() => {
                    handleQuickAdd(activeModalItem);
                    setActiveModalItem(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Tray</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
