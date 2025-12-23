import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/currency';
import { ArrowLeft, ShoppingBag, Plus, Minus } from 'lucide-react';
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useShop();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="section container text-center">Loading...</div>;
    if (!product) return <div className="section container text-center">Product not found</div>;

    return (
        <div className="section" style={{ marginTop: '60px' }}>
            <div className="container">
                <Link to="/shop" className="flex items-center gap-2 mb-8 text-gray-500 hover:text-gray-900" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: '#666' }}>
                    <ArrowLeft size={20} /> Back to Shop
                </Link>

                <div className="product-details-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '4rem', alignItems: 'start' }}>
                    {/* Image */}
                    <div style={{ background: '#f8f8f8', borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
                        <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }} />
                    </div>

                    {/* Info */}
                    <div>
                        <span style={{ color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.category}</span>
                        <h1 style={{ fontSize: '3rem', margin: '1rem 0' }}>{product.name}</h1>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '2rem' }}>{formatPrice(product.price)}</p>

                        <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.8', marginBottom: '3rem' }}>
                            {product.description}
                        </p>

                        {/* Quantity Selector */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <span style={{ fontWeight: '500' }}>Quantity:</span>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{ padding: '0.5rem 1rem', background: '#f9f9f9' }}
                                >
                                    <Minus size={16} />
                                </button>
                                <span style={{ padding: '0 1rem', fontWeight: 'bold' }}>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{ padding: '0.5rem 1rem', background: '#f9f9f9' }}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => addToCart(product.id, quantity)}
                            className="btn-primary"
                            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 2.5rem', fontSize: '1.1rem' }}
                        >
                            <ShoppingBag size={24} />
                            Add to Cart
                        </button>

                        <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--bg-cream)', borderRadius: '12px' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Why we love it:</h4>
                            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: '#666', lineHeight: '2' }}>
                                <li>Handcrafted with 100% premium cotton yarn</li>
                                <li>Hypoallergenic and safe for all ages</li>
                                <li>Made to order with sustainable practices</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
