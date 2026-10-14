"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Star, Plus, X } from "lucide-react";
import confetti from "canvas-confetti";
import { REVIEWS, ReviewItem } from "../data/restaurantData";

export default function WallOfLove() {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS.slice(0, 3));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [favoriteDish, setFavoriteDish] = useState("The Legendary Dumpling Soup");
  const [rating, setRating] = useState(5);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

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
      colors: ["#f97316", "#ea580c"],
    });
  };

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-screen-2xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-2">
          35-Year Heritage
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-3">
          Loved by <span className="text-orange-gradient">Dehradun</span>
        </h2>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs text-zinc-700 shadow-sm">
          <div className="flex text-orange-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-orange-500" />
            ))}
          </div>
          <span className="font-bold text-zinc-900">4.8 / 5.0</span>
          <span className="text-zinc-500">• 15,000+ Reviews</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {reviewsList.map((rev) => (
          <div
            key={rev.id}
            className="bg-white/90 backdrop-blur-xl border border-zinc-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-orange-200">
                    <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-900">{rev.name}</h4>
                    <span className="text-[11px] text-zinc-500">{rev.role}</span>
                  </div>
                </div>

                <div className="flex text-orange-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-orange-500" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed italic">
                &quot;{rev.text}&quot;
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-100 mt-4 text-[11px] text-zinc-500">
              <span>Favorite: </span>
              <span className="font-bold text-orange-600">{rev.favoriteDish}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-orange-50 text-zinc-800 hover:text-orange-600 border border-zinc-200 text-xs font-semibold transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write a Review</span>
        </button>
      </div>

      {isModalOpen && mounted && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white border border-zinc-200 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl z-[101] animate-in zoom-in-95 text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-700 p-1.5 rounded-full hover:bg-zinc-100 transition-colors"
              aria-label="Close review modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-zinc-900 mb-1">Leave a Review</h3>
            <p className="font-sans text-xs text-zinc-500 mb-5">
              Share your dining memory from KC Soup Bar with the Doon community.
            </p>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Your Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setRating(i + 1)}
                      className="p-1 hover:scale-110 transition-transform focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          i < rating
                            ? "text-orange-500 fill-orange-500"
                            : "text-zinc-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-sans text-xs font-semibold text-zinc-500 ml-2">
                    {rating} out of 5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-sans font-normal w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Favorite Dish
                </label>
                <input
                  type="text"
                  placeholder="e.g. The Legendary Dumpling Soup"
                  value={favoriteDish}
                  onChange={(e) => setFavoriteDish(e.target.value)}
                  className="font-sans font-normal w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Your Experience
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us what you loved about the food, broth, or ambience..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="font-sans font-normal w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Submit Review</span>
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
