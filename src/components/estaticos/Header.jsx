import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './styleEstatico.css';
import Cart from '../Cart';
import { useAuth } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const Header = ({ onCartOpen }) => {
  const { isAuthenticated, logout, userRole } = useAuth();
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <nav>
        <ul>
          <li><Link to='/' className='link'>Inicio</Link></li>
          <li><Link to='/acercade' className='link'>Sobre nosotros</Link></li>
          <li><Link to='/productos' className='link'>Galeria de productos</Link></li>
          <li><Link to='/contacto' className='link'>Contacto</Link></li>
          {isAuthenticated && userRole === 'admin' && (
            <li><Link to='/admin' className='link'>Admin</Link></li>
          )}
          <li className='cartnav'>
            <button className='btnCart' onClick={onCartOpen}>
              <i className="fa-solid fa-cart-shopping"></i>
              {totalItems > 0 && <span className="cart-counter">{totalItems}</span>}
            </button>
          </li>
          <li>
            {isAuthenticated ? (
              <button onClick={logout} className='auth-btn'>
                Cerrar sesión
              </button>
            ) : (
              <Link to='/login' className='auth-btn'>
                Iniciar sesión
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
