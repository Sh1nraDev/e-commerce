import { createContext, useState, useEffect } from "react";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)
    const [isAuthenticated, setIsAuth] = useState(false) // Estado para la autenticación

    useEffect(() => {
        fetch('/data/data.json')
            .then(respuesta => respuesta.json())
            .then(datos => {
                setTimeout(() => {
                    setProductos(datos)
                    setCargando(false)
                }, 2000)
            })
            .catch(error => {
                console.log('Error', error)
                setCargando(false)
                setError(true)
            })

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
    };

    const handlePurchase = () => {
        if (cart.length === 0) return;

        // Verificar stock suficiente
        const hasEnoughStock = cart.every(cartItem => {
            const product = productos.find(p => p.id === cartItem.id);
            return product && product.stock >= cartItem.quantity;
        });

        if (!hasEnoughStock) {
            alert("Lo sentimos, no hay suficiente stock para completar tu compra");
            return;
        }

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
        alert("¡Compra realizada con éxito!");
    };

    return (
        <CartContext.Provider 
        value={

            { cart, productos, cargando, error, handleAddToCart, handleDeleteFromCart, isAuthenticated, handlePurchase }
        }>
            {children}
        </CartContext.Provider>
    )
}