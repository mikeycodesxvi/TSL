"use client";

import React, { useState } from "react";
import { X, Calendar, Users, Clock, MapPin, CheckCircle2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { OUTLETS, Outlet, RESTAURANT_INFO } from "../data/restaurantData";

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedOutlet?: Outlet | null;
}

export default function TableReservationModal({
  isOpen,
  onClose,
  preselectedOutlet,
}: TableReservationModalProps) {
  const [outletId, setOutletId] = useState<string>(preselectedOutlet?.id || OUTLETS[0].id);
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>("2026-10-10");
  const [time, setTime] = useState<string>("19:30");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [seatingPref, setSeatingPref] = useState<string>("Heated Veranda (Mountain Air)");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#f59e0b", "#ef4444", "#10b981"],
    });
  };

  const chosenOutlet = OUTLETS.find((o) => o.id === outletId) || OUTLETS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-zinc-950 border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">Table Reserved!</h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xs mx-auto leading-relaxed">
              We look forward to hosting you at <strong className="text-amber-400">{chosenOutlet.name}</strong> on{" "}
              <strong>{date}</strong> at <strong>{time}</strong> for <strong>{guests} guests</strong>.
            </p>
            <div className="bg-zinc-900/60 p-4 rounded-2xl border border-white/5 text-xs text-zinc-400 max-w-sm mx-auto">
              A confirmation WhatsApp ping has been queued for {phone || "your number"}. For any immediate changes, call {chosenOutlet.phone}.
            </div>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="mt-4 px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Table & Tasting Experience</span>
            </div>
            <h3 className="text-2xl font-black text-white mb-1">Reserve Your Table</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Skip the queue at Rajpur Road or Balliwala with priority table booking.
            </p>

            <form onSubmit={handleBooking} className="space-y-4">
              {/* Outlet */}
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Select Outlet</label>
                <select
                  value={outletId}
                  onChange={(e) => setOutletId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {OUTLETS.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name} - {o.landmark}
                    </option>
                  ))}
                </select>
              </div>

              {/* Guests & Date/Time */}
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Party Size</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              {/* Seating preference */}
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Seating Vibe</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {["Heated Veranda (Mountain Air)", "Cozy Indoor Booth", "Cauldron Bar Counter"].map((pref) => (
                    <button
                      type="button"
                      key={pref}
                      onClick={() => setSeatingPref(pref)}
                      className={`p-2.5 rounded-xl border text-left transition-colors ${
                        seatingPref === pref
                          ? "bg-amber-500/20 text-amber-300 border-amber-500"
                          : "bg-zinc-900 text-zinc-400 border-white/5"
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 Mobile"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 active:scale-95"
              >
                Confirm Priority Reservation
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
