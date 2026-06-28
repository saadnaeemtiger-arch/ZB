import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageSquareText, Menu, X, Wheat, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenChef: () => void;
  activeSection: string;
}

export default function Navbar({ cartCount, onOpenCart, onOpenChef, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Our Story', href: '#story' },
    { label: 'Menu', href: '#menu' },
    { label: 'Cake Designer', href: '#designer' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-cocoa-50/95 backdrop-blur-md shadow-md border-b border-cocoa-100 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a id="nav-logo" href="#home" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-none bg-[#c5a059] text-white flex items-center justify-center font-serif italic text-lg font-bold shadow-sm transition-transform group-hover:scale-105">
              ZB
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
            <div>
              <span className="font-serif text-lg tracking-tight font-black uppercase text-cocoa-950 block">
                ZB Bakery
              </span>
              <p className="text-[9px] font-mono tracking-widest text-[#c5a059] -mt-1 uppercase font-bold">
                EST. 2024 — SWEETWATER
              </p>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                id={`nav-link-${item.label.toLowerCase()}`}
                key={item.label}
                href={item.href}
                className={`font-mono text-xs font-bold uppercase tracking-widest transition-colors relative py-1.5 ${
                  activeSection === item.href.substring(1)
                    ? 'text-[#c5a059]'
                    : 'text-cocoa-950/70 hover:text-[#c5a059]'
                }`}
              >
                {item.label}
                {activeSection === item.href.substring(1) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c5a059]" />
                )}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* AI Assistant Button */}
            <button
              id="chef-chatbot-trigger"
              onClick={onOpenChef}
              className="flex items-center gap-2 px-4 py-2.5 rounded-none bg-cocoa-900 text-gold-300 hover:bg-cocoa-950 border border-gold-500/20 text-xs font-bold uppercase tracking-widest transition-all shadow-sm cursor-pointer"
              title="Chat with Chef Zoë"
            >
              <MessageSquareText className="w-4 h-4 animate-bounce shrink-0" />
              <span className="hidden sm:inline">Chef Zoë</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
              </span>
            </button>

            {/* Cart Button */}
            <button
              id="navbar-cart-button"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-none bg-cocoa-950 text-gold-300 hover:bg-cocoa-900 transition-all shadow-md hover:scale-105 cursor-pointer"
              title="Open Order Basket"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#c5a059] text-cocoa-950 font-mono text-[10px] font-bold w-5 h-5 rounded-none flex items-center justify-center border border-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-cocoa-750 hover:bg-cocoa-100 hover:text-cocoa-900 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-nav" className="lg:hidden bg-cocoa-50/98 backdrop-blur-lg border-t border-cocoa-100 shadow-xl transition-all duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <a
                id={`mobile-nav-link-${item.label.toLowerCase()}`}
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                  activeSection === item.href.substring(1)
                    ? 'bg-amber-100 text-gold-700 font-semibold'
                    : 'text-cocoa-700 hover:bg-cocoa-100 hover:text-gold-600'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
