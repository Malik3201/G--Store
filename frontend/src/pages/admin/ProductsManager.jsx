import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Loader from '../../components/common/Loader';
import { formatCurrency } from '../../utils/formatCurrency';
import { FiEdit, FiTrash2, FiPlus, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products?all=true');
      if (data.success) setProducts(data.data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleToggleActive = async (id) => {
    try {
      const { data } = await api.patch(`/products/${id}/toggle-active`);
      if (data.success) {
        setProducts(products.map(p => p._id === id ? data.data : p));
        toast.success(`Product ${data.data.isActive ? 'activated' : 'deactivated'}`);
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) return <Loader />;

  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-800">Products</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} products total</p>
        </div>
        <Link to="/admin/products/new" className="inline-flex items-center gap-2 bg-[#3E2723] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5D4037] transition-colors shadow-sm self-start sm:self-auto">
          <FiPlus size={16} />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5 font-medium">Product</th>
                <th className="py-3.5 px-5 font-medium hidden md:table-cell">Category</th>
                <th className="py-3.5 px-5 font-medium hidden sm:table-cell">Price</th>
                <th className="py-3.5 px-5 font-medium hidden lg:table-cell">Stock</th>
                <th className="py-3.5 px-5 font-medium">Status</th>
                <th className="py-3.5 px-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.length > 0 ? products.map(product => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images?.[0] ? `${baseUrl}${product.images[0]}` : 'https://placehold.co/48x48/f5f5f5/999?text=?'}
                        alt={product.title}
                        className="w-10 h-10 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-gray-800 text-sm leading-tight">{product.title}</div>
                        {product.isFeatured && <span className="text-xs text-amber-600 font-medium">★ Featured</span>}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-gray-500 hidden md:table-cell">{product.category}</td>
                  <td className="py-3.5 px-5 hidden sm:table-cell">
                    <div className="font-semibold text-gray-800">{formatCurrency(product.discountPrice || product.price)}</div>
                    {product.discountPrice > 0 && <div className="text-xs text-gray-400 line-through">{formatCurrency(product.price)}</div>}
                  </td>
                  <td className="py-3.5 px-5 hidden lg:table-cell">
                    <span className={`text-xs font-semibold ${product.stock > 10 ? 'text-emerald-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-500'}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <button
                      onClick={() => handleToggleActive(product._id)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors ${
                        product.isActive ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {product.isActive ? <FiToggleRight size={14} /> : <FiToggleLeft size={14} />}
                      {product.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/products/edit/${product._id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <FiEdit size={16} />
                      </Link>
                      <button onClick={() => handleDelete(product._id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400">
                    <FiBox size={32} className="mx-auto mb-3 opacity-30" />
                    <p>No products yet. Add your first product!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsManager;
