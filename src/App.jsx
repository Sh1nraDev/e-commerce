import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import AcercaDe from './pages/AcercaDe';
import Contactos from './pages/Contactos';
import GaleriaDeProductos from './pages/GaleriaDeProductos';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import DetallesProductos from './components/DetallesProductos';
import Login from './pages/Login';
import Register from './pages/Register';
import RutaProtegida from './auth/RutasProtegidas';
import './App.css';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app-container">
            <Routes>
              {/* Rutas públicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              
              {/* Rutas protegidas */}
              <Route
                path="/tienda"
                element={
                  <RutaProtegida>
                    <GaleriaDeProductos />
                  </RutaProtegida>
                }
              />
              
              {/* Ruta protegida que requiere admin */}
              <Route
                path="/admin"
                element={
                  <RutaProtegida requireAdmin={true}>
                    <Admin />
                  </RutaProtegida>
                }
              />
              
              {/* Ruta principal protegida */}
              <Route
                path="/"
                element={
                  <RutaProtegida>
                    <Home />
                  </RutaProtegida>
                }
              />
              
              <Route path="/productos/:id" element={<DetallesProductos />} />
              <Route path="/contacto" element={<Contactos />} />
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/404" element={<NotFound />} />
            </Routes>
          </div>
          <ToastContainer 
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
