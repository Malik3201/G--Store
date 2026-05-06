import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    stock: '',
    isFeatured: false,
    isActive: true,
    allowNamePrint: false,
    allowCustomText: false,
    maxTextLength: 30,
    availableColors: 'White',
    imageLinks: ''
  });

  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          const { data } = await api.get(`/products/id/${id}`);
          if (data.success) {
            const p = data.data;
            setFormData({
              title: p.title || '',
              description: p.description || '',
              price: p.price || '',
              discountPrice: p.discountPrice || '',
              category: p.category || '',
              stock: p.stock || 0,
              isFeatured: p.isFeatured || false,
              isActive: p.isActive !== false,
              allowNamePrint: p.customizationOptions?.allowNamePrint || false,
              allowCustomText: p.customizationOptions?.allowCustomText || false,
              maxTextLength: p.customizationOptions?.maxTextLength || 30,
              availableColors: p.customizationOptions?.availableColors?.join(', ') || 'White',
              imageLinks: (p.images || []).join('\n')
            });
          }
        } catch {
          toast.error('Failed to load product');
          navigate('/admin/products');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, navigate, isEditing]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      stock: formData.stock,
      isFeatured: formData.isFeatured,
      isActive: formData.isActive,
      imageLinks: formData.imageLinks
    };
    if (formData.discountPrice) payload.discountPrice = formData.discountPrice;

    const customizationOptions = {
      allowNamePrint: formData.allowNamePrint,
      allowCustomText: formData.allowCustomText,
      maxTextLength: parseInt(formData.maxTextLength) || 30,
      availableColors: formData.availableColors.split(',').map(c => c.trim()).filter(Boolean)
    };
    payload.customizationOptions = customizationOptions;

    try {
      if (isEditing) {
        await api.put(`/products/${id}`, payload);
        toast.success('Product updated');
      } else {
        await api.post('/products', payload);
        toast.success('Product created');
      }
      navigate('/admin/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-primary mb-8">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text mb-1">Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="input-field" />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text mb-1">Description</label>
            <textarea name="description" required rows="4" value={formData.description} onChange={handleChange} className="input-field resize-y" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Price (PKR)</label>
            <input type="number" name="price" required min="0" value={formData.price} onChange={handleChange} className="input-field" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Discount Price (Optional)</label>
            <input type="number" name="discountPrice" min="0" value={formData.discountPrice} onChange={handleChange} className="input-field" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Category</label>
            <input type="text" name="category" required value={formData.category} onChange={handleChange} className="input-field" placeholder="e.g. Mugs, Occasions" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Stock</label>
            <input type="number" name="stock" required min="0" value={formData.stock} onChange={handleChange} className="input-field" />
          </div>

          <div className="md:col-span-2 pt-4 border-t border-gray-100">
            <h3 className="font-bold text-primary mb-4">Customization & Settings</h3>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="allowNamePrint" checked={formData.allowNamePrint} onChange={handleChange} className="rounded text-primary focus:ring-primary h-4 w-4" />
              <span className="text-sm font-medium text-text">Allow Name Print</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="allowCustomText" checked={formData.allowCustomText} onChange={handleChange} className="rounded text-primary focus:ring-primary h-4 w-4" />
              <span className="text-sm font-medium text-text">Allow Custom Text</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Max Text Length</label>
            <input type="number" name="maxTextLength" min="1" value={formData.maxTextLength} onChange={handleChange} className="input-field" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Available Colors (Comma separated)</label>
            <input type="text" name="availableColors" value={formData.availableColors} onChange={handleChange} className="input-field" placeholder="White, Black, Red" />
          </div>

          <div>
            <label className="flex items-center space-x-2 mt-6">
              <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="rounded text-primary focus:ring-primary h-4 w-4" />
              <span className="text-sm font-medium text-text">Featured Product</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2 mt-6">
              <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="rounded text-primary focus:ring-primary h-4 w-4" />
              <span className="text-sm font-medium text-text">Active (Visible to customers)</span>
            </label>
          </div>

          <div className="md:col-span-2 pt-4 border-t border-gray-100">
            <label className="block text-sm font-medium text-text mb-2">Product Image Links</label>
            <textarea
              name="imageLinks"
              rows="5"
              value={formData.imageLinks}
              onChange={handleChange}
              className="input-field resize-y"
              placeholder={'Paste one direct image URL per line\nhttps://images.unsplash.com/photo-...\nhttps://cdn.example.com/product-2.jpg'}
            />
            <p className="text-xs text-text-light mt-2">Only image URLs are supported. Multiple links allowed, one per line. No file upload is used.</p>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
          <button type="button" onClick={() => navigate('/admin/products')} className="btn-secondary">Cancel</button>
          <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save Product'}</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
