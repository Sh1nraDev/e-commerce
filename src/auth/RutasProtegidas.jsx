import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RutaProtegida({ children, requireAdmin = false }) {
  const { isAuthenticated, userRole } = useAuth();
  
  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Si requiere rol de admin y el usuario no es admin, redirige a inicio
  if (requireAdmin && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default RutaProtegida;