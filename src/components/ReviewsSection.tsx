import React, { useState } from 'react';
import { Star, MessageSquare, Quote, Check, Sparkles } from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export default function ReviewsSection({ reviews, onAddReview }: ReviewsSectionProps) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !reviewText.trim()) return;

    const newReview: Review = {
      id: `review-${Date.now()}`,
      name: name,
      rating: rating,
      text: reviewText,
      date: 'Today',
      verified: false,
    };

    onAddReview(newReview);
    setSubmitted(true);
    
    // Reset form after a small delay
    setTimeout(() => {
      setName('');
      setRating(5);
      setReviewText('');
      setSubmitted(false);
    }, 3000);
  };

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);

  return (
    <section id="reviews" className="py-24 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#c5a059] font-serif italic text-xl block">
            Pure Sweet Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-cocoa-950 leading-tight">
            What Our Patrons Love About Us
          </h2>
          <div className="h-0.5 w-16 bg-[#c5a059] mx-auto" />
          <p className="text-sm sm:text-base text-cocoa-900/70 font-sans leading-relaxed">
            Authentic, unprompted feedback from neighbors, bread lovers, and celebratory hosts who make ZB Bakery their premier baking partner.
          </p>
        </div>

        {/* Breakdown section */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Block: Statistics (4 columns) */}
          <div className="lg:col-span-4 bg-white p-8 rounded-none border border-cocoa-950/10 shadow-sm text-center space-y-6">
            <h3 className="font-serif text-lg font-bold text-cocoa-950 uppercase tracking-wide">Patron Summary</h3>
            
            <div className="space-y-1">
              <span className="font-serif text-5xl font-black text-cocoa-900 leading-none">{averageRating}</span>
              <p className="text-[10px] font-mono font-bold text-cocoa-950/40">OUT OF 5.0 STARS</p>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= Math.round(Number(averageRating)) ? 'fill-[#c5a059] text-[#c5a059]' : 'text-cocoa-200'
                  }`}
                />
              ))}
            </div>

            <p className="text-xs sm:text-sm text-cocoa-900/70 font-sans leading-relaxed">
              Based on <strong className="text-cocoa-950">{totalReviews}</strong> customer reviews, representing consistent local satisfaction.
            </p>

            <div className="pt-4 border-t border-cocoa-950/10 flex items-center justify-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[#c5a059]">
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              <span>100% Homemade Authenticity</span>
            </div>
          </div>

          {/* Right Block: Interactive Form (8 columns) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-none border border-cocoa-950/10 shadow-sm">
            
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-none bg-[#c5a059] text-[#fdfbf7] flex items-center justify-center font-bold text-lg">
                  ✓
                </div>
                <h4 className="font-serif text-xl font-bold text-cocoa-950 uppercase">Thank you, sweet patron!</h4>
                <p className="text-xs text-cocoa-900/70 max-w-md font-sans leading-relaxed">
                  Your feedback has been successfully added to our customer board. Chef Zoë and the baking team appreciate your warm support!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-serif text-xl font-bold text-cocoa-950 uppercase tracking-tight">Share Your Baking Experience</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold font-mono uppercase tracking-wider text-cocoa-950 block">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="E.g., Margaret Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs p-3 border border-cocoa-950/10 rounded-none focus:outline-none focus:ring-1 focus:ring-gold-500 text-cocoa-950 bg-white font-sans"
                    />
                  </div>

                  {/* Stars input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold font-mono uppercase tracking-wider text-cocoa-950 block">Your Rating</label>
                    <div className="flex items-center gap-1.5 h-[42px]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="text-cocoa-300 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= (hoverRating ?? rating) ? 'fill-[#c5a059] text-[#c5a059]' : 'text-cocoa-200'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-cocoa-950 block">Your Review</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us what you ordered, how it tasted, and what you think of our service..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full text-xs p-3 border border-cocoa-950/10 rounded-none focus:outline-none focus:ring-1 focus:ring-gold-500 text-cocoa-950 bg-white resize-none font-sans"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#c5a059] text-[#fdfbf7] font-mono text-xs font-bold uppercase tracking-widest rounded-none shadow-sm hover:bg-cocoa-950 transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
                >
                  <MessageSquare className="w-4 h-4 text-gold-200" />
                  <span>Submit Patron Review</span>
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Display grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white rounded-none border border-cocoa-950/10 shadow-sm flex flex-col justify-between space-y-6 relative hover:shadow-md transition-shadow"
            >
              <Quote className="w-10 h-10 text-cocoa-100 absolute top-4 right-4 pointer-events-none" />
              
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= rev.rating ? 'fill-[#c5a059] text-[#c5a059]' : 'text-cocoa-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-xs sm:text-sm text-cocoa-900/80 font-sans italic leading-relaxed">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-4 border-t border-cocoa-950/10">
                <div>
                  <h4 className="font-serif text-sm font-bold text-cocoa-950">{rev.name}</h4>
                  <p className="text-[10px] font-mono text-cocoa-950/40 font-bold uppercase mt-0.5">{rev.date}</p>
                </div>
                {rev.verified && (
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-[#fbf5e6] text-[#c5a059] border border-[#c5a059]/10 rounded-none text-[9px] font-mono font-bold uppercase tracking-wider">
                    <Check className="w-3 h-3 text-[#c5a059]" />
                    <span>Verified Guest</span>
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
