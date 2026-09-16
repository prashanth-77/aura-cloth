import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CartDrawerProps {
  trigger?: React.ReactNode;
}

export const CartDrawer = ({ trigger }: CartDrawerProps) => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();
  const navigate = useNavigate();

  const defaultTrigger = (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="glass" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center pulse-glow">
              {getCartCount()}
            </span>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Shopping Cart</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || defaultTrigger}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({getCartCount()} items)
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 flex flex-col h-[calc(100vh-180px)]">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Add some products to get started
              </p>
              <Button onClick={() => navigate("/shop")}>
                Browse Products
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {cartItems.map((item) => (
                  <div 
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-4 p-4 rounded-xl bg-muted/50 border border-border"
                  >
                    <img
                      src={item.imageURL || item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/products/shirt-blue.svg";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.selectedSize} / {item.selectedColor}
                      </p>
                      <p className="font-bold text-primary mt-2">${item.price}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border pt-4 mt-4 space-y-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg" onClick={() => navigate("/cart")}>
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
