import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const NavLinks = () => (
    <>
      <Link to="/" className="hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
      <Link to="/products" className="hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>Products</Link>
      
      <Link to="/cart" className="relative hover:text-accent transition-colors flex items-center" onClick={() => setIsOpen(false)}>
        <FiShoppingCart className="text-xl" />
        <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {user ? cartCount : 0}
        </span>
      </Link>

      {user ? (
        <>
          {user.role === 'user' && (
            <Link to="/profile" className="hover:text-accent transition-colors flex items-center gap-1" onClick={() => setIsOpen(false)}>
              <FiUser /> Profile
            </Link>
          )}
          {user.role === 'admin' && (
            <Link to="/admin/dashboard" className="hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
          )}
          <button onClick={handleLogout} className="text-left hover:text-accent transition-colors flex items-center gap-1">
            <FiLogOut /> Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="hover:text-accent transition-colors flex items-center gap-1" onClick={() => setIsOpen(false)}>
            <FiUser /> Login
          </Link>
          <Link to="/register" className="btn-primary text-center px-4 py-2" onClick={() => setIsOpen(false)}>Register</Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-serif text-2xl font-bold text-primary">
              G<span className="text-accent">Store</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative mr-4 text-text hover:text-accent">
              <FiShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {user ? cartCount : 0}
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text hover:text-primary focus:outline-none"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-4 flex flex-col shadow-lg">
          <NavLinks />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
