import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Decode token or fetch profile
            // For simplicity/speed, we'll assume token validity or fetch profile if needed.
            // Here we will do a simple profile fetch to valid token.
            axios.get('http://localhost:3000/api/auth/profile', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => setUser(res.data.user))
                .catch(() => {
                    localStorage.removeItem('token');
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            setUser(user);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.error || 'Login failed' };
        }
    };

    const register = async (name, email, password) => {
        try {
            await axios.post('http://localhost:3000/api/auth/register', { name, email, password });
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.error || 'Registration failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
