import { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  imageURL: string;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  isSale?: boolean;
  colors?: string[];
  sizes?: string[];
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // If Firebase is not initialized, return mock data
  if (!db || !storage) {
    return {
      products: [],
      loading: false,
      error: 'Firebase not configured',
      fetchProducts: async () => {},
      addProduct: async () => '',
      updateProduct: async () => {},
      deleteProduct: async () => {}
    };
  }

  const fetchProducts = async (category?: string, searchTerm?: string) => {
    try {
      setLoading(true);
      let q = query(collection(db, 'products'), orderBy('name'));
      
      if (category && category !== 'All') {
        q = query(collection(db, 'products'), where('category', '==', category), orderBy('name'));
      }
      
      const querySnapshot = await getDocs(q);
      let productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      if (searchTerm) {
        productList = productList.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setProducts(productList);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData: Omit<Product, 'id'>, imageFile?: File) => {
    try {
      let imageURL = productData.imageURL;
      
      if (imageFile) {
        const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageURL = await getDownloadURL(snapshot.ref);
      }

      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        imageURL,
        createdAt: new Date()
      });

      return docRef.id;
    } catch (err) {
      throw new Error('Failed to add product');
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>, imageFile?: File) => {
    try {
      let updateData = { ...productData };
      
      if (imageFile) {
        const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        updateData.imageURL = await getDownloadURL(snapshot.ref);
      }

      await updateDoc(doc(db, 'products', id), {
        ...updateData,
        updatedAt: new Date()
      });
    } catch (err) {
      throw new Error('Failed to update product');
    }
  };

  const deleteProduct = async (id: string, imageURL?: string) => {
    try {
      // Delete image from storage if exists
      if (imageURL) {
        try {
          const imageRef = ref(storage, imageURL);
          await deleteObject(imageRef);
        } catch (err) {
          console.warn('Failed to delete image from storage:', err);
        }
      }

      await deleteDoc(doc(db, 'products', id));
    } catch (err) {
      throw new Error('Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct
  };
};