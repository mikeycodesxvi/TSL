"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import MarqueeTicker from "../components/MarqueeTicker";
import HeritageStory from "../components/HeritageStory";
import DishInspector3D from "../components/DishInspector3D";
import BrothAlchemyCustomizer from "../components/BrothAlchemyCustomizer";
import MenuSection from "../components/MenuSection";
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

  // Cart / Tray management
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
    <div className="min-h-screen bg-[#070709] text-zinc-100 selection:bg-amber-500 selection:text-zinc-950">
      {/* Top Navigation */}
      <Navbar
        trayCount={totalTrayCount}
        onOpenTray={() => setIsTrayOpen(true)}
        onOpenReservation={() => {
          setReservationOutlet(null);
          setIsReservationOpen(true);
        }}
      />

      <main className="relative z-10">
        {/* 1. 3D Hero Section */}
        <HeroSection
          onExploreMenu={() => scrollToSection("menu")}
          onOpenAlchemy={() => scrollToSection("broth-alchemy")}
        />

        {/* 2. Infinite Continuous Marquee */}
        <MarqueeTicker />

        {/* 3. 35-Year Heritage Story (1989 - Present) */}
        <HeritageStory />

        {/* 4. 3D Dish & Flavor Anatomy Lab */}
        <DishInspector3D onAddToCart={handleAddToCart} />

        {/* 5. Interactive Broth Alchemy Studio (Custom Bowl Builder) */}
        <BrothAlchemyCustomizer onAddCustomBowl={handleAddToCart} />

        {/* 6. Signature Menu & Filtering */}
        <MenuSection onAddToCart={handleAddToCart} />

        {/* 7. Outlets & Valley Locations */}
        <OutletsSection onReserveTable={handleOpenReservationForOutlet} />

        {/* 8. Wall of Love (Community Reviews & Memories) */}
        <WallOfLove />
      </main>

      {/* Footer */}
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
