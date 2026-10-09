"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Volume2,
  VolumeX,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  Calendar,
  Flame,
} from "lucide-react";
import { RESTAURANT_INFO } from "../data/restaurantData";

interface NavbarProps {
  trayCount: number;
  onOpenTray: () => void;
  onOpenReservation: () => void;
}

export default function Navbar({ trayCount, onOpenTray, onOpenReservation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const oscillatorRef = React.useRef<OscillatorNode | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gentle synthesized Himalayan simmer chime
  const toggleSound = () => {
    if (!isSoundOn) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Create warm low frequency gentle simmer drone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(174, ctx.currentTime); // 174 Hz healing frequency
        gain.gain.setValueAtTime(0.04, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        oscillatorRef.current = osc;
        setIsSoundOn(true);
      } catch {
        setIsSoundOn(false);
      }
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      setIsSoundOn(false);
    }
  };

  const navLinks = [
    { name: "35Y Heritage", href: "#heritage" },
    { name: "3D Dish Lab", href: "#dish-lab" },
    { name: "Broth Alchemy", href: "#broth-alchemy" },
    { name: "Signature Menu", href: "#menu" },
    { name: "Doon Outlets", href: "#outlets" },
    { name: "Wall of Love", href: "#reviews" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-zinc-950/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-red-600 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
                <Flame className="w-6 h-6 text-amber-400 group-hover:text-red-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base sm:text-lg tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  KC SOUP BAR
                </span>
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-500 text-zinc-950">
                  MOMOS
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 tracking-widest uppercase font-semibold block">
                Est. 1989 • Rajpur Road, Dehradun
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-zinc-300 hover:text-amber-400 transition-colors tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all ${
                isSoundOn
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                  : "bg-zinc-900/80 text-zinc-400 border-white/5 hover:text-white"
              }`}
              title={isSoundOn ? "Turn off ambient Himalayan drone" : "Turn on ambient Himalayan drone"}
            >
              {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Table Reservation Button */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 text-xs font-bold transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Reserve Table</span>
            </button>

            {/* Order Tray Button */}
            <button
              onClick={onOpenTray}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-zinc-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Tray</span>
              {trayCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-zinc-950 text-amber-400 text-[10px] font-black flex items-center justify-center">
                  {trayCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-zinc-950/95 border border-white/10 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl space-y-3 animate-in fade-in slide-in-from-top-2">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-zinc-200 hover:text-amber-400 hover:bg-zinc-900 rounded-xl"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-200 text-xs font-bold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Reserve a Table</span>
              </button>
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-full py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-200 text-xs font-bold flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Call Rajpur Road Flagship</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
