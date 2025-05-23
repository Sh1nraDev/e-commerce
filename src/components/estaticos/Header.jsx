import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './styleEstatico.css'
import Cart from '../Cart'


const Header = ({cartItems,borrarProducto}) => {
const [isCartOpen, setCartOpen] = useState(false)

const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <nav>
        <ul>
            <li><Link to='/' className='link'>Inicio</Link></li>
            <li><Link to='/acercade' className='link'>Sobre nosotros</Link></li>
            <li><Link to='/productos' className='link'>Galeria de productos</Link></li>
            <li><Link to='/contacto' className='link'>Contacto</Link></li>
            <li className='cartnav'>
              <button className='btnCart' onClick={()=> setCartOpen(true)}>
                <i className="fa-solid fa-cart-shopping"></i>
                {totalItems > 0 && <span className="cart-counter">{totalItems}</span>}
              </button>
              <Cart borrarProducto={borrarProducto} cartItems={cartItems} isOpen={isCartOpen} onClose={()=> setCartOpen(false)}/>
            </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
