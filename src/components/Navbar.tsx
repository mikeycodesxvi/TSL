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
          ? "bg-zinc-950/70 backdrop-blur-2xl border-b border-white/10 py-3.5 shadow-lg shadow-black/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Good Food Icon */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md flex items-center justify-center text-amber-400 group-hover:border-amber-500/40 transition-all shadow-inner">
              <DumplingIcon className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  KC SOUP BAR
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  MOMOS
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 tracking-wider uppercase font-medium block">
                Since 1989 • Dehradun
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links - Clean & Minimal */}
          <nav className="hidden md:flex items-center gap-8 bg-white/[0.03] backdrop-blur-xl border border-white/8 px-6 py-2 rounded-full shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-zinc-300 hover:text-amber-400 transition-colors tracking-wide"
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
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 border border-white/10 text-xs font-medium backdrop-blur-md transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Reserve</span>
            </button>

            {/* Order Tray Button */}
            <button
              onClick={onOpenTray}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Tray</span>
              {trayCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-zinc-950 text-amber-400 text-[10px] font-bold flex items-center justify-center">
                  {trayCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white backdrop-blur-md"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 bg-zinc-950/90 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl space-y-2 animate-in fade-in slide-in-from-top-2">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-zinc-200 hover:text-amber-400 hover:bg-white/[0.05] rounded-xl transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Reserve a Table</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
