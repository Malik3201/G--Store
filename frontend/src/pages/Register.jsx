import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await register(formData.name, formData.email, formData.password, formData.phone);
    setIsLoading(false);
    if (success) navigate('/products', { replace: true });
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
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold leading-tight">
              Join the<br />Community
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Create your account to save favorites, track orders, and get exclusive deals on custom products.
            </p>
            <div className="space-y-3">
              {['Free account, no subscriptions', 'Easy WhatsApp checkout', 'Track your custom orders'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C4A882]/30 flex items-center justify-center text-[#C4A882] text-xs font-bold">✓</div>
                  <p className="text-white/70 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#C4A882]/20 flex items-center justify-center text-2xl">☕</div>
            <p className="text-white/60 text-xs italic">"Gifting made personal — one mug at a time."</p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="bg-white p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <Link to="/" className="font-serif text-2xl font-bold text-[#3E2723] lg:hidden block mb-6">
              G<span className="text-[#C4A882]">Store</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E2723]">Create Account</h1>
            <p className="text-gray-500 text-sm mt-2">Already have an account?{' '}
              <Link to="/login" className="text-[#C4A882] font-semibold hover:underline">Sign in</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Full Name', name: 'name', type: 'text', icon: FiUser, placeholder: 'John Doe' },
              { label: 'Email Address', name: 'email', type: 'email', icon: FiMail, placeholder: 'you@example.com' },
              { label: 'Phone Number', name: 'phone', type: 'tel', icon: FiPhone, placeholder: '03001234567' },
            ].map(({ label, name, type, icon: Icon, placeholder }) => (
              <div key={name}>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={type}
                    name={name}
                    required={name !== 'phone'}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#C4A882] transition-colors text-sm bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  required
                  minLength="6"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
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
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Creating account...</>
              ) : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
