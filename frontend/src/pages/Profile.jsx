import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Calendar, LogOut } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        // Fetch full profile data including generic member info if API provided it
        // For now we use the context user, but lets hit the API as requested
        axios.get('http://localhost:3000/api/auth/profile', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => setProfileData(res.data.user))
            .catch(err => console.error(err));
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!profileData) return <div className="section container text-center">Loading Profile...</div>;

    return (
        <div className="section" style={{ marginTop: '60px' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <div className="card text-center" style={{ padding: '3rem 2rem' }}>
                    <div style={{
                        width: '100px', height: '100px',
                        background: 'var(--bg-cream)',
                        borderRadius: '50%',
                        margin: '0 auto 1.5rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <User size={48} color="var(--primary)" />
                    </div>

                    <h1 style={{ marginBottom: '0.5rem' }}>{profileData.name}</h1>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>Member</p>

                    <div style={{ textAlign: 'left', background: '#f8f8f8', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <Mail size={20} color="#888" />
                            <div>
                                <span style={{ fontSize: '0.8rem', color: '#888', display: 'block' }}>Email Address</span>
                                <span style={{ fontWeight: '500' }}>{profileData.email}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Calendar size={20} color="#888" />
                            <div>
                                <span style={{ fontSize: '0.8rem', color: '#888', display: 'block' }}>Account ID</span>
                                <span style={{ fontWeight: '500' }}>#{profileData.id}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="btn-outline"
                        style={{
                            color: '#c62828',
                            borderColor: '#c62828',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
