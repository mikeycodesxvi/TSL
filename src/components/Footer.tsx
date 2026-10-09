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
      colors: ["#ea580c", "#f97316"],
    });
  };

  return (
    <footer className="relative bg-[#f5f5f4] border-t border-orange-100/90 pt-16 pb-12 text-zinc-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-zinc-200">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 shadow-sm">
                <DumplingIcon className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-zinc-900">KC SOUP BAR & MOMOS</h3>
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">
                  Est. 1989 • Dehradun, Uttarakhand
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed max-w-sm">
              35 years of slow-simmered Himalayan broths, 18-pleat hand-folded momos, and warm memories on Rajpur Road.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-8 h-8 rounded-lg bg-white hover:bg-orange-50 text-zinc-700 hover:text-orange-600 flex items-center justify-center border border-zinc-200 shadow-sm transition-colors"
                title="Phone"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
              <a
                href={`mailto:${RESTAURANT_INFO.email}`}
                className="w-8 h-8 rounded-lg bg-white hover:bg-orange-50 text-zinc-700 hover:text-orange-600 flex items-center justify-center border border-zinc-200 shadow-sm transition-colors"
                title="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Outlets Directory */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              Dehradun Locations
            </h4>
            <div className="space-y-2 text-xs">
              {OUTLETS.map((o) => (
                <div key={o.id}>
                  <a
                    href={o.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-zinc-800 hover:text-orange-600 transition-colors block"
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#menu" className="hover:text-orange-600 transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-orange-600 transition-colors">
                  1989 Story
                </a>
              </li>
              <li>
                <a href="#outlets" className="hover:text-orange-600 transition-colors">
                  Outlets & Hours
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-orange-600 transition-colors">
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Clean Newsletter */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              Stay in Touch
            </h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Get updates on seasonal broth releases and special weekend batches.
            </p>

            {subscribed ? (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
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
                    className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-[11px] transition-colors"
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
          <div className="flex items-center gap-1 text-zinc-500">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-orange-600 fill-orange-600" />
            <span>for Dehradun</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
