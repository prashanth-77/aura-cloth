import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X, Search, User, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CartDrawer } from "@/components/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/context/WishlistContext";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/profile", label: "Profile" },
    { href: "/login", label: "Login" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-card backdrop-blur-xl' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-primary-foreground font-bold text-lg lg:text-xl">A</span>
            </div>
            <span className="gradient-text text-xl lg:text-2xl font-bold">
              Aura Cloth Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/shop">
                  <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/wishlist">
                  <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                    {getWishlistCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                        {getWishlistCount()}
                      </span>
                    )}
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Wishlist</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>My Account</p>
              </TooltipContent>
            </Tooltip>
            
            <CartDrawer />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <CartDrawer 
              trigger={
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                      {getCartCount()}
                    </span>
                  )}
                </Button>
              }
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover-3d"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="glass-card mt-4 p-4 rounded-xl space-y-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                className="block text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-4 pt-4 border-t border-border/20">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link to="/shop">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link to="/wishlist">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link to="/profile">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
