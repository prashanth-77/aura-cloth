import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 400));
    const messages = JSON.parse(localStorage.getItem("aura_contact_messages") || "[]");
    messages.push({ ...formData, submittedAt: new Date().toISOString() });
    localStorage.setItem("aura_contact_messages", JSON.stringify(messages));
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@auracloth.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Mon-Fri from 9am to 6pm"
    },
    {
      icon: MapPin,
      title: "Address",
      value: "123 Fashion District, NY 10001",
      description: "Visit our flagship store"
    },
    {
      icon: Clock,
      title: "Hours",
      value: "Mon-Sat: 10am-8pm, Sun: 12pm-6pm",
      description: "Store opening hours"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you. 
            Reach out and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                      errors.name ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                      errors.email ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                    errors.subject ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="How can we help?"
                />
                {errors.subject && (
                  <p className="text-destructive text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-none ${
                    errors.message ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="Tell us more about your inquiry..."
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
                      <info.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                      <p className="text-foreground font-medium">{info.value}</p>
                      <p className="text-muted-foreground text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=123+Fashion+District+NY+10001"
              target="_blank"
              rel="noreferrer"
              className="bg-muted rounded-2xl h-64 flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="font-semibold">Find us on Google Maps</p>
                <p className="text-muted-foreground text-sm mt-1">123 Fashion District, NY 10001</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
