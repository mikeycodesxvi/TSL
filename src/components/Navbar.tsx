"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Calendar } from "lucide-react";
import { DumplingIcon } from "./FoodIcons";

interface NavbarProps {
  trayCount: number;
  onOpenTray: () => void;
  onOpenReservation: () => void;
}

export default function Navbar({ trayCount, onOpenTray, onOpenReservation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Menu", href: "#menu" },
    { name: "Story", href: "#story" },
    { name: "Outlets", href: "#outlets" },
    { name: "Reviews", href: "#reviews" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-2xl border-b border-orange-100/80 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200/80 backdrop-blur-md flex items-center justify-center text-orange-600 group-hover:scale-105 transition-transform shadow-sm">
              <DumplingIcon className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`font-extrabold text-base tracking-tight transition-colors ${
                  isScrolled ? "text-zinc-900 group-hover:text-orange-600" : "text-white group-hover:text-orange-400"
                }`}>
                  KC SOUP BAR
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-orange-500 text-white shadow-sm">
                  MOMOS
                </span>
              </div>
              <span className={`text-[10px] tracking-wider uppercase font-semibold block transition-colors ${
                isScrolled ? "text-zinc-500" : "text-zinc-300"
              }`}>
                Since 1989 • Dehradun
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links - Clean White & Orange Glass Bar */}
          <nav className={`hidden md:flex items-center gap-8 px-6 py-2 rounded-full border transition-all ${
            isScrolled
              ? "bg-white/90 backdrop-blur-xl border-zinc-200/80 shadow-sm"
              : "bg-black/35 backdrop-blur-xl border-white/20 text-white"
          }`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs font-semibold tracking-wide transition-colors ${
                  isScrolled
                    ? "text-zinc-700 hover:text-orange-600"
                    : "text-zinc-200 hover:text-orange-300"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Table Reservation Button */}
            <button
              onClick={onOpenReservation}
              className={`hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isScrolled
                  ? "bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200"
                  : "bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md"
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-orange-500" />
              <span>Reserve</span>
            </button>

            {/* Order Tray Button - Always High-Visibility Orange */}
            <button
              onClick={onOpenTray}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-all shadow-md shadow-orange-500/25 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Tray</span>
              {trayCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-orange-600 text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                  {trayCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl border backdrop-blur-md transition-colors ${
                isScrolled
                  ? "bg-zinc-100 border-zinc-200 text-zinc-700"
                  : "bg-black/40 border-white/20 text-white"
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 bg-white/95 border border-zinc-200 rounded-2xl p-4 shadow-xl backdrop-blur-2xl space-y-2 animate-in fade-in slide-in-from-top-2">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-zinc-800 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-zinc-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-2.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-orange-600" />
                <span>Reserve a Table</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
