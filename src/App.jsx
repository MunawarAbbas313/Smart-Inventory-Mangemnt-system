import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load all pages for code splitting
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Home = lazy(() => import('./pages/home/Home'));
const Products = lazy(() => import('./pages/products/Products'));
const Cart = lazy(() => import('./pages/cart/Cart'));
const Login = lazy(() => import('./pages/login/Login'));
const Register = lazy(() => import('./pages/register/Register'));
const Bills = lazy(() => import('./pages/bills/Bills'));
const Customers = lazy(() => import('./pages/customers/Customers'));
const Guide = lazy(() => import('./pages/guide/Guide'));
const Suppliers = lazy(() => import('./pages/suppliers/Suppliers'));
const PurchaseOrders = lazy(() => import('./pages/purchaseorders/PurchaseOrders'));
const Transactions = lazy(() => import('./pages/transactions/Transactions'));

const PageLoader = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Loading..." />
    </div>
);

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/pos" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                        <Route path="/bills" element={<ProtectedRoute><Bills /></ProtectedRoute>} />
                        <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
                        <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
                        <Route path="/purchase-orders" element={<ProtectedRoute><PurchaseOrders /></ProtectedRoute>} />
                        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
                        <Route path="/guide" element={<ProtectedRoute><Guide /></ProtectedRoute>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Suspense>
            </Router>
        </ErrorBoundary>
    );
}

export default App;

function ProtectedRoute({ children }) {
    if (localStorage.getItem('auth')) {
        return children;
    }
    return <Navigate to="/login" />;
}
