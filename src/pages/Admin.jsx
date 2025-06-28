import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import FormularioProducto from "../components/FormilarioProducto";
import ConfirmModal from "../components/ConfirmModal";
import '../components/styleModal.css';
import "../components/styleAdmin.css";

const Admin = () => {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({ id: null, name: "", price: "" });
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        fetch("https://682e2f0e746f8ca4a47c2dbd.mockapi.io/product")
            .then((response) => response.json())
            .then((data) => {
                setTimeout(() => {
                    setProductos(data);
                    setLoading(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                toast.error("Error al cargar los productos");
                setLoading(false);
            });
    }, []);

    // Función para agregar un producto

    const agregarProducto = async (producto) =>{
        try{
            setLoading(true);
            const respuesta = await fetch('https://682e2f0e746f8ca4a47c2dbd.mockapi.io/product',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
        })

        if(!respuesta.ok){
            throw new Error('Error al agregar producto')
        }

        const data = await respuesta.json()
        setProductos([...productos, data]);
        toast.success('¡Producto agregado correctamente!');
        setOpen(false);
        }catch(error){
            console.log(error.message);
            toast.error('Error al agregar el producto');
        }finally{
            setLoading(false);
        }
    }

    // Nueva función para abrir el modal
    const handleDeleteClick = (id) => {
        setProductToDelete(id);
        setModalOpen(true);
    };

    // Función para eliminar un producto (ahora sin confirm)
    const eliminarProducto = async () => {
        if (!productToDelete) return;
        setModalOpen(false);
        setLoading(true);
        try {
            const respuesta = await fetch(`https://682e2f0e746f8ca4a47c2dbd.mockapi.io/product/${productToDelete}`, {
                method: 'DELETE',
            });
            if (!respuesta.ok) {
                throw new Error('Error al eliminar producto');
            }
            setProductos(productos.filter((producto) => producto.id !== productToDelete));
            toast.success('Producto eliminado correctamente');
        } catch (error) {
            toast.error('Hubo un problema al eliminar el producto');
            console.error(error.message);
        } finally {
            setLoading(false);
            setProductToDelete(null);
        }
    };

    return (
        <div className="container">
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <>
                    <nav>
                        <ul className="nav">
                            <li className="navItem">
                                <button className="navButton">
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </button>
                            </li>
                            <li className="navItem">
                                <a href="/admin">Admin</a>
                            </li>
                        </ul>
                    </nav>
                    <h1 className="title">Panel Administrativo</h1>

                    <ul className="list">
                        {productos.map((product) => (
                            <li key={product.id} className="listItem">
                                <img
                                    src={product.imagen}
                                    alt={product.nombre}
                                    className="listItemImage"
                                />
                                <span>{product.nombre}</span>
                                <span>${product.precio}</span>
                                <div>
                                    <button className="editButton">Editar</button>
                                    <button className="deleteButton" onClick={() => handleDeleteClick(product.id)}>Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <button 
                className="add-product-btn"
                onClick={() => setOpen(true)}
                disabled={loading}
            >
                {loading ? <FaSpinner className="spinner" /> : <FaPlus />} Agregar Producto
            </button>
            {open && (<FormularioProducto onAgregar={agregarProducto}/>)}
            <ConfirmModal
                open={modalOpen}
                title="¿Eliminar producto?"
                message="¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer."
                onConfirm={eliminarProducto}
                onCancel={() => { setModalOpen(false); setProductToDelete(null); }}
            />
        </div>
    );
};

export default Admin;
