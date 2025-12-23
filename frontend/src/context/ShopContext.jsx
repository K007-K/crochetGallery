import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Products
    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/products');
            setProducts(res.data);
        } catch (err) {
            console.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    // Fetch Cart
    const fetchCart = async () => {
        if (!user) {
            setCart([]);
            return;
        }
        try {
            const res = await axios.get('http://localhost:3000/api/cart', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setCart(res.data.items || []);
        } catch (err) {
            console.error("Failed to load cart");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchCart();
    }, [user]);

    const addToCart = async (productId, quantity = 1) => {
        if (!user) return alert("Please login to add to cart");
        try {
            await axios.post('http://localhost:3000/api/cart/add', { productId, quantity }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            await fetchCart();
        } catch (err) {
            console.error(err);
            alert("Error adding to cart");
        }
    };

    const updateCartItemQuantity = async (productId, quantity) => {
        try {
            await axios.put('http://localhost:3000/api/cart/update', { productId, quantity }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            await fetchCart();
        } catch (err) {
            console.error(err);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:3000/api/cart/remove/${productId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            await fetchCart();
        } catch (err) {
            console.error(err);
        }
    };

    const getCartDetails = () => {
        return cart.map(item => {
            const product = products.find(p => p.id === item.productId);
            return { ...item, product };
        }).filter(item => item.product);
    };

    const getCartTotal = () => {
        const details = getCartDetails();
        return details.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    return (
        <ShopContext.Provider value={{
            products,
            cart,
            addToCart,
            updateCartItemQuantity,
            removeFromCart,
            getCartDetails,
            getCartTotal,
            fetchCart
        }}>
            {children}
        </ShopContext.Provider>
    );
};
