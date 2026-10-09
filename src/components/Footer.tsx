"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, Check, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { RESTAURANT_INFO, OUTLETS } from "../data/restaurantData";
import { DumplingIcon } from "./FoodIcons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.9 },
      colors: ["#f59e0b", "#ef4444"],
    });
  };

  return (
    <footer className="relative bg-zinc-950/80 backdrop-blur-2xl border-t border-white/8 pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/6">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-amber-400">
                <DumplingIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">KC SOUP BAR & MOMOS</h3>
                <span className="text-[10px] text-zinc-500 uppercase font-medium block">
                  Est. 1989 • Dehradun, Uttarakhand
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              35 years of slow-simmered Himalayan broths, 18-pleat hand-folded momos, and warm memories on Rajpur Road.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-amber-400 flex items-center justify-center border border-white/6 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
              <a
                href={`mailto:${RESTAURANT_INFO.email}`}
                className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-amber-400 flex items-center justify-center border border-white/6 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Outlets Directory */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Dehradun Locations
            </h4>
            <div className="space-y-2 text-xs">
              {OUTLETS.map((o) => (
                <div key={o.id}>
                  <a
                    href={o.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-zinc-300 hover:text-amber-400 transition-colors block"
                  >
                    {o.name}
                  </a>
                  <span className="text-zinc-500 block text-[11px] truncate max-w-xs">{o.address}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-amber-400 transition-colors">
                  1989 Story
                </a>
              </li>
              <li>
                <a href="#outlets" className="hover:text-amber-400 transition-colors">
                  Outlets & Hours
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Clean Newsletter */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Stay in Touch
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Get updates on seasonal broth releases and special weekend batches.
            </p>

            {subscribed ? (
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 flex items-center gap-2">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Thank you for subscribing!</span>
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
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/8 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/40"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-[11px] transition-colors"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
          <div>
            © 2026 KC Soup Bar & Momos. All Rights Reserved. Est. 1989 in Dehradun.
          </div>
          <div className="flex items-center gap-1 text-zinc-400">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for Dehradun</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
