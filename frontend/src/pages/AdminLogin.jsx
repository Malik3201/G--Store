import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(email, password, true);
    setIsLoading(false);
    if (success) navigate('/admin/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C4A882]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#3E2723]/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="font-serif text-3xl font-bold text-white inline-block mb-2">
            G<span className="text-[#C4A882]">Store</span>
          </Link>
          <div className="inline-flex items-center gap-2 bg-[#C4A882]/10 border border-[#C4A882]/20 text-[#C4A882] text-xs px-3 py-1 rounded-full ml-3">
            <FiShield size={12} />
            Admin Portal
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#C4A882] to-[#8D6E63] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FiShield size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white">Admin Access</h1>
            <p className="text-white/50 text-xs mt-1">Authorized personnel only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Admin Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#C4A882]/50 focus:bg-white/15 transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#C4A882]/50 focus:bg-white/15 transition-colors text-sm"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70">
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-[#C4A882] to-[#8D6E63] text-white rounded-xl font-semibold text-sm tracking-wide hover:opacity-90 transition-all duration-200 shadow-lg disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Verifying...</>
              ) : (
                <><FiShield size={16} /> Access Dashboard</>
              )}
            </button>
          </form>

          <p className="text-center text-white/30 text-xs mt-6">
            Not an admin?{' '}
            <Link to="/login" className="text-[#C4A882] hover:underline">Go to Customer Login</Link>
          </p>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          G Store Admin Panel — Restricted Access
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
