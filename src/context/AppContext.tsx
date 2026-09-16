import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  product: {
    id: string | number;
    name: string;
    price: number;
    category: string;
    image?: string;
    imageURL?: string;
  };
  orderDate: Date;
  receivingDate: Date;
  status: "processing" | "shipped" | "delivered";
}

interface UserData {
  name: string;
  email: string;
}

interface AppContextType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  orders: Order[];
  addOrder: (product: any) => void;
  clearOrders: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  // Load from localStorage on startup
  useEffect(() => {
    const savedUser = localStorage.getItem("aura_user");
    const savedOrders = localStorage.getItem("aura_orders");
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
    
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        // Convert date strings back to Date objects
        const ordersWithDates = parsedOrders.map((order: any) => ({
          ...order,
          orderDate: new Date(order.orderDate),
          receivingDate: new Date(order.receivingDate),
        }));
        setOrders(ordersWithDates);
      } catch (e) {
        console.error("Failed to parse orders from localStorage", e);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("aura_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("aura_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("aura_orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (product: any) => {
    const orderDate = new Date();
    const receivingDate = new Date();
    receivingDate.setDate(receivingDate.getDate() + 5);

    const newOrder: Order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        imageURL: product.imageURL,
      },
      orderDate,
      receivingDate,
      status: "processing",
    };

    setOrders((prev) => [...prev, newOrder]);
    
    toast({
      title: "Order Placed!",
      description: `${product.name} has been ordered. Expected delivery: ${receivingDate.toLocaleDateString()}`,
    });
  };

  const clearOrders = () => {
    setOrders([]);
    toast({
      title: "Orders Cleared",
      description: "All orders have been removed.",
    });
  };

  return (
    <AppContext.Provider value={{ user, setUser, orders, addOrder, clearOrders }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
