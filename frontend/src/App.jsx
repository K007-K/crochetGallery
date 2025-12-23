import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Profile from './pages/Profile';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const Layout = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <div style={{ flex: 1 }}>
      {children}
    </div>
    <Footer />
  </div>
);

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/shop" /> : <Landing />} />

        {/* Auth */}
        <Route path="/login" element={user ? <Navigate to="/shop" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/shop" /> : <Register />} />

        {/* Protected Shop Routes */}
        <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="/dashboard" element={<Navigate to="/shop" />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ShopProvider>
    </AuthProvider>
  );
}

export default App;
