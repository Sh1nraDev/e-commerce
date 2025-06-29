
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './estaticos/Header';
import Footer from './estaticos/Footer';
import { CartContext } from '../context/CartContext';
import './styleDetallesProductos.css';

const DetallesProductos = () => {
    const { id } = useParams();
    const { productos, cart, borrarProducto, cargando } = useContext(CartContext);
    const product = productos.find(producto => String(producto.id) === String(id));

    return (
        <>
            <Header cartItems={cart} borrarProducto={borrarProducto} />
            <div className="detalles-container">
                {cargando ? (
                    <div className="producto-no-encontrado">
                        <h2>Cargando producto...</h2>
                    </div>
                ) : product ? (
                    <div className="detalles-card">
                        <div className="detalles-imagen">
                            <img src={product.imagen} alt={product.nombre} />
                        </div>
                        <div className="detalles-info">
                            <h1>{product.nombre}</h1>
                            <p className="precio">${product.precio}</p>
                            <p className="stock">Stock disponible: {product.stock} unidades</p>
                            <p className="categoria">Categoría: {product.categoria}</p>
                            <Link to="/tienda" className="volver-btn">Volver a la tienda</Link>
                        </div>
                    </div>
                ) : (
                    <div className="producto-no-encontrado">
                        <h2>Producto no encontrado</h2>
                        <Link to="/tienda" className="volver-btn">Volver a la tienda</Link>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default DetallesProductos;
