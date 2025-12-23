import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatPrice } from '../utils/currency';
import { Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/api/orders/history', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => setOrders(res.data.reverse()))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Placed': return { bg: '#e3f2fd', color: '#1565c0' };
            case 'Processing': return { bg: '#fff3e0', color: '#ef6c00' };
            case 'Shipped': return { bg: '#e0f7fa', color: '#006064' };
            case 'Delivered': return { bg: '#e8f5e9', color: '#2e7d32' };
            default: return { bg: '#eee', color: '#333' };
        }
    };

    return (
        <div className="section" style={{ marginTop: '60px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 className="section-title">My Orders</h1>

                {loading ? <p>Loading...</p> : orders.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#666' }}>No orders found.</div>
                ) : (
                    <div className="orders-list">
                        {orders.map(order => {
                            const statusStyle = getStatusColor(order.status);
                            return (
                                <Link to={`/order/${order.id}`} key={order.id} className="card" style={{ display: 'block', marginBottom: '2rem', textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                        <div>
                                            <p style={{ fontWeight: 'bold' }}>Order #{order.id.slice(-6)}</p>
                                            <p style={{ color: '#666', fontSize: '0.9rem' }}>{new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{formatPrice(order.total)}</p>
                                            <span style={{ background: statusStyle.bg, color: statusStyle.color, padding: '0.2rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '500' }}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            {order.items.slice(0, 2).map((item, idx) => (
                                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', color: '#666', fontSize: '0.9rem' }}>
                                                    <Package size={14} />
                                                    <span>{item.product.name} x {item.quantity}</span>
                                                </div>
                                            ))}
                                            {order.items.length > 2 && <span style={{ fontSize: '0.8rem', color: '#999' }}>+ {order.items.length - 2} more items</span>}
                                        </div>
                                        <ArrowRight size={20} color="#ccc" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
