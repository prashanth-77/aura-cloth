import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Package, LogOut, Calendar, Truck, Clock, MapPin, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, loading, logout } = useAuth();
  const { orders, clearOrders } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Shipping Address State with phone number
  const [shippingAddress, setShippingAddress] = useState(() => {
    const savedAddress = localStorage.getItem("aura_shipping_address");
    if (savedAddress) {
      try {
        return JSON.parse(savedAddress);
      } catch (e) {
        console.error("Failed to parse shipping address", e);
      }
    }
    return {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
    };
  });

  // Auto-save shipping address to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("aura_shipping_address", JSON.stringify(shippingAddress));
  }, [shippingAddress]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleSaveAddress = () => {
    localStorage.setItem("aura_shipping_address", JSON.stringify(shippingAddress));
    toast({
      title: "Address Saved",
      description: "Your shipping address has been updated.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Processing</Badge>;
      case "shipped":
        return <Badge variant="default"><Truck className="w-3 h-3 mr-1" />Shipped</Badge>;
      case "delivered":
        return <Badge className="bg-green-500"><Package className="w-3 h-3 mr-1" />Delivered</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{user.displayName || "User"}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                    <p className="text-xs text-muted-foreground mt-1">UID: {user.uid}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Shipping Address Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <CardTitle>Shipping Address</CardTitle>
                  <CardDescription>Manage your delivery address</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    placeholder="123 Main Street, Apt 4B"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, street: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    placeholder="NY"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                  <Input
                    id="zipCode"
                    placeholder="10001"
                    value={shippingAddress.zipCode}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="United States"
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, country: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="1234567890"
                    value={shippingAddress.phone}
                    onChange={(e) => {
                      // Only allow numeric input
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setShippingAddress(prev => ({ ...prev, phone: value }));
                    }}
                    className="mt-1"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">Numbers only - for delivery updates</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <Button onClick={handleSaveAddress}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Address
                </Button>
                <span className="text-sm text-muted-foreground">Auto-saved as you type</span>
              </div>
            </CardContent>
          </Card>

          {/* Past Order History Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-primary" />
                  <div>
                    <CardTitle>Past Order History</CardTitle>
                    <CardDescription>Track your recent orders and deliveries</CardDescription>
                  </div>
                </div>
                {orders.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearOrders}>
                    Clear All
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start shopping to see your orders here
                  </p>
                  <Button onClick={() => navigate("/shop")}>
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Order Date
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            <Truck className="w-4 h-4" />
                            Expected Delivery
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img 
                                src={order.product.imageURL || order.product.image} 
                                alt={order.product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/products/shirt-blue.svg";
                                }}
                              />
                              <div>
                                <p className="font-medium">{order.product.name}</p>
                                <p className="text-sm text-muted-foreground">{order.product.category}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">${order.product.price}</TableCell>
                          <TableCell>{order.orderDate.toLocaleDateString()}</TableCell>
                          <TableCell>{order.receivingDate.toLocaleDateString()}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
