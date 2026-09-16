import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  imageURL?: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  colors?: string[];
  sizes?: string[];
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, size?: string, color?: string) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const readCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    localStorage.removeItem("cart");
    return [];
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(readCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: any, size?: string, color?: string) => {
    const selectedSize = size || product.sizes?.[0] || "M";
    const selectedColor = color || product.colors?.[0] || "Default";
    setCartItems(prev => {
      const existing = prev.find(
        item => item.id === String(product.id) && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );
      if (existing) {
        return prev.map(item =>
          item.id === String(product.id) && item.selectedSize === selectedSize && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        ...product,
        id: String(product.id),
        imageURL: product.imageURL || product.image,
        quantity: 1,
        selectedSize,
        selectedColor,
      }];
    });
  };

  const removeFromCart = (id: string, size: string, color: string) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)));
  };

  const updateQuantity = (id: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color);
      return;
    }
    setCartItems(prev => prev.map(item =>
      item.id === id && item.selectedSize === size && item.selectedColor === color ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCartItems([]);
  const getCartTotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
