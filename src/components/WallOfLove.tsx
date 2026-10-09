"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Plus, CheckCircle, X } from "lucide-react";
import confetti from "canvas-confetti";
import { REVIEWS, ReviewItem } from "../data/restaurantData";

export default function WallOfLove() {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS.slice(0, 3));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [favoriteDish, setFavoriteDish] = useState("The Legendary Dumpling Soup");
  const [rating, setRating] = useState(5);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const created: ReviewItem = {
      id: `rev-${Date.now()}`,
      name,
      role: "Verified Patron",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      rating,
      date: "Today",
      text,
      favoriteDish,
      verifiedLocal: true,
    };

    setReviewsList([created, ...reviewsList]);
    setIsModalOpen(false);
    setName("");
    setText("");

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#f59e0b", "#ef4444"],
    });
  };

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-2">
          35-Year Heritage
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Loved by <span className="text-gold-gradient">Dehradun</span>
        </h2>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/8 text-xs text-zinc-300">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
          <span className="font-bold text-white">4.8 / 5.0</span>
          <span className="text-zinc-500">• 15,000+ Reviews</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {reviewsList.map((rev) => (
          <div
            key={rev.id}
            className="bg-white/[0.025] backdrop-blur-xl border border-white/8 rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-500/30">
                    <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{rev.name}</h4>
                    <span className="text-[11px] text-zinc-400">{rev.role}</span>
                  </div>
                </div>

                <div className="flex text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed italic">
                &quot;{rev.text}&quot;
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 mt-4 text-[11px] text-zinc-400">
              <span>Favorite: </span>
              <span className="font-semibold text-amber-300">{rev.favoriteDish}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/8 text-xs font-medium transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write a Review</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border border-white/10 rounded-2xl max-w-sm w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-white mb-4">Leave a Review</h3>

            <form onSubmit={handleAddReview} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/8 text-xs text-white placeholder-zinc-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Favorite Dish"
                value={favoriteDish}
                onChange={(e) => setFavoriteDish(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/8 text-xs text-white placeholder-zinc-500 focus:outline-none"
              />
              <textarea
                required
                rows={3}
                placeholder="Your experience..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/8 text-xs text-white placeholder-zinc-500 focus:outline-none"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
