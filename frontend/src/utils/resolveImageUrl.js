/**
 * Resolves a product image URL.
 * - Full URLs (http/https) are returned as-is
 * - Any non-URL value falls back to a placeholder image
 */
export const resolveImageUrl = (imagePath) => {
  if (!imagePath) return 'https://placehold.co/400x400/F5F5DC/3E2723?text=G+Store';

  // Already a full URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return 'https://placehold.co/400x400/F5F5DC/3E2723?text=Image+Unavailable';
};
