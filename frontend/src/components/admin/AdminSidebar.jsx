import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiBox, FiSettings, FiShoppingCart, FiLogOut, FiX } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AdminSidebar = ({ onClose }) => {
  const { pathname } = useLocation();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: FiHome },
    { name: 'Products', path: '/admin/products', icon: FiBox },
    { name: 'Orders', path: '/admin/orders', icon: FiShoppingCart },
    { name: 'Settings', path: '/admin/settings', icon: FiSettings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="w-64 bg-[#2c1810] text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/10">
        <h2 className="text-xl font-serif font-bold">
          G<span className="text-[#C4A882]">Store</span>
          <span className="text-white/60 text-sm font-normal ml-2">Admin</span>
        </h2>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-white/50 hover:text-white">
            <FiX size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive
                  ? 'bg-[#C4A882] text-[#2c1810] shadow-md'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 text-sm font-medium"
        >
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
