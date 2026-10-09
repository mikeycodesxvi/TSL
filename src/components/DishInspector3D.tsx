"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import * as THREE from "three";
import { Flame, Clock, Award, Sparkles, ChevronRight, CheckCircle2, ShoppingBag } from "lucide-react";
import { MENU_ITEMS, MenuItem } from "../data/restaurantData";

interface DishInspectorProps {
  onAddToCart?: (item: MenuItem) => void;
}

export default function DishInspector3D({ onAddToCart }: DishInspectorProps) {
  // Selectable featured dishes for inspection
  const inspectorDishes = [
    {
      id: "soup-1",
      item: MENU_ITEMS[0], // The Legendary Dumpling Soup
      pleats: 18,
      brothSimmerHours: 18,
      umamiScore: "98%",
      spiceRank: 2,
      originYear: 1989,
      secretIngredients: ["Wild Himalayan Coriander", "Charred Ginger", "Aged Rice Vinegar", "Cold-Pressed Sesame"],
      craftingProcess: "Momos are hand-pleated with 18 crests, flash-steamed in pine steamers, then immersed in boiling broth that has been bubbling since 4:00 AM.",
    },
    {
      id: "momo-4",
      item: MENU_ITEMS[7], // Golden Kurkure Crunch Momos
      pleats: 14,
      brothSimmerHours: 0,
      umamiScore: "94%",
      spiceRank: 3,
      originYear: 2012,
      secretIngredients: ["Double Spiced Panko Crumb", "Smoked Paprika Rub", "Garlic Emulsion", "Mountain Red Chili"],
      craftingProcess: "Marinated in a spiced cornflour slurry, coated in artisanal crumbs, and flash-fried at 190°C for an audible crunch heard across Rajpur Road.",
    },
    {
      id: "momo-2",
      item: MENU_ITEMS[5], // Pan-Seared Kothey Momos
      pleats: 18,
      brothSimmerHours: 6,
      umamiScore: "96%",
      spiceRank: 3,
      originYear: 1994,
      secretIngredients: ["Cast Iron Scallion Oil", "Toasted Szechuan Peppercorn", "Black Sesame Lace"],
      craftingProcess: "Steamed first to gelatinize internal broths, then transferred to seasoned heavy cast-iron skillets to forge a shatteringly crisp golden lattice base.",
    },
    {
      id: "thukpa-1",
      item: MENU_ITEMS[9], // Traditional Himalayan Chicken Thukpa
      pleats: 0,
      brothSimmerHours: 14,
      umamiScore: "97%",
      spiceRank: 2,
      originYear: 1991,
      secretIngredients: ["Hand-Pulled Wheat Strands", "Charred Bird's Eye Chili", "Bok Choy", "Coriander Root Broth"],
      craftingProcess: "Rustic artisanal noodles tossed into a steaming broth made from free-range chicken and Himalayan mountain herbs, finished with soft egg and spring onion.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const current = inspectorDishes[activeIndex];
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const canvasMountRef = useRef<HTMLDivElement>(null);

  // 3D Platter visualization
  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 400;
    const height = mount.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 2.2, 4.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lights
    const ambLight = new THREE.AmbientLight(0xfff7ed, 1.2);
    scene.add(ambLight);

    const goldLight = new THREE.PointLight(0xf59e0b, 3, 10);
    goldLight.position.set(2, 3, 2);
    scene.add(goldLight);

    const redLight = new THREE.PointLight(0xef4444, 2, 8);
    redLight.position.set(-2, 1, 1);
    scene.add(redLight);

    // Platter Dish Group
    const dishGroup = new THREE.Group();
    scene.add(dishGroup);

    // Slate Serving Platter Base
    const platterGeo = new THREE.CylinderGeometry(1.6, 1.7, 0.12, 48);
    const platterMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.8,
      roughness: 0.35,
    });
    const platter = new THREE.Mesh(platterGeo, platterMat);
    dishGroup.add(platter);

    // Golden Rim Ring on Platter
    const ringGeo = new THREE.TorusGeometry(1.65, 0.03, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0xd97706,
      emissiveIntensity: 0.3,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.06;
    dishGroup.add(ring);

    // Steam Vapor Cloud for Platter
    const steamGeo = new THREE.BufferGeometry();
    const sCount = 80;
    const sPos = new Float32Array(sCount * 3);
    for (let i = 0; i < sCount; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 1.8;
      sPos[i * 3 + 1] = 0.1 + Math.random() * 2.0;
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 1.8;
    }
    steamGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xffedd5,
      size: 0.14,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const steamPoints = new THREE.Points(steamGeo, steamMat);
    dishGroup.add(steamPoints);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (isAutoSpin) {
        dishGroup.rotation.y += 0.008;
      } else {
        dishGroup.rotation.y = (rotationAngle * Math.PI) / 180;
      }

      // Gentle floating steam
      const positions = steamGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < sCount; i++) {
        let y = positions.getY(i);
        y += 0.01;
        if (y > 2.2) y = 0.1;
        positions.setY(i, y);
      }
      positions.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [activeIndex, isAutoSpin, rotationAngle]);

  return (
    <section id="dish-lab" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Culinary Laboratory</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          The Anatomy of <span className="text-gold-gradient">Flavor</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Inspect our legendary offerings in microscopic detail. Discover the 18-hour broth simmers, hand-pleating geometry, and secret Himalayan mountain herbs that define KC.
        </p>
      </div>

      {/* Selector Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
        {inspectorDishes.map((dish, idx) => (
          <button
            key={dish.id}
            onClick={() => setActiveIndex(idx)}
            className={`px-4 sm:px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
              activeIndex === idx
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 border-amber-400 shadow-lg shadow-amber-500/25 scale-105"
                : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border-white/10"
            }`}
          >
            {dish.item.name}
          </button>
        ))}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950/70 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
        {/* Left: 3D Visualization Platter & Live Photo Overlay */}
        <div className="lg:col-span-6 relative flex flex-col items-center">
          <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/60 shadow-inner flex items-center justify-center">
            {/* Real Dish Photography */}
            <div className="absolute inset-4 rounded-2xl overflow-hidden z-10 group">
              <Image
                src={current.item.image}
                alt={current.item.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-semibold text-zinc-200">Recipe Est. {current.originYear}</span>
              </div>

              {/* Price Tag */}
              <div className="absolute bottom-4 left-4 z-20">
                <span className="text-2xl font-black text-amber-400">₹{current.item.price}</span>
                <span className="text-xs text-zinc-400 ml-1.5">Freshly prepared</span>
              </div>
            </div>

            {/* 3D WebGL Platter Render Canvas */}
            <div ref={canvasMountRef} className="absolute inset-0 pointer-events-none opacity-40 z-0" />
          </div>

          {/* Interactive 3D Orbit Slider */}
          <div className="w-full max-w-[380px] mt-6 flex items-center gap-4 bg-zinc-900/80 px-4 py-2.5 rounded-2xl border border-white/5">
            <span className="text-xs font-medium text-zinc-400 whitespace-nowrap">Rotate 3D View</span>
            <input
              type="range"
              min="0"
              max="360"
              value={rotationAngle}
              onChange={(e) => {
                setIsAutoSpin(false);
                setRotationAngle(Number(e.target.value));
              }}
              className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
            />
            <button
              onClick={() => setIsAutoSpin(!isAutoSpin)}
              className={`text-xs px-2.5 py-1 rounded-lg border font-medium whitespace-nowrap ${
                isAutoSpin ? "bg-amber-500/20 text-amber-300 border-amber-500/30" : "bg-zinc-800 text-zinc-400 border-white/5"
              }`}
            >
              {isAutoSpin ? "Auto" : "Manual"}
            </button>
          </div>
        </div>

        {/* Right: Microscopic Details & Gauges */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <span>{current.item.category.toUpperCase()}</span>
              <span>•</span>
              <span>{current.item.type === "veg" ? "🌱 Pure Vegetarian" : "🍗 Farm-Fresh Chicken"}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white">{current.item.name}</h3>
            <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
              {current.item.longDescription}
            </p>
          </div>

          {/* Dials / Metric Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {/* Spice Flame Rank */}
            <div className="bg-zinc-900/90 border border-white/5 rounded-2xl p-3.5 text-center">
              <div className="flex justify-center mb-1">
                <Flame className="w-5 h-5 text-red-500 animate-pulse" />
              </div>
              <div className="text-base font-black text-white flex items-center justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < current.spiceRank ? "text-red-500" : "text-zinc-700"}>
                    ●
                  </span>
                ))}
              </div>
              <span className="text-[11px] font-medium text-zinc-400 block mt-1">Spice Heat</span>
            </div>

            {/* Broth Simmer */}
            <div className="bg-zinc-900/90 border border-white/5 rounded-2xl p-3.5 text-center">
              <div className="flex justify-center mb-1">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-base font-black text-white">
                {current.brothSimmerHours > 0 ? `${current.brothSimmerHours} Hrs` : "Flash Fried"}
              </div>
              <span className="text-[11px] font-medium text-zinc-400 block mt-1">Simmer Time</span>
            </div>

            {/* Hand Pleat Count */}
            <div className="bg-zinc-900/90 border border-white/5 rounded-2xl p-3.5 text-center">
              <div className="flex justify-center mb-1">
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="text-base font-black text-white">
                {current.pleats > 0 ? `${current.pleats} Pleats` : "Noodle Bowl"}
              </div>
              <span className="text-[11px] font-medium text-zinc-400 block mt-1">Hand-Folded</span>
            </div>

            {/* Umami Depth */}
            <div className="bg-zinc-900/90 border border-white/5 rounded-2xl p-3.5 text-center">
              <div className="flex justify-center mb-1">
                <Award className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-base font-black text-emerald-400">{current.umamiScore}</div>
              <span className="text-[11px] font-medium text-zinc-400 block mt-1">Umami Depth</span>
            </div>
          </div>

          {/* Secret Ingredients Breakdown */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4 sm:p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
              <span>✦</span> Signature Flavor Architecture
            </h4>
            <div className="flex flex-wrap gap-2">
              {current.secretIngredients.map((ing, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-800/80 border border-white/5 text-xs text-zinc-300"
                >
                  <CheckCircle2 className="w-3 h-3 text-amber-400" />
                  {ing}
                </span>
              ))}
            </div>
            <p className="text-xs text-zinc-400 mt-3 pt-3 border-t border-white/5 leading-relaxed italic">
              &quot;{current.craftingProcess}&quot;
            </p>
          </div>

          {/* Action CTA */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => onAddToCart && onAddToCart(current.item)}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-red-500 hover:from-amber-400 hover:to-red-400 text-zinc-950 font-bold text-sm tracking-wide transition-all shadow-xl shadow-amber-500/20 active:scale-98"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Order Tray (₹{current.item.price})</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
