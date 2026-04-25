import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Loader from './Loader';

const AdminRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
