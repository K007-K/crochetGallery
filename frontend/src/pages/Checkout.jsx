import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/currency';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const { getCartDetails, getCartTotal, fetchCart } = useShop();
    const navigate = useNavigate();
    const cartItems = getCartDetails();
    const total = getCartTotal();

    const [formData, setFormData] = useState({
        fullName: '',
        mobile: '',
        address: '',
        city: '',
        state: '',
        zip: '', // Pincode
        notes: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        const mobileRegex = /^[0-9]{10}$/;
        const zipRegex = /^[0-9]{6}$/;

        if (!formData.fullName) tempErrors.fullName = "Full Name is required";
        if (!formData.mobile) tempErrors.mobile = "Mobile Number is required";
        else if (!mobileRegex.test(formData.mobile)) tempErrors.mobile = "Must be exactly 10 digits";

        if (!formData.address) tempErrors.address = "Address is required";
        if (!formData.city) tempErrors.city = "City is required";
        if (!formData.state) tempErrors.state = "State is required";

        if (!formData.zip) tempErrors.zip = "Pincode is required";
        else if (!zipRegex.test(formData.zip)) tempErrors.zip = "Must be exactly 6 digits";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.post('http://localhost:3000/api/orders/checkout', {
                items: cartItems,
                total,
                shippingDetails: formData
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            alert("Order Placed Successfully!");
            fetchCart();
            navigate('/orders');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || "Failed to place order");
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="section" style={{ marginTop: '60px' }}>
            <div className="container">
                <h1 className="section-title">Checkout</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1.5fr) 1fr', gap: '4rem', alignItems: 'start' }}>
                    {/* Form */}
                    <div className="card">
                        <h3 style={{ marginBottom: '2rem' }}>Shipping Information</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <input name="fullName" placeholder="Full Name" className="input-field" onChange={handleChange} style={{ marginBottom: errors.fullName ? '0.5rem' : '1rem' }} />
                                {errors.fullName && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.fullName}</p>}
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <input name="mobile" placeholder="Mobile Number (10 digits)" className="input-field" onChange={handleChange} maxLength={10} style={{ marginBottom: errors.mobile ? '0.5rem' : '1rem' }} />
                                {errors.mobile && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.mobile}</p>}
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <input name="address" placeholder="Street Address" className="input-field" onChange={handleChange} style={{ marginBottom: errors.address ? '0.5rem' : '1rem' }} />
                                {errors.address && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.address}</p>}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <input name="city" placeholder="City" className="input-field" onChange={handleChange} style={{ marginBottom: errors.city ? '0.5rem' : '1rem' }} />
                                    {errors.city && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.city}</p>}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <input name="state" placeholder="State" className="input-field" onChange={handleChange} style={{ marginBottom: errors.state ? '0.5rem' : '1rem' }} />
                                    {errors.state && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.state}</p>}
                                </div>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <input name="zip" placeholder="Pincode (6 digits)" className="input-field" onChange={handleChange} maxLength={6} style={{ marginBottom: errors.zip ? '0.5rem' : '1rem' }} />
                                {errors.zip && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.zip}</p>}
                            </div>

                            <textarea name="notes" placeholder="Order Notes (Optional)" className="input-field" onChange={handleChange} style={{ height: '80px' }}></textarea>

                            <h3 style={{ margin: '2rem 0 1rem' }}>Payment Method</h3>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input type="radio" name="paymentMethod" value="COD" checked readOnly />
                                    Cash on Delivery
                                </label>
                            </div>

                            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Place Order ({formatPrice(total)})</button>
                        </form>
                    </div>

                    {/* Summary */}
                    <div className="card" style={{ height: 'fit-content' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Order Items</h3>
                        {cartItems.map(item => (
                            <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                <span>{item.product.name} (x{item.quantity})</span>
                                <span>{formatPrice(item.product.price * item.quantity)}</span>
                            </div>
                        ))}
                        <hr style={{ margin: '1rem 0', borderColor: '#eee' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
