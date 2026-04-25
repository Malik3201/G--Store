import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { formatCurrency } from '../utils/formatCurrency';
import { resolveImageUrl } from '../utils/resolveImageUrl';
import EmptyState from '../components/common/EmptyState';
import { FiShoppingCart, FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, updateCartItem, removeCartItem, clearCart, fetchCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to checkout');
      return;
    }
    if (!cart || cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      const { data } = await api.get('/users/profile');
      const profile = data.data;
      if (!profile.name || !profile.phone || !profile.address) {
        toast.error('Please complete your profile to checkout');
        navigate('/profile');
        return;
      }

      toast.loading('Preparing your order...', { id: 'checkout' });
      const orderRes = await api.post('/orders/checkout-whatsapp');
      
      if (orderRes.data.success) {
        toast.success('Order ready! Redirecting to WhatsApp...', { id: 'checkout' });
        await fetchCart(); // refresh cart state
        window.open(orderRes.data.data.whatsappUrl, '_blank');
        navigate('/products'); // Redirect user back to shop
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Checkout failed', { id: 'checkout' });
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <EmptyState message="Your cart is empty" icon={FiShoppingCart} />
        <Link to="/products" className="btn-accent mt-4">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-primary mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-text-light uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
              <div className="col-span-1"></div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {cart.items.map(item => (
                <div key={item._id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 sm:items-center">
                  <div className="col-span-1 sm:col-span-6 flex gap-4">
                    <img 
                      src={resolveImageUrl(item.product?.images?.[0])}
                      alt={item.product?.title} 
                      className="w-20 h-20 object-cover rounded-md border border-gray-100"
                    />
                    <div>
                      <h3 className="font-bold text-primary mb-1">{item.product?.title}</h3>
                      <div className="text-sm text-text-light mb-1">{formatCurrency(item.priceSnapshot)}</div>
                      {item.customization && (
                        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-md">
                          {item.customization.printedName && <div>Name: {item.customization.printedName}</div>}
                          {item.customization.customText && <div>Text: {item.customization.customText}</div>}
                          {item.customization.mugColor && <div>Color: {item.customization.mugColor}</div>}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-span-1 sm:col-span-3 flex sm:justify-center items-center">
                    <div className="flex border border-gray-300 rounded-md overflow-hidden">
                      <button 
                        onClick={() => updateCartItem(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-text transition-colors disabled:opacity-50"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="px-4 py-1 border-x border-gray-300 text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartItem(item._id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-text transition-colors"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-1 sm:col-span-2 text-left sm:text-right font-bold text-primary">
                    {formatCurrency(item.priceSnapshot * item.quantity)}
                  </div>
                  
                  <div className="col-span-1 flex justify-end">
                    <button 
                      onClick={() => removeCartItem(item._id)}
                      className="text-red-400 hover:text-red-600 p-2 transition-colors"
                      title="Remove item"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between">
              <Link to="/products" className="text-primary font-medium hover:text-accent transition-colors">
                ← Continue Shopping
              </Link>
              <button onClick={clearCart} className="text-text-light hover:text-red-500 transition-colors text-sm">
                Clear Cart
              </button>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-serif font-bold text-primary mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-text">
                <span>Subtotal</span>
                <span className="font-medium">{formatCurrency(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-text">
                <span>Shipping</span>
                <span className="text-sm text-gray-500">Calculated on WhatsApp</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between">
                <span className="font-bold text-primary text-lg">Estimated Total</span>
                <span className="font-bold text-accent text-xl">{formatCurrency(cart.total)}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout} 
              className="w-full btn-accent py-4 text-lg font-bold flex items-center justify-center space-x-2"
            >
              <span>Buy Now via WhatsApp</span>
            </button>
            
            <div className="mt-4 text-center text-xs text-text-light">
              You will be redirected to WhatsApp to confirm your order with our team.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
