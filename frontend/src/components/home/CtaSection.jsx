import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="uppercase tracking-widest text-accent text-xs font-semibold">Start your custom order</p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold mt-3">Ready to Build Something Unique?</h2>
        <p className="mt-4 text-secondary-dark max-w-2xl mx-auto">
          Browse products, share your customization details, and place an order in minutes.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products" className="btn-accent px-8 py-3">Browse Products</Link>
          <Link to="/contact" className="px-8 py-3 rounded-md border border-secondary text-secondary hover:bg-white hover:text-primary transition-colors">
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
