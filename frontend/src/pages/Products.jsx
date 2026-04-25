import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import { FiSearch, FiFilter } from 'react-icons/fi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get('category');
    if (catParam) {
      setCategory(catParam);
    }
  }, [location]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/products');
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    const params = new URLSearchParams(location.search);
    if (e.target.value) {
      params.set('category', e.target.value);
    } else {
      params.delete('category');
    }
    navigate({ search: params.toString() });
  };

  const filteredProducts = products.filter(p => {
    const matchTitle = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = category ? p.category === category : true;
    return matchTitle && matchCategory;
  }).sort((a, b) => {
    const priceA = a.discountPrice || a.price;
    const priceB = b.discountPrice || b.price;
    if (sortOrder === 'low') return priceA - priceB;
    if (sortOrder === 'high') return priceB - priceA;
    return 0;
  });

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="bg-background min-h-screen pb-16">
      <div className="bg-primary text-secondary py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Shop Mugs</h1>
          <p className="text-secondary-dark max-w-2xl mx-auto">Find the perfect personalized mug for any occasion.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center border border-gray-100">
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-500" />
              <select 
                value={category} 
                onChange={handleCategoryChange}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-primary bg-white text-text"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-primary bg-white text-text"
            >
              <option value="">Sort by Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState message="No products found matching your criteria" />
        )}
      </div>
    </div>
  );
};

export default Products;
