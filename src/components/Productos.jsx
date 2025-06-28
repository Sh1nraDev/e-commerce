import React, { useState } from 'react'
import './styleProductos.css'
import { Link } from 'react-router-dom';
import StarRating from './StarRating';


// Sistema de calificación local por producto
const Productos = ({ producto, agregarCarrito }) => {
  const [cantidad, setCantidad] = useState(1);
  // ratings: array de calificaciones (1-5) por producto, local
  const [ratings, setRatings] = useState([]);

  const increase = () => setCantidad(prev => (prev < producto.stock ? prev + 1 : prev));
  const decrease = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

  const handleAgregarClick = () => {
    if (producto.stock > 0) {
      agregarCarrito(producto, cantidad);
      setCantidad(1); // Resetea la cantidad después de agregar al carrito
    }
  };

  // Cuando el usuario califica
  const handleRate = (stars) => {
    setRatings(prev => [...prev, stars]);
  };

  // Limitar nombre a 28 caracteres y agregar "..." si es necesario
  const nombreCorto = producto.nombre.length > 28
    ? producto.nombre.slice(0, 28) + '...'
    : producto.nombre;

  return (
    <section className='card'>
      <div className='imangenContainer'>
        <img src={producto.imagen} alt={producto.nombre} className='imagen'/>
      </div>
      <h3 className='nombre'>{nombreCorto}</h3>
      <p className='precio'>${producto.precio}</p>
      <p className={`stock ${producto.stock > 0 ? 'stock-green' : 'stock-red'}`}>En stock: {producto.stock}</p>

      {/* Calificación con estrellas */}
      <StarRating ratings={ratings} onRate={handleRate} />

      <div className='cantidadContainer'>
        <button 
          className='qtyButton' 
          onClick={decrease}
          disabled={cantidad <= 1}
        >
          -
        </button>
        <span>{cantidad}</span>
        <button 
          className='qtyButton' 
          onClick={increase}
          disabled={cantidad >= producto.stock}
        >
          +
        </button>
      </div>

      <button 
        onClick={handleAgregarClick}
        disabled={producto.stock === 0}
        className={`agregar-carrito${producto.stock === 0 ? ' disabled' : ''}`}
      >
        {producto.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
      </button>

      <Link to={`/productos/${producto.id}`} className="ver-mas">
        Ver más
      </Link>
    </section>
  );
};

export default Productos;
