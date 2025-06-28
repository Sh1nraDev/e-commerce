import React, { useState } from 'react';

function FormularioProducto({ onAgregar }) {
    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
    });
    const [errores, setErrores] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };
    // Validación del formulario
    const validarFormulario = () => {
        const nuevosErrores = {};
        if (!producto.nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es obligatorio.';
        }
        if (!producto.precio || producto.precio <= 0) {
            nuevosErrores.precio = 'El precio debe ser mayor a 0.';
        }
        if (!producto.descripcion.trim() || producto.descripcion.length < 10) {
            nuevosErrores.descripcion = 'La descripción debe tener al menos 10 caracteres.';
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarFormulario()) {
            return;
        }
        onAgregar(producto); // Llamada a la función para agregar el producto
        setProducto({ 
            nombre: '', 
            precio: '', 
            descripcion: '' 
        }); // Limpiar el formulario
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Agregar Producto</h2>
            <div>
                <label>Nombre:</label>
                <input
                    type="text" name="nombre" value={producto.nombre} onChange={handleChange} required />
                {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}
            </div>
            <div>
                <label>Precio:</label>
                <input type="number" name="precio" value={producto.precio} onChange={handleChange} required
                    min="0" />
                {errores.precio && <p style={{ color: 'red' }}>{errores.precio}</p>}
            </div>

            <div>
                <label>Descripción:</label>
                <textarea
                    name="descripcion"
                    value={producto.descripcion}
                    onChange={handleChange}
                    required
                />
                {errores.descripcion && <p style={{ color: 'red' }}>{errores.descripcion}</p>}
            </div>
            <button type="submit">Agregar Producto</button>
        </form>
    )
}

export default FormularioProducto