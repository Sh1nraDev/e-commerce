import React, { useState, useEffect, useContext } from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import ProductList from '../components/ProductList'
import Cart from '../components/Cart'
import loading from '../assets/loading.gif'
import '../components/styleProductos.css'
import { CartContext } from '../context/CartContext'

const Home = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cargando, error } = useContext(CartContext);

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('cart-open');
    } else {
      document.body.classList.remove('cart-open');
    }
  }, [isCartOpen]);

  return (
    <div className="home-container">
      <Header onCartOpen={() => setIsCartOpen(true)} />
      <main>
        <h1>Bienvenidos a mi Tienda</h1>
        
        {error ? (
          <div className="error-container">
            <p>Lo sentimos, ha ocurrido un error al cargar los productos.</p>
          </div>
        ) : cargando ? (
          <div className="loading-container">
            <img src={loading} alt='Cargando...' />
          </div>
        ) : (
          <ProductList />
        )}

        {isCartOpen && (
          <Cart 
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Home;
