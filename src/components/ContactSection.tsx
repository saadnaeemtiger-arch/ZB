import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Check, Sparkles, Navigation } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  const businessHours = [
    { days: 'Monday – Saturday', hours: '7:00 AM – 7:00 PM' },
    { days: 'Sunday', hours: '8:00 AM – 4:00 PM' },
    { days: 'Fresh Sourdough Ovens', hours: 'Out daily at 7:30 AM' }
  ];

  return (
    <section id="contact" className="py-24 bg-[#fdfbf7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#c5a059] font-serif italic text-xl block">
            Visit & Reach Out
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-cocoa-950 leading-tight">
            Get In Touch With ZB Bakery
          </h2>
          <div className="h-0.5 w-16 bg-[#c5a059] mx-auto" />
          <p className="text-sm sm:text-base text-cocoa-900/70 font-sans leading-relaxed">
            Have a question about cake sizing, wedding quotes, or want to reserve a fresh loaf of sourdough? Let us know, or contact us directly on WhatsApp!
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Block: Contact Details & Map (6 columns) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-black text-cocoa-950 uppercase tracking-tight">Bakery Location & Info</h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* Contact card */}
                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex gap-3 items-start text-cocoa-900">
                    <MapPin className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-cocoa-950 mb-0.5 uppercase tracking-wide">Bakery Address</h4>
                      <p className="text-xs sm:text-sm text-cocoa-900/80 leading-tight">
                        42 Golden Flour Lane<br />
                        Sweetwater Heights, NY 10023
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-3 items-start text-cocoa-900">
                    <Phone className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-cocoa-950 mb-0.5 uppercase tracking-wide">Phone Number</h4>
                      <p className="text-xs sm:text-sm text-cocoa-900/80 leading-tight">
                        +1 (555) 123-BAKE<br />
                        <span className="text-[10px] text-cocoa-900/40 font-mono font-bold">(555-123-2253)</span>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-3 items-start text-cocoa-900">
                    <Mail className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-cocoa-950 mb-0.5 uppercase tracking-wide">Email Address</h4>
                      <p className="text-xs sm:text-sm text-cocoa-900/80 leading-tight break-all">
                        orders@zbbakery.com<br />
                        hello@zbbakery.com
                      </p>
                    </div>
                  </div>

                </div>

                {/* Business hours card */}
                <div className="p-5 bg-white rounded-none border border-cocoa-950/10 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-[#c5a059]">
                    <Clock className="w-4.5 h-4.5" />
                    <h4 className="font-serif text-xs font-bold text-cocoa-950 uppercase tracking-wider">Business Hours</h4>
                  </div>
                  <div className="space-y-3">
                    {businessHours.map((item, idx) => (
                      <div key={idx} className="border-b border-cocoa-950/10 last:border-none pb-2 last:pb-0">
                        <p className="text-[10px] font-mono text-cocoa-950/40 font-bold uppercase tracking-wider">{item.days}</p>
                        <p className="text-xs sm:text-sm text-cocoa-900 font-sans font-bold mt-0.5">{item.hours}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* WhatsApp direct order trigger */}
              <div className="p-4 bg-emerald-50/50 border border-emerald-200/50 rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-emerald-500 text-white flex items-center justify-center font-bold shadow-sm">
                    💬
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-emerald-900 leading-tight">WhatsApp Direct Hot Line</h4>
                    <p className="text-xs text-emerald-700 font-sans leading-tight">Instantly submit order receipts or check cake status</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/15559879222?text=Hello%20ZB%20Bakery!%20I'd%20like%20to%20place%20an%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 hover:scale-102 transition-all text-white font-mono text-[10px] font-bold uppercase tracking-widest rounded-none shadow-sm flex items-center gap-1.5 shrink-0"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Google Maps Stylized Frame */}
            <div className="relative h-60 bg-cocoa-950 rounded-none overflow-hidden shadow-sm border border-cocoa-950 flex flex-col items-center justify-center text-center p-6 group">
              {/* Map abstract background lines */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-full h-[2px] bg-white rotate-12" />
                <div className="absolute top-1/2 left-0 w-full h-[3px] bg-white -rotate-6" />
                <div className="absolute top-0 left-1/3 w-[2px] h-full bg-white rotate-45" />
                <div className="absolute top-0 left-2/3 w-[3px] h-full bg-white -rotate-12" />
                <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full border-2 border-white" />
              </div>

              {/* Pin Accent */}
              <div className="relative z-10 space-y-4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-none bg-[#c5a059] text-cocoa-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 duration-300">
                  <MapPin className="w-6 h-6 fill-cocoa-950 text-[#c5a059]" />
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-gold-400 uppercase font-bold">VIEW ON GOOGLE MAPS</span>
                  <h4 className="font-serif text-base font-bold text-white mt-0.5">ZB Bakery — Sweetwater Heights</h4>
                  <p className="text-[11px] text-cocoa-200 max-w-sm mt-1 leading-relaxed">
                    Free secure customer parking in the rear. Take exit 12 from Sweetwater Parkway, turn right on Golden Flour Lane.
                  </p>
                </div>
                
                {/* Simulated route button */}
                <a
                  href="https://maps.google.com/?q=42+Golden+Flour+Lane,Sweetwater+Heights"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-cocoa-900 hover:bg-cocoa-800 text-[#c5a059] border border-[#c5a059]/30 text-[10px] font-mono uppercase tracking-wider font-bold rounded-none flex items-center gap-1.5 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5 fill-[#c5a059] text-cocoa-950" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Block: Message Form (6 columns) */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-none border border-cocoa-950/10 shadow-sm flex flex-col justify-between">
            
            {submitted ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 my-auto">
                <div className="w-14 h-14 rounded-none bg-[#c5a059] text-[#fdfbf7] flex items-center justify-center font-bold text-xl">
                  ✓
                </div>
                <h4 className="font-serif text-2xl font-black text-cocoa-950 uppercase tracking-tight">Message Received!</h4>
                <p className="text-xs text-cocoa-900/70 max-w-md font-sans leading-relaxed">
                  We have received your custom enquiry. Chef Zoë or our catering assistant will review your notes and reach back to you within 24 hours. Have a beautiful day!
                </p>
                <div className="pt-6 text-[10px] font-mono text-gold-600 flex items-center gap-1 uppercase font-bold">
                  <Sparkles className="w-4 h-4 animate-bounce text-[#c5a059]" />
                  <span>A sweet correspondence</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-black text-cocoa-950 uppercase tracking-tight">Send a Baking Enquiry</h3>
                  <p className="text-xs sm:text-sm text-cocoa-900/60 leading-tight">Need custom designs, wedding dessert catering, or corporate orders?</p>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-cocoa-950 block">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Margaret Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-3 border border-cocoa-950/10 rounded-none focus:outline-none focus:ring-1 focus:ring-gold-500 text-cocoa-950 bg-white font-sans"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-cocoa-950 block">Your Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="margaret@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-3 border border-cocoa-950/10 rounded-none focus:outline-none focus:ring-1 focus:ring-gold-500 text-cocoa-950 bg-white font-sans"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-cocoa-950 block">Subject of Correspondence</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs p-3 border border-cocoa-950/10 rounded-none focus:outline-none focus:ring-1 focus:ring-gold-500 text-cocoa-950 bg-white font-sans cursor-pointer"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Custom Cake Quote">Custom Celebration Cake Quote</option>
                    <option value="Wedding / Catering Consultation">Wedding & Catering Dessert Consultancy</option>
                    <option value="Sourdough Preservation / Classes">Baking Classes & Sourdough Questions</option>
                  </select>
                </div>

                {/* Message Body */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-cocoa-950 block">Your Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about your guest count, celebration theme, or queries..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs p-3 border border-cocoa-950/10 rounded-none focus:outline-none focus:ring-1 focus:ring-gold-500 text-cocoa-950 bg-white resize-none font-sans"
                  />
                </div>

                {/* Trigger Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#c5a059] hover:bg-cocoa-950 hover:text-white text-[#fdfbf7] font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer rounded-none border-none"
                >
                  <Send className="w-4 h-4" />
                  <span>Send My Message</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
