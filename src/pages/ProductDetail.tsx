import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { products as catalogue } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
  reviews?: number;
  colors?: string[];
  sizes?: string[];
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    const found = catalogue.find(item => String(item.id) === id);
    if (found) {
      setProduct({ ...found, id: String(found.id), imageURL: found.image });
      setSelectedSize(found.sizes?.[0] || "M");
      setSelectedColor(found.colors?.[0] || "Default");
    }
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, selectedSize, selectedColor);
      toast.success("Added to cart!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
            <Button onClick={() => navigate("/shop")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/shop")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-muted">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  )}
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      const image = e.currentTarget;
                      if (image.src.endsWith("/products/shirt-blue.svg")) {
                        setImageLoaded(true);
                        return;
                      }
                      image.src = "/products/shirt-blue.svg";
                      setImageLoaded(true);
                    }}
                  />
                  {(product.isNew || product.isSale) && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      {product.isNew && (
                        <Badge variant="secondary" className="bg-green-500 text-white">
                          NEW
                        </Badge>
                      )}
                      {product.isSale && (
                        <Badge variant="destructive">
                          SALE
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <Badge variant="outline" className="mb-4">{product.category}</Badge>
              
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < product.rating! 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.rating}/5)</span>
                </div>
              )}
              
              <p className="text-4xl font-bold text-primary mb-6">₹{product.price}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {(product.sizes?.length || product.colors?.length) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.sizes?.length ? (
                  <div>
                    <label htmlFor="size" className="block text-sm font-medium mb-2">Size</label>
                    <select id="size" value={selectedSize}
                      onChange={e => setSelectedSize(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2">
                      {product.sizes.map(size => <option key={size}>{size}</option>)}
                    </select>
                  </div>
                ) : null}
                {product.colors?.length ? (
                  <div>
                    <label htmlFor="color" className="block text-sm font-medium mb-2">Color</label>
                    <select id="color" value={selectedColor}
                      onChange={e => setSelectedColor(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2">
                      {product.colors.map(color => <option key={color}>{color}</option>)}
                    </select>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1"
                size="lg"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="px-4"
                aria-label="Toggle wishlist"
                onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.imageURL, category: product.category })}
              >
                <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current text-accent" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;