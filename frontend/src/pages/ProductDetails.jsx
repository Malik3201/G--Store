import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/common/Loader';
import { formatCurrency } from '../utils/formatCurrency';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState({ printedName: '', customText: '', mugColor: '' });
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${slug}`);
        if (data.success) {
          const p = data.data;
          setProduct(p);
          if (p.images?.length > 0) setActiveImage(p.images[0]);
          if (p.customizationOptions?.availableColors?.length > 0) {
            setCustomization(prev => ({ ...prev, mugColor: p.customizationOptions.availableColors[0] }));
          }
        }
      } catch (error) {
        toast.error('Failed to load product');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug, navigate]);

  const handleCustomizationChange = (e) => {
    const { name, value } = e.target;
    if (name === 'customText' && product.customizationOptions?.maxTextLength) {
      if (value.length > product.customizationOptions.maxTextLength) return;
    }
    setCustomization({ ...customization, [name]: value });
  };

  const handleAddToCart = async (isBuyNow = false) => {
    if (!user) {
      toast.error('Please login to continue');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    
    const success = await addToCart(product._id, quantity, customization);
    if (success && isBuyNow) {
      navigate('/cart');
    }
  };

  if (loading) return <Loader />;
  if (!product) return null;

  const currentPrice = product.discountPrice || product.price;
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Images */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-50 rounded-xl overflow-hidden mb-4 border border-gray-100 shadow-sm aspect-square">
            <img 
              src={activeImage ? `${baseUrl}${activeImage}` : 'https://placehold.co/600x600/F5F5DC/3E2723?text=Product'} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${activeImage === img ? 'border-accent' : 'border-transparent'}`}
                >
                  <img src={`${baseUrl}${img}`} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="text-sm text-accent font-semibold tracking-wider uppercase mb-2">{product.category}</div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4">{product.title}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-2xl font-bold text-primary">{formatCurrency(currentPrice)}</span>
            {product.discountPrice > 0 && product.discountPrice < product.price && (
              <span className="text-lg text-gray-400 line-through">{formatCurrency(product.price)}</span>
            )}
            <span className={`px-2 py-1 text-xs rounded-full font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
            </span>
          </div>

          <p className="text-text-light mb-8 whitespace-pre-wrap">{product.description}</p>

          <div className="bg-secondary p-6 rounded-xl border border-secondary-dark mb-8 shadow-sm">
            <h3 className="font-bold text-primary mb-4">Customization Options</h3>
            
            <div className="space-y-4">
              {product.customizationOptions?.allowNamePrint && (
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Name to Print</label>
                  <input 
                    type="text" 
                    name="printedName" 
                    value={customization.printedName} 
                    onChange={handleCustomizationChange} 
                    className="input-field" 
                    placeholder="e.g. Ali"
                  />
                </div>
              )}

              {product.customizationOptions?.allowCustomText && (
                <div>
                  <label className="block text-sm font-medium text-text mb-1 flex justify-between">
                    <span>Custom Text/Quote</span>
                    {product.customizationOptions.maxTextLength && (
                      <span className="text-gray-400 text-xs">Max {product.customizationOptions.maxTextLength} chars</span>
                    )}
                  </label>
                  <textarea 
                    name="customText" 
                    value={customization.customText} 
                    onChange={handleCustomizationChange} 
                    rows="2" 
                    className="input-field resize-none" 
                    placeholder="Enter your message..."
                  />
                </div>
              )}

              {product.customizationOptions?.availableColors?.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Mug Color</label>
                  <div className="flex space-x-3">
                    {product.customizationOptions.availableColors.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setCustomization({ ...customization, mugColor: color })}
                        className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                          customization.mugColor === color 
                            ? 'bg-primary text-white border-primary' 
                            : 'bg-white text-text border-gray-300 hover:border-primary'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-end gap-4 mt-auto">
            <div className="w-full sm:w-24">
              <label className="block text-sm font-medium text-text mb-1">Quantity</label>
              <input 
                type="number" 
                min="1" 
                max={product.stock} 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                className="input-field text-center"
              />
            </div>
            <div className="flex flex-1 gap-4 w-full">
              <button 
                onClick={() => handleAddToCart(false)} 
                disabled={product.stock < 1}
                className="flex-1 btn-primary py-3 px-2 text-sm sm:text-base font-bold whitespace-nowrap"
              >
                Add to Cart
              </button>
              <button 
                onClick={() => handleAddToCart(true)} 
                disabled={product.stock < 1}
                className="flex-1 btn-accent py-3 px-2 text-sm sm:text-base font-bold whitespace-nowrap"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
