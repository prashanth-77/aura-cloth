import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  imageURL: string;
  category: string;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  isSale?: boolean;
  description: string;
  colors?: string[];
  sizes?: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
  viewMode?: 'grid' | 'list';
}

export const ProductCard = ({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  viewMode = 'grid'
}: ProductCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (viewMode === 'list') {
    return (
      <div className="group bg-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-border">
        <div className="flex">
          <div className="w-48 h-48 flex-shrink-0">
            <img
              src={product.imageURL || product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mt-1">
                    {product.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {product.isNew && (
                    <span className="bg-accent text-accent-foreground px-2 py-1 text-xs font-bold rounded-full">
                      NEW
                    </span>
                  )}
                  {product.isSale && (
                    <span className="bg-destructive text-destructive-foreground px-2 py-1 text-xs font-bold rounded-full">
                      SALE
                    </span>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center space-x-1 mb-4">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="text-sm font-medium">{product.rating || 4.5}</span>
                <span className="text-xs text-muted-foreground">({product.reviews || 0} reviews)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-foreground">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onToggleFavorite?.(product.id)}
                  className={isFavorite ? 'text-accent border-accent' : ''}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
                <Button onClick={() => onAddToCart?.(product)}>
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative bg-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.imageURL || product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
          onError={(e) => {
            if (!e.currentTarget.src.endsWith("/products/shirt-blue.svg")) {
              e.currentTarget.src = "/products/shirt-blue.svg";
            }
            setIsImageLoaded(true);
          }}
        />
        
        {/* Loading Skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse" />
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-full pulse-glow">
              NEW
            </span>
          )}
          {product.isSale && discount > 0 && (
            <span className="bg-accent text-accent-foreground px-3 py-1 text-xs font-bold rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Overlay Actions */}
        <div className={`absolute inset-0 bg-background/20 backdrop-blur-sm transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button
              variant="glass"
              size="icon"
              onClick={() => onToggleFavorite?.(product.id)}
              className={`hover-3d ${isFavorite ? 'text-accent' : ''}`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            <Button 
              variant="glass" 
              size="icon" 
              className="hover-3d"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <Button
              variant="default"
              className="w-full btn-morph"
              onClick={() => onAddToCart?.(product)}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Quick Add for Mobile */}
        <div className="lg:hidden absolute bottom-4 left-4 right-4">
          <Button
            variant="glass"
            size="sm"
            className="w-full"
            onClick={() => onAddToCart?.(product)}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{product.rating || 4.5}</span>
            <span className="text-xs text-muted-foreground">({product.reviews || 0})</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold gradient-text">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Color Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Colors:</span>
          <div className="flex space-x-1">
            {['bg-red-500', 'bg-blue-500', 'bg-gray-800', 'bg-white'].map((color, index) => (
              <button
                key={index}
                className={`w-6 h-6 rounded-full border-2 border-border hover:scale-110 transition-transform ${color} ${
                  color === 'bg-white' ? 'border-gray-300' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};