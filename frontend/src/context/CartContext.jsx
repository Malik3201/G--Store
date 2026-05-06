import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) {
      setCart(null);
      return;
    }

    // Admin sessions do not use customer cart endpoints.
    if (user.role === 'admin') {
      setCart(null);
      return;
    }
    try {
      const response = await api.get('/cart');
      if (response.data.success) {
        setCart(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch cart', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity, customization) => {
    if (!user) {
      toast.error('Please login to add to cart');
      return false;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/cart/add', { productId, quantity, customization });
      if (response.data.success) {
        setCart(response.data.data);
        toast.success('Added to cart');
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    setLoading(true);
    try {
      const response = await api.put(`/cart/item/${itemId}`, { quantity });
      if (response.data.success) {
        setCart(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (itemId) => {
    setLoading(true);
    try {
      const response = await api.delete(`/cart/item/${itemId}`);
      if (response.data.success) {
        setCart(response.data.data);
        toast.success('Item removed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove item');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      const response = await api.delete('/cart/clear');
      if (response.data.success) {
        setCart(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  const cartCount = cart?.items?.length || 0;

  return (
    <CartContext.Provider value={{ cart, cartCount, loading, addToCart, updateCartItem, removeCartItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
