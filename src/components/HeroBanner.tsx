import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Play, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  gradient: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Future of Fashion",
    subtitle: "AURA COLLECTION 2024",
    description: "Experience clothing that adapts to your lifestyle with revolutionary smart fabrics",
    image: hero1,
    gradient: "from-primary/20 via-secondary/20 to-accent/20"
  },
  {
    id: 2,
    title: "Sustainable Style",
    subtitle: "ECO-LUXURY SERIES",
    description: "Premium materials crafted with 100% sustainable processes for conscious consumers",
    image: hero2,
    gradient: "from-secondary/20 via-accent/20 to-primary/20"
  },
  {
    id: 3,
    title: "Urban Evolution",
    subtitle: "STREET TECH WEAR",
    description: "Where street style meets cutting-edge technology for the modern urban explorer",
    image: hero3,
    gradient: "from-accent/20 via-primary/20 to-secondary/20"
  }
];

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const navigate = useNavigate();

  const handleExploreCollection = () => {
    navigate("/shop");
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          <img 
            src={slide.image} 
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-xl float" 
               style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-secondary/15 blur-lg float" 
               style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/4 w-40 h-40 rounded-full bg-accent/8 blur-2xl float" 
               style={{ animationDelay: '2s' }} />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex items-center">
        <div className="max-w-4xl">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-700 ${
                index === currentSlide 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8 absolute'
              }`}
            >
              <div className="space-y-6">
                {/* Subtitle */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="text-accent-glow font-semibold tracking-wider text-sm lg:text-base">
                    {slide.subtitle}
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-6xl lg:text-8xl font-bold gradient-text leading-none">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="text-xl lg:text-2xl text-foreground/80 max-w-2xl leading-relaxed">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                  <Button variant="hero" size="xl" className="group" onClick={handleExploreCollection}>
                    Explore Collection
                    <div className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </div>
                  </Button>
                  <Button variant="outline" size="xl" onClick={() => setIsStoryOpen(true)}>
                    <Play className="mr-2 h-5 w-5" />
                    Watch Story
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-8 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">50K+</div>
                    <div className="text-sm text-foreground/60">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">100%</div>
                    <div className="text-sm text-foreground/60">Sustainable</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">24/7</div>
                    <div className="text-sm text-foreground/60">Support</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          <Button
            variant="glass"
            size="icon"
            onClick={prevSlide}
            className="hover-3d"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-12 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary pulse-glow' 
                    : 'bg-foreground/20 hover:bg-foreground/40'
                }`}
              />
            ))}
          </div>

          <Button
            variant="glass"
            size="icon"
            onClick={nextSlide}
            className="hover-3d"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="flex flex-col items-center space-y-2 text-foreground/60">
          <span className="text-sm rotate-90 transform origin-center">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent animate-pulse" />
        </div>
      </div>

      {/* Brand Story Modal */}
      <Dialog open={isStoryOpen} onOpenChange={setIsStoryOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text">Our Brand Story</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="aspect-video bg-muted rounded-xl overflow-hidden relative">
              <img 
                src={hero1} 
                alt="Brand Story" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-primary-foreground ml-1" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Redefining Fashion for the Digital Age</h3>
              <p className="text-muted-foreground leading-relaxed">
                Aura Cloth Store was born from a vision to blend cutting-edge technology with timeless style. 
                Our journey began in 2020 when a group of designers and tech enthusiasts came together 
                to create clothing that adapts to your lifestyle.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every piece in our collection is crafted with sustainable materials and innovative 
                smart fabrics that respond to your environment. We believe fashion should be both 
                beautiful and responsible.
              </p>
              <div className="flex gap-4 pt-4">
                <Button onClick={() => { setIsStoryOpen(false); navigate("/shop"); }}>
                  Shop Now
                </Button>
                <Button variant="outline" onClick={() => setIsStoryOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};