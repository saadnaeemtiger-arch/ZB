import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareText, Send, X, Sparkles, Wheat, Loader2 } from 'lucide-react';
import { ChefMessage } from '../types';

interface ChefChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChefChatbot({ isOpen, onClose }: ChefChatbotProps) {
  const [messages, setMessages] = useState<ChefMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "A sweet day to you! 🍰 I'm Zoë, the Head Pastry Chef at ZB Bakery. I'd be absolutely delighted to help you choose desserts, recommend custom cake design flavor pairings, explain our ingredients, or help with any other queries. What can I bake for you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChefMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMsg('');
    setIsLoading(true);

    try {
      // Map history for API
      const historyContext = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyContext,
        }),
      });

      const data = await res.json();
      
      const assistantMsg: ChefMessage = {
        id: `chef-${Date.now()}`,
        role: 'assistant',
        content: data.response || "Mmm, I seem to have got a bit warm in the kitchen. What else can I help you with?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error fetching chat response:', err);
      const errMsg: ChefMessage = {
        id: `chef-err-${Date.now()}`,
        role: 'assistant',
        content: "Oh dear, our ovens got a bit overwhelmed! Let me try baking that answer again in a minute, or ask me about our cake sizes!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestionChips = [
    "What cake sizes do you offer?",
    "Tell me about your sourdough starter",
    "Are there any gluten-free choices?",
    "How do I submit my custom order?",
  ];

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:max-w-md h-full sm:h-[550px] bg-white rounded-none shadow-2xl border border-cocoa-950 overflow-hidden flex flex-col z-50 animate-zoom-in">
      
      {/* Header */}
      <div className="px-5 py-4 bg-cocoa-950 text-white flex items-center justify-between border-b border-cocoa-900">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-none bg-[#c5a059] text-cocoa-950 flex items-center justify-center font-bold shadow-md border border-[#c5a059]/20">
            👩‍🍳
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-none bg-emerald-500 border-2 border-cocoa-950 animate-ping" />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-none bg-emerald-500 border-2 border-cocoa-950" />
          </div>
          <div>
            <h3 className="font-serif text-sm font-bold flex items-center gap-1">
              <span>Chef Zoë</span>
              <Sparkles className="w-3 h-3 text-gold-300 fill-gold-300" />
            </h3>
            <p className="text-[9px] font-mono font-bold uppercase text-cocoa-300">Head Pastry Chef • AI Assistant</p>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="p-1.5 rounded-none bg-cocoa-900 hover:bg-cocoa-800 text-cocoa-200 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Message space */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#fdfbf7]">
        {messages.map((m) => {
          const isChef = m.role === 'assistant';
          return (
            <div
              key={m.id}
              className={`flex flex-col max-w-[85%] ${isChef ? 'mr-auto items-start' : 'ml-auto items-end'}`}
            >
              <div
                className={`p-3.5 rounded-none text-xs sm:text-sm font-sans leading-relaxed shadow-sm ${
                  isChef
                    ? 'bg-white text-cocoa-950 border border-cocoa-950/10'
                    : 'bg-[#c5a059] text-[#fdfbf7] border border-[#c5a059]'
                }`}
              >
                {m.content}
              </div>
              <span className="text-[9px] font-mono font-bold uppercase text-cocoa-950/40 mt-1 px-1">
                {m.timestamp}
              </span>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex flex-col items-start max-w-[85%] mr-auto">
            <div className="p-3.5 bg-white text-cocoa-400 rounded-none border border-cocoa-950/10 flex items-center gap-2 shadow-sm">
              <Loader2 className="w-4.5 h-4.5 animate-spin text-gold-500" />
              <span className="text-xs font-mono tracking-wide">Zoë is checking her recipes...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      {messages.length === 1 && (
        <div className="px-4 py-3 border-t border-cocoa-950/10 bg-white">
          <p className="text-[9px] font-mono font-bold text-cocoa-950/40 uppercase tracking-widest mb-2">Common questions:</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="px-2.5 py-1.5 bg-[#fbf5e6] hover:bg-cocoa-950 text-[#c5a059] hover:text-[#fdfbf7] text-[9px] font-mono font-bold uppercase tracking-wider rounded-none border border-[#c5a059]/10 transition-all cursor-pointer text-left"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputMsg);
        }}
        className="p-3 bg-white border-t border-cocoa-950/10 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask Chef Zoë for flavor pairings..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          disabled={isLoading}
          className="flex-1 p-3 text-xs border border-cocoa-950/10 rounded-none focus:outline-none focus:ring-1 focus:ring-gold-500 text-cocoa-950 placeholder-cocoa-450 bg-white"
        />
        <button
          type="submit"
          disabled={!inputMsg.trim() || isLoading}
          className="p-3 rounded-none bg-cocoa-950 text-[#c5a059] transition-all disabled:opacity-50 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
