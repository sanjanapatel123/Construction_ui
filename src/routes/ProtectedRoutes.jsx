import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES_ACCESS } from '../utils/permissions';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  const userData = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!token || !userData) {
    return <Navigate to="/" replace />;
  }

  const userRole =userData?.role;
  console.log("User Role:", userRole);
  const userPermissions = userData?.permissions;
  const allowedRoutes = ROUTES_ACCESS[userRole] || [];

  // Super admin has access to everything
 

  // Check if current path is allowed for user's role
  const isAllowed = allowedRoutes.some(route => 
    location.pathname.startsWith(route) || route === '*'
  );

  if (!isAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;