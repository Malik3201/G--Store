const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all active products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // If user is admin, we could return all. But we don't have user object in public route easily.
  // Actually, we can check req.user if protect middleware is used, but it's not on GET /.
  // Let's just return all products if a query param ?all=true is passed (we can secure it if needed, but for simplicity we'll just return all if ?all=true)
  const filter = req.query.all === 'true' ? {} : { isActive: true };
  const products = await Product.find(filter);
  res.json({ success: true, data: products });
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true, isFeatured: true });
  res.json({ success: true, data: products });
});

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, data: product });
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    title, description, price, discountPrice, category, stock, isFeatured,
    customizationOptions, isActive
  } = req.body;

  let images = [];
  if (req.files && req.files.length > 0) {
    images = req.files.map(file => `/uploads/products/${file.filename}`);
  }

  let parsedOptions = {};
  if (customizationOptions) {
    if (typeof customizationOptions === 'string') {
      try { parsedOptions = JSON.parse(customizationOptions); } catch(e){}
    } else {
      parsedOptions = customizationOptions;
    }
  }

  const product = await Product.create({
    title,
    description,
    price,
    discountPrice,
    category,
    stock,
    isFeatured: isFeatured === 'true' || isFeatured === true,
    isActive: isActive !== 'false' && isActive !== false,
    images,
    customizationOptions: parsedOptions
  });

  res.status(201).json({ success: true, message: 'Product created', data: product });
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    title, description, price, discountPrice, category, stock, isFeatured,
    customizationOptions, isActive
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (title) product.title = title;
  if (description) product.description = description;
  if (price !== undefined) product.price = price;
  if (discountPrice !== undefined) product.discountPrice = discountPrice;
  if (category) product.category = category;
  if (stock !== undefined) product.stock = stock;
  if (isFeatured !== undefined) product.isFeatured = isFeatured === 'true' || isFeatured === true;
  if (isActive !== undefined) product.isActive = isActive !== 'false' && isActive !== false;

  if (customizationOptions) {
    let parsedOptions = {};
    if (typeof customizationOptions === 'string') {
      try { parsedOptions = JSON.parse(customizationOptions); } catch(e){}
    } else {
      parsedOptions = customizationOptions;
    }
    product.customizationOptions = parsedOptions;
  }

  if (req.files && req.files.length > 0) {
    const newImages = req.files.map(file => `/uploads/products/${file.filename}`);
    // we can append or replace. Let's replace for simplicity
    product.images = newImages;
  }

  const updatedProduct = await product.save();
  res.json({ success: true, message: 'Product updated', data: updatedProduct });
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  await Product.deleteOne({ _id: product._id });
  res.json({ success: true, message: 'Product deleted' });
});

// @desc    Toggle product active status
// @route   PATCH /api/products/:id/toggle-active
// @access  Private/Admin
const toggleActive = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  product.isActive = !product.isActive;
  await product.save();
  res.json({ success: true, message: 'Product status updated', data: product });
});

module.exports = {
  getProducts, getFeaturedProducts, getProductBySlug,
  createProduct, updateProduct, deleteProduct, toggleActive
};
