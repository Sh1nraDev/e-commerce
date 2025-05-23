import React, { useState, useEffect } from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import ProductList from '../components/ProductList'
import Cart from '../components/Cart'
import loading from '../assets/loading.gif'
import '../components/styleProductos.css'

const Home = ({ cart, productos, cargando, agregarCarrito, borrarProducto }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('cart-open');
    } else {
      document.body.classList.remove('cart-open');
    }
  }, [isCartOpen]);

  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} onCartOpen={() => setIsCartOpen(true)} />
      <main>
        <h1>Bienvenidos a mi Tienda</h1>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit voluptate illum molestias, voluptates dolorem rerum. Alias tempore ut nisi eum, harum natus velit veritatis ea iste illum facere, ipsam modi!</p>
        {
          cargando ? (
            <div className="loading-container">
              <img src={loading} alt='loading' />
            </div>
          ) : (
            <ProductList agregarCarrito={agregarCarrito} productos={productos}/>
          )
        }


      </main>
      <Cart
        cartItems={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        borrarProducto={borrarProducto}
      />
      <Footer />
    </>
  )
}

export default Home
