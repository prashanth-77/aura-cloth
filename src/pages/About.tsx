import hero1 from '@/assets/hero-1.jpg';
import { Heart, Users, Leaf, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Crafted with Care",
      description: "Every piece is thoughtfully designed and made with attention to detail, ensuring quality that lasts."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "We listen to our customers and create pieces that reflect the needs of modern professionals."
    },
    {
      icon: Leaf,
      title: "Sustainable Fashion",
      description: "Committed to ethical practices and sustainable materials for a better future."
    },
    {
      icon: Award,
      title: "Excellence in Design",
      description: "Award-winning designs that blend timeless elegance with contemporary functionality."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            About Aura Cloth Store
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            We believe fashion should be effortless, sustainable, and accessible. Our mission is to create 
            timeless pieces that empower individuals to express their authentic style while making a positive 
            impact on the world.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Founded in 2024, Aura Cloth Store began with a simple vision: to create clothing that seamlessly 
                transitions from the boardroom to the weekend, without compromising on style or comfort.
              </p>
              <p>
                Our team of designers and craftspeople work tirelessly to source the finest materials and 
                employ innovative techniques that honor both tradition and modernity. Each piece tells a 
                story of dedication, quality, and conscious design.
              </p>
              <p>
                Today, we're proud to serve customers who value quality over quantity, sustainability over 
                fast fashion, and authentic style over fleeting trends.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src={hero1}
              alt="Our atelier"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl" />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-16">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6 group-hover:bg-accent/20 transition-colors">
                  <value.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-muted/30 rounded-3xl p-8 lg:p-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Our diverse team of designers, artisans, and sustainability experts work together 
            to bring you clothing that makes a difference.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Chen", role: "Creative Director", image: "/products/belt-leather.svg" },
              { name: "Marcus Johnson", role: "Head of Sustainability", image: "/products/tie-silk.svg" },
              { name: "Elena Rodriguez", role: "Lead Designer", image: "/products/polo-green.svg" }
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-muted-foreground">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
