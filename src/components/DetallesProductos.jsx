import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from './estaticos/Header'
import Footer from './estaticos/Footer'
import './styleDetallesProductos.css'

const DetallesProductos = ({productos, cart, borrarProducto}) => {
    const {id} = useParams()
    const product = productos.find(producto => producto.id == id)

    return (
        <>
            <Header cartItems={cart} borrarProducto={borrarProducto}/>
            <div className="detalles-container">
                {product ? (
                    <div className="detalles-card">
                        <div className="detalles-imagen">
                            <img src={product.imagen} alt={product.nombre} />
                        </div>
                        <div className="detalles-info">
                            <h1>{product.nombre}</h1>
                            <p className="precio">${product.precio}</p>
                            <p className="stock">Stock disponible: {product.stock} unidades</p>
                            <p className="categoria">Categoría: {product.categoria}</p>
                            <Link to="/productos" className="volver-btn">Volver a productos</Link>
                        </div>
                    </div>
                ) : (
                    <div className="producto-no-encontrado">
                        <h2>Producto no encontrado</h2>
                        <Link to="/productos" className="volver-btn">Volver a productos</Link>
                    </div>
                )}
            </div>
            <Footer/>
        </>
    )
}

export default DetallesProductos
