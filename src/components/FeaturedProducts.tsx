import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { products as catalogue } from "@/data/products";
import type { Product } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/context/WishlistContext";

export const FeaturedProducts = () => {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const loading = false;
  const featuredProducts: Product[] = useMemo(() => catalogue.filter(product => {
    if (filter === "New") return product.isNew;
    if (filter === "Sale") return product.isSale;
    if (filter === "Popular") return product.rating >= 4.5;
    return true;
  }).slice(0, 6).map(p => ({ ...p, id: String(p.id), imageURL: p.image })), [filter]);

  const handleToggleFavorite = (productId: string) => {
    const product = catalogue.find(item => String(item.id) === productId);
    if (product) {
      toggleWishlist({ id: productId, name: product.name, price: product.price, image: product.image, category: product.category });
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Featured Collection
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-primary via-transparent to-transparent"></div>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Future Wear
          </h2>
          
          <p className="text-xl text-foreground/70 leading-relaxed">
            Discover our most innovative pieces that blend cutting-edge technology 
            with timeless design. Each item tells a story of tomorrow's fashion today.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center mb-12">
          <div className="glass-card p-2 rounded-2xl">
            <div className="flex space-x-2">
              {['All', 'New', 'Sale', 'Popular'].map((filterOption) => (
                <Button
                  key={filterOption}
                  variant={filterOption === filter ? 'default' : 'ghost'}
                  size="sm"
                  className="relative"
                  onClick={() => setFilter(filterOption)}
                >
                  {filterOption}
                  {filterOption === 'Sale' && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full pulse-glow"></span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mt-4">Loading collection...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="opacity-0 animate-[fade-in_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={isInWishlist(product.id)}
                />
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="xl" className="group" onClick={() => navigate("/shop")}>
            View All Products
            <div className="ml-2 group-hover:translate-x-1 transition-transform">
              →
            </div>
          </Button>
        </div>

        {/* Floating Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {[
            { label: 'Premium Materials', value: '100%' },
            { label: 'Satisfied Customers', value: '50K+' },
            { label: 'Global Shipping', value: '150+' },
            { label: 'Eco Friendly', value: '🌱' }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card p-6 text-center hover-3d"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-3xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-foreground/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};