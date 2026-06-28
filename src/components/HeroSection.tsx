import React from 'react';
import { ArrowRight, Sparkles, Wheat } from 'lucide-react';

interface HeroSectionProps {
  heroImage: string;
}

export default function HeroSection({ heroImage }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-cocoa-900">
      {/* Background Image with elegant gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Premium Artisan ZB Bakery Display"
          className="w-full h-full object-cover object-center scale-102 transform duration-1000 select-none opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cocoa-950/95 via-cocoa-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cocoa-50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          {/* Subtle Label */}
          <div className="space-y-2">
            <span className="text-gold-500 font-serif italic text-xl sm:text-2xl block animate-fade-in">
              EST. 2024 — London & Sweetwater
            </span>
          </div>

          {/* Main Title */}
          <h1 id="hero-title" className="text-5xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-[1.1] text-white">
            Freshly Baked <br />
            <span className="text-gold-500 italic">Happiness</span>, Made <br />
            Every Day.
          </h1>

          {/* Subheading */}
          <p id="hero-subtitle" className="text-base sm:text-lg lg:text-xl text-cocoa-200 font-sans leading-relaxed max-w-xl">
            Experience handcrafted breads, delicious pastries, beautiful cakes, and irresistible desserts made with premium organic ingredients and baked fresh daily in our brick ovens.
          </p>

          {/* Buttons */}
          <div id="hero-buttons" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 max-w-md sm:max-w-none">
            <a
              id="hero-order-now"
              href="#menu"
              className="px-10 py-4 border-2 border-gold-500 bg-gold-500 text-cocoa-950 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-transparent hover:text-white transition-all rounded-none text-center shadow-lg hover:shadow-gold-500/20 cursor-pointer"
            >
              View Menu
            </a>
            <a
              id="hero-design-cake"
              href="#designer"
              className="flex items-center justify-center gap-2 px-10 py-4 border-2 border-white/40 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-cocoa-950 hover:border-white transition-all rounded-none text-center backdrop-blur-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-gold-300" />
              <span>Design Your Cake</span>
            </a>
          </div>

          {/* Quick Metrics */}
          <div id="hero-metrics" className="grid grid-cols-3 gap-6 pt-12 border-t border-white/10 max-w-lg">
            <div>
              <p className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-gold-500">7:00 AM</p>
              <p className="text-xs text-cocoa-300 font-sans tracking-wide">Hot Ovens Daily</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-gold-500">100%</p>
              <p className="text-xs text-cocoa-300 font-sans tracking-wide">Organic Flour</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-gold-500">24 Hours</p>
              <p className="text-xs text-cocoa-300 font-sans tracking-wide">Cold Fermented</p>
            </div>
          </div>
        </div>
      </div>

      {/* Watermarked background styling */}
      <div className="absolute bottom-[10%] right-[-5%] opacity-[0.03] pointer-events-none select-none text-white font-serif text-[180px] sm:text-[280px] font-black leading-none italic hidden md:block">
        Bakery
      </div>

      {/* Decorative Warm Backlight */}
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-gold-600/10 blur-[120px] pointer-events-none" />
    </section>
  );
}
