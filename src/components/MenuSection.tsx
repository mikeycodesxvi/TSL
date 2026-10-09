"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, Plus, Check, X } from "lucide-react";
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
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-2">
          Dehradun Menu
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-3">
          Our Full <span className="text-orange-gradient">Menu</span>
        </h2>
        <p className="text-zinc-600 text-xs sm:text-sm">
          Prepared fresh every day with secret 1989 broths and hand-folded hill dumplings.
        </p>
      </div>

      {/* Clean White & Orange Glassmorphic Controls Bar */}
      <div className="bg-white/85 backdrop-blur-2xl border border-zinc-200/80 rounded-2xl p-3 sm:p-4 mb-8 flex flex-col md:flex-row gap-3 items-center justify-between shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20"
                  : "bg-white text-zinc-700 hover:text-orange-600 border-zinc-200 hover:border-orange-200"
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
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
              filterVegOnly
                ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                : "bg-white text-zinc-700 border-zinc-200 hover:border-emerald-300"
            }`}
          >
            <LeafHerbIcon className="w-3.5 h-3.5" />
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
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-xs focus:outline-none focus:border-orange-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
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
            className="group bg-white/90 backdrop-blur-xl border border-zinc-200/80 rounded-2xl overflow-hidden transition-all duration-300 hover:border-orange-400 hover:bg-white hover:shadow-xl hover:shadow-orange-500/10 flex flex-col justify-between shadow-sm"
          >
            <div>
              {/* Photo */}
              <div
                className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-100 cursor-pointer"
                onClick={() => setActiveModalItem(item)}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-zinc-800 border border-zinc-200 shadow-sm">
                  {item.type === "veg" ? "🌱 Pure Veg" : "🍗 Poultry"}
                </div>
              </div>

              {/* Text */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3
                    onClick={() => setActiveModalItem(item)}
                    className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    {item.name}
                  </h3>
                </div>

                <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="p-4 sm:p-5 pt-0 flex items-center justify-between border-t border-zinc-100 mt-1">
              <div>
                <span className="text-base font-black text-orange-600">₹{item.price}</span>
                <span className="text-[10px] text-zinc-400 ml-1.5">• {item.prepTime}</span>
              </div>

              <button
                onClick={() => handleQuickAdd(item)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  addedItemId === item.id
                    ? "bg-emerald-600 text-white"
                    : "bg-orange-50 hover:bg-orange-500 text-orange-700 hover:text-white border border-orange-200/80"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-zinc-200 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative w-full h-48 bg-zinc-100">
              <Image src={activeModalItem.image} alt={activeModalItem.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500 text-white">
                  {activeModalItem.category.toUpperCase()}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{activeModalItem.name}</h3>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-zinc-600 leading-relaxed">
                {activeModalItem.longDescription}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                <span className="text-xl font-black text-orange-600">₹{activeModalItem.price}</span>
                <button
                  onClick={() => {
                    handleQuickAdd(activeModalItem);
                    setActiveModalItem(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
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
