import { createContext, useState, useEffect } from "react";
import Swal from 'sweetalert2';

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await fetch('https://682e2f0e746f8ca4a47c2dbd.mockapi.io/product');
                if (!respuesta.ok) {
                    throw new Error('Error al cargar los productos');
                }
                const datos = await respuesta.json();
                setProductos(datos);
            } catch (err) {
                console.error('Error:', err);
                setError(true);
            } finally {
                setCargando(false);
            }
        };
        
        fetchData();
    }, [])

    const handleAddToCart = (product, cantidad = 1) => {
        const productInCart = cart.find((item) => item.id === product.id);
        if (productInCart) {
            setCart(cart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + cantidad }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: cantidad }]);
        }
    };

    const handleDeleteFromCart = (product) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === product.id) {
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return null; // Si quantity es 1, marcamos para eliminar
                    }
                } else {
                    return item; // Si no es el producto, lo dejamos igual
                }
            }).filter(item => item !== null); // Quitamos los productos nulos
        });
    };    const handlePurchase = () => {
        if (cart.length === 0) {
            Swal.fire({
                title: 'Carrito vacío',
                text: 'El carrito está vacío',
                icon: 'info',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Verificar stock suficiente
        const insufficientStock = cart.find(cartItem => {
            const product = productos.find(p => p.id === cartItem.id);
            return !product || product.stock < cartItem.quantity;
        });

        if (insufficientStock) {
            const product = productos.find(p => p.id === insufficientStock.id);
            Swal.fire({
                title: 'Stock insuficiente',
                text: `Stock insuficiente para ${product.name}. Stock disponible: ${product.stock}`,
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            // Actualizar stock
            const updatedProducts = productos.map(product => {
                const cartItem = cart.find(item => item.id === product.id);
                if (cartItem) {
                    return {
                        ...product,
                        stock: product.stock - cartItem.quantity
                    };
                }
                return product;
            });

            setProductos(updatedProducts);
            setCart([]); // Vaciar el carrito
            Swal.fire({
                title: '¡Compra realizada!',
                text: '¡Compra realizada con éxito!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('Error al procesar la compra:', error);
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al procesar la compra. Por favor, intente nuevamente.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <CartContext.Provider        value={{
            cart,
            productos,
            cargando,
            error,
            handleAddToCart,
            handleDeleteFromCart,
            handlePurchase
        }}>
            {children}
        </CartContext.Provider>
    )
}