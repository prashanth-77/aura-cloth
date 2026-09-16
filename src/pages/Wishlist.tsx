import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/hooks/useCart";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your bag.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-24 pb-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">My Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="p-8 rounded-2xl bg-card border border-border">
              <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-6">
                Save your favorite items here for later
              </p>
              <Button asChild>
                <Link to="/shop">Browse Products</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-card rounded-2xl overflow-hidden shadow-md border border-border">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=400";
                    }}
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.category}</span>
                  <h3 className="font-semibold text-foreground mt-1">{item.name}</h3>
                  <p className="font-bold text-lg text-foreground mt-2">${item.price}</p>
                  <div className="flex gap-2 mt-4">
                    <Button 
                      onClick={() => handleAddToCart(item)}
                      className="flex-1"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
