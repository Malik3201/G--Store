import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-primary text-secondary pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">G<span className="text-accent">Store</span></h3>
            <p className="text-sm text-secondary-dark leading-relaxed">
              Premium customized mugs for every occasion. We print your memories with care and ship them directly to your door.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-secondary-dark">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-accent transition-colors">Shop Mugs</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Customer Service</h4>
            <ul className="space-y-2 text-sm text-secondary-dark">
              <li><Link to="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-accent transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-accent transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="bg-primary-light p-2 rounded-full hover:bg-accent transition-colors text-white">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="bg-primary-light p-2 rounded-full hover:bg-accent transition-colors text-white">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="bg-primary-light p-2 rounded-full hover:bg-accent transition-colors text-white">
                <FiTwitter size={20} />
              </a>
            </div>
            <p className="text-sm text-secondary-dark">Subscribe to our newsletter for updates and offers.</p>
          </div>
        </div>
        <div className="border-t border-primary-light pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-secondary-dark">
            &copy; {new Date().getFullYear()} G Store. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4 text-sm text-secondary-dark">
            <span>Designed for Premium Quality</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
