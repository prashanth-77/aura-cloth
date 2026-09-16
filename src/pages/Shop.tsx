import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/context/WishlistContext";
import { products, categories } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const initialCategory = (location.state as { category?: string } | null)?.category || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => searchInputRef.current?.focus(), 150);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => products.filter(product => {
    const categoryMatch = activeCategory === "All" || product.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    return categoryMatch && (!q || product.name.toLowerCase().includes(q) || product.category.toLowerCase().includes(q));
  }), [activeCategory, searchQuery]);

  const handleAddToCart = (product: typeof products[number]) => {
    addToCart({ ...product, id: String(product.id), imageURL: product.image });
    toast({ title: "Added to cart!", description: `${product.name} has been added to your bag.` });
  };

  const handleWishlist = (product: typeof products[number]) => {
    toggleWishlist({ id: String(product.id), name: product.name, price: product.price, image: product.image, category: product.category });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold uppercase tracking-[0.25em] text-sm mb-3">Aura Cloth Store</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">Shop Collection</h1>
            <p className="text-muted-foreground mt-3">Timeless essentials, made for everyday style.</p>
          </div>
          <div className="max-w-xl mx-auto mb-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input ref={searchInputRef} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search shirts, trousers, jackets..." className="pl-12 h-12 rounded-full" />
          </div>
          <div className="flex justify-center gap-3 flex-wrap mb-10">
            {categories.map(category => (
              <button key={category} onClick={() => setActiveCategory(category)} className={`px-5 py-2 rounded-full text-sm font-semibold transition ${activeCategory === category ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{category}</button>
            ))}
          </div>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20"><h3 className="text-xl font-semibold">No products found</h3><p className="text-muted-foreground mt-2">Try another search or category.</p><Button className="mt-5" onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}>Clear Filters</Button></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {filteredProducts.map(product => (
                <div key={product.id} className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-shadow">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button onClick={() => handleWishlist(product)} className="absolute top-4 right-4 p-2.5 rounded-full bg-background/85 backdrop-blur-sm">
                      <Heart className={`h-5 w-5 ${isInWishlist(String(product.id)) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                    </button>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="w-full" onClick={() => handleAddToCart(product)}><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</Button>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</span>
                    <h3 className="font-semibold text-lg mt-1">{product.name}</h3>
                    <div className="flex items-center justify-between mt-3"><span className="font-bold text-lg">${product.price}</span><span className="text-sm text-muted-foreground">★ {product.rating}</span></div>
                    <Button variant="outline" className="w-full mt-4" onClick={() => navigate(`/product/${product.id}`)}>View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
