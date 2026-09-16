import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  onAuthStateChanged
} from 'firebase/auth';
import { googleProvider } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, 
      (user) => {
        setUser(user);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name?: string) => {
    if (!auth || !db) throw new Error('Firebase not configured');
    
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        name: name || result.user.displayName || '',
        createdAt: new Date(),
        isAdmin: false
      });
      
      return result;
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase not configured');
    
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    if (!auth || !db || !googleProvider) throw new Error('Firebase not configured');
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Check if user document exists, if not create it
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          name: result.user.displayName || '',
          createdAt: new Date(),
          isAdmin: false
        });
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) throw new Error('Firebase not configured');
    
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const isAdmin = async (user: User) => {
    if (!db) return false;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      return userDoc.exists() ? userDoc.data()?.isAdmin || false : false;
    } catch (error) {
      return false;
    }
  };

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    isAdmin
  };
};