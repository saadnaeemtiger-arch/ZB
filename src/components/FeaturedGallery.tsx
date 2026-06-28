import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  desc: string;
}

interface FeaturedGalleryProps {
  galleryItems: GalleryItem[];
}

export default function FeaturedGallery({ galleryItems }: FeaturedGalleryProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = [
    { id: 'all', label: 'All Designs' },
    { id: 'Wedding Cakes', label: 'Weddings' },
    { id: 'Birthday Cakes', label: 'Birthdays' },
    { id: 'Chocolate Cakes', label: 'Chocolatiers' },
    { id: 'Fruit Cakes', label: 'Fruit Breads' },
    { id: 'Cupcake Collections', label: 'Cupcakes & Towers' },
  ];

  // Filter items
  const filteredItems = galleryItems.filter((item) => {
    return selectedFilter === 'all' || item.category === selectedFilter;
  });

  const openLightbox = (id: string) => {
    const index = galleryItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextSlide = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
    }
  };

  const prevSlide = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-[#c5a059] font-serif italic text-xl block">
            High-End Design Showcase
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-cocoa-950 leading-tight">
            Featured Celebration Cakes Gallery
          </h2>
          <div className="h-0.5 w-16 bg-[#c5a059] mx-auto" />
          <p className="text-sm sm:text-base text-cocoa-900/70 font-sans leading-relaxed">
            Feast your eyes on some of our finest artistic baking achievements, hand-painted and sculpted daily in our workshop.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 overflow-x-auto pb-4 scrollbar-none">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2.5 rounded-none text-xs font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
                selectedFilter === filter.id
                  ? 'bg-cocoa-950 text-[#c5a059] border border-cocoa-950'
                  : 'bg-white text-cocoa-950 hover:bg-amber-100/30 border border-cocoa-950/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item.id)}
              className="group bg-white rounded-none border border-cocoa-950/10 shadow-sm hover:shadow-xl hover:border-gold-500/50 overflow-hidden cursor-pointer relative transition-all duration-300"
            >
              <div className="relative h-80 bg-cocoa-100 overflow-hidden rounded-none">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 rounded-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Elegant overlay on hover */}
                <div className="absolute inset-0 bg-cocoa-950/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 rounded-none" />

                {/* Always-visible category label */}
                <span className="absolute top-4 left-4 bg-cocoa-950 text-gold-300 px-3 py-1 font-mono uppercase text-[9px] tracking-widest border-none rounded-none">
                  {item.category}
                </span>

                {/* Pop-up detail content */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 space-y-2">
                  <span className="text-[9px] font-mono tracking-wider text-gold-400 flex items-center gap-1 uppercase font-bold">
                    <Sparkles className="w-3 h-3 animate-spin" />
                    CHEF ORIGINAL
                  </span>
                  <h4 className="font-serif text-xl font-bold text-white leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-cocoa-200 font-sans leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-gold-300 font-bold pt-2">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Showcase</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-cocoa-950/95 backdrop-blur-md flex items-center justify-center p-4">
          
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-none bg-white/10 hover:bg-white/20 text-white hover:scale-105 transition-all z-10 cursor-pointer"
            title="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-6 p-3 rounded-none bg-white/10 hover:bg-white/20 text-white hover:scale-105 transition-all cursor-pointer hidden sm:block"
            title="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-6 p-3 rounded-none bg-white/10 hover:bg-white/20 text-white hover:scale-105 transition-all cursor-pointer hidden sm:block"
            title="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Interactive Slide Panel */}
          <div className="relative max-w-4xl w-full flex flex-col md:flex-row bg-white rounded-none overflow-hidden shadow-2xl border border-cocoa-950 animate-zoom-in">
            
            {/* Visual Screen */}
            <div className="md:w-3/5 h-[400px] md:h-[500px] bg-cocoa-950 relative">
              <img
                src={galleryItems[lightboxIndex].image}
                alt={galleryItems[lightboxIndex].title}
                className="w-full h-full object-cover object-center rounded-none"
                referrerPolicy="no-referrer"
              />
              {/* Overlay for small screens navigation */}
              <div className="absolute inset-x-0 bottom-4 flex justify-center gap-4 sm:hidden">
                <button onClick={prevSlide} className="p-2 rounded-none bg-cocoa-900/80 text-white">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextSlide} className="p-2 rounded-none bg-cocoa-900/80 text-white">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Info Screen */}
            <div className="p-8 md:w-2/5 flex flex-col justify-between bg-white text-cocoa-950 space-y-6 relative">
              <div className="space-y-4">
                <span className="px-2.5 py-1 bg-[#fbf5e6] text-[#c5a059] rounded-none text-[10px] font-mono font-bold uppercase tracking-wider block w-fit border border-[#c5a059]/10">
                  {galleryItems[lightboxIndex].category}
                </span>
                <h3 className="font-serif text-2xl font-black leading-tight text-cocoa-950">
                  {galleryItems[lightboxIndex].title}
                </h3>
                <div className="h-0.5 w-12 bg-[#c5a059]" />
                <p className="text-xs text-cocoa-900/70 leading-relaxed font-sans">
                  {galleryItems[lightboxIndex].desc}
                </p>
              </div>

              <div className="pt-6 border-t border-cocoa-950/10 space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-mono text-cocoa-950/50 font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#c5a059]" />
                  <span>Custom cake builds from $45.00</span>
                </div>
                <a
                  href="#designer"
                  onClick={closeLightbox}
                  className="block w-full py-3.5 bg-[#c5a059] text-[#fdfbf7] text-center font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer rounded-none hover:bg-cocoa-950"
                >
                  Configure My Dream Cake
                </a>
              </div>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}
