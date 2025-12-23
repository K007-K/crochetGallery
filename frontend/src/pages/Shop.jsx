import { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/currency';
import { Search, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Shop = () => {
    const { products, addToCart } = useShop();
    const [filtered, setFiltered] = useState([]);
    const [category, setCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        let res = products;
        if (category !== 'All') {
            res = res.filter(p => p.category === category);
        }
        if (searchTerm) {
            res = res.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        setFiltered(res);
    }, [products, category, searchTerm]);

    const categories = ['All', ...new Set(products.map(p => p.category))];

    return (
        <div className="section" style={{ marginTop: '60px', padding: '2rem' }}>
            <div className="container">
                <h1 className="section-title text-left" style={{ marginBottom: '1rem', textAlign: 'left' }}>Shop Collection</h1>

                {/* Controls */}
                <div className="shop-controls" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    {/* Search */}
                    <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                        <Search size={20} style={{ position: 'absolute', top: '10px', left: '10px', color: '#999' }} />
                        <input
                            type="text"
                            placeholder="Search handmade items..."
                            className="input-field"
                            style={{ paddingLeft: '2.5rem', marginBottom: 0 }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Categories */}
                    <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '5px' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={category === cat ? 'btn-primary' : 'btn-outline'}
                                onClick={() => setCategory(cat)}
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="features-grid">
                    {filtered.map(product => (
                        <Link to={`/product/${product.id}`} key={product.id} className="card product-card" style={{ padding: '1rem', textAlign: 'left', textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ background: '#f8f8f8', borderRadius: '12px', height: '250px', marginBottom: '1rem', overflow: 'hidden' }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase' }}>{product.category}</span>
                                    <h3 style={{ fontSize: '1.2rem', margin: '0.2rem 0' }}>{product.name}</h3>
                                    <p className="price" style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '1.1rem' }}>{formatPrice(product.price)}</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent navigation
                                        addToCart(product.id);
                                    }}
                                    style={{ background: 'var(--text-dark)', color: 'white', padding: '0.6rem', borderRadius: '50%' }}
                                >
                                    <ShoppingBag size={20} />
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
                        <p>No products found matching your criteria.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Shop;
