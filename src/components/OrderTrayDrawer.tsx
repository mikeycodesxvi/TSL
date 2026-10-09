"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, Send, ArrowRight, ExternalLink } from "lucide-react";
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

  if (!isOpen) return null;

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
    });

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-white/10 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">Your Order Tray</h3>
                <span className="text-xs text-zinc-400">
                  {tray.length} unique creation{tray.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {tray.length > 0 && (
                <button
                  onClick={onClearTray}
                  className="p-2 text-zinc-400 hover:text-red-400 rounded-lg hover:bg-zinc-900 transition-colors"
                  title="Clear Tray"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tray Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {tray.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4 text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">Your tray is empty</h4>
                <p className="text-xs text-zinc-400 max-w-[240px] mb-6">
                  Add our legendary 1989 dumpling soup or craft a custom bowl in the Broth Alchemy studio!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              tray.map((entry) => (
                <div
                  key={entry.item.id}
                  className="bg-zinc-900/60 border border-white/5 rounded-2xl p-3.5 flex gap-3.5 items-center justify-between"
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-zinc-800">
                    <Image
                      src={entry.item.image}
                      alt={entry.item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">{entry.item.name}</h5>
                    <div className="text-[11px] text-amber-400 font-semibold mt-0.5">
                      ₹{entry.item.price} each
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-zinc-950 px-2 py-1 rounded-xl border border-white/10 shrink-0">
                    <button
                      onClick={() => onUpdateQuantity(entry.item.id, entry.quantity - 1)}
                      className="text-zinc-400 hover:text-white p-0.5"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white min-w-[14px] text-center">
                      {entry.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(entry.item.id, entry.quantity + 1)}
                      className="text-zinc-400 hover:text-white p-0.5"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Order Settings (if tray not empty) */}
            {tray.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-4">
                {/* Outlet Selection */}
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                    Select Fulfilling Outlet
                  </label>
                  <select
                    value={selectedOutlet}
                    onChange={(e) => setSelectedOutlet(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
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
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      orderType === "delivery"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : "bg-zinc-900 text-zinc-400 border-white/5"
                    }`}
                  >
                    🚀 Home Delivery
                  </button>
                  <button
                    onClick={() => setOrderType("pickup")}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      orderType === "pickup"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : "bg-zinc-900 text-zinc-400 border-white/5"
                    }`}
                  >
                    🛍️ Self Takeaway
                  </button>
                </div>

                {/* Customer Details */}
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500"
                  />
                  {orderType === "delivery" && (
                    <textarea
                      rows={2}
                      placeholder="Delivery Address in Dehradun..."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500"
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {tray.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-zinc-950/90 space-y-4">
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="text-white font-medium">₹{taxes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging & Safety</span>
                  <span className="text-white font-medium">₹{packagingFee}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-white/10">
                  <span>Grand Total</span>
                  <span className="text-amber-400">₹{grandTotal}</span>
                </div>
              </div>

              {/* Primary WhatsApp Order Button */}
              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-zinc-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Confirm & Send via WhatsApp</span>
              </button>

              {/* Third-Party Partners */}
              <div className="text-center pt-1">
                <span className="text-[10px] text-zinc-500 block mb-1.5">
                  Also available instantly on delivery apps:
                </span>
                <div className="flex items-center justify-center gap-3">
                  <a
                    href="https://www.swiggy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-orange-400 hover:underline flex items-center gap-1"
                  >
                    <span>Swiggy</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-zinc-600">•</span>
                  <a
                    href="https://www.zomato.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-red-400 hover:underline flex items-center gap-1"
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
    </div>
  );
}
