import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquareText } from 'lucide-react';

// Data imports
import { PRODUCTS, INITIAL_REVIEWS, GALLERY_ITEMS, FAQS, IMAGES } from './data';
import { Product, Review, CartItem } from './types';

// Component imports
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import WhyChooseUs from './components/WhyChooseUs';
import MenuSection from './components/MenuSection';
import CakeConfigurator from './components/CakeConfigurator';
import FeaturedGallery from './components/FeaturedGallery';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ChefChatbot from './components/ChefChatbot';

export default function App() {
  // Shopping Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Review State
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // Chatbot State
  const [chefOpen, setChefOpen] = useState(false);

  // Active section for navbar scroll highlight
  const [activeSection, setActiveSection] = useState('home');

  // Load cart from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('zb_bakery_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading saved cart:', e);
      }
    }
  }, []);

  // Save cart to LocalStorage on change
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('zb_bakery_cart', JSON.stringify(newCart));
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity: number, customizations?: any) => {
    const newCart = [...cart];
    
    // Check if identical item (same product and same customization) already exists
    const existingIndex = newCart.findIndex((item) => {
      const matchProduct = item.product.id === product.id;
      const matchCustom = JSON.stringify(item.product.customizations) === JSON.stringify(customizations);
      return matchProduct && matchCustom;
    });

    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({
        product: {
          ...product,
          customizations: customizations // Attach customizations directly to the scoped product info
        },
        quantity,
      });
    }

    saveCart(newCart);
  };

  const handleAddCustomCakeToCart = (customCakeProduct: any) => {
    const newCart = [...cart];
    // Custom cakes are unique due to detailed configurations
    newCart.push({
      product: customCakeProduct,
      quantity: 1,
      customizations: customCakeProduct.customizations
    });
    saveCart(newCart);
  };

  const handleUpdateCartQty = (index: number, quantity: number) => {
    const newCart = [...cart];
    if (quantity <= 0) {
      newCart.splice(index, 1);
    } else {
      newCart[index].quantity = quantity;
    }
    saveCart(newCart);
  };

  const handleRemoveCartItem = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    saveCart(newCart);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // Review Handlers
  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  // Scroll section highlight detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'story', 'menu', 'designer', 'gallery', 'reviews', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div id="app-root-container" className="min-h-screen bg-cocoa-50 text-cocoa-900 font-sans selection:bg-gold-200 selection:text-cocoa-900">
      
      {/* Premium Sticky Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenChef={() => setChefOpen(true)}
        activeSection={activeSection}
      />

      {/* Hero Entrance Banner */}
      <HeroSection heroImage={IMAGES.hero} />

      {/* Our Heritage Story */}
      <AboutUs aboutImage={IMAGES.artisanBread} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Core Product Menu */}
      <MenuSection
        products={PRODUCTS}
        onAddToCart={handleAddToCart}
      />

      {/* Custom Cake Designer */}
      <CakeConfigurator onAddCustomCakeToCart={handleAddCustomCakeToCart} />

      {/* Luxury Celebration Cake Showcase */}
      <FeaturedGallery galleryItems={GALLERY_ITEMS} />

      {/* Customer Reviews & Form */}
      <ReviewsSection
        reviews={reviews}
        onAddReview={handleAddReview}
      />

      {/* Accordion FAQ Grid */}
      <FAQSection faqs={FAQS} />

      {/* Location Map, Form & WhatsApp */}
      <ContactSection />

      {/* Footer Branding & Policies */}
      <Footer />

      {/* Shopping Cart Drawer overlay */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Interactive AI Pastry Chef chat assistant */}
      <ChefChatbot
        isOpen={chefOpen}
        onClose={() => setChefOpen(false)}
      />

      {/* Quick Floating Chat Launcher (Visible when Chat closed) */}
      {!chefOpen && (
        <button
          id="floating-chat-trigger-bubble"
          onClick={() => setChefOpen(true)}
          className="fixed bottom-6 right-6 z-35 p-4 rounded-none bg-cocoa-950 text-[#c5a059] hover:text-white hover:bg-[#c5a059]/90 transition-all shadow-2xl flex items-center justify-center border border-[#c5a059] cursor-pointer"
          title="Consult Chef Zoë"
        >
          <MessageSquareText className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-rose-600 w-3.5 h-3.5 rounded-none flex items-center justify-center text-[8px] font-bold text-white animate-pulse">
            1
          </span>
        </button>
      )}

    </div>
  );
}
