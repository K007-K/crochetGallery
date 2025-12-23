import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { Menu, User, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart } = useShop();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    // Logout is now handled in Profile page too, but good to keep here as fallback or for mobile
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* Logo */}
                <Link to="/" className="logo">
                    CrochetGallery.
                </Link>

                {/* Desktop Links */}
                <div className="nav-links">
                    {user ? (
                        <>
                            <Link to="/shop">Shop</Link>
                            <Link to="/orders">Orders</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/">Home</Link>
                            <a href="#about">About</a>
                        </>
                    )}
                </div>

                {/* Auth Buttons */}
                <div className="auth-buttons">
                    {user ? (
                        <>
                            <Link to="/cart" style={{ position: 'relative', marginRight: '1rem', color: 'var(--text-dark)' }}>
                                <ShoppingBag size={22} />
                                {cartCount > 0 && (
                                    <span style={{
                                        position: 'absolute', top: '-5px', right: '-8px',
                                        background: 'var(--primary)', color: 'white',
                                        fontSize: '0.7rem', padding: '2px 6px', borderRadius: '50%'
                                    }}>
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <Link to="/profile" className="user-info" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <User size={18} />
                                <span>{user.name}</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ fontWeight: 500 }}>Login</Link>
                            <Link to="/register" className="btn-primary">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    <Menu size={24} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
