import { HeroBanner } from "@/components/HeroBanner";
import { FeaturedProducts } from "@/components/FeaturedProducts";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroBanner />
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Footer Placeholder */}
      <footer className="glass-card mt-20 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="gradient-text text-2xl font-bold mb-4">
            Aura Cloth Store
          </div>
          <p className="text-foreground/60">
            Redefining fashion for the digital age
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
