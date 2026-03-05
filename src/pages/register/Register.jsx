import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';
import brandLogo from '../../asset/images/brand-logo.png';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlerSubmit = async (value) => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            await registerUser(value);
            dispatch({ type: 'HIDE_LOADING' });

            message.success('Registered Successfully! Please Login');
            navigate('/login');
        } catch (error) {
            dispatch({ type: 'HIDE_LOADING' });
            message.error(error?.response?.data?.message || 'Registration failed');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="form">
            <img src={brandLogo} alt="logo" className="brand-logo-lg" />
            <h2>Smart Inventory Management System</h2>
            <p>Register Account</p>
            <div className="form-group">
                <Form layout="vertical" onFinish={handlerSubmit}>
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter name' }]}>
                        <Input placeholder="Enter Username" />
                    </Form.Item>
                    <Form.Item name="email" label="Email Address" rules={[{ required: true, message: 'Please enter email' }]}>
                        <Input placeholder="Enter Email Address" />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter password' }]}>
                        <Input type="password" placeholder="Enter Password" />
                    </Form.Item>
                    <div className="form-btn-add">
                        <Button htmlType="submit" className="add-new">
                            Register
                        </Button>
                        <Link className="form-other" to="/login">
                            Login Here!
                        </Link>
                    </div>
                </Form>
            </div>
            <small>Powered by Binary Brigade</small>
        </div>
    );
};

export default Register;
