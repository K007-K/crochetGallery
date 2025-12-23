import { useAuth } from '../context/AuthContext';
import { Package, User, Clock } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="dashboard section decoration-sky-50" style={{ marginTop: '60px' }}>
            <div className="container">
                <h1 style={{ marginBottom: '0.5rem' }}>Dashboard</h1>
                <p style={{ color: '#666', marginBottom: '3rem' }}>Welcome back, {user?.name}!</p>

                <div className="features-grid">
                    {/* Profile Card */}
                    <div className="card">
                        <div className="flex items-center gap-4 mb-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className="icon-box" style={{ margin: 0, width: '50px', height: '50px' }}><User color="var(--primary)" /></div>
                            <div>
                                <h3>My Profile</h3>
                            </div>
                        </div>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Member Since:</strong> {new Date().toLocaleDateString()}</p>
                    </div>

                    {/* Orders Card */}
                    <div className="card">
                        <div className="flex items-center gap-4 mb-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className="icon-box" style={{ margin: 0, width: '50px', height: '50px' }}><Package color="#E6B8B8" /></div>
                            <div>
                                <h3>Recent Orders</h3>
                            </div>
                        </div>
                        <p style={{ color: '#999', fontStyle: 'italic' }}>No orders yet.</p>
                    </div>
                </div>

                <div style={{ marginTop: '4rem', padding: '2rem', background: '#e3f2fd', borderRadius: '12px', border: '1px solid #90caf9' }}>
                    <h3 style={{ color: '#1565c0', marginBottom: '1rem' }}>Internship Project Review Status</h3>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <div>
                            <p><strong>Frontend:</strong> <span style={{ color: 'green' }}>React (Vite)</span> - Ready</p>
                            <p><strong>Backend:</strong> <span style={{ color: 'green' }}>Node/Express</span> - Ready</p>
                        </div>
                        <div>
                            <p><strong>Auth:</strong> <span style={{ color: 'green' }}>JWT Implemented</span></p>
                            <p><strong>Database:</strong> <span style={{ color: 'green' }}>JSON (Simple)</span></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
