import React from 'react';
import { Heart, Sparkles, Trophy, ShieldCheck } from 'lucide-react';

interface AboutUsProps {
  aboutImage: string;
}

export default function AboutUs({ aboutImage }: AboutUsProps) {
  const highlights = [
    {
      icon: <Heart className="w-5 h-5 text-gold-500" />,
      title: 'Baked with Love',
      desc: 'Bringing people, friends, and families together through the simple warmth of handcrafted bakes.'
    },
    {
      icon: <Trophy className="w-5 h-5 text-gold-500" />,
      title: 'Artisanal Standards',
      desc: 'No artificial flavors, preservatives, or chemical mixes. Only genuine culinary devotion.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-gold-500" />,
      title: 'Purest Ingredients',
      desc: 'Belgian chocolates, Madagascar vanilla, French butter, and organic locally milled flours.'
    }
  ];

  return (
    <section id="story" className="py-24 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase (5 columns) */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute inset-0 bg-[#c5a059] transform rotate-3 scale-98 opacity-10 group-hover:rotate-1 duration-300 pointer-events-none rounded-none" />
            <div className="relative rounded-none overflow-hidden shadow-2xl border border-cocoa-950/10 bg-white">
              <img
                src={aboutImage}
                alt="ZB Bakery Handcrafted Sourdough Dough and Flour"
                className="w-full h-[450px] object-cover hover:scale-103 duration-500 rounded-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-cocoa-950/95 p-5 rounded-none text-white border border-gold-500/20">
                <p className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase flex items-center gap-1.5 mb-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                  BAKER'S WISDOM
                </p>
                <p className="font-serif italic text-sm text-cocoa-100">
                  "Bread is not just food; it's a living canvas of water, flour, time, and heart."
                </p>
              </div>
            </div>
            {/* Soft accent */}
            <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-gold-300/10 blur-xl pointer-events-none" />
          </div>

          {/* Story Text Content (7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-[#c5a059] font-serif italic text-xl block">
                Our Heritage & Craft
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-black tracking-tight leading-[1.1] text-cocoa-950">
                Handcrafted with Devotion,<br />
                Served with Joy
              </h2>
              <div className="h-0.5 w-16 bg-[#c5a059]" />
            </div>

            <p className="text-cocoa-900/80 font-sans leading-relaxed text-base sm:text-lg">
              At <strong className="text-cocoa-950 font-semibold font-serif">ZB Bakery</strong>, we believe that the most meaningful memories are created around the dining table. Our passion is to craft luxurious breads, pastries, and custom celebration cakes that not only taste extraordinary but bring families and friends closer together.
            </p>

            <p className="text-cocoa-900/70 font-sans leading-relaxed text-xs sm:text-sm">
              Every loaf of sourdough starts with our nurtured 100-year-old wild starter, taking a full 24 hours to ferment and rise naturally. Our pastry chef, Zoë, sources the absolute finest ingredients from across the globe—including real French butter, organic vanilla beans, and velvety Belgian chocolate—to ensure that every cupcake, cookie, and custom cake is a beautiful piece of culinary art.
            </p>

            {/* Feature Highlights list */}
            <div className="grid sm:grid-cols-1 gap-4 pt-4">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-white p-5 rounded-none border border-cocoa-950/10 shadow-sm hover:border-gold-500/20 transition-all">
                  <div className="p-3 bg-[#fbf5e6] text-[#c5a059] rounded-none shrink-0 border border-[#c5a059]/20">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-cocoa-950 mb-1">{item.title}</h4>
                    <p className="text-xs sm:text-xs text-cocoa-900/60 leading-relaxed font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
