import React, { useContext } from 'react'
import './styleCart.css'
import { CartContext } from '../context/CartContext'

const Cart = ({ cartItems, isOpen, onClose, borrarProducto }) => {
    const { handlePurchase } = useContext(CartContext);
    const total = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);

    const handlePurchaseClick = () => {
        if (window.confirm('¿Confirmas realizar la compra?')) {
            handlePurchase();
            onClose(); // Cerrar el carrito después de la compra
        }
    };

    return (
        <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
            <div className='cart-header'>
                <h2 style={{ color: 'black' }}>Carrito de Compras</h2>
                <button onClick={onClose} className='close-button'>X</button>
            </div>
            <div className='cart-content'>
                {cartItems.length === 0 ? (
                    <p style={{ color: 'red' }}>El carrito esta vacío</p>
                ) : (
                    <>
                        <ul className='cart-item'>
                            {cartItems.map((item) => (
                                <li key={item.id} className="cart-product-row">
                                    <span className="cart-qty">{item.quantity}x</span>
                                    <img src={item.imagen} alt={item.nombre} />
                                    <span className="cart-name">{item.nombre}</span>
                                    <span className="cart-price">${item.precio}</span>
                                    <span className="cart-subtotal">${(item.precio * item.quantity).toFixed(2)}</span>
                                    <button onClick={() => borrarProducto(item)} className="cart-delete-btn">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-total-row">
                            <span>Subtotal</span>
                            <span className="cart-total">${total.toFixed(2)}</span>
                        </div>
                        <button 
                            className="cart-purchase-btn"
                            onClick={handlePurchaseClick}
                        >
                            COMPRAR
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Cart
