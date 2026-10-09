"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, MessageSquareHeart, CheckCircle, Plus, Sparkles, X, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { REVIEWS, ReviewItem } from "../data/restaurantData";

export default function WallOfLove() {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newReview, setNewReview] = useState({
    name: "",
    role: "Dehradun Food Lover",
    rating: 5,
    favoriteDish: "The Legendary Dumpling Soup",
    text: "",
  });
  const [likedReviews, setLikedReviews] = useState<Record<string, number>>({});

  const handleToggleLike = (id: string) => {
    setLikedReviews((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.text.trim()) return;

    const created: ReviewItem = {
      id: `rev-user-${Date.now()}`,
      name: newReview.name,
      role: newReview.role,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      rating: newReview.rating,
      date: "Just now",
      text: newReview.text,
      favoriteDish: newReview.favoriteDish,
      verifiedLocal: true,
    };

    setReviewsList([created, ...reviewsList]);
    setIsModalOpen(false);
    setNewReview({
      name: "",
      role: "Dehradun Food Lover",
      rating: 5,
      favoriteDish: "The Legendary Dumpling Soup",
      text: "",
    });

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#f59e0b", "#ef4444", "#10b981"],
    });
  };

  return (
    <section id="reviews" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>Voices of the Doon Valley</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          35 Years on the <span className="text-gold-gradient">Wall of Love</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          From boarding school cadets escaping for evening momos to culinary connoisseurs driving up from Delhi — read what three decades of devotion taste like.
        </p>

        {/* Aggregate Rating Banner */}
        <div className="mt-6 inline-flex items-center gap-4 bg-zinc-950/80 border border-white/10 px-6 py-3 rounded-full backdrop-blur-xl">
          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <span className="text-sm font-bold text-white">4.8 / 5.0</span>
          <span className="text-xs text-zinc-400 border-l border-white/10 pl-4">
            Over 15,000+ Verified Patron Reviews
          </span>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
        {reviewsList.map((rev) => (
          <div
            key={rev.id}
            className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/30 hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Reviewer Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-amber-500/40">
                    <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                      {rev.verifiedLocal && (
                        <span title="Verified Patron">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400">{rev.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Text */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic mb-4">
                &quot;{rev.text}&quot;
              </p>
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs">
              <div className="text-zinc-400">
                <span>Favorite: </span>
                <span className="font-semibold text-amber-300">{rev.favoriteDish}</span>
              </div>

              <button
                onClick={() => handleToggleLike(rev.id)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    likedReviews[rev.id] ? "text-red-500 fill-red-500" : ""
                  }`}
                />
                <span className="text-[11px] font-bold">
                  {(likedReviews[rev.id] || 0) + 12}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Share Memory CTA */}
      <div className="text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-zinc-950 font-black text-xs sm:text-sm tracking-wide transition-all shadow-xl shadow-amber-500/20 active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>Leave Your KC Story or Review</span>
        </button>
      </div>

      {/* Modal for New Review */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border border-white/10 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white mb-1">Share Your KC Memory</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Tell Dehradun about your favorite dumpling or soup experience.
            </p>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Favorite Dish</label>
                <input
                  type="text"
                  placeholder="e.g. The Legendary Dumpling Soup"
                  value={newReview.favoriteDish}
                  onChange={(e) => setNewReview({ ...newReview, favoriteDish: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="text-amber-400 p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newReview.rating ? "fill-amber-400" : "text-zinc-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Story / Experience</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what you loved about KC Soup Bar..."
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 active:scale-95"
              >
                Submit Memory to the Wall
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
