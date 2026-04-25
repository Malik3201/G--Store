import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(email, password, false);
    setIsLoading(false);
    if (success) {
      const from = location.state?.from || '/products';
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3E2723] via-[#5D4037] to-[#8D6E63] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden">
        
        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-b from-[#2c1810] to-[#3E2723] p-12 text-white">
          <div>
            <Link to="/" className="font-serif text-3xl font-bold text-white">
              G<span className="text-[#C4A882]">Store</span>
            </Link>
            <p className="text-[#C4A882] text-sm mt-1 tracking-widest uppercase">Premium Customized Mugs</p>
          </div>
          <div>
            <h2 className="text-4xl font-serif font-bold leading-tight mb-4">
              Welcome <br />Back
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Sign in to access your cart, track orders, and enjoy a personalized shopping experience.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#C4A882]/20 flex items-center justify-center text-2xl">☕</div>
            <p className="text-white/60 text-xs italic">"Every mug tells a story — make yours."</p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="bg-white p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <Link to="/" className="font-serif text-2xl font-bold text-[#3E2723] lg:hidden block mb-6">
              G<span className="text-[#C4A882]">Store</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E2723]">Sign In</h1>
            <p className="text-gray-500 text-sm mt-2">Don't have an account?{' '}
              <Link to="/register" className="text-[#C4A882] font-semibold hover:underline">Create one</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#C4A882] transition-colors text-sm bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#C4A882] transition-colors text-sm bg-gray-50 focus:bg-white"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#3E2723] text-white rounded-xl font-semibold text-sm tracking-wide hover:bg-[#5D4037] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Signing in...</>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            Admin?{' '}
            <Link to="/admin/login" className="text-[#3E2723] font-semibold hover:underline">Login to Admin Portal</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
