"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import MarqueeTicker from "../components/MarqueeTicker";
import FeaturedSignatures from "../components/FeaturedSignatures";
import MenuSection from "../components/MenuSection";
import HeritageStory from "../components/HeritageStory";
import OutletsSection from "../components/OutletsSection";
import WallOfLove from "../components/WallOfLove";
import OrderTrayDrawer, { TrayItem } from "../components/OrderTrayDrawer";
import TableReservationModal from "../components/TableReservationModal";
import Footer from "../components/Footer";
import { MenuItem, Outlet } from "../data/restaurantData";

export default function Home() {
  const [tray, setTray] = useState<TrayItem[]>([]);
  const [isTrayOpen, setIsTrayOpen] = useState<boolean>(false);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [reservationOutlet, setReservationOutlet] = useState<Outlet | null>(null);

  const handleAddToCart = (item: MenuItem) => {
    setTray((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setTray((prev) => prev.filter((entry) => entry.item.id !== itemId));
    } else {
      setTray((prev) =>
        prev.map((entry) =>
          entry.item.id === itemId ? { ...entry, quantity: newQuantity } : entry
        )
      );
    }
  };

  const handleClearTray = () => {
    setTray([]);
  };

  const handleOpenReservationForOutlet = (outlet: Outlet) => {
    setReservationOutlet(outlet);
    setIsReservationOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const totalTrayCount = tray.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-zinc-900 selection:bg-orange-500 selection:text-white font-sans antialiased">
      {/* 1. Frosted Glass Sticky Navbar (No Music, Clean & Minimal) */}
      <Navbar
        trayCount={totalTrayCount}
        onOpenTray={() => setIsTrayOpen(true)}
        onOpenReservation={() => {
          setReservationOutlet(null);
          setIsReservationOpen(true);
        }}
      />

      <main className="relative">
        {/* 2. Simple, Ambient 3D Hero with Food Icons */}
        <HeroSection
          onExploreMenu={() => scrollToSection("menu")}
          onOpenOrder={() => setIsTrayOpen(true)}
        />

        {/* 3. Subtle Glass Marquee Ribbon */}
        <MarqueeTicker />

        {/* 4. Chef's 3 Iconic Highlights (Glass Cards with Food Icons) */}
        <FeaturedSignatures onAddToCart={handleAddToCart} />

        {/* 5. Clean, Filterable Menu with Food Icons */}
        <MenuSection onAddToCart={handleAddToCart} />

        {/* 6. Clean 1989 Heritage Story */}
        <HeritageStory />

        {/* 7. Outlets & Locations */}
        <OutletsSection onReserveTable={handleOpenReservationForOutlet} />

        {/* 8. Wall of Love (3 Patron Reviews) */}
        <WallOfLove />
      </main>

      {/* 9. Minimal Glass Footer */}
      <Footer />

      {/* Floating Order Tray Drawer */}
      <OrderTrayDrawer
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        tray={tray}
        onUpdateQuantity={handleUpdateQuantity}
        onClearTray={handleClearTray}
      />

      {/* Table Reservation Modal */}
      <TableReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        preselectedOutlet={reservationOutlet}
      />
    </div>
  );
}
