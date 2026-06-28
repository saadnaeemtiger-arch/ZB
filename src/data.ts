import { Product, Review, FAQItem } from './types';

// Image paths from our generated assets
export const IMAGES = {
  hero: '/src/assets/images/zb_bakery_hero_1782637483217.jpg',
  customCakes: '/src/assets/images/custom_cakes_1782637494012.jpg',
  artisanBread: '/src/assets/images/artisan_bread_1782637503746.jpg',
  assortedPastries: '/src/assets/images/assorted_pastries_1782637515403.jpg',
};

export const PRODUCTS: Product[] = [
  {
    id: 'bread-sourdough',
    name: 'Artisanal Sourdough',
    category: 'bread',
    price: 8.50,
    description: 'Our signature crusty loaf. Naturally leavened for 24 hours, presenting a perfect crispy golden crust and a tender, airy crumb.',
    image: IMAGES.artisanBread,
    rating: 4.9,
    features: ['24-Hour Fermentation', 'Wild Yeast Starter', 'Organic Stone-Ground Flour', 'No Preservatives']
  },
  {
    id: 'bread-croissant',
    name: 'Golden Butter Croissant',
    category: 'pastries',
    price: 4.50,
    description: 'Classic French style. Crafted with 81 micro-layers of premium Normandy butter, baked daily to light, golden-brown flakiness.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    features: ['French Normandy Butter', 'Baked Fresh at 6:30 AM', 'Airy Layered Structure']
  },
  {
    id: 'bread-brioche',
    name: 'Gourmet Brioche Loaf',
    category: 'bread',
    price: 9.50,
    description: 'An enriched, cloud-like French pastry bread loaded with organic free-range eggs and fresh butter for a sweet, melt-in-the-mouth texture.',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    features: ['Rich Enriched Crumb', 'Perfect for French Toast', 'Free-Range Eggs']
  },
  {
    id: 'bread-honey-wholewheat',
    name: 'Honey Whole Wheat',
    category: 'bread',
    price: 7.00,
    description: 'Wholesome stone-ground wheat combined with raw organic wildflower honey and toasted sunflower seeds for a rich, nutty flavor.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    features: ['100% Whole Wheat', 'Raw Wildflower Honey', 'High Fiber']
  },
  {
    id: 'cake-vanilla',
    name: 'Elegant Vanilla Dream',
    category: 'cakes',
    price: 45.00,
    description: 'Moist Madagascar vanilla bean sponge layered with luscious Swiss meringue buttercream, premium white chocolate curls, and organic red raspberries.',
    image: IMAGES.customCakes,
    rating: 4.9,
    features: ['Madagascar Bourbon Vanilla', 'Swiss Meringue Buttercream', 'Fresh Local Berries']
  },
  {
    id: 'cake-chocolate',
    name: 'Luxurious Chocolate Truffle',
    category: 'cakes',
    price: 50.00,
    description: 'Decadent dark cocoa sponge filled with luxurious 70% Belgian chocolate ganache, finished with a velvet cocoa spray and dark chocolate curls.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    rating: 5.0,
    features: ['70% Belgian Cocoa', 'Silky Fudge Frosting', 'Rich & Indulgent']
  },
  {
    id: 'cake-velvet',
    name: 'Soft Velvet Gold',
    category: 'cakes',
    price: 48.00,
    description: 'Light buttermilk and cocoa sponge in ZB signature crimson hue, tiered with premium whipped vanilla cream cheese and finished with edible 24k gold flakes.',
    image: 'https://images.unsplash.com/photo-1616260841585-0677a56114af?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    features: ['Vanilla Cream Cheese Frosting', 'Edible 24k Gold Accents', 'Classic Crimson Velvet']
  },
  {
    id: 'cake-caramel',
    name: 'Salted Caramel Pecan Drizzle',
    category: 'cakes',
    price: 48.00,
    description: 'Moist brown-sugar caramel cake, layered with house-cooked salted butter caramel, light buttercream, and a generous scatter of roasted salty pecans.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    features: ['House-Cooked Caramel', 'Slow Roasted Salty Pecans', 'Rich Toffee Notes']
  },
  {
    id: 'pastry-cupcake-box',
    name: 'Signature Cupcake Box (Set of 4)',
    category: 'pastries',
    price: 18.00,
    description: 'A curated selection of our highest-rated cupcakes: 1 Vanilla Dream, 1 Chocolate Fudge, 1 Red Velvet Gold, and 1 Salted Caramel Drizzle.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    features: ['Beautifully Boxed', 'Gourmet Assortment', 'Great for Gifts']
  },
  {
    id: 'pastry-brownie',
    name: 'Belgian Chocolate Brownie',
    category: 'cookies',
    price: 5.00,
    description: 'Incredibly dense, fudgy, and chewy brownie bar crafted with melted Belgian chocolate and loaded with roasted chocolate chunks.',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    features: ['Belgian Dark Chocolate Chunks', 'Ultra-Fudgy Center', 'Crisp Crackly Top']
  },
  {
    id: 'pastry-macarons',
    name: 'Premium Macaron Gift Box (6pcs)',
    category: 'cookies',
    price: 15.00,
    description: 'An elegant selection of Parisian almond macarons with smooth chocolate, pistachio, lemon, salted caramel, raspberry, and vanilla bean buttercream fillings.',
    image: IMAGES.assortedPastries,
    rating: 4.9,
    features: ['Gluten-Friendly Recipe', 'Perfect Crisp Shells', 'Imported Almond Flour']
  },
  {
    id: 'pastry-cheesecake',
    name: 'New York Style Cheesecake',
    category: 'desserts',
    price: 6.50,
    description: 'Dense, rich, and velvety cheesecake slow-baked on a buttery cinnamon graham cracker crust, blanketed with a fresh strawberry glaze.',
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    features: ['Cinnamon Graham Crust', 'Melt-in-the-mouth Density', 'Fresh Strawberry Coulis']
  },
  {
    id: 'pastry-donut',
    name: 'Classic Glazed Ring Donut',
    category: 'pastries',
    price: 3.50,
    description: 'Light-as-air, yeast-raised donut ring, blanketed in our proprietary glaze that dissolves instantly upon the first bite.',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    features: ['Hand-Rolled Daily', 'Melt-in-your-mouth Texture', 'All-Natural Vanilla Glaze']
  },
  {
    id: 'pastry-muffin',
    name: 'Blueberry Crumble Muffin',
    category: 'pastries',
    price: 4.00,
    description: 'Bursting with plump organic blueberries, this super moist muffin is topped with a thick, buttery cinnamon-streusel brown sugar crumble.',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    features: ['Organic Wild Blueberries', 'Cinnamon-Streusel Topping', 'Rich Buttermilk Batter']
  },
  {
    id: 'special-seasonal',
    name: 'Lemon Lavender Tart',
    category: 'specials',
    price: 6.00,
    description: 'A delicate shortcrust pastry shell filled with vibrant, zesty lemon curd and infused with a fragrant hint of organic sweet lavender blossoms.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    features: ['Zesty Lemon Curd', 'Organic Lavender Buds', 'Buttery Sweet Crust']
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Gisele Montgomery',
    rating: 5,
    text: "The custom chocolate truffle cake we ordered for my husband's birthday was an absolute masterpiece! Not only was the frosting absolutely flawless, but the Belgian ganache inside was rich and incredibly luxurious. ZB Bakery is now our official family baker!",
    date: 'June 18, 2026',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Marcus Vance',
    rating: 5,
    text: "As a self-proclaimed sourdough snob, I can safely say ZB Bakery's Artisanal Sourdough is the best in the city. The crust has that amazing blistered crunch and the flavor has the perfect tang. I pick up a fresh loaf every Saturday morning!",
    date: 'June 22, 2026',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Sophia Laurent',
    rating: 5,
    text: "Their Golden Butter Croissants transport me straight to Paris. Flaky layers, rich buttery taste, and perfectly crisp on the outside. Absolutely top-tier craftsmanship!",
    date: 'June 25, 2026',
    verified: true
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'Gilded Wedding Cake',
    category: 'Wedding Cakes',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=800',
    desc: 'Three-tiered ivory vanilla cake with hand-painted gold leaf borders and white roses.'
  },
  {
    id: 'gal-2',
    title: 'Modern Birthday Whimsy',
    category: 'Birthday Cakes',
    image: 'https://images.unsplash.com/photo-1562266563-fa44c26611c0?auto=format&fit=crop&q=80&w=800',
    desc: 'Luxurious pastel drip cake crowned with gourmet macarons, sprinkles, and a customized golden topper.'
  },
  {
    id: 'gal-3',
    title: 'Enchanted Forest Theme',
    category: "Kids' Theme Cakes",
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
    desc: 'Fun and beautiful custom children cake adorned with handcrafted sugar forest creatures.'
  },
  {
    id: 'gal-4',
    title: 'Triple Chocolate Indulgence',
    category: 'Chocolate Cakes',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    desc: 'Ultra-luxurious chocolate mousse cake decorated with artisanal truffles and gold dust.'
  },
  {
    id: 'gal-5',
    title: 'Summer Berry Pavilion',
    category: 'Fruit Cakes',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800',
    desc: 'Refreshing layered sponge cake heavily loaded with organic summer strawberries, blueberries, and raspberries.'
  },
  {
    id: 'gal-6',
    title: 'Gourmet Cupcake Tower',
    category: 'Cupcake Collections',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=800',
    desc: 'Stunning tiered display of customized cupcakes with detailed gold and velvet frosting.'
  },
  {
    id: 'gal-7',
    title: 'Silver Anniversary Tier',
    category: 'Anniversary Cakes',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=800',
    desc: 'Elegant silver-themed vanilla and salted caramel celebration cake celebrating 25 years.'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Orders & Custom Cakes',
    question: 'How far in advance do I need to order a custom celebration cake?',
    answer: 'For custom celebration and birthday cakes, we request orders to be placed at least 3 to 5 days in advance. For large weddings or tiered event cakes, we appreciate 2 to 4 weeks notice to secure consultations and final designs.'
  },
  {
    id: 'faq-2',
    category: 'Delivery',
    question: 'Do you offer home or venue delivery?',
    answer: 'Yes! We offer professional delivery services within a 15-mile radius of Sweetwater Heights. Delivery is free for orders over $100, and carries a flat $5 fee for orders between $30 and $100.'
  },
  {
    id: 'faq-3',
    category: 'Freshness & Quality',
    question: 'Are your bakery items baked fresh every day?',
    answer: 'Absolutely. We bake every loaf of sourdough, pastry, croissant, muffin, and cupcake fresh in our ovens every single morning. Any unsold products from the day are donated to local shelter partners.'
  },
  {
    id: 'faq-4',
    category: 'Ingredients',
    question: 'Do you use organic or local ingredients?',
    answer: 'We are committed to sourcing organic, locally-milled stone-ground flour, organic free-range eggs, premium French-style butter, and organic locally-sourced fruits wherever possible. We use zero chemical preservatives or high-fructose corn syrups.'
  },
  {
    id: 'faq-5',
    category: 'Ingredients',
    question: 'Do you offer gluten-free or allergen-friendly options?',
    answer: 'Yes, we offer gluten-friendly options for our vanilla celebration cake and macaron shells. However, please note that we operate in a shared kitchen facility that processes wheat, milk, eggs, tree nuts, and soy.'
  },
  {
    id: 'faq-6',
    category: 'Orders & Custom Cakes',
    question: 'What happens after I place an order online?',
    answer: 'When you submit an order on our website, it generates a beautiful digital reservation receipt. You will receive an email confirmation, and can click the WhatsApp button to instantly share the order details with our baking team to finalize delivery or pickup timings and process payment.'
  }
];
