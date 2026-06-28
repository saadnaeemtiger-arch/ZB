import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQSectionProps {
  faqs: FAQItem[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>('faq-1'); // default first open
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All FAQs' },
    { id: 'Orders & Custom Cakes', label: 'Orders & Customs' },
    { id: 'Delivery', label: 'Delivery Services' },
    { id: 'Ingredients', label: 'Quality & Ingredients' },
  ];

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = faqs.filter((faq) => {
    return activeCategory === 'all' || faq.category === activeCategory;
  });

  return (
    <section id="faq" className="py-24 bg-[#fdfbf7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-[#c5a059] font-serif italic text-xl block">
            Frequent Enquiries
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-cocoa-950 leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="h-0.5 w-16 bg-[#c5a059] mx-auto" />
          <p className="text-sm sm:text-base text-cocoa-900/70 font-sans leading-relaxed">
            Everything you need to know about custom celebration cakes, sourdough freshness, allergen precautions, and local neighborhood deliveries.
          </p>
        </div>

        {/* Category filtering pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                // Auto open the first item in the new category
                const matches = faqs.filter(f => cat.id === 'all' || f.category === cat.id);
                if (matches.length > 0) setOpenId(matches[0].id);
              }}
              className={`px-4 py-2.5 rounded-none text-xs font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cocoa-950 text-[#c5a059] border border-cocoa-950'
                  : 'bg-white text-cocoa-950 hover:bg-amber-100/30 border border-cocoa-950/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-none border border-cocoa-950/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Trigger */}
                <button
                  onClick={() => handleToggle(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-cocoa-50/50 cursor-pointer"
                >
                  <div className="flex items-start gap-3.5 pr-4">
                    <HelpCircle className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                    <span className="font-serif text-sm sm:text-base font-bold text-cocoa-950 leading-tight">
                      {faq.question}
                    </span>
                  </div>
                  <div className="p-1 rounded-none bg-cocoa-100/50 text-cocoa-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Collapsible Content */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-60 border-t border-cocoa-950/10' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 bg-[#fbf5e6]/30 text-xs sm:text-sm text-cocoa-900/80 font-sans leading-relaxed">
                    <p>{faq.answer}</p>
                    <div className="mt-3 flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-[#c5a059]">
                      <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>Category: {faq.category}</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
