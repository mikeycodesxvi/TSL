"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Flame, MapPin, Phone, Mail, ArrowRight, Check, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { RESTAURANT_INFO, OUTLETS } from "../data/restaurantData";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.9 },
    });
  };

  return (
    <footer className="relative bg-zinc-950 border-t border-white/10 pt-20 pb-12 overflow-hidden text-zinc-400">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 p-0.5 shadow-lg">
                <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="font-black text-lg text-white">KC SOUP BAR & MOMOS</h3>
                <span className="text-[10px] text-zinc-400 tracking-wider uppercase font-semibold block">
                  Est. 1989 • Dehradun, Uttarakhand
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Three and a half decades of slow-simmered Himalayan herbal broths, 18-pleat hand-folded momos, and unforgettable foothill evenings on Rajpur Road.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://instagram.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-amber-400 flex items-center justify-center border border-white/5 transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-amber-400 flex items-center justify-center border border-white/5 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${RESTAURANT_INFO.email}`}
                className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-amber-400 flex items-center justify-center border border-white/5 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Outlets Directory */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Dehradun Outlets
            </h4>
            <div className="space-y-3 text-xs">
              {OUTLETS.map((o) => (
                <div key={o.id} className="group">
                  <a
                    href={o.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-zinc-200 group-hover:text-amber-400 transition-colors block"
                  >
                    {o.name}
                  </a>
                  <span className="text-zinc-500 block text-[11px]">{o.address}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#heritage" className="hover:text-amber-400 transition-colors">
                  Our 1989 Story
                </a>
              </li>
              <li>
                <a href="#dish-lab" className="hover:text-amber-400 transition-colors">
                  3D Dish Lab
                </a>
              </li>
              <li>
                <a href="#broth-alchemy" className="hover:text-amber-400 transition-colors">
                  Broth Customizer
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  Signature Menu
                </a>
              </li>
              <li>
                <a href="#outlets" className="hover:text-amber-400 transition-colors">
                  Find an Outlet
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  Wall of Love
                </a>
              </li>
            </ul>
          </div>

          {/* Secret Broth Club Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Secret Broth Club
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Subscribe for secret seasonal broth drops, winter dumpling festivals, and exclusive tasting invites.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Welcome to the Secret Broth Club!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors"
                  >
                    Join
                  </button>
                </div>
                <span className="text-[10px] text-zinc-500 block">No spam. Only warm mountain broth news.</span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div>
            © 2026 KC Soup Bar & Momos. All Rights Reserved. Established 1989 in Dehradun.
          </div>
          <div className="flex items-center gap-1 text-zinc-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for the Doon Valley & Mountain Wanderers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
