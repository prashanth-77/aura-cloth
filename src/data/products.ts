export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
  description: string;
  colors: string[];
  sizes: string[];
}

export const categories = [
  "All",
  "Shirts", 
  "Trousers",
  "Jackets",
  "Accessories"
];

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Blue Denim Shirt",
    price: 49,
    originalPrice: 59,
    image: "/products/shirt-blue.svg",
    category: "Shirts",
    rating: 4.5,
    reviews: 127,
    isNew: true,
    isSale: true,
    description: "Comfortable cotton denim shirt with classic fit. Perfect for casual and semi-formal occasions.",
    colors: ["Blue", "Light Blue", "Dark Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 2,
    name: "Formal White Dress Shirt",
    price: 60,
    originalPrice: 75,
    image: "/products/shirt-white.svg",
    category: "Shirts",
    rating: 4.8,
    reviews: 256,
    isSale: true,
    description: "Crisp white dress shirt perfect for business meetings and formal events.",
    colors: ["White", "Light Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 3,
    name: "Slim Fit Chino Trousers",
    price: 80,
    image: "/products/trousers-khaki.svg",
    category: "Trousers",
    rating: 4.3,
    reviews: 189,
    description: "Modern slim fit chino trousers made from premium cotton blend.",
    colors: ["Khaki", "Navy", "Black", "Olive"],
    sizes: ["30", "32", "34", "36", "38", "40"]
  },
  {
    id: 4,
    name: "Classic Denim Jeans",
    price: 90,
    image: "/products/jeans-denim.svg",
    category: "Trousers",
    rating: 4.6,
    reviews: 342,
    isNew: true,
    description: "Timeless straight-leg jeans crafted from premium denim.",
    colors: ["Dark Blue", "Medium Blue", "Black"],
    sizes: ["30", "32", "34", "36", "38", "40"]
  },
  {
    id: 5,
    name: "Wool Blazer Jacket",
    price: 200,
    originalPrice: 250,
    image: "/products/blazer-navy.svg",
    category: "Jackets",
    rating: 4.4,
    reviews: 156,
    isSale: true,
    description: "Elegant wool blazer perfect for business and formal occasions.",
    colors: ["Navy", "Charcoal", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 6,
    name: "Casual Bomber Jacket",
    price: 130,
    image: "/products/jacket-bomber.svg",
    category: "Jackets",
    rating: 4.7,
    reviews: 234,
    description: "Trendy bomber jacket with modern fit and premium materials.",
    colors: ["Black", "Olive", "Navy", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 7,
    name: "Premium Leather Belt",
    price: 46,
    image: "/products/belt-leather.svg",
    category: "Accessories",
    rating: 4.5,
    reviews: 98,
    isNew: true,
    description: "Genuine leather belt with classic buckle design.",
    colors: ["Brown", "Black", "Tan"],
    sizes: ["32", "34", "36", "38", "40", "42"]
  },
  {
    id: 8,
    name: "Silk Neck Tie",
    price: 36,
    originalPrice: 45,
    image: "/products/tie-silk.svg",
    category: "Accessories",
    rating: 4.2,
    reviews: 67,
    isSale: true,
    description: "Elegant silk tie perfect for formal and business attire.",
    colors: ["Navy", "Burgundy", "Silver", "Black"],
    sizes: ["Regular"]
  },
  {
    id: 9,
    name: "Cotton Polo Shirt",
    price: 40,
    image: "/products/polo-green.svg",
    category: "Shirts",
    rating: 4.4,
    reviews: 145,
    description: "Classic cotton polo shirt with modern fit and comfort.",
    colors: ["White", "Navy", "Black", "Red", "Green"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 10,
    name: "Dress Pants",
    price: 70,
    image: "/products/pants-charcoal.svg",
    category: "Trousers",
    rating: 4.3,
    reviews: 123,
    description: "Professional dress pants with wrinkle-resistant fabric.",
    colors: ["Charcoal", "Navy", "Black"],
    sizes: ["30", "32", "34", "36", "38", "40"]
  },
  {
    id: 11,
    name: "Leather Wallet",
    price: 56,
    image: "/products/wallet-leather.svg",
    category: "Accessories",
    rating: 4.6,
    reviews: 167,
    isNew: true,
    description: "Premium leather wallet with multiple card slots and bill compartment.",
    colors: ["Brown", "Black", "Cognac"],
    sizes: ["Regular"]
  },
  {
    id: 12,
    name: "Winter Coat",
    price: 250,
    originalPrice: 320,
    image: "/products/coat-winter.svg",
    category: "Jackets",
    rating: 4.8,
    reviews: 89,
    isNew: true,
    isSale: true,
    description: "Warm winter coat with water-resistant exterior and thermal lining.",
    colors: ["Black", "Navy", "Charcoal"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  }
];