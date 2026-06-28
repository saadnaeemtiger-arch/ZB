import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Check, MessageSquareCode, Sparkles, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (idx: number, qty: number) => void;
  onRemoveItem: (idx: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem, onClearCart }: CartDrawerProps) {
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderMethod, setOrderMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  // Subtotal Calculation
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Delivery Calculation: under $30 = no delivery (pickup only), $30-$100 = $5, over $100 = free
  let deliveryFee = 0;
  let canDeliver = subtotal >= 30;
  
  if (orderMethod === 'delivery' && canDeliver) {
    deliveryFee = subtotal >= 100 ? 0 : 5.00;
  }

  const grandTotal = subtotal + deliveryFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setCheckoutComplete(true);
  };

  const handleResetCheckout = () => {
    setCheckoutComplete(false);
    setCustomerName('');
    setCustomerPhone('');
    setAddress('');
    onClearCart();
    onClose();
  };

  // Compile full pre-filled text for WhatsApp link API
  const compileWhatsAppText = () => {
    let text = `*👑 NEW ORDER RESERVATION - ZB BAKERY* \n`;
    text += `*Customer:* ${customerName || 'Valued Guest'}\n`;
    text += `*Phone:* ${customerPhone || 'N/A'}\n`;
    text += `*Method:* ${orderMethod.toUpperCase()}\n`;
    if (orderMethod === 'delivery' && address) {
      text += `*Address:* ${address}\n`;
    }
    text += `\n*🧁 ORDERED ITEMS:* \n`;
    
    cartItems.forEach((item, idx) => {
      text += `• ${item.quantity}x _${item.product.name}_ ($${(item.product.price * item.quantity).toFixed(2)}) \n`;
      if (item.product.customizations) {
        const c = item.product.customizations;
        text += `   - Sponge: ${c.flavor || 'Vanilla'} \n`;
        text += `   - Coating: ${c.frosting || 'Buttercream'} \n`;
        if (c.text) text += `   - Text: "${c.text}" \n`;
        if (c.instructions) text += `   - Notes: ${c.instructions} \n`;
      }
    });

    text += `\n*💰 FINAL TOTALS:* \n`;
    text += `• Subtotal: $${subtotal.toFixed(2)}\n`;
    if (orderMethod === 'delivery') text += `• Delivery Fee: $${deliveryFee.toFixed(2)}\n`;
    text += `• *Grand Total: $${grandTotal.toFixed(2)}*\n\n`;
    text += `_Thank you for ordering handcrafted happiness from ZB Bakery!_`;

    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-cocoa-950/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between h-full relative border-l border-cocoa-200">
          
          {/* Header */}
          <div className="px-6 py-5 bg-cocoa-950 text-white flex items-center justify-between border-b border-cocoa-900">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#c5a059]" />
              <h2 className="font-serif text-lg font-black uppercase tracking-tight">Your Order Basket</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-none bg-cocoa-900 hover:bg-cocoa-800 text-cocoa-200 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {checkoutComplete ? (
              /* Success Receipt view */
              <div className="space-y-6 text-center py-6 animate-fade-in">
                <div className="w-12 h-12 rounded-none bg-[#c5a059] text-[#fdfbf7] flex items-center justify-center font-bold text-lg mx-auto">
                  ✓
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-black text-cocoa-950 uppercase tracking-tight">Reservation Created!</h3>
                  <p className="text-xs sm:text-sm text-cocoa-900/70 font-sans max-w-xs mx-auto leading-relaxed">
                    We have compiled your digital receipt. Simply click the button below to instantly submit your booking details directly to our bakers on WhatsApp to finalize!
                  </p>
                </div>

                {/* Styled Receipt Board */}
                <div className="border border-cocoa-950/10 p-5 rounded-none bg-[#fbf5e6]/30 text-left font-mono text-xs space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#c5a059]/10 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="text-center border-b border-cocoa-950/10 pb-3">
                    <span className="font-serif text-sm font-bold tracking-widest text-cocoa-950">ZB BAKERY RECEIPT</span>
                    <p className="text-[9px] text-cocoa-950/40 mt-1 font-bold">EST. 2026 • SWEETWATER HEIGHTS</p>
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <p><span className="text-cocoa-400 font-bold uppercase">Patron:</span> {customerName}</p>
                    <p><span className="text-cocoa-400 font-bold uppercase">Phone:</span> {customerPhone}</p>
                    <p><span className="text-cocoa-400 font-bold uppercase">Dispatch:</span> {orderMethod.toUpperCase()}</p>
                    {orderMethod === 'delivery' && <p className="line-clamp-1"><span className="text-cocoa-400 font-bold uppercase">To:</span> {address}</p>}
                  </div>

                  <div className="border-t border-dashed border-cocoa-950/20 pt-3 space-y-2">
                    {cartItems.map((item, i) => (
                      <div key={i} className="flex justify-between text-[11px]">
                        <span className="truncate pr-3">{item.quantity}x {item.product.name}</span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-cocoa-950/10 pt-3 text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {orderMethod === 'delivery' && (
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-serif font-black text-cocoa-950 text-sm border-t border-dashed border-cocoa-950/20 pt-2">
                      <span>TOTAL</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <a
                    href={`https://wa.me/15559879222?text=${compileWhatsAppText()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-none shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquareCode className="w-5 h-5 text-white" />
                    <span>Submit & Open WhatsApp</span>
                  </a>

                  <button
                    onClick={handleResetCheckout}
                    className="text-xs font-bold text-cocoa-900/40 hover:text-cocoa-950 transition-colors font-mono uppercase tracking-widest"
                  >
                    Done • Clean Order Basket
                  </button>
                </div>

              </div>
            ) : cartItems.length === 0 ? (
              /* Empty Cart view */
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-none bg-[#fbf5e6]/30 text-cocoa-400 flex items-center justify-center mx-auto border border-cocoa-950/5">
                  <ShoppingBag className="w-8 h-8 text-[#c5a059]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-cocoa-950 uppercase tracking-tight">Your basket is empty</h3>
                <p className="text-xs sm:text-sm text-cocoa-900/60 font-sans max-w-xs mx-auto leading-relaxed">
                  Add custom celebration cakes, freshly baked sourdough, or French croissants to your basket to get baking.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#c5a059] text-[#fdfbf7] font-mono text-xs font-bold uppercase tracking-widest rounded-none hover:bg-cocoa-950 transition-all cursor-pointer border-none"
                >
                  Browse Menu Treats
                </button>
              </div>
            ) : (
              /* Active Cart list */
              <div className="space-y-6">
                <div className="space-y-4">
                  {cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-stretch gap-3 pb-4 border-b border-cocoa-950/10 last:border-none"
                    >
                      {/* Product thumb */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-none object-cover bg-cocoa-50 border border-cocoa-950/10"
                        referrerPolicy="no-referrer"
                      />

                      {/* Details block */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-sm font-bold text-cocoa-950 leading-tight">
                            {item.product.name}
                          </h4>
                          
                          {/* Sourdough request or custom cake configs display */}
                          {item.customizations ? (
                            <p className="text-[10px] text-gold-700 font-sans italic mt-0.5 max-w-[200px] truncate">
                              Config: {item.customizations.notes || item.customizations.flavor || 'Bespoke customization'}
                            </p>
                          ) : (
                            <p className="text-[10px] text-cocoa-950/40 font-mono mt-0.5 font-bold uppercase tracking-wider">
                              ${item.product.price.toFixed(2)} each
                            </p>
                          )}
                        </div>

                        {/* Actions line */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-cocoa-950/10 rounded-none overflow-hidden bg-white size-fit scale-90 -ml-1">
                            <button
                              onClick={() => onUpdateQty(idx, Math.max(1, item.quantity - 1))}
                              className="px-2 py-0.5 hover:bg-cocoa-100 text-cocoa-700 font-bold font-sans text-xs"
                            >
                              -
                            </button>
                            <span className="px-2 font-bold text-cocoa-950 font-sans text-xs">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQty(idx, item.quantity + 1)}
                              className="px-2 py-0.5 hover:bg-cocoa-100 text-cocoa-700 font-bold font-sans text-xs"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="p-1.5 rounded-none text-cocoa-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Total price for line item */}
                      <div className="text-right flex flex-col justify-between">
                        <span className="font-serif text-sm font-bold text-cocoa-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Form parameters */}
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="pt-6 border-t border-cocoa-950/10 space-y-4">
                  <h4 className="font-serif text-base font-black text-cocoa-950 uppercase tracking-tight">Dispatch Details</h4>
                  
                  <div className="grid grid-cols-2 gap-2 bg-cocoa-50/50 p-1.5 rounded-none border border-cocoa-950/10">
                    <button
                      type="button"
                      onClick={() => setOrderMethod('pickup')}
                      className={`py-2.5 text-center text-[10px] font-mono font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer ${
                        orderMethod === 'pickup' ? 'bg-[#c5a059] text-white shadow-xs' : 'text-cocoa-950/40 hover:text-cocoa-950'
                      }`}
                    >
                      Boutique Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderMethod('delivery')}
                      className={`py-2.5 text-center text-[10px] font-mono font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer ${
                        orderMethod === 'delivery' ? 'bg-[#c5a059] text-white shadow-xs' : 'text-cocoa-950/40 hover:text-cocoa-950'
                      }`}
                    >
                      Home Delivery
                    </button>
                  </div>

                  <div className="space-y-3">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-cocoa-950 uppercase tracking-wider block">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Margaret Vance"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full text-xs p-3 border border-cocoa-950/10 rounded-none focus:outline-none focus:ring-1 focus:ring-gold-500 text-cocoa-950 bg-white"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-cocoa-950 uppercase tracking-wider block">Your Contact Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="555-123-4567"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full text-xs p-3 border border-cocoa-950/10 rounded-none focus:outline-none focus:ring-1 focus:ring-gold-500 text-cocoa-950 bg-white"
                      />
                    </div>

                    {/* Delivery bounds alerts */}
                    {orderMethod === 'delivery' && (
                      <div className="space-y-3 animate-fade-in">
                        {!canDeliver ? (
                          <div className="p-3 bg-rose-50 border border-rose-100 rounded-none text-[11px] text-rose-800 flex items-start gap-2 leading-snug">
                            <AlertCircle className="w-4.5 h-4.5 text-rose-600 shrink-0 mt-0.5" />
                            <span>
                              Delivery requires a **minimum order of $30**. Please add more items, or switch to **Boutique Pickup** instead.
                            </span>
                          </div>
                        ) : (
                          <div className="p-3 bg-blue-50 border border-blue-100 rounded-none text-[11px] text-blue-800 flex items-start gap-2 leading-snug">
                            <Sparkles className="w-4.5 h-4.5 text-blue-600 shrink-0 mt-0.5" />
                            <span>
                              {subtotal >= 100
                                ? '🎉 Orders over $100 earn **FREE local delivery**!'
                                : 'Add just **$' + (100 - subtotal).toFixed(2) + '** more to unlock **FREE delivery** (currently $5.00).'}
                            </span>
                          </div>
                        )}

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono font-bold text-cocoa-950 uppercase tracking-wider block">Delivery Address (Within 15 miles)</label>
                          <input
                            type="text"
                            required={orderMethod === 'delivery' && canDeliver}
                            disabled={!canDeliver}
                            placeholder="Street, City, Zip"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full text-xs p-3 border border-cocoa-950/10 rounded-none focus:outline-none focus:ring-1 focus:ring-gold-500 text-cocoa-950 bg-white disabled:opacity-50"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Calculations card */}
                  <div className="bg-cocoa-50/30 p-4 rounded-none border border-cocoa-950/10 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-cocoa-500">Cart Subtotal</span>
                      <span className="text-cocoa-950 font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    {orderMethod === 'delivery' && canDeliver && (
                      <div className="flex justify-between">
                        <span className="text-cocoa-500">Delivery Fee</span>
                        <span className="text-cocoa-950 font-bold">
                          {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between font-serif text-sm font-black text-cocoa-950 border-t border-cocoa-950/10 pt-2 uppercase">
                      <span>Grand Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={orderMethod === 'delivery' && !canDeliver}
                    className="w-full py-4 bg-[#c5a059] text-[#fdfbf7] hover:bg-cocoa-950 font-mono text-xs font-bold uppercase tracking-widest rounded-none transition-all flex items-center justify-center gap-2 cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Create Reservation Receipt</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
