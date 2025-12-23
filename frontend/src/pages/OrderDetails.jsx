import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { formatPrice } from '../utils/currency';
import { ArrowLeft, CheckCircle, Truck, Package, Home } from 'lucide-react';

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/orders/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => setOrder(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="section container text-center">Loading...</div>;
    if (!order) return <div className="section container text-center">Order not found</div>;

    const steps = [
        { status: 'Placed', label: 'Order Placed', icon: Package },
        { status: 'Processing', label: 'Processing', icon: Home }, // Using placeholder icon
        { status: 'Shipped', label: 'Shipped', icon: Truck },
        { status: 'Delivered', label: 'Delivered', icon: CheckCircle }
    ];

    const currentStep = steps.findIndex(s => s.status === order.status);
    // For demo, if status is 'placed', index is 0. 

    return (
        <div className="section" style={{ marginTop: '60px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link to="/orders" className="flex items-center gap-2 mb-8 text-gray-500 hover:text-gray-900" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: '#666' }}>
                    <ArrowLeft size={20} /> Back to Orders
                </Link>

                <div className="card" style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <h1>Order #{order.id}</h1>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ color: '#666' }}>{new Date(order.date).toLocaleString()}</p>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{formatPrice(order.total)}</p>
                        </div>
                    </div>

                    {/* Tracking Timeline */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '3rem', marginTop: '1rem' }}>
                        {/* Line */}
                        <div style={{ position: 'absolute', top: '25px', left: '0', right: '0', height: '2px', background: '#eee', zIndex: 0 }}></div>

                        {steps.map((step, index) => {
                            const isCompleted = index <= currentStep;
                            const Icon = step.icon;
                            return (
                                <div key={step.status} style={{ zIndex: 1, textAlign: 'center', background: 'white', padding: '0 10px' }}>
                                    <div style={{
                                        width: '50px', height: '50px',
                                        borderRadius: '50%',
                                        background: isCompleted ? 'var(--primary)' : '#eee',
                                        color: isCompleted ? 'white' : '#999',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 0.5rem'
                                    }}>
                                        <Icon size={24} />
                                    </div>
                                    <span style={{ fontSize: '0.9rem', color: isCompleted ? 'var(--text-dark)' : '#ccc', fontWeight: isCompleted ? '600' : 'normal' }}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ marginBottom: '1rem' }}>Shipping Address</h3>
                            <p style={{ fontWeight: '500' }}>{order.shippingDetails.fullName}</p>
                            <p style={{ color: '#666' }}>{order.shippingDetails.address}</p>
                            <p style={{ color: '#666' }}>{order.shippingDetails.city}, {order.shippingDetails.state} - {order.shippingDetails.zip}</p>
                            <p style={{ color: '#666' }}>Mobile: {order.shippingDetails.mobile}</p>
                        </div>
                        <div>
                            <h3 style={{ marginBottom: '1rem' }}>Payment Info</h3>
                            <p>Method: Cash on Delivery</p>
                            <p>Status: Pending</p>
                        </div>
                    </div>

                    <div>
                        <h3 style={{ marginBottom: '1rem' }}>Items</h3>
                        {order.items.map(item => (
                            <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                                <span>{item.product.name} (x{item.quantity})</span>
                                <span>{formatPrice(item.product.price * item.quantity)}</span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', fontWeight: 'bold', fontSize: '1.2rem' }}>
                            <span>Total Amount</span>
                            <span>{formatPrice(order.total)}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
