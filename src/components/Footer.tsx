import React, { useState } from 'react';
import { Wheat, Sparkles, Instagram, Facebook, Twitter, Mail, X } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [modalText, setModalText] = useState<string | null>(null);

  return (
    <footer className="bg-cocoa-950 text-cocoa-300 border-t border-cocoa-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-cocoa-900/45">
          
          {/* Brand Info (4 columns) */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative w-9 h-9 rounded-none bg-cocoa-900 text-[#c5a059] flex items-center justify-center border border-cocoa-850">
                <Wheat className="w-4.5 h-4.5" />
                <Sparkles className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 text-[#c5a059]" />
              </div>
              <span className="font-serif text-lg tracking-widest font-black text-white">
                ZB BAKERY
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-cocoa-400 font-sans leading-relaxed">
              We are passionate about bringing families and friends together through fresh, handcrafted baked goods made with organic ingredients and meticulous attention to detail.
            </p>

            {/* Social media */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-none bg-cocoa-900 text-[#c5a059] border border-[#c5a059]/15 hover:text-white hover:bg-[#c5a059] transition-all cursor-pointer">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-none bg-cocoa-900 text-[#c5a059] border border-[#c5a059]/15 hover:text-white hover:bg-[#c5a059] transition-all cursor-pointer">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-none bg-cocoa-900 text-[#c5a059] border border-[#c5a059]/15 hover:text-white hover:bg-[#c5a059] transition-all cursor-pointer">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="mailto:hello@zbbakery.com" className="p-2 rounded-none bg-cocoa-900 text-[#c5a059] border border-[#c5a059]/15 hover:text-white hover:bg-[#c5a059] transition-all cursor-pointer">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Sitemaps 1: Products (2 columns) */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h4 className="font-serif text-[10px] font-black uppercase tracking-widest text-[#c5a059] border-b border-cocoa-900 pb-2">Products</h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans text-cocoa-400">
              <li><a href="#menu" className="hover:text-gold-300 transition-colors">Artisan Bread</a></li>
              <li><a href="#menu" className="hover:text-gold-300 transition-colors">Celebration Cakes</a></li>
              <li><a href="#menu" className="hover:text-gold-300 transition-colors">Gourmet Cupcakes</a></li>
              <li><a href="#menu" className="hover:text-gold-300 transition-colors">French Pastries</a></li>
              <li><a href="#menu" className="hover:text-gold-300 transition-colors">Macarons & Cookies</a></li>
              <li><a href="#designer" className="hover:text-gold-300 transition-colors">Custom Designer</a></li>
            </ul>
          </div>

          {/* Sitemaps 2: Navigation (2 columns) */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h4 className="font-serif text-[10px] font-black uppercase tracking-widest text-[#c5a059] border-b border-cocoa-900 pb-2">Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans text-cocoa-400">
              <li><a href="#home" className="hover:text-gold-300 transition-colors">Home Page</a></li>
              <li><a href="#story" className="hover:text-gold-300 transition-colors">Our Story</a></li>
              <li><a href="#gallery" className="hover:text-gold-300 transition-colors">Design Gallery</a></li>
              <li><a href="#why-choose-us" className="hover:text-gold-300 transition-colors">The ZB Standard</a></li>
              <li><a href="#reviews" className="hover:text-gold-300 transition-colors">Patron Reviews</a></li>
              <li><a href="#faq" className="hover:text-gold-300 transition-colors">Faqs</a></li>
            </ul>
          </div>

          {/* Sitemaps 3: Address & Contact (4 columns) */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <h4 className="font-serif text-[10px] font-black uppercase tracking-widest text-[#c5a059] border-b border-cocoa-900 pb-2">HQ Workshop</h4>
            <div className="text-xs sm:text-sm space-y-3 font-sans text-cocoa-400">
              <p className="leading-relaxed">
                42 Golden Flour Lane<br />
                Sweetwater Heights, NY 10023
              </p>
              <p className="text-cocoa-500">
                Monday – Saturday: 7:00 AM – 7:00 PM<br />
                Sunday: 8:00 AM – 4:00 PM
              </p>
              <div className="pt-2 border-t border-cocoa-900 text-[10px] text-cocoa-500">
                <p>Delivery bounds: 15-mile radius</p>
                <p className="mt-1">Free delivery for orders over $100</p>
              </div>
            </div>
          </div>

        </div>

        {/* Lower row */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-[11px] text-cocoa-500 font-sans gap-4">
          <p>© {currentYear} ZB Bakery Co. Baked fresh with love and devotion.</p>
          
          <div className="flex items-center gap-6">
            <button
              className="hover:text-gold-300 transition-colors cursor-pointer text-left border-none bg-transparent font-sans"
              onClick={() => setModalText("This premium website uses browser local storage to save your custom cake creations and shopping cart details securely. No tracking cookies are used.")}
            >
              Privacy Policy
            </button>
            <button
              className="hover:text-gold-300 transition-colors cursor-pointer text-left border-none bg-transparent font-sans"
              onClick={() => setModalText("All recipes, images, brand coordinates, and content are intellectual properties of ZB Bakery. Any custom orders configured on this site represent a simulated staging experience.")}
            >
              Terms & Conditions
            </button>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#c5a059] font-bold">Designed for Excellence</span>
          </div>
        </div>

      </div>

      {/* Modern Info Toast/Modal instead of windows alert */}
      {modalText && (
        <div className="fixed inset-0 bg-cocoa-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="max-w-md w-full bg-[#fdfbf7] p-8 border border-cocoa-950 shadow-2xl relative">
            <button
              onClick={() => setModalText(null)}
              className="absolute top-4 right-4 text-cocoa-950 hover:text-[#c5a059] transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-4">
              <span className="text-[#c5a059] font-serif italic text-lg block">ZB Bakery Coordinates</span>
              <p className="text-xs font-sans text-cocoa-900/80 leading-relaxed">
                {modalText}
              </p>
              <button
                onClick={() => setModalText(null)}
                className="w-full py-2.5 bg-cocoa-950 hover:bg-[#c5a059] text-white hover:text-cocoa-950 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer rounded-none border-none"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
