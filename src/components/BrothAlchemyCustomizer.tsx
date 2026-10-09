"use client";

import React, { useState } from "react";
import { Flame, Sparkles, Plus, Check, ShoppingBag, Droplets, Utensils } from "lucide-react";
import confetti from "canvas-confetti";
import { MenuItem } from "../data/restaurantData";

interface BrothAlchemyCustomizerProps {
  onAddCustomBowl?: (item: MenuItem) => void;
}

export default function BrothAlchemyCustomizer({ onAddCustomBowl }: BrothAlchemyCustomizerProps) {
  // Option Sets
  const brothBases = [
    {
      id: "bone-clear",
      name: "18-Hr Himalayan Clear Broth",
      desc: "Simmered since dawn with ginger root, bone marrow, and mountain herbs.",
      extra: 0,
      badge: "Signature 1989",
      color: "from-amber-500/20 to-yellow-500/10",
    },
    {
      id: "veg-consomme",
      name: "Forest Celery Veg Consommé",
      desc: "Pure hill vegetables, sweetcorn essence, and roasted mountain garlic.",
      extra: 0,
      badge: "Pure Veg Classic",
      color: "from-emerald-500/20 to-teal-500/10",
    },
    {
      id: "sichuan-fiery",
      name: "Fiery Jakhan Hotpot Broth",
      desc: "Charred bird's eye chilies, dark mushroom vinegar, and peppercorn oil.",
      extra: 25,
      badge: "High Heat 🔥",
      color: "from-red-500/20 to-orange-500/10",
    },
    {
      id: "creamy-malai",
      name: "Tibetan Sweetcorn Velouté",
      desc: "Silky, sweet-savory broth with hand-crushed sweetcorn and cream.",
      extra: 30,
      badge: "Velvety Comfort",
      color: "from-yellow-400/20 to-amber-600/10",
    },
  ];

  const momoStyles = [
    { id: "steamed", name: "Classic Steamed", desc: "Delicate 18-pleat translucent skins", extra: 0 },
    { id: "kothey", name: "Pan-Seared Kothey", desc: "Crispy cast-iron lattice bottom", extra: 20 },
    { id: "kurkure", name: "Golden Kurkure Crunch", desc: "Double coated in spiced panko", extra: 30 },
    { id: "afghani", name: "Smoked Afghani Malai", desc: "Charcoal charred with cashew glaze", extra: 40 },
  ];

  const fillings = [
    { id: "chicken", name: "Himalayan Spiced Chicken", type: "non-veg", extra: 0 },
    { id: "veg-paneer", name: "Mountain Paneer & Greens", type: "veg", extra: 0 },
    { id: "mutton", name: "Slow-Braised Mountain Mutton", type: "non-veg", extra: 60 },
  ];

  const spiceLevels = [
    { level: 1, label: "Gentle Alpine", emoji: "🏔️", desc: "Warm & herb-forward" },
    { level: 2, label: "Doon Zing", emoji: "🌿", desc: "Balanced black pepper kick" },
    { level: 3, label: "Jakhan Street", emoji: "🌶️", desc: "Signature restaurant spice" },
    { level: 4, label: "Himalayan Blaze", emoji: "🔥", desc: "Fiery bird's eye chili" },
    { level: 5, label: "Devil's Chutney", emoji: "💥", desc: "For seasoned spice veterans" },
  ];

  const toppings = [
    { id: "garlic-chips", name: "Crispy Garlic Chips", extra: 15 },
    { id: "wonton-crisps", name: "Golden Wonton Crisps", extra: 20 },
    { id: "chili-oil", name: "House Tibetan Chili Oil", extra: 15 },
    { id: "bok-choy", name: "Fresh Steamed Bok Choy", extra: 25 },
    { id: "sesame-peanuts", name: "Toasted Crushed Peanuts", extra: 15 },
    { id: "spring-onion", name: "Double Scallions & Cilantro", extra: 10 },
  ];

  // State
  const [selectedBroth, setSelectedBroth] = useState(brothBases[0]);
  const [selectedStyle, setSelectedStyle] = useState(momoStyles[0]);
  const [selectedFilling, setSelectedFilling] = useState(fillings[0]);
  const [selectedSpice, setSelectedSpice] = useState(spiceLevels[2]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(["garlic-chips", "chili-oil"]);

  const toggleTopping = (id: string) => {
    if (selectedToppings.includes(id)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== id));
    } else {
      setSelectedToppings([...selectedToppings, id]);
    }
  };

  // Base price starts at ₹230
  const basePrice = 230;
  const extraToppingsTotal = selectedToppings.reduce((acc, tId) => {
    const item = toppings.find((t) => t.id === tId);
    return acc + (item ? item.extra : 0);
  }, 0);

  const totalPrice =
    basePrice +
    selectedBroth.extra +
    selectedStyle.extra +
    selectedFilling.extra +
    extraToppingsTotal;

  const handleBrewBowl = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#f59e0b", "#ef4444", "#fbbf24"],
    });

    if (onAddCustomBowl) {
      const customItem: MenuItem = {
        id: `custom-bowl-${Date.now()}`,
        name: `Custom Alchemist Bowl (${selectedFilling.name})`,
        category: "soups",
        type: selectedFilling.type as "veg" | "non-veg",
        price: totalPrice,
        description: `${selectedBroth.name} with 6x ${selectedStyle.name} ${selectedFilling.name} momos. Heat: ${selectedSpice.label}. Garnished with ${selectedToppings.length} artisan toppings.`,
        longDescription: `Mastercrafted custom bowl brewed to order. Base: ${selectedBroth.name}. Momos: ${selectedStyle.name} filled with ${selectedFilling.name}. Heat level: ${selectedSpice.level}/5 (${selectedSpice.label}).`,
        spiceLevel: selectedSpice.level as 1 | 2 | 3 | 4 | 5,
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
        prepTime: "10 mins",
        tags: ["Custom Brew", "Alchemist Edition"],
        nutrition: {
          calories: 420,
          protein: selectedFilling.id === "mutton" ? "30g" : "24g",
          brothTime: selectedBroth.id === "bone-clear" ? "18 Hours" : "12 Hours",
        },
      };
      onAddCustomBowl(customItem);
    }
  };

  return (
    <section id="broth-alchemy" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Glow Effects */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Droplets className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive Crafting Studio</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          The Broth <span className="text-fire-gradient">Alchemy</span> Studio
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Become the chef. Tailor your mountain bowl from broth extraction to dumpling fold, heat spectrum, and artisan Himalayan crunches.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Customizer Steps */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Broth Base */}
          <div className="bg-zinc-950/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step 01</span>
              <span className="text-xs text-zinc-400">Choose Broth Foundation</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Select Your Simmered Broth Base</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {brothBases.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBroth(b)}
                  className={`text-left p-4 rounded-2xl border transition-all relative overflow-hidden ${
                    selectedBroth.id === b.id
                      ? "bg-zinc-900 border-amber-500/60 shadow-lg shadow-amber-500/10"
                      : "bg-zinc-900/40 border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                      {b.badge}
                    </span>
                    {b.extra > 0 && (
                      <span className="text-xs font-bold text-amber-400">+₹{b.extra}</span>
                    )}
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">{b.name}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{b.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Momo Preparation & Filling */}
          <div className="bg-zinc-950/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step 02</span>
              <span className="text-xs text-zinc-400">Craft The Dumplings</span>
            </div>
            
            {/* Filling */}
            <h3 className="text-lg font-bold text-white mb-3">Choose Filling</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
              {fillings.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilling(f)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedFilling.id === f.id
                      ? "bg-amber-500/15 border-amber-500 text-amber-300"
                      : "bg-zinc-900/40 border-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  <div className="text-xs font-bold mb-1">{f.name}</div>
                  <div className="text-[11px] text-zinc-400">
                    {f.type === "veg" ? "🌱 Pure Veg" : "🍗 Farm Poultry"}
                    {f.extra > 0 && ` (+₹${f.extra})`}
                  </div>
                </button>
              ))}
            </div>

            {/* Preparation Style */}
            <h3 className="text-lg font-bold text-white mb-3">Preparation Style</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {momoStyles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStyle(s)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedStyle.id === s.id
                      ? "bg-zinc-900 border-amber-500 text-white"
                      : "bg-zinc-900/40 border-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-white">{s.name}</span>
                    {s.extra > 0 && <span className="text-xs text-amber-400">+₹{s.extra}</span>}
                  </div>
                  <p className="text-xs text-zinc-400">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Spice Dial & Heat Spectrum */}
          <div className="bg-zinc-950/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">Step 03</span>
              <span className="text-xs text-zinc-400">Heat Level</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Himalayan Spice Spectrum</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {spiceLevels.map((sp) => (
                <button
                  key={sp.level}
                  onClick={() => setSelectedSpice(sp)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedSpice.level === sp.level
                      ? "bg-red-500/20 border-red-500 text-white shadow-lg shadow-red-500/10"
                      : "bg-zinc-900/40 border-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  <div className="text-2xl mb-1">{sp.emoji}</div>
                  <div className="text-xs font-bold text-white">{sp.label}</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">{sp.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Artisan Garnishes */}
          <div className="bg-zinc-950/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step 04</span>
              <span className="text-xs text-zinc-400">Toppings & Crunch</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Add Artisan Himalayan Garnishes</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {toppings.map((top) => {
                const isSelected = selectedToppings.includes(top.id);
                return (
                  <button
                    key={top.id}
                    onClick={() => toggleTopping(top.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500 text-amber-300"
                        : "bg-zinc-900/40 border-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{top.name}</div>
                      <div className="text-[11px] text-zinc-400">+₹{top.extra}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? "bg-amber-500 text-zinc-950 border-amber-400"
                          : "border-zinc-700 text-transparent"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Bowl Preview Card */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            {/* Ambient Background Aura */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
                  Simmering Alchemy Preview
                </span>
                <h4 className="text-xl font-black text-white">Your Mastercrafted Bowl</h4>
              </div>
              <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                Freshly Brewed
              </div>
            </div>

            {/* Visual Broth Steam Representation */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-6 bg-gradient-to-b from-amber-950/40 via-zinc-900 to-zinc-950 border border-white/10 flex flex-col items-center justify-center text-center p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.25)_0,transparent_70%)]" />
              
              {/* Steaming Bowl Icon Graphics */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-amber-500/30 animate-pulse">
                <Utensils className="w-8 h-8 text-zinc-950" />
              </div>
              
              <div className="relative z-10 mt-3">
                <div className="text-sm font-bold text-white">
                  6x {selectedStyle.name} Momos
                </div>
                <div className="text-xs text-amber-300 font-medium">
                  Submerged in {selectedBroth.name}
                </div>
              </div>
            </div>

            {/* Ingredients Summary List */}
            <div className="space-y-2.5 text-xs text-zinc-300 mb-6">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Broth Base:</span>
                <span className="font-semibold text-white">{selectedBroth.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Filling:</span>
                <span className="font-semibold text-white">{selectedFilling.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Momo Style:</span>
                <span className="font-semibold text-white">{selectedStyle.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Heat Level:</span>
                <span className="font-semibold text-red-400 flex items-center gap-1">
                  {selectedSpice.emoji} {selectedSpice.label} ({selectedSpice.level}/5)
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Garnishes ({selectedToppings.length}):</span>
                <span className="font-semibold text-amber-300 text-right">
                  {selectedToppings.length > 0
                    ? selectedToppings.map((t) => toppings.find((item) => item.id === t)?.name).join(", ")
                    : "Standard Mountain Herbs"}
                </span>
              </div>
            </div>

            {/* Total and CTA Button */}
            <div className="bg-black/50 rounded-2xl p-4 border border-white/5 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-zinc-400 block font-medium">Total Crafted Price</span>
                <span className="text-3xl font-black text-amber-400">₹{totalPrice}</span>
              </div>
              <div className="text-right text-[11px] text-zinc-400">
                <span>Estimated Prep</span>
                <span className="block font-bold text-white">~10-12 Mins</span>
              </div>
            </div>

            <button
              onClick={handleBrewBowl}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-red-500 hover:from-amber-400 hover:to-red-400 text-zinc-950 font-black text-sm tracking-wide transition-all shadow-xl shadow-amber-500/25 active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>Brew & Add Custom Bowl to Tray</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
