export interface Product {
  id: string;
  name: string;
  category: 'bread' | 'cakes' | 'pastries' | 'cookies' | 'desserts' | 'specials';
  price: number;
  description: string;
  image: string;
  rating: number;
  features: string[];
  customizations?: {
    size?: string;
    flavor?: string;
    frosting?: string;
    text?: string;
    notes?: string;
    instructions?: string;
  };
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizations?: {
    size?: string;
    flavor?: string;
    frosting?: string;
    text?: string;
    notes?: string;
    instructions?: string;
  };
}

export interface CustomCakeConfig {
  size: '6inch' | '8inch' | '10inch' | '2tier';
  flavor: 'vanilla' | 'chocolate' | 'redvelvet' | 'lemon' | 'caramel';
  frosting: 'creamcheese' | 'buttercream' | 'ganache' | 'fondant';
  fillings: string[];
  text: string;
  instructions: string;
}

export interface ChefMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
