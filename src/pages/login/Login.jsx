import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';
import brandLogo from '../../asset/images/brand-logo.png';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlerSubmit = async (value) => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            const res = await loginUser(value);
            dispatch({ type: 'HIDE_LOADING' });

            message.success('Login Successful! 🎉');
            localStorage.setItem('auth', JSON.stringify(res.data.user));
            navigate('/');
        } catch (error) {
            dispatch({ type: 'HIDE_LOADING' });
            message.error(error?.response?.data?.message || 'Login failed');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('auth')) navigate('/');
    }, [navigate]);

    return (
        <div className="form">
            <img src={brandLogo} alt="logo" className="brand-logo-lg" />
            <h2>🇵🇰 Smart POS System</h2>
            <p>Login to your account</p>
            <div className="form-group">
                <Form layout="vertical" onFinish={handlerSubmit}>
                    <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Valid email required' }]}>
                        <Input placeholder="Enter Email Address" />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Password required' }]}>
                        <Input type="password" placeholder="Enter Password" />
                    </Form.Item>
                    <div className="form-btn-add">
                        <Button htmlType="submit" className="add-new">Login</Button>
                        <Link className="form-other" to="/register">Register Here!</Link>
                    </div>
                </Form>
            </div>
            <div style={{
                marginTop: 16,
                padding: '16px 24px',
                background: 'linear-gradient(135deg, #fff5f0, #fff9f5)',
                borderRadius: 12,
                fontSize: 13,
                border: '1px solid #ffe0cc',
                animation: 'fadeInUp 0.6s ease-out 0.3s both',
            }}>
                <strong style={{ color: '#0a2540' }}>🔑 Test Credentials:</strong>
                <div style={{ marginTop: 8, display: 'grid', gap: 4 }}>
                    <div><code>admin@test.com</code> / <code>admin123</code> <span style={{ opacity: 0.6 }}>— Admin</span></div>
                    <div><code>agent@test.com</code> / <code>agent123</code> <span style={{ opacity: 0.6 }}>— Agent</span></div>
                    <div><code>user@test.com</code> / <code>user123</code> <span style={{ opacity: 0.6 }}>— User</span></div>
                </div>
            </div>
            <small style={{ marginTop: 12, color: '#64748b' }}>🇵🇰 Made in Pakistan</small>
        </div>
    );
};

export default Login;
