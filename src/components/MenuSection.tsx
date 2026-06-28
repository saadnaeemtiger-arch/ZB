import React, { useState } from 'react';
import { Search, ShoppingCart, Star, Plus, Eye, Check, X, Shield, Clock } from 'lucide-react';
import { Product } from '../types';

interface MenuSectionProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number, customizations?: any) => void;
}

export default function MenuSection({ products, onAddToCart }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Customization state for the modal
  const [modalQty, setModalQty] = useState<number>(1);
  const [modalCustomNotes, setModalCustomNotes] = useState<string>('');
  const [addedMessage, setAddedMessage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Treats' },
    { id: 'bread', label: 'Artisan Bread' },
    { id: 'cakes', label: 'Celebration Cakes' },
    { id: 'pastries', label: 'Pastries & Muffins' },
    { id: 'cookies', label: 'Brownies & Cookies' },
    { id: 'desserts', label: 'Desserts & Cheesecakes' },
  ];

  // Filtering products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalQty(1);
    setModalCustomNotes('');
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
  };

  const handleModalAdd = () => {
    if (selectedProduct) {
      onAddToCart(selectedProduct, modalQty, modalCustomNotes ? { notes: modalCustomNotes } : undefined);
      
      // Trigger mini feedback
      setAddedMessage(`Added ${modalQty}x ${selectedProduct.name} to order basket!`);
      setTimeout(() => setAddedMessage(null), 3000);
      handleCloseProduct();
    }
  };

  const handleDirectAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    
    // Trigger quick floating notification
    setAddedMessage(`Added ${product.name} to order basket!`);
    setTimeout(() => setAddedMessage(null), 3000);
  };

  return (
    <section id="menu" className="py-24 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-[#c5a059] font-serif italic text-xl block">
            Pure Baked Perfection
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-cocoa-950 leading-tight">
            Explore Our Sweet & Savory Menu
          </h2>
          <div className="h-0.5 w-16 bg-[#c5a059] mx-auto" />
          <p className="text-sm sm:text-base text-cocoa-900/70 font-sans leading-relaxed">
            Every loaf, cake, pastry, and dessert is handcrafted from scratch by Chef Zoë and her dedicated team of bakers, using the finest local organic ingredients.
          </p>
        </div>

        {/* Temporary floating success alert */}
        {addedMessage && (
          <div className="fixed bottom-6 right-6 z-50 px-6 py-4 rounded-none bg-cocoa-950 text-gold-300 border border-gold-500/20 flex items-center gap-3 shadow-2xl animate-fade-in-up">
            <div className="w-6 h-6 rounded-none bg-gold-500/10 text-gold-400 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <span className="font-sans text-xs uppercase tracking-wider font-bold">{addedMessage}</span>
          </div>
        )}

        {/* Control bar: Tabs + Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 mb-12 border-b border-cocoa-950/10 pb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 lg:pb-0 scrollbar-none max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-none text-xs font-mono font-bold uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-cocoa-950 text-[#c5a059] border border-cocoa-950'
                    : 'bg-white text-cocoa-950 hover:bg-amber-100/30 border border-cocoa-950/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search croissants, sourdough, cakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-none border border-cocoa-950/10 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-gold-500 text-cocoa-950 placeholder-cocoa-950/40"
            />
            <Search className="w-4 h-4 text-cocoa-950/40 absolute left-3.5 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-cocoa-400 hover:text-cocoa-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-none border border-cocoa-950/10 max-w-md mx-auto">
            <p className="text-cocoa-500 font-sans text-xs uppercase tracking-wider font-bold mb-2">No baked goods match your search.</p>
            <p className="text-cocoa-400 text-xs font-mono">Try searching for other keywords like "sourdough" or "cake".</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => handleOpenProduct(p)}
                className="group bg-white rounded-none border border-cocoa-950/10 shadow-sm hover:shadow-xl hover:border-gold-500/50 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
              >
                {/* Visual Cover */}
                <div className="relative h-56 bg-cocoa-100 overflow-hidden rounded-none">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-cocoa-950 text-[#c5a059] px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-widest">
                    {p.category === 'bread' ? 'Bread' : p.category === 'cakes' ? 'Cake' : 'Treat'}
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute bottom-3 right-3 bg-white px-2.5 py-1 flex items-center gap-1 shadow-sm text-xs font-bold text-cocoa-950 border border-cocoa-950/10 rounded-none">
                    <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                    <span>{p.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-cocoa-950 group-hover:text-[#c5a059] transition-colors leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-xs text-cocoa-900/60 line-clamp-2 font-sans leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  {/* Highlights/Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.features.slice(0, 2).map((feat, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-none bg-[#fbf5e6] text-[10px] font-mono font-bold text-[#c5a059] border border-[#c5a059]/10">
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Price and Cart Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-cocoa-950/10">
                    <span className="font-serif text-lg font-black tracking-tight text-cocoa-950">
                      ${p.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleOpenProduct(p); }}
                        className="p-2.5 rounded-none bg-amber-50 text-cocoa-950 hover:bg-amber-100 transition-colors border border-cocoa-950/10 cursor-pointer"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDirectAdd(p, e)}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-none bg-cocoa-900 hover:bg-cocoa-950 text-gold-300 font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer border border-cocoa-900"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-cocoa-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white rounded-none max-w-2xl w-full overflow-hidden shadow-2xl border border-cocoa-950 flex flex-col md:flex-row">
            
            {/* Left Col: Image */}
            <div className="md:w-1/2 relative h-64 md:h-auto bg-cocoa-100">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover rounded-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950/40 to-transparent" />
            </div>

            {/* Right Col: Details */}
            <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-6 relative">
              {/* Close Button */}
              <button
                onClick={handleCloseProduct}
                className="absolute top-4 right-4 p-1.5 rounded-none bg-white text-cocoa-950 hover:bg-amber-50 hover:text-cocoa-950 transition-all shadow-sm z-10 border border-cocoa-950/20 cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="space-y-4">
                {/* Category & Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase font-bold">
                    — {selectedProduct.category} —
                  </span>
                  <div className="flex items-center gap-1 bg-[#fbf5e6] text-[#c5a059] px-2.5 py-1 border border-[#c5a059]/20 rounded-none text-[10px] font-bold font-mono">
                    <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                    <span>{selectedProduct.rating.toFixed(1)} / 5.0</span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-serif text-2xl font-black text-cocoa-950 leading-tight">
                  {selectedProduct.name}
                </h3>

                {/* Price */}
                <p className="font-serif text-2xl font-black text-[#c5a059]">
                  ${selectedProduct.price.toFixed(2)}
                </p>

                {/* Description */}
                <p className="text-xs text-cocoa-900/70 font-sans leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Highlights list */}
                <div className="space-y-2">
                  <p className="text-[10px] font-mono text-cocoa-950/40 font-bold uppercase tracking-wider">Product Features:</p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {selectedProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-cocoa-900/80 font-sans">
                        <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom note option */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-cocoa-950/40 font-bold uppercase tracking-wider block">
                    Special requests (e.g. slicing, writing):
                  </label>
                  <input
                    type="text"
                    placeholder="E.g., Slice sourdough / write Happy Bday!"
                    value={modalCustomNotes}
                    onChange={(e) => setModalCustomNotes(e.target.value)}
                    className="w-full text-xs p-2.5 bg-cocoa-50 border border-cocoa-950/10 rounded-none text-cocoa-950 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
              </div>

              {/* Action bar */}
              <div className="pt-4 border-t border-cocoa-950/10 flex items-center justify-between gap-4">
                {/* Qty controller */}
                <div className="flex items-center border border-cocoa-950/15 rounded-none overflow-hidden bg-cocoa-50">
                  <button
                    onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                    className="px-3 py-1.5 hover:bg-cocoa-100 text-cocoa-950 font-sans font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 font-mono font-bold text-cocoa-950 text-xs">{modalQty}</span>
                  <button
                    onClick={() => setModalQty(modalQty + 1)}
                    className="px-3 py-1.5 hover:bg-cocoa-100 text-cocoa-950 font-sans font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add trigger */}
                <button
                  onClick={handleModalAdd}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#c5a059] hover:bg-cocoa-950 hover:text-white text-cocoa-950 font-mono text-xs font-bold uppercase tracking-widest transition-all rounded-none cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Order</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
