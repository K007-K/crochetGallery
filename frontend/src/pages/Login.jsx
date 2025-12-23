import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const res = await login(formData.email, formData.password);
        if (!res.success) {
            setError(res.error);
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="auth-page section">
            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Welcome Back</h2>
                    <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>Login to your account</p>

                    {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '0.8rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
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
                        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Sign In</button>
                    </form>

                    <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
