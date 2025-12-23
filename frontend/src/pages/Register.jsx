import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const res = await register(formData.name, formData.email, formData.password);
        if (!res.success) {
            setError(res.error);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="auth-page section">
            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Join Us</h2>
                    <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>Create your account</p>

                    {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '0.8rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="input-field"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="input-field"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="input-field"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Register</button>
                    </form>

                    <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
