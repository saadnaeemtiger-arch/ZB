import React, { useState } from 'react';
import { Sparkles, CalendarDays, Plus, Check, Cake, Wheat, Smile } from 'lucide-react';
import { Product } from '../types';

interface CakeConfiguratorProps {
  onAddCustomCakeToCart: (customCake: any) => void;
}

export default function CakeConfigurator({ onAddCustomCakeToCart }: CakeConfiguratorProps) {
  // Option lists
  const sizes = [
    { id: '6inch', label: '6-Inch Single Tier', desc: 'Feeds 8-10 guests', price: 45.00, tiers: 1, scale: 'scale-75' },
    { id: '8inch', label: '8-Inch Single Tier', desc: 'Feeds 12-16 guests', price: 60.00, tiers: 1, scale: 'scale-90' },
    { id: '10inch', label: '10-Inch Single Tier', desc: 'Feeds 20-25 guests', price: 80.00, tiers: 1, scale: 'scale-100' },
    { id: '2tier', label: 'Classic 2-Tier Master', desc: 'Feeds 35-40 guests', price: 130.00, tiers: 2, scale: 'scale-100' },
  ];

  const flavors = [
    { id: 'vanilla', label: 'Madagascar Vanilla Sponge', desc: 'Spotted with real vanilla bean caviar', color: 'bg-[#fbf7eb]', border: 'border-[#eae2cc]' },
    { id: 'chocolate', label: 'Belgian Cocoa Sponge', desc: 'Rich, moist and deeply chocolatier', color: 'bg-[#4d2d18]', border: 'border-[#3c2013]' },
    { id: 'redvelvet', label: 'Signature Red Velvet', desc: 'Classic buttermilk with velvet crumb', color: 'bg-[#800d1d]', border: 'border-[#5f0f1a]' },
    { id: 'lemon', label: 'Zesty Lavender Lemon', desc: 'Vibrant citrus zest infused sponge', color: 'bg-[#fef9c3]', border: 'border-[#fef08a]' },
    { id: 'caramel', label: 'Buttery Salted Caramel', desc: 'Rich toasted brown sugar sponge', color: 'bg-[#dfba88]', border: 'border-[#c69a62]' },
  ];

  const frostings = [
    { id: 'creamcheese', label: 'Whipped Cream Cheese', desc: 'Tangy and cloud-like', color: 'bg-[#faf9f6]', text: 'Creamy White' },
    { id: 'buttercream', label: 'Swiss Meringue Buttercream', desc: 'Silky smooth, high butter grade', color: 'bg-[#fefce8]', text: 'Custard Yellow' },
    { id: 'ganache', label: 'Dark Ganache Glaze', desc: 'Glossy Belgian chocolate finish', color: 'bg-[#2b170c]', text: 'Espresso Cocoa' },
    { id: 'fondant', label: 'Satin Rolled Gold Fondant', desc: 'Elegant and tailored smooth look', color: 'bg-[#f5e6c4]', text: 'Soft Champagne' },
  ];

  const fillings = [
    { id: 'raspberry', label: 'Artisan Raspberry Compote', price: 4.00 },
    { id: 'pearls', label: 'Chocolate Crispy Caviar Pearls', price: 5.00 },
    { id: 'strawberries', label: 'Organic Sliced Strawberries', price: 4.50 },
    { id: 'goldflakes', label: 'Floating 24k Gold Flakes', price: 10.00 },
  ];

  // Configurator state
  const [selectedSize, setSelectedSize] = useState(sizes[1]); // 8 inch default
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]);
  const [selectedFrosting, setSelectedFrosting] = useState(frostings[0]);
  const [selectedFillings, setSelectedFillings] = useState<any[]>([]);
  const [inscription, setInscription] = useState('');
  const [chefNotes, setChefNotes] = useState('');
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Price calculation
  const fillingsTotal = selectedFillings.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = selectedSize.price + fillingsTotal;

  const toggleFilling = (filling: any) => {
    if (selectedFillings.some((f) => f.id === filling.id)) {
      setSelectedFillings(selectedFillings.filter((f) => f.id !== filling.id));
    } else {
      setSelectedFillings([...selectedFillings, filling]);
    }
  };

  const handleCreateAndAdd = () => {
    const customCakeObj = {
      id: `custom-cake-${Date.now()}`,
      name: `Custom ${selectedSize.label}`,
      category: 'cakes',
      price: totalPrice,
      description: `Bespoke cake featuring ${selectedFlavor.label} layered with ${selectedFrosting.label}. Custom details: "${inscription || 'No message'}"`,
      image: '/src/assets/images/custom_cakes_1782637494012.jpg',
      rating: 5.0,
      features: [
        `Size: ${selectedSize.label}`,
        `Sponge: ${selectedFlavor.label}`,
        `Frosting: ${selectedFrosting.label}`,
        ...(selectedFillings.map(f => f.label))
      ],
      customizations: {
        size: selectedSize.label,
        flavor: selectedFlavor.label,
        frosting: selectedFrosting.label,
        text: inscription,
        instructions: chefNotes
      }
    };

    onAddCustomCakeToCart(customCakeObj);
    
    // Animate Success
    setSuccessAnimation(true);
    setTimeout(() => {
      setSuccessAnimation(false);
      setInscription('');
      setChefNotes('');
      setSelectedFillings([]);
    }, 4000);
  };

  return (
    <section id="designer" className="py-24 bg-[#fdfbf7] relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute top-24 -right-16 w-80 h-80 rounded-full bg-gold-400/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-24 -left-16 w-80 h-80 rounded-full bg-cocoa-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#c5a059] font-serif italic text-xl block">
            Interactive Atelier
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-cocoa-950 leading-tight">
            Design Your Custom Celebration Cake
          </h2>
          <div className="h-0.5 w-16 bg-[#c5a059] mx-auto" />
          <p className="text-sm sm:text-base text-cocoa-900/70 font-sans leading-relaxed">
            Experience our instant Cake Builder. Select your sizes, gourmet sponge flavors, fillings, and luxury frosting textures. See your customized masterpiece change in real time!
          </p>
        </div>

        {/* Builder Workdesk */}
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Block: The Interactive Virtual Visualizer (5 columns) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-between bg-white rounded-none border border-cocoa-950/10 p-8 relative min-h-[450px]">
            {/* Title / Price Banner */}
            <div className="w-full flex items-center justify-between border-b border-cocoa-950/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a059] font-bold block">LIVE ESTIMATOR</span>
                <span className="font-serif text-lg font-bold text-cocoa-950">Your Edible Art</span>
              </div>
              <div className="text-right">
                <span className="font-serif text-2xl font-black text-[#c5a059]">${totalPrice.toFixed(2)}</span>
                <p className="text-[10px] text-cocoa-950/40 font-mono font-bold">Tax & setup included</p>
              </div>
            </div>

            {/* Virtual Canvas */}
            <div className="my-10 relative flex flex-col items-center justify-center w-full h-64">
              
              {/* Dynamic 3D-styled Visual Cake */}
              <div className={`transition-all duration-500 transform ${selectedSize.scale} flex flex-col items-center justify-center relative`}>
                
                {/* Floating Gold flakes if selected */}
                {selectedFillings.some(f => f.id === 'goldflakes') && (
                  <div className="absolute inset-x-0 -top-12 z-20 pointer-events-none">
                    <div className="flex justify-center gap-4 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-gold-400 shadow-md transform rotate-45" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-300 transform translate-y-3" />
                      <span className="w-2 h-2 rounded-full bg-gold-500 transform -translate-y-4" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 transform translate-x-2" />
                    </div>
                  </div>
                )}

                {/* Cake Tier 2 (Top Tier) - Only if 2-tier selected */}
                {selectedSize.tiers === 2 && (
                  <div className="relative z-10 w-28 h-18 rounded-none shadow-md flex items-center justify-center -mb-2 border-b-4 border-black/10">
                    {/* Inner sponge color under frosting */}
                    <div className={`absolute inset-1 rounded-none opacity-30 ${selectedFlavor.color}`} />
                    {/* Main frosting coating */}
                    <div className={`absolute inset-0 rounded-none border-2 border-cocoa-100/30 ${selectedFrosting.color}`} />
                    
                    {/* Filling Strip */}
                    <div className="absolute bottom-2 inset-x-2 h-2 bg-pink-500/80 rounded-none flex items-center justify-center overflow-hidden">
                      {selectedFillings.map((f, i) => (
                        <div key={i} className={`w-full h-full ${f.id === 'raspberry' ? 'bg-rose-600' : f.id === 'strawberries' ? 'bg-red-500' : f.id === 'pearls' ? 'bg-amber-900' : 'bg-gold-500'}`} />
                      ))}
                    </div>

                    <Cake className="w-5 h-5 text-cocoa-900/10 absolute top-2" />
                  </div>
                )}

                {/* Cake Tier 1 (Base Tier) */}
                <div className="relative w-40 h-22 rounded-none shadow-lg flex items-center justify-center border-b-6 border-black/15">
                  {/* Inner sponge flavor layer peek */}
                  <div className={`absolute inset-1 rounded-none opacity-35 ${selectedFlavor.color}`} />
                  {/* Main frosting layer */}
                  <div className={`absolute inset-0 rounded-none border-3 border-cocoa-100/30 ${selectedFrosting.color}`} />

                  {/* Inscription Preview */}
                  {inscription && (
                    <div className="absolute inset-x-4 top-4 z-10 text-center">
                      <span className="font-serif italic text-[11px] font-bold text-rose-700/80 tracking-wide select-none bg-white/20 px-2 py-0.5 rounded-none backdrop-blur-xs break-all">
                        "{inscription}"
                      </span>
                    </div>
                  )}

                  {/* Filling Layer visual representation */}
                  {selectedFillings.length > 0 && (
                    <div className="absolute bottom-3 inset-x-3 h-2.5 rounded-none flex gap-0.5 overflow-hidden">
                      {selectedFillings.map((f, i) => (
                        <div
                          key={i}
                          title={f.label}
                          className={`flex-1 h-full shadow-inner ${
                            f.id === 'raspberry' ? 'bg-rose-600' : 
                            f.id === 'strawberries' ? 'bg-red-500' : 
                            f.id === 'pearls' ? 'bg-amber-950' : 'bg-gold-400'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Cake Plate Stand */}
                  <div className="absolute bottom-0 translate-y-full w-48 h-3.5 bg-cocoa-200 rounded-none border-t-2 border-white/60 shadow-md" />
                  <div className="absolute bottom-0 translate-y-4.5 w-20 h-4 bg-cocoa-300 rounded-none shadow-md" />
                </div>

              </div>

            </div>

            {/* Quick spec cards */}
            <div className="w-full text-xs font-mono bg-[#fbf5e6]/50 rounded-none p-4 border border-cocoa-950/10 space-y-2">
              <div className="flex justify-between">
                <span className="text-cocoa-950/40 font-bold uppercase tracking-wider text-[10px]">Size & Form:</span>
                <span className="text-cocoa-950 font-bold uppercase">{selectedSize.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cocoa-950/40 font-bold uppercase tracking-wider text-[10px]">Sponge Base:</span>
                <span className="text-cocoa-950 font-bold">{selectedFlavor.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cocoa-950/40 font-bold uppercase tracking-wider text-[10px]">Coating Cover:</span>
                <span className="text-cocoa-950 font-bold">{selectedFrosting.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cocoa-950/40 font-bold uppercase tracking-wider text-[10px]">Fillings:</span>
                <span className="text-cocoa-950 font-bold text-right leading-tight max-w-[60%] truncate">
                  {selectedFillings.length > 0 ? selectedFillings.map(f => f.label.replace('Artisan ', '').replace('Organic ', '').replace('Floating ', '')).join(', ') : 'None'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Block: Selection Panels (7 columns) */}
          <div className="lg:col-span-7 bg-white rounded-none border border-cocoa-950/10 p-6 sm:p-8 shadow-sm space-y-8 overflow-y-auto max-h-[850px] scrollbar-thin">
            
            {/* Step 1: Size Selection */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-cocoa-950 flex items-center gap-3">
                <span className="w-6 h-6 bg-[#c5a059] text-cocoa-950 font-serif text-xs flex items-center justify-center font-bold">1</span>
                <span>Select Sponge Diameter & Tiers</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSize(s)}
                    className={`p-4 rounded-none text-left border transition-all cursor-pointer ${
                      selectedSize.id === s.id
                        ? 'border-[#c5a059] bg-[#fbf5e6]/50 ring-0'
                        : 'border-cocoa-950/10 hover:border-cocoa-400 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-cocoa-900">{s.label}</span>
                      <span className="text-xs font-mono font-bold text-[#c5a059]">${s.price.toFixed(2)}</span>
                    </div>
                    <p className="text-[11px] text-cocoa-900/60 font-sans mt-1">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Sponge Flavor */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-cocoa-950 flex items-center gap-3">
                <span className="w-6 h-6 bg-[#c5a059] text-cocoa-950 font-serif text-xs flex items-center justify-center font-bold">2</span>
                <span>Gourmet Sponge Flavors</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {flavors.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFlavor(f)}
                    className={`p-4 rounded-none text-left border transition-all flex items-start gap-3 cursor-pointer ${
                      selectedFlavor.id === f.id
                        ? 'border-[#c5a059] bg-[#fbf5e6]/50 ring-0'
                        : 'border-cocoa-950/10 hover:border-cocoa-400 bg-white'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-none border shadow-inner shrink-0 ${f.color} ${f.border}`} />
                    <div>
                      <span className="font-serif font-bold text-sm text-cocoa-900 block">{f.label}</span>
                      <span className="text-xs text-cocoa-900/60 font-sans mt-0.5 block leading-tight">{f.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Coating Frosting */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-cocoa-950 flex items-center gap-3">
                <span className="w-6 h-6 bg-[#c5a059] text-cocoa-950 font-serif text-xs flex items-center justify-center font-bold">3</span>
                <span>Luxurious Frosting Coating</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {frostings.map((fr) => (
                  <button
                    key={fr.id}
                    onClick={() => setSelectedFrosting(fr)}
                    className={`p-4 rounded-none text-left border transition-all flex items-start gap-3 cursor-pointer ${
                      selectedFrosting.id === fr.id
                        ? 'border-[#c5a059] bg-[#fbf5e6]/50 ring-0'
                        : 'border-cocoa-950/10 hover:border-cocoa-400 bg-white'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-none border shadow-xs shrink-0 ${fr.color} border-cocoa-200`} />
                    <div>
                      <span className="font-serif font-bold text-sm text-cocoa-900 block">{fr.label}</span>
                      <span className="text-xs text-cocoa-900/60 font-sans mt-0.5 block leading-tight">{fr.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Premium Fillings & Garnish */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-cocoa-950 flex items-center gap-3">
                <span className="w-6 h-6 bg-[#c5a059] text-cocoa-950 font-serif text-xs flex items-center justify-center font-bold">4</span>
                <span>Select Extra Fillings & Garnish</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {fillings.map((fill) => {
                  const isSelected = selectedFillings.some((f) => f.id === fill.id);
                  return (
                    <button
                      key={fill.id}
                      onClick={() => toggleFilling(fill)}
                      className={`p-4 rounded-none text-left border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[#c5a059] bg-[#fbf5e6]/50 ring-0'
                          : 'border-cocoa-950/10 hover:border-cocoa-400 bg-white'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="font-serif font-bold text-sm text-cocoa-900 block">{fill.label}</span>
                        <span className="text-xs text-[#c5a059] font-mono font-bold">+${fill.price.toFixed(2)}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-none border flex items-center justify-center shrink-0 transition-all ${
                        isSelected ? 'bg-[#c5a059] border-[#c5a059] text-cocoa-950' : 'border-cocoa-300'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cocoa-950 font-bold" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: custom writing & chef instructions */}
            <div className="space-y-4 pt-6 border-t border-cocoa-950/10">
              <div className="space-y-1.5">
                <label className="text-xs font-bold font-mono uppercase tracking-wider text-cocoa-950 flex items-center gap-1.5">
                  <span>Inscription Message on Cake</span>
                  <span className="text-[9px] text-cocoa-950/40 font-mono font-normal tracking-normal lowercase">(Max 40 chars)</span>
                </label>
                <input
                  type="text"
                  maxLength={40}
                  placeholder="Leave blank if no text is requested"
                  value={inscription}
                  onChange={(e) => setInscription(e.target.value)}
                  className="w-full text-xs p-3 border border-cocoa-950/10 rounded-none text-cocoa-950 focus:outline-none focus:ring-1 focus:ring-gold-500 placeholder-cocoa-950/30 font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold font-mono uppercase tracking-wider text-cocoa-950 block">
                  Special requests or decoration ideas for Chef Zoë:
                </label>
                <textarea
                  rows={2}
                  placeholder="Specify any dietary requests or color theme instructions here..."
                  value={chefNotes}
                  onChange={(e) => setChefNotes(e.target.value)}
                  className="w-full text-xs p-3 border border-cocoa-950/10 rounded-none text-cocoa-950 focus:outline-none focus:ring-1 focus:ring-gold-500 placeholder-cocoa-950/30 font-sans resize-none"
                />
              </div>
            </div>

            {/* Success message or trigger button */}
            {successAnimation ? (
              <div className="p-4 rounded-none bg-cocoa-950 text-gold-300 border border-gold-500/20 flex flex-col items-center justify-center text-center space-y-2 animate-pulse">
                <div className="w-8 h-8 rounded-none bg-[#c5a059] text-cocoa-950 flex items-center justify-center font-bold">
                  ✓
                </div>
                <h4 className="font-serif text-base font-bold uppercase tracking-wider">Bespoke Design Received!</h4>
                <p className="text-[11px] font-sans text-cocoa-200 max-w-sm leading-relaxed">
                  We've successfully added this customized cake to your order basket. Open the order basket in the navbar to finalize!
                </p>
              </div>
            ) : (
              <button
                onClick={handleCreateAndAdd}
                className="w-full py-4 bg-cocoa-900 hover:bg-cocoa-950 text-gold-300 font-mono text-xs font-bold uppercase tracking-widest rounded-none shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-cocoa-900"
              >
                <Plus className="w-5 h-5 text-gold-400" />
                <span>Finalize Cake & Add to Cart</span>
              </button>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
