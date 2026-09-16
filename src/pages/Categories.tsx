import { Button } from '@/components/ui/button';
import { categories, products } from '@/data/products';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Categories = () => {
  const getCategoryStats = (category: string) => {
    if (category === 'All') return products.length;
    return products.filter(p => p.category === category).length;
  };

  const getCategoryImage = (category: string) => {
    const categoryProduct = products.find(p => p.category === category);
    return categoryProduct?.image || '/products/shirt-blue.svg';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Categories
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our carefully curated collections, each designed to elevate your wardrobe with timeless pieces.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.filter(cat => cat !== 'All').map(category => (
            <div
              key={category}
              className="group relative bg-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Category Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={getCategoryImage(category)}
                  alt={category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Category Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category}</h3>
                <p className="text-white/80 mb-4">
                  {getCategoryStats(category)} items available
                </p>
                <Link to="/shop" state={{ category }}>
                  <Button variant="secondary" className="group/btn">
                    Shop {category}
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Featured Banner */}
        <div className="mt-20 bg-gradient-to-r from-accent/10 to-primary/10 rounded-3xl p-8 lg:p-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            New Season Collection
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Discover the latest trends and timeless pieces that define modern elegance. 
            Our new collection brings together comfort, style, and sustainability.
          </p>
          <Link to="/shop">
            <Button size="lg" className="rounded-full">
              Explore New Arrivals
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
