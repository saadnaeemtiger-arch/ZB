import React from 'react';
import { Flame, ShieldCheck, Sparkles, DollarSign, Eye, HeartHandshake, Zap, CalendarRange } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Flame className="w-6 h-6 text-gold-500" />,
      title: 'Freshly Baked Every Day',
      desc: 'Our ovens heat up at 5:00 AM daily to guarantee that every bite of bread and pastry is at its absolute prime.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold-500" />,
      title: 'Premium Ingredients',
      desc: 'We strictly source organic stone-ground flours, premium European-style butter, and natural local sweeteners.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold-500" />,
      title: 'Custom Cake Designs',
      desc: 'Whether it is a wedding or birthday, our design team transforms your aesthetic dreams into edible art.'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-gold-500" />,
      title: 'Affordable Prices',
      desc: 'We offer a premium, high-end experience crafted with luxury materials while keeping our prices honest and accessible.'
    },
    {
      icon: <Eye className="w-6 h-6 text-gold-500" />,
      title: 'Beautiful Presentation',
      desc: 'Every item is packaged in signature premium boxes with silk ribbons—as exquisite as the treats inside.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-gold-500" />,
      title: 'Friendly Customer Service',
      desc: 'Our staff and Head Pastry Chef Zoë are dedicated to ensuring your experience is delightfully sweet.'
    },
    {
      icon: <Zap className="w-6 h-6 text-gold-500" />,
      title: 'Fast Order Preparation',
      desc: 'Need a fast sweet fix? Our daily orders are prepped quickly and packaged for reliable collection or delivery.'
    },
    {
      icon: <CalendarRange className="w-6 h-6 text-gold-500" />,
      title: 'Perfect for Every Occasion',
      desc: 'From cozy quiet Sunday mornings to large grand weddings, we curate menus that elevate your special celebrations.'
    }
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-cocoa-950 text-white relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-gold-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-cocoa-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#c5a059] font-serif italic text-xl block">
            The ZB Standard
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-white leading-tight">
            Why Discerning Food Lovers Choose Us
          </h2>
          <div className="h-0.5 w-16 bg-[#c5a059] mx-auto" />
          <p className="text-sm sm:text-base text-cocoa-200/85 font-sans leading-relaxed">
            We hold ourselves to a higher standard of culinary execution, combining centuries-old artisanal baking methods with modern premium convenience.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-none bg-white/[0.02] border border-white/10 hover:border-gold-500/50 hover:bg-white/[0.05] transition-all group duration-300"
            >
              <div className="p-3 w-fit rounded-none bg-cocoa-900 border border-white/5 text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-cocoa-950 transition-all mb-4">
                {item.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-xs text-cocoa-300/80 font-sans leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
