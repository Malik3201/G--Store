import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import TrackOrder from '../pages/TrackOrder';
import About from '../pages/About';
import Contact from '../pages/Contact';
import FAQ from '../pages/FAQ';
import Shipping from '../pages/Shipping';
import Returns from '../pages/Returns';
import Privacy from '../pages/Privacy';
import AdminLogin from '../pages/AdminLogin';
import Dashboard from '../pages/admin/Dashboard';
import ProductsManager from '../pages/admin/ProductsManager';
import ProductForm from '../pages/admin/ProductForm';
import Settings from '../pages/admin/Settings';
import Orders from '../pages/admin/Orders';
import OrderDetails from '../pages/admin/OrderDetails';

import ProtectedRoute from '../components/common/ProtectedRoute';
import AdminRoute from '../components/common/AdminRoute';
import AdminLayout from '../components/admin/AdminLayout';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
      <Route path="/products" element={<><Navbar /><Products /><Footer /></>} />
      <Route path="/products/:slug" element={<><Navbar /><ProductDetails /><Footer /></>} />
      <Route path="/track-order" element={<><Navbar /><TrackOrder /><Footer /></>} />
      <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
      <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
      <Route path="/faq" element={<><Navbar /><FAQ /><Footer /></>} />
      <Route path="/shipping" element={<><Navbar /><Shipping /><Footer /></>} />
      <Route path="/returns" element={<><Navbar /><Returns /><Footer /></>} />
      <Route path="/privacy" element={<><Navbar /><Privacy /><Footer /></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected User routes */}
      <Route element={<><Navbar /><ProtectedRoute /><Footer /></>}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Protected Admin routes */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductsManager />} />
          <Route path="/admin/products/new" element={<ProductForm />} />
          <Route path="/admin/products/edit/:id" element={<ProductForm />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/orders/:id" element={<OrderDetails />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
