import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/currency';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, getCartDetails, getCartTotal, removeFromCart, updateCartItemQuantity } = useShop();
    const cartItems = getCartDetails();
    const total = getCartTotal();

    if (cartItems.length === 0) {
        return (
            <div className="section" style={{ marginTop: '60px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2>Your Bag is Empty</h2>
                <p style={{ marginBottom: '2rem', color: '#666' }}>Looks like you haven't added any handmade goodies yet.</p>
                <Link to="/shop" className="btn-primary" style={{ display: 'inline-block', maxWidth: '200px', margin: '0 auto' }}>Go to Shop</Link>
            </div>
        );
    }

    return (
        <div className="section" style={{ marginTop: '60px' }}>
            <div className="container">
                <h1 className="section-title">Your Bag</h1>

                <div className="cart-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }}>
                    {/* Items List */}
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.product.id} className="card" style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <img src={item.product.image} alt={item.product.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ marginBottom: '0.5rem' }}>{item.product.name}</h3>
                                    <p style={{ color: '#666' }}>{formatPrice(item.product.price)}</p>
                                </div>

                                {/* Qty Control */}
                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #eee', borderRadius: '8px', marginRight: '2rem' }}>
                                    <button
                                        onClick={() => updateCartItemQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                        style={{ padding: '0.4rem 0.8rem', background: 'none' }}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span style={{ padding: '0 0.5rem', fontWeight: 'bold' }}>{item.quantity}</span>
                                    <button
                                        onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                                        style={{ padding: '0.4rem 0.8rem', background: 'none' }}
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>

                                <div style={{ textAlign: 'right', minWidth: '80px' }}>
                                    <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{formatPrice(item.product.price * item.quantity)}</p>
                                    <button
                                        onClick={() => removeFromCart(item.product.id)}
                                        style={{ color: 'red', background: 'none', cursor: 'pointer' }}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="cart-summary">
                        <div className="card" style={{ position: 'sticky', top: '100px' }}>
                            <h3 style={{ marginBottom: '2rem' }}>Order Summary</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span>Subtotal</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <hr style={{ marginBottom: '2rem', borderColor: '#eee' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            <Link to="/checkout" className="btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
