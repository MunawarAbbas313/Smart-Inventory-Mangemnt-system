import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, message } from 'antd';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import LayoutApp from '../../components/Layout';
import {
    getCustomers,
    getCustomersByPhone,
    addCustomer,
    updateCustomer,
    deleteCustomer,
} from '../../services/api';

const Customers = () => {
    const [userId] = useState(() => {
        const auth = localStorage.getItem('auth');
        return auth ? JSON.parse(auth)._id : null;
    });

    const dispatch = useDispatch();
    const [customersData, setCustomersData] = useState([]);
    const [popModal, setPopModal] = useState(false);
    const [editCustomer, setEditCustomer] = useState(null);
    const [searchPhone, setSearchPhone] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [form] = Form.useForm();

    const getAllCustomers = useCallback(async () => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            const { data } = await getCustomers();
            setCustomersData(data);
            dispatch({ type: 'HIDE_LOADING' });
        } catch (error) {
            dispatch({ type: 'HIDE_LOADING' });
        }
    }, [dispatch]);

    useEffect(() => { getAllCustomers(); }, [getAllCustomers]);

    const handlerSubmit = async (value) => {
        try {
            const customerData = { name: value.name, phone: value.phone, address: value.address, createdBy: userId };
            dispatch({ type: 'SHOW_LOADING' });
            if (editCustomer) {
                await updateCustomer({ ...customerData, customerId: editCustomer._id });
                message.success('Customer Updated!');
            } else {
                await addCustomer(customerData);
                message.success('Customer Added!');
            }
            getAllCustomers();
            setPopModal(false);
            setEditCustomer(null);
            form.resetFields();
            dispatch({ type: 'HIDE_LOADING' });
        } catch (error) {
            dispatch({ type: 'HIDE_LOADING' });
            message.error('Error!');
        }
    };

    const handleEdit = (record) => {
        setEditCustomer(record);
        form.setFieldsValue(record);
        setPopModal(true);
    };

    const handleDelete = async (record) => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            await deleteCustomer({ customerId: record._id });
            message.success('Customer Deleted!');
            getAllCustomers();
            dispatch({ type: 'HIDE_LOADING' });
        } catch (error) {
            dispatch({ type: 'HIDE_LOADING' });
            message.error('Error!');
        }
    };

    const handleSearch = useCallback(async () => {
        if (!searchPhone) { setSearchResults([]); return; }
        try {
            dispatch({ type: 'SHOW_LOADING' });
            const res = await getCustomersByPhone({ phone: searchPhone.replace(/\D/g, ''), createdBy: userId });
            setSearchResults(res.data);
            dispatch({ type: 'HIDE_LOADING' });
        } catch (error) {
            dispatch({ type: 'HIDE_LOADING' });
        }
    }, [searchPhone, userId, dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => handleSearch(), 300);
        return () => clearTimeout(timer);
    }, [handleSearch]);

    const columns = [
        { title: 'Customer Name', dataIndex: 'name' },
        { title: 'Phone', dataIndex: 'phone', render: (phone) => <span>+92 {phone}</span> },
        { title: 'Address', dataIndex: 'address' },
        {
            title: 'Joined',
            dataIndex: 'createdAt',
            render: (d) => d ? new Date(d).toLocaleDateString('en-PK') : 'N/A',
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <div>
                    <EditOutlined className="cart-edit" style={{ marginRight: 12 }} onClick={() => handleEdit(record)} />
                    <DeleteOutlined className="cart-action" onClick={() => handleDelete(record)} />
                </div>
            ),
        },
    ];

    return (
        <LayoutApp>
            <div className="animate-fadeInUp" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ fontWeight: 800, color: '#0a2540' }}>👥 All Customers</h2>
                <div style={{ display: 'flex', gap: 12 }}>
                    <Input
                        placeholder="Search by phone..."
                        value={searchPhone}
                        onChange={(e) => setSearchPhone(e.target.value.replace(/\D/g, ''))}
                        style={{ width: 200 }}
                        prefix="+92"
                        suffix={<SearchOutlined />}
                        maxLength={15}
                    />
                    <Button className="add-new" onClick={() => { setEditCustomer(null); form.resetFields(); setPopModal(true); }}>
                        + Add Customer
                    </Button>
                </div>
            </div>

            <div className="animate-fadeInUp delay-1">
                <Table
                    dataSource={searchPhone ? searchResults : customersData}
                    columns={columns}
                    bordered
                    pagination={false}
                    rowKey="_id"
                    locale={{ emptyText: searchPhone ? 'No matching customers' : 'No customers yet' }}
                />
            </div>

            <Modal
                title={editCustomer ? 'Edit Customer' : 'Add Customer'}
                open={popModal}
                onCancel={() => { setPopModal(false); setEditCustomer(null); form.resetFields(); }}
                footer={null}
            >
                <Form layout="vertical" onFinish={handlerSubmit} form={form} initialValues={editCustomer}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="phone" label="Phone" rules={[{ required: true }, { pattern: /^\d+$/, message: 'Numbers only' }]}>
                        <Input prefix="+92" maxLength={15} onChange={(e) => form.setFieldsValue({ phone: e.target.value.replace(/\D/g, '') })} />
                    </Form.Item>
                    <Form.Item name="address" label="Address" rules={[{ required: true }]}><Input /></Form.Item>
                    <div className="form-btn-add">
                        <Button htmlType="submit" className="add-new">{editCustomer ? 'Update' : 'Add'}</Button>
                    </div>
                </Form>
            </Modal>
        </LayoutApp>
    );
};

export default Customers;
