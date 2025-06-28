import React, { useContext, useState } from 'react'
import Productos from './Productos'
import { CartContext } from '../context/CartContext'
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './styleSearch.css'

const ProductList = () => {
    const { productos, handleAddToCart, cargando, error } = useContext(CartContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 14; // Número de productos por página

    if (cargando) return null; // El loading se maneja en el componente padre
    if (error) return <div>Error al cargar los productos</div>;

    // Filtrar productos por término de búsqueda
    const filteredProducts = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calcular la paginación
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Cambiar de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generar números de página
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    
    return (
        <>
            <div className="search-container">
                <div className="search-wrapper">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>
            <div className="productos-container">
                {currentProducts.map(producto => (
                    <Productos 
                        key={producto.id} 
                        producto={producto} 
                        agregarCarrito={handleAddToCart} 
                    />
                ))}
            </div>
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-button"
                    >
                        <FaChevronLeft />
                    </button>
                    
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => handlePageChange(number)}
                            className={`pagination-button ${currentPage === number ? 'active' : ''}`}
                        >
                            {number}
                        </button>
                    ))}
                    
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-button"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            )}
        </>
    );
}

export default ProductList
