import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client on the server side
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini client successfully initialized on server.");
  } else {
    console.warn("GEMINI_API_KEY is not defined. AI Pastry Chef chat will operate in mock mode.");
  }
} catch (error) {
  console.error("Error initializing Gemini SDK:", error);
}

// ZB Bakery Menu for AI Chef knowledge
const ZB_BAKERY_KNOWLEDGE = `
You are Chef Zoë, the friendly and prestigious Head Pastry Chef at ZB Bakery.
ZB Bakery is an elegant, warm, and premium artisanal bakery located in Sweetwater Heights.
Your goal is to assist customers with choosing desserts, suggesting flavor pairings, recommending celebration cakes, detailing ingredients, and answering questions about ZB Bakery.

OUR BAKERY PROFILE:
- Address: 42 Golden Flour Lane, Sweetwater Heights (Simulated Google Maps Location)
- Phone: +1 (555) 123-BAKE (555-123-2253)
- WhatsApp: +1 (555) 987-ZBBAKE (We have a direct order chat on the website!)
- Email: orders@zbbakery.com
- Hours: Monday - Saturday (7:00 AM - 7:00 PM), Sunday (8:00 AM - 4:00 PM). Fresh bread out of the oven at 7:30 AM daily!
- Core Promise: Handmade daily, premium ingredients (organic flour, Belgian butter, Grade-A vanilla, fresh organic fruits), absolutely no preservatives, custom cake designs for all occasions.

OUR PRODUCT MENU:
1. Fresh Bread:
   - Artisanal Sourdough ($8.50): Classic crusty 24h fermented, golden blistered crust, chewy interior.
   - Golden Butter Croissant ($4.50): Rich, laminated pastry layers with high-grade French butter.
   - Honey Whole Wheat ($7.00): Soft whole grain bread made sweet with organic raw wildflower honey.
   - Brioche Loaf ($9.50): Elegant, soft-as-cloud buttery pastry bread.
2. Custom Celebration Cakes (Base Pricing, customizable in our online Cake Configurator!):
   - Elegant Vanilla Dream ($45.00): Fluffy Madagascar vanilla bean sponge with Swiss meringue buttercream and fresh raspberries.
   - Luxurious Chocolate Truffle ($50.00): Rich dark chocolate cake with layered 70% dark Belgian ganache.
   - Soft Velvet Gold ($48.00): Signature red velvet sponge layered with smooth vanilla cream cheese frosting and micro 24k gold leaf flakes.
   - Salted Caramel Drizzle ($48.00): Moist brown sugar caramel cake, homemade buttery salted caramel, toasted pecans.
3. Cupcakes, Pastries & Desserts:
   - Signature Cupcake Box ($18.00): Collection of 4 gourmet cupcakes (Vanilla Dream, Choc-o-holic, Red Velvet, Caramel Pecan).
   - Belgian Chocolate Brownies ($5.00): Incredibly fudgy, dense, dark chocolate squares.
   - Classic Glazed Donut ($3.50): Light, melt-in-the-mouth glazed ring.
   - Premium Macarons Box ($15.00): Elegant box of 6 french almond macarons (flavors: Raspberry, Pistachio, Sea Salt Caramel, Intense Chocolate, Lemon, Lavender Vanilla).
   - Blueberry Crumble Muffin ($4.00): Moist organic blueberry muffin with structural streusel on top.
   - NY Style Cheesecake ($6.50): Dense, creamy vanilla cheesecake over butter graham crust, with sweet strawberry purée.

CUSTOM ORDERS & FAQS:
- Custom Cakes: Yes! We make wedding cakes, kid theme birthday cakes, anniversaries, and custom celebration cakes. Customers should order at least 3-5 days in advance. They can use our Custom Cake Builder tool on this very page to configure their own design, get an instant quote, and add it to their order!
- Dietary Restrictions: We offer gluten-friendly vanilla sponge, and dairy-free options upon custom request. Just let us know!
- Delivery: We offer local delivery within a 15-mile radius of Sweetwater Heights for orders over $30. Flat delivery fee of $5. Free delivery on orders over $100.
- Ordering Process: Guests can browse our beautiful products directly, add items to their shopping cart, customize their cake order, and click "Submit Order" to place a simulated reservation, which prompts them to complete or confirm via WhatsApp or Email.

CONVERSATION STYLE:
- Professional, exceptionally warm, helpful, polite, and enthusiastic about baking.
- Always sound like a professional chef who loves her craft. Use subtle food-inspired language (e.g., "Warmly," "A sweet day," "Baked with love").
- Be concise. Never send overly long essays. Break details into quick, readable points or short paragraphs.
- If they ask for custom cake recommendations, ask about their event theme, how many guests they are hosting, and suggest specific flavors!
`;

// API Routes
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!ai) {
      // Graceful fallback for missing key
      const fallbackReplies = [
        "Warm greetings from ZB Bakery! 🥐 I'm Chef Zoë. I'd be absolutely delighted to help you choose the perfect treats. Our freshly baked sourdough bread and Luxurious Chocolate Truffle cakes are particularly divine today! What can I bake for you?",
        "A sweet day to you! 🍰 Yes, we do hand-craft custom celebration cakes. For birthday, wedding, or anniversary cakes, we recommend ordering 3-5 days in advance using our interactive Cake Builder on this page, or we can discuss custom designs. What occasion are we celebrating?",
        "Mmm, excellent question! 🥖 Our sourdough goes through a meticulous 24-hour fermentation, giving it that pristine rustic crust and chewy crumb. It goes beautifully with salted butter! Is there anything else from our menu you would like to know about?",
        "Warmly, ZB Bakery is open Monday through Saturday from 7:00 AM to 7:00 PM, and Sundays from 8:00 AM to 4:00 PM. We would love to welcome you to our shop at 42 Golden Flour Lane in Sweetwater Heights!"
      ];
      const randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      return res.json({ response: randomReply });
    }

    // Format chat history for GoogleGenAI SDK format: Array of parts
    // The SDK chat system uses ai.chats.create() or direct generateContent.
    // For simpler stateless endpoint proxy with history context, we can construct the content list:
    const contents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        });
      });
    }

    // Append the latest user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: ZB_BAKERY_KNOWLEDGE,
        temperature: 0.7,
      }
    });

    const reply = result.text || "I apologize, but I had a little trouble getting that out of the oven. What else can I help you with?";
    return res.json({ response: reply });

  } catch (error: any) {
    console.error("Error in AI Chat route:", error);
    return res.status(500).json({ error: "The AI Chef got a bit warm in the kitchen. Please try again!" });
  }
});

// Setup Vite or Serve Static Files
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware loaded.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production files from dist/ directory.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupServer();
