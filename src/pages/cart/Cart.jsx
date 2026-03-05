import {
    DeleteOutlined,
    MinusCircleOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Empty, Form, Input, Modal, Select, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LayoutApp from '../../components/Layout';
import {
    getCustomersByPhone,
    addCustomer,
    addBill,
    updateProduct,
} from '../../services/api';
import './cart.css';

const Cart = () => {
    const [userId] = useState(() => {
        const auth = localStorage.getItem('auth');
        return auth ? JSON.parse(auth)._id : null;
    });

    const [subTotal, setSubTotal] = useState(0);
    const [billPopUp, setBillPopUp] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.root);

    const handlerIncrement = (record) => {
        dispatch({ type: 'UPDATE_CART', payload: { ...record, quantity: record.quantity + 1 } });
    };

    const handlerDecrement = (record) => {
        if (record.quantity > 1) {
            dispatch({ type: 'UPDATE_CART', payload: { ...record, quantity: record.quantity - 1 } });
        }
    };

    const handlerDelete = (record) => {
        dispatch({ type: 'DELETE_FROM_CART', payload: record });
    };

    const columns = [
        { title: 'Name', dataIndex: 'name' },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (image, record) => (
                <img src={image} alt={record.name} height={60} width={60} style={{ objectFit: 'cover', borderRadius: 8 }} />
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (price) => <strong>Rs. {price}</strong>,
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            render: (stock) => <strong>{stock}</strong>,
        },
        {
            title: 'Quantity',
            dataIndex: '_id',
            render: (_, record) => (
                <div>
                    <MinusCircleOutlined className="cart-minus" onClick={() => handlerDecrement(record)} />
                    <strong className="cart-quantity">{record.quantity}</strong>
                    <PlusCircleOutlined className="cart-plus" onClick={() => handlerIncrement(record)} />
                </div>
            ),
        },
        {
            title: 'Action',
            dataIndex: '_id',
            render: (_, record) => (
                <DeleteOutlined className="cart-action" onClick={() => handlerDelete(record)} />
            ),
        },
    ];

    useEffect(() => {
        let temp = 0;
        cartItems.forEach((p) => (temp += p.price * p.quantity));
        setSubTotal(temp);
    }, [cartItems]);

    const handlerSubmit = async (value) => {
        try {
            if (!userId) {
                message.error('Please login again.');
                return;
            }

            const customerResponse = await getCustomersByPhone({ phone: value.phone, createdBy: userId });
            let customerId;

            if (customerResponse.data.length === 0) {
                try {
                    const createResponse = await addCustomer({
                        name: value.name, phone: value.phone, address: value.address, createdBy: userId,
                    });
                    if (createResponse.data.customer) {
                        customerId = createResponse.data.customer._id;
                        message.success('New customer created!');
                    }
                } catch (err) {
                    message.error('Failed to create customer');
                    return;
                }
            } else {
                customerId = customerResponse.data[0]._id;
            }

            const tax = Number(((subTotal / 100) * 5).toFixed(2));
            const totalAmount = Number((subTotal + tax).toFixed(2));

            // Stock check
            for (const item of cartItems) {
                if (item.stock < item.quantity) {
                    message.error(`Only ${item.stock} in stock for ${item.name}`);
                    return;
                }
            }

            const billResponse = await addBill({
                customerName: value.name,
                customerPhone: Number(value.phone),
                customerAddress: value.address,
                cartItems, subTotal, tax, totalAmount,
                paymentMethod: value.paymentMethod,
                createdBy: userId, customerId,
            });

            if (billResponse.data) {
                message.success('Bill Generated Successfully!');
                for (const item of cartItems) {
                    await updateProduct({ stock: item.stock - item.quantity, productId: item._id });
                }
                dispatch({ type: 'CLEAR_CART' });
                navigate('/bills');
                setBillPopUp(false);
            }
        } catch (error) {
            message.error('Error generating bill');
        }
    };

    const tax = ((subTotal / 100) * 5);
    const total = subTotal + tax;

    return (
        <LayoutApp>
            <div className="animate-fadeInUp">
                <h2 style={{ fontWeight: 800, color: '#0a2540' }}>🛍️ Cart</h2>
            </div>
            {cartItems.length === 0 ? (
                <div className="empty-cart animate-fadeIn">
                    <h2 className="empty-text">Cart is empty!</h2>
                    <Empty />
                    <Button onClick={() => navigate('/pos')} className="add-new" style={{ marginTop: 16 }}>
                        Go to POS
                    </Button>
                </div>
            ) : (
                <div className="animate-fadeInUp delay-1">
                    <Table dataSource={cartItems} columns={columns} bordered rowKey="_id" />
                    <div className="subTotal">
                        <h2>Sub Total: <span>Rs. {subTotal.toFixed(2)}</span></h2>
                        <Button onClick={() => setBillPopUp(true)} className="add-new">
                            Generate Invoice
                        </Button>
                    </div>
                    <Modal title="Create Invoice" open={billPopUp} onCancel={() => setBillPopUp(false)} footer={null}>
                        <Form layout="vertical" onFinish={handlerSubmit} form={form}>
                            <Form.Item name="phone" label="Customer Phone" rules={[{ required: true, message: 'Enter phone' }]}>
                                <Input
                                    prefix="+92"
                                    onBlur={async (e) => {
                                        const phone = e.target.value.replace(/\D/g, '');
                                        if (phone && userId) {
                                            try {
                                                const res = await getCustomersByPhone({ phone, createdBy: userId });
                                                if (res.data.length > 0) {
                                                    form.setFieldsValue({ name: res.data[0].name, address: res.data[0].address });
                                                    message.success('Customer found!');
                                                } else {
                                                    form.setFieldsValue({ name: '', address: '' });
                                                }
                                            } catch (err) { }
                                        }
                                    }}
                                    onChange={(e) => {
                                        form.setFieldsValue({ phone: e.target.value.replace(/\D/g, '') });
                                    }}
                                    maxLength={15}
                                />
                            </Form.Item>
                            <Form.Item name="name" label="Customer Name" rules={[{ required: true }]}><Input /></Form.Item>
                            <Form.Item name="address" label="Customer Address" rules={[{ required: true }]}><Input /></Form.Item>
                            <Form.Item name="paymentMethod" label="Payment Method" rules={[{ required: true }]}>
                                <Select>
                                    <Select.Option value="cash">💵 Cash</Select.Option>
                                    <Select.Option value="card">💳 Card</Select.Option>
                                    <Select.Option value="easypaisa">📱 Easypaisa</Select.Option>
                                    <Select.Option value="jazzcash">📱 JazzCash</Select.Option>
                                </Select>
                            </Form.Item>
                            <div className="total" style={{ background: '#f0f4f8', padding: 16, borderRadius: 12, marginBottom: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>SubTotal:</span><strong>Rs. {subTotal.toFixed(2)}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Tax (5%):</span><strong>Rs. {tax.toFixed(2)}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, marginTop: 8, borderTop: '2px solid #0a2540', paddingTop: 8 }}>
                                    <strong>Total:</strong><strong style={{ color: '#ff6b35' }}>Rs. {total.toFixed(2)}</strong>
                                </div>
                            </div>
                            <div className="form-btn-add">
                                <Button htmlType="submit" className="add-new">Generate Invoice</Button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            )}
        </LayoutApp>
    );
};

export default Cart;
