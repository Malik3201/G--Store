import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { resolveImageUrl } from '../../utils/resolveImageUrl';

const ProductCard = ({ product }) => {
  const imageUrl = resolveImageUrl(product.images?.[0]);

  return (
    <div className="card group flex flex-col h-full">
      <Link to={`/products/${product.slug}`} className="block relative overflow-hidden bg-gray-50 aspect-square">
        <img 
          src={imageUrl} 
          alt={product.title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x400/F5F5DC/3E2723?text=G+Store';
          }}
        />
        {product.discountPrice > 0 && product.discountPrice < product.price && (
          <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-sm">
            SALE
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-text-light mb-1 uppercase tracking-wider font-semibold">{product.category}</div>
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-serif text-lg font-bold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="mt-auto flex items-center space-x-2">
          {product.discountPrice > 0 && product.discountPrice < product.price ? (
            <>
              <span className="font-bold text-accent text-lg">{formatCurrency(product.discountPrice)}</span>
              <span className="text-sm text-gray-400 line-through">{formatCurrency(product.price)}</span>
            </>
          ) : (
            <span className="font-bold text-primary text-lg">{formatCurrency(product.price)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
