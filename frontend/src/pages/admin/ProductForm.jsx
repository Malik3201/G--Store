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
    availableColors: 'White'
  });
  const [images, setImages] = useState(null);

  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          const { data } = await api.get(`/products/${id}`); // Assuming /products/:id exists
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
              availableColors: p.customizationOptions?.availableColors?.join(', ') || 'White'
            });
          }
        } catch (error) {
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

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('description', formData.description);
    payload.append('price', formData.price);
    if (formData.discountPrice) payload.append('discountPrice', formData.discountPrice);
    payload.append('category', formData.category);
    payload.append('stock', formData.stock);
    payload.append('isFeatured', formData.isFeatured);
    payload.append('isActive', formData.isActive);

    const customizationOptions = {
      allowNamePrint: formData.allowNamePrint,
      allowCustomText: formData.allowCustomText,
      maxTextLength: parseInt(formData.maxTextLength) || 30,
      availableColors: formData.availableColors.split(',').map(c => c.trim()).filter(Boolean)
    };
    payload.append('customizationOptions', JSON.stringify(customizationOptions));

    if (images) {
      for (let i = 0; i < images.length; i++) {
        payload.append('images', images[i]);
      }
    }

    try {
      if (isEditing) {
        await api.put(`/products/${id}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Product updated');
      } else {
        await api.post('/products', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
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
            <label className="block text-sm font-medium text-text mb-2">Product Images</label>
            <input 
              type="file" 
              multiple 
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-white hover:file:bg-primary transition-colors cursor-pointer"
            />
            <p className="text-xs text-text-light mt-2">Select multiple images. The first image will be the main one. Re-uploading replaces existing images.</p>
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
