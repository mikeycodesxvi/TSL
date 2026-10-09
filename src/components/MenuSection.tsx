"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, Flame, Clock, Plus, Sparkles, Filter, Info, X, Check } from "lucide-react";
import { MENU_ITEMS, MenuItem } from "../data/restaurantData";

interface MenuSectionProps {
  onAddToCart?: (item: MenuItem) => void;
}

export default function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterVegOnly, setFilterVegOnly] = useState<boolean>(false);
  const [filterChefSpecial, setFilterChefSpecial] = useState<boolean>(false);
  const [activeModalItem, setActiveModalItem] = useState<MenuItem | null>(null);
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "All Creations" },
    { id: "soups", name: "🍲 Signature Soups" },
    { id: "momos", name: "🥟 Handcrafted Momos" },
    { id: "thukpa", name: "🍜 Thukpa & Bowls" },
    { id: "wok", name: "🥢 Wok & Crispy" },
    { id: "beverages", name: "🫖 Himalayan Teas" },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // Veg filter
      if (filterVegOnly && item.type !== "veg") {
        return false;
      }
      // Chef special
      if (filterChefSpecial && !item.isChefSpecial) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTags) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, filterVegOnly, filterChefSpecial]);

  const handleQuickAdd = (item: MenuItem) => {
    if (onAddToCart) {
      onAddToCart(item);
    }
    setAddedItemId(item.id);
    setTimeout(() => {
      setAddedItemId(null);
    }, 1200);
  };

  return (
    <section id="menu" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Decorative Element */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Himalayan Culinary Archive</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          The Signature <span className="text-gold-gradient">Menu</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          From the legendary 1989 Dumpling Soup to crunch-coated Kurkure creations and charcoal tandoor classics. Cooked fresh to order in Dehradun.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-zinc-950/70 border border-white/10 rounded-3xl p-4 sm:p-6 mb-10 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search momos, thukpa, soups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setFilterVegOnly(!filterVegOnly)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all border ${
                filterVegOnly
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md shadow-emerald-500/10"
                  : "bg-zinc-900/60 text-zinc-400 border-white/5 hover:text-white"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Veg Only</span>
            </button>

            <button
              onClick={() => setFilterChefSpecial(!filterChefSpecial)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all border ${
                filterChefSpecial
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/10"
                  : "bg-zinc-900/60 text-zinc-400 border-white/5 hover:text-white"
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Chef's Choice</span>
            </button>
          </div>
        </div>

        {/* Categories Strip */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 border-amber-400 shadow-md shadow-amber-500/20 font-bold"
                  : "bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border-white/5"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-zinc-950/40 rounded-3xl border border-white/5">
          <p className="text-zinc-400 text-sm">No dishes match your current search and filters.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setFilterVegOnly(false);
              setFilterChefSpecial(false);
              setSelectedCategory("all");
            }}
            className="mt-4 px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-zinc-950/80 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
            >
              <div>
                {/* Image Section */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-900">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border backdrop-blur-md ${
                        item.type === "veg"
                          ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/30"
                          : "bg-red-950/80 text-red-300 border-red-500/30"
                      }`}
                    >
                      {item.type === "veg" ? "🌱 VEG" : "🍗 NON-VEG"}
                    </span>
                    {item.isChefSpecial && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-zinc-950 shadow-md">
                        ★ CHEF'S SPECIAL
                      </span>
                    )}
                  </div>

                  {/* Prep Time Tag */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-zinc-300 border border-white/10">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{item.prepTime}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 sm:p-6">
                  {/* Spice meter and category */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1" title={`Spice Level: ${item.spiceLevel}/5`}>
                      <Flame className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-xs font-bold text-red-400">{item.spiceLevel}/5</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-400 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer / Action */}
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 flex items-center justify-between border-t border-white/5 mt-2">
                <div>
                  <span className="text-xl font-black text-amber-400">₹{item.price}</span>
                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="block text-[11px] text-zinc-400 hover:text-amber-300 underline underline-offset-2 transition-colors mt-0.5"
                  >
                    View Details & Story
                  </button>
                </div>

                <button
                  onClick={() => handleQuickAdd(item)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    addedItemId === item.id
                      ? "bg-emerald-500 text-zinc-950 scale-105"
                      : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 active:scale-95 shadow-lg shadow-amber-500/20"
                  }`}
                >
                  {addedItemId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added!</span>
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
      )}

      {/* Dish Story & Details Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border border-white/10 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-56 bg-zinc-900">
              <Image
                src={activeModalItem.image}
                alt={activeModalItem.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-zinc-950 mb-1 inline-block">
                  {activeModalItem.category.toUpperCase()}
                </span>
                <h3 className="text-xl font-black text-white">{activeModalItem.name}</h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {activeModalItem.longDescription}
              </p>

              {/* Nutrition & Specs */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10">
                <div className="text-center">
                  <span className="text-[10px] text-zinc-500 block uppercase">Energy</span>
                  <span className="text-xs font-bold text-white">{activeModalItem.nutrition.calories} kcal</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-zinc-500 block uppercase">Protein</span>
                  <span className="text-xs font-bold text-emerald-400">{activeModalItem.nutrition.protein}</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-zinc-500 block uppercase">Broth Simmer</span>
                  <span className="text-xs font-bold text-amber-400">
                    {activeModalItem.nutrition.brothTime || "Fresh"}
                  </span>
                </div>
              </div>

              {/* Price & Add to Tray */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-xs text-zinc-500 block">Single Serving</span>
                  <span className="text-2xl font-black text-amber-400">₹{activeModalItem.price}</span>
                </div>

                <button
                  onClick={() => {
                    handleQuickAdd(activeModalItem);
                    setActiveModalItem(null);
                  }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Order Tray</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
