  import { useContext } from 'react';
  import { Navigate, Outlet } from 'react-router-dom';
  import { AuthContext } from '../../context/AuthContext';
  import Loader from './Loader';

  const ProtectedRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <Loader />;

    return user && user.role === 'user' ? <Outlet /> : <Navigate to="/login" replace />;
  };

  export default ProtectedRoute;
