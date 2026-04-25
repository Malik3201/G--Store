import { FiCoffee, FiHeart, FiGift, FiBriefcase } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CategoryStrip = () => {
  const categories = [
    { name: 'Name Mugs', icon: FiCoffee, query: 'Mugs' },
    { name: 'Couple Mugs', icon: FiHeart, query: 'Couple Mugs' },
    { name: 'Gift Mugs', icon: FiGift, query: 'Occasions' },
    { name: 'Office Mugs', icon: FiBriefcase, query: 'Corporate' },
  ];

  return (
    <div className="bg-secondary-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link 
                key={idx} 
                to={`/products?category=${encodeURIComponent(cat.query)}`}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
              >
                <div className="bg-secondary p-4 rounded-full mb-4 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                  <Icon size={32} />
                </div>
                <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">{cat.name}</h3>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryStrip;
