import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProducts, Product } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit, Plus, Upload } from 'lucide-react';

const categories = ['Shirts', 'Trousers', 'Jackets', 'Accessories'];

export default function Admin() {
  const { user } = useAuth();
  const { products, loading, addProduct, updateProduct, deleteProduct, fetchProducts } = useProducts();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    category: '',
    imageURL: '',
    rating: '4.5',
    reviews: '0',
    isNew: false,
    isSale: false,
    colors: '',
    sizes: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      description: '',
      category: '',
      imageURL: '',
      rating: '4.5',
      reviews: '0',
      isNew: false,
      isSale: false,
      colors: '',
      sizes: ''
    });
    setImageFile(null);
    setSelectedProduct(null);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      description: product.description,
      category: product.category,
      imageURL: product.imageURL,
      rating: product.rating?.toString() || '4.5',
      reviews: product.reviews?.toString() || '0',
      isNew: product.isNew || false,
      isSale: product.isSale || false,
      colors: product.colors?.join(', ') || '',
      sizes: product.sizes?.join(', ') || ''
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        description: formData.description,
        category: formData.category,
        imageURL: formData.imageURL,
        rating: parseFloat(formData.rating),
        reviews: parseInt(formData.reviews),
        isNew: formData.isNew,
        isSale: formData.isSale,
        colors: formData.colors ? formData.colors.split(',').map(c => c.trim()) : [],
        sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()) : []
      };

      if (selectedProduct) {
        await updateProduct(selectedProduct.id, productData, imageFile || undefined);
        toast({ title: "Product updated successfully!" });
      } else {
        await addProduct(productData, imageFile || undefined);
        toast({ title: "Product added successfully!" });
      }

      resetForm();
      setIsDialogOpen(false);
      fetchProducts();
    } catch (error) {
      toast({ 
        title: "Error", 
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive" 
      });
    }
  };

  const handleDelete = async (product: Product) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(product.id, product.imageURL);
        toast({ title: "Product deleted successfully!" });
        fetchProducts();
      } catch (error) {
        toast({ 
          title: "Error", 
          description: "Failed to delete product",
          variant: "destructive" 
        });
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewURL = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, imageURL: previewURL }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your products and inventory</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {selectedProduct ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="originalPrice">Original Price ($)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="image">Product Image</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="flex-1"
                    />
                    {formData.imageURL && (
                      <img 
                        src={formData.imageURL} 
                        alt="Preview" 
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="colors">Colors (comma separated)</Label>
                    <Input
                      id="colors"
                      value={formData.colors}
                      onChange={(e) => setFormData(prev => ({ ...prev, colors: e.target.value }))}
                      placeholder="Black, White, Blue"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sizes">Sizes (comma separated)</Label>
                    <Input
                      id="sizes"
                      value={formData.sizes}
                      onChange={(e) => setFormData(prev => ({ ...prev, sizes: e.target.value }))}
                      placeholder="S, M, L, XL"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    {selectedProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <div className="grid gap-6">
              {loading ? (
                <div className="text-center py-8">Loading products...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={product.imageURL} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                        <p className="text-lg font-bold text-primary">${product.price}</p>
                        <div className="flex gap-2 mt-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDelete(product)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{products.length}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    {new Set(products.map(p => p.category)).size}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Average Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    ${products.length > 0 ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2) : '0.00'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}