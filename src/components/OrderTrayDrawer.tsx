"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, Send, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";
import { MenuItem, OUTLETS, RESTAURANT_INFO } from "../data/restaurantData";

export interface TrayItem {
  item: MenuItem;
  quantity: number;
}

interface OrderTrayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tray: TrayItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onClearTray: () => void;
}

export default function OrderTrayDrawer({
  isOpen,
  onClose,
  tray,
  onUpdateQuantity,
  onClearTray,
}: OrderTrayDrawerProps) {
  const [selectedOutlet, setSelectedOutlet] = useState<string>(OUTLETS[0].id);
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const subtotal = tray.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const packagingFee = subtotal > 0 ? 25 : 0;
  const grandTotal = subtotal + taxes + packagingFee;

  const handleSendWhatsAppOrder = () => {
    if (tray.length === 0) return;

    const chosenOutlet = OUTLETS.find((o) => o.id === selectedOutlet)?.name || "Jakhan Flagship";

    let message = `🍲 *NEW ORDER - KC SOUP BAR & MOMOS*\n`;
    message += `──────────────────\n`;
    message += `📍 *Outlet:* ${chosenOutlet}\n`;
    message += `📦 *Type:* ${orderType === "delivery" ? "Home Delivery" : "Self Pickup / Takeaway"}\n`;
    if (customerName) message += `👤 *Name:* ${customerName}\n`;
    if (customerPhone) message += `📞 *Phone:* ${customerPhone}\n`;
    if (orderType === "delivery" && deliveryAddress) {
      message += `🏠 *Address:* ${deliveryAddress}\n`;
    }
    message += `──────────────────\n`;
    message += `*ITEMS:*\n`;

    tray.forEach((entry, idx) => {
      message += `${idx + 1}. ${entry.item.name} x${entry.quantity} - ₹${entry.item.price * entry.quantity}\n`;
    });

    message += `──────────────────\n`;
    message += `*Subtotal:* ₹${subtotal}\n`;
    message += `*GST (5%):* ₹${taxes}\n`;
    message += `*Packaging:* ₹${packagingFee}\n`;
    message += `*GRAND TOTAL:* ₹${grandTotal}\n`;
    message += `──────────────────\n`;
    message += `Please confirm my order and share preparation time. Thank you!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
      colors: ["#f97316", "#ea580c"],
    });

    window.open(whatsappUrl, "_blank");
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex sm:pl-10 pointer-events-none">
        <div className="w-full sm:w-[420px] md:w-[460px] max-w-full bg-white border-l border-zinc-200 shadow-2xl flex flex-col justify-between text-zinc-900 h-full animate-in slide-in-from-right duration-300 pointer-events-auto">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-zinc-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-zinc-900">Your Order Tray</h3>
                <span className="font-sans text-xs text-zinc-500">
                  {tray.length} item{tray.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {tray.length > 0 && (
                <button
                  onClick={onClearTray}
                  className="p-2 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-zinc-100 transition-colors"
                  title="Clear Tray"
                  aria-label="Clear Tray"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 transition-colors"
                aria-label="Close Tray"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tray Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 overscroll-contain">
            {tray.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-orange-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-zinc-900 mb-1">Your tray is empty</h4>
                <p className="font-sans text-xs text-zinc-500 max-w-[240px] mb-6">
                  Add our legendary 1989 dumpling soup or handcrafted momos from the menu!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-sm"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              tray.map((entry) => (
                <div
                  key={entry.item.id}
                  className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3.5 flex gap-3.5 items-center justify-between"
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-zinc-200">
                    <Image
                      src={entry.item.image}
                      alt={entry.item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-zinc-900 truncate">{entry.item.name}</h5>
                    <div className="text-[11px] text-orange-600 font-bold mt-0.5">
                      ₹{entry.item.price} each
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-zinc-200 shrink-0 shadow-xs">
                    <button
                      onClick={() => onUpdateQuantity(entry.item.id, entry.quantity - 1)}
                      className="text-zinc-500 hover:text-zinc-900 p-0.5"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-zinc-900 min-w-[14px] text-center">
                      {entry.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(entry.item.id, entry.quantity + 1)}
                      className="text-zinc-500 hover:text-zinc-900 p-0.5"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Order Settings */}
            {tray.length > 0 && (
              <div className="pt-4 border-t border-zinc-100 space-y-4">
                {/* Outlet Selection */}
                <div>
                  <label className="text-[11px] font-bold text-zinc-700 block mb-1.5 uppercase tracking-wider">
                    Select Fulfilling Outlet
                  </label>
                  <select
                    value={selectedOutlet}
                    onChange={(e) => setSelectedOutlet(e.target.value)}
                    className="font-sans font-normal w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                  >
                    {OUTLETS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.name} ({o.subtitle})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delivery Type */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOrderType("delivery")}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                      orderType === "delivery"
                        ? "bg-orange-50 text-orange-700 border-orange-300 shadow-xs"
                        : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                    }`}
                  >
                    <span>🚀 Home Delivery</span>
                  </button>
                  <button
                    onClick={() => setOrderType("pickup")}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                      orderType === "pickup"
                        ? "bg-orange-50 text-orange-700 border-orange-300 shadow-xs"
                        : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                    }`}
                  >
                    <span>🛍️ Self Takeaway</span>
                  </button>
                </div>

                {/* Customer Details */}
                <div className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="Your Name (e.g. Rahul Verma)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="font-sans font-normal w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number (e.g. 9876543210)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="font-sans font-normal w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                  />
                  {orderType === "delivery" && (
                    <textarea
                      rows={2}
                      placeholder="Delivery Address in Dehradun (House/Street/Landmark)..."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="font-sans font-normal w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors resize-none"
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {tray.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-zinc-100 bg-zinc-50/90 space-y-4 shrink-0 pb-8 sm:pb-6">
              <div className="space-y-1.5 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-zinc-900 font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="text-zinc-900 font-bold">₹{taxes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging & Safety</span>
                  <span className="text-zinc-900 font-bold">₹{packagingFee}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-zinc-900 pt-2 border-t border-zinc-200">
                  <span>Grand Total</span>
                  <span className="text-orange-600">₹{grandTotal}</span>
                </div>
              </div>

              {/* Primary WhatsApp Order Button */}
              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-98 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Confirm & Send via WhatsApp</span>
              </button>

              {/* Delivery Apps */}
              <div className="text-center pt-1">
                <span className="font-sans text-[10px] text-zinc-500 block mb-1">
                  Also available on food delivery apps:
                </span>
                <div className="flex items-center justify-center gap-3">
                  <a
                    href="https://www.swiggy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-orange-600 hover:underline flex items-center gap-1"
                  >
                    <span>Swiggy</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-zinc-400">•</span>
                  <a
                    href="https://www.zomato.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-red-600 hover:underline flex items-center gap-1"
                  >
                    <span>Zomato</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
