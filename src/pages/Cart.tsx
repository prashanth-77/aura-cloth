import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CheckCircle } from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { addOrder } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = () => {
    cartItems.forEach(item => addOrder(item));
    clearCart();
    toast({ title: "Order placed successfully!", description: "Your order has been added to your order history." });
    navigate("/profile");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-24 px-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <ShoppingBag className="h-24 w-24 text-muted-foreground/30 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button onClick={() => navigate("/shop")} size="lg">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/shop")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Button>

        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image || item.imageURL}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/products/shirt-blue.svg";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Size: {item.selectedSize} | Color: {item.selectedColor}
                      </p>
                      <p className="font-bold text-lg mt-2">${item.price}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
