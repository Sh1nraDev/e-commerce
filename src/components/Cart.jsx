import React, { useContext } from 'react'
import './styleCart.css'
import { CartContext } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2';

const Cart = ({ isOpen, onClose }) => {
    const { cart, handleDeleteFromCart, handlePurchase } = useContext(CartContext);
    const { isAuthenticated } = useAuth();
    
    const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);

    const handlePurchaseClick = () => {
        if (!isAuthenticated) {
            Swal.fire({
                title: 'Atención',
                text: 'Por favor, inicia sesión para realizar la compra',
                icon: 'info',
                confirmButtonText: 'OK'
            });
            return;
        }
        Swal.fire({
            title: '¿Confirmas realizar la compra?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, comprar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                handlePurchase();
                onClose();
            }
        });
    };

    return (
        <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
            <div className='cart-header'>
                <h2>Carrito de Compras</h2>
                <button onClick={onClose} className='close-button'>X</button>
            </div>
            <div className='cart-content'>
                {cart.length === 0 ? (
                    <p className="cart-empty">El carrito está vacío</p>
                ) : (
                    <>
                        <ul className='cart-items'>
                            {cart.map((item) => (
                                <li key={item.id} className="cart-product-row">
                                    <div className="cart-product-content">
                                        <div className="cart-product-image">
                                            <img src={item.imagen} alt={item.nombre} />
                                        </div>
                                        <div className="cart-product-info">
                                            <h3>{item.nombre}</h3>
                                            <p className="product-price">${item.precio}</p>
                                            {item.quantity > 1 && (
                                                <p className="product-total">
                                                    Total: ${(item.precio * item.quantity).toFixed(2)}
                                                </p>
                                            )}
                                        </div>
                                        <div className="cart-product-quantity">
                                            {item.quantity > 1 && (
                                                <span className="quantity-badge">{item.quantity}x</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="cart-product-actions">                                        <button 
                                            onClick={() => handleDeleteFromCart(item)}
                                            className="remove-button"
                                            title="Eliminar producto"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-summary">
                            <p className="cart-total">Total: ${total.toFixed(2)}</p>
                            <button 
                                onClick={handlePurchaseClick}
                                className="purchase-button"
                                disabled={cart.length === 0}
                            >
                                Realizar Compra
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
