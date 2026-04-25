/**
 * Resolves a product image URL.
 * - Images stored in /products/ are served from the frontend (Vercel CDN)
 * - Images stored in /uploads/ are served from the backend Express server
 * - Full URLs (http/https) are returned as-is (e.g., Cloudinary)
 */
export const resolveImageUrl = (imagePath) => {
  if (!imagePath) return 'https://placehold.co/400x400/F5F5DC/3E2723?text=G+Store';

  // Already a full URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Default seed images → served from Vercel's frontend public folder
  if (imagePath.startsWith('/products/')) {
    return imagePath; // Vite/Vercel serves these from frontend/public/
  }

  // Uploaded images → served from backend Express
  const backendUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
  return `${backendUrl}${imagePath}`;
};
