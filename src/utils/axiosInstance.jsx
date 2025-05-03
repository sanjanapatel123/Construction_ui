

import axios from 'axios';
import { apiUrl } from './config';
import { ROUTES_ACCESS } from './permissions';

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log("Sending Request with Token:", token);
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log("Sending Request with userData:", userData);
    const userRole = userData?.role;
    console.log("Sending Request with userRole:", userRole);

    // Check if route requires authentication
    const isAuthRoute = config.url.includes('/') || config.url.includes('/register');
    if (!token && !isAuthRoute) {
      return Promise.reject(new Error('Authentication required'));
    }

    // Check role-based access
    if (token && userRole && !isAuthRoute) {
      const allowedRoutes = ROUTES_ACCESS[userRole] || [];
      const isAllowed = allowedRoutes.some(route => 
        config.url.includes(route) || route === '*'
      );

      if (!isAllowed) {
        return Promise.reject(new Error('Unauthorized access'));
      }
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
