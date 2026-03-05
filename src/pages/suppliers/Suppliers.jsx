import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined, SearchOutlined, StarFilled, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, Tag, Rate, message } from 'antd';
import LayoutApp from '../../components/Layout';
import { getSuppliers, addSupplier, updateSupplier, deleteSupplier } from '../../services/api';

const Suppliers = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [popModal, setPopModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [form] = Form.useForm();

    const loadData = useCallback(async () => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            const { data: res } = await getSuppliers();
            setData(res);
            dispatch({ type: 'HIDE_LOADING' });
        } catch { dispatch({ type: 'HIDE_LOADING' }); }
    }, [dispatch]);

    useEffect(() => { loadData(); }, [loadData]);

    const handleSubmit = async (values) => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            if (editItem) {
                await updateSupplier({ ...values, supplierId: editItem._id });
                message.success('Supplier Updated!');
            } else {
                await addSupplier({ ...values, createdBy: 'user_001' });
                message.success('Supplier Added!');
            }
            loadData(); setPopModal(false); setEditItem(null); form.resetFields();
            dispatch({ type: 'HIDE_LOADING' });
        } catch { dispatch({ type: 'HIDE_LOADING' }); message.error('Error!'); }
    };

    const handleDelete = async (record) => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            await deleteSupplier({ supplierId: record._id });
            message.success('Supplier Deleted!'); loadData();
            dispatch({ type: 'HIDE_LOADING' });
        } catch { dispatch({ type: 'HIDE_LOADING' }); message.error('Error!'); }
    };

    const filtered = searchQuery
        ? data.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.contact.toLowerCase().includes(searchQuery.toLowerCase()))
        : data;

    const columns = [
        {
            title: 'Name', dataIndex: 'name', render: (name, r) => (
                <div>
                    <strong>{name}</strong>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{r.contact}</div>
                </div>
            )
        },
        { title: 'Phone', dataIndex: 'phone', render: v => <span><PhoneOutlined /> +92 {v}</span> },
        { title: 'Email', dataIndex: 'email', render: v => <span><MailOutlined /> {v}</span> },
        { title: 'Categories', dataIndex: 'categories', render: cats => cats?.map(c => <Tag key={c} color="orange" style={{ textTransform: 'capitalize' }}>{c}</Tag>) },
        { title: 'Rating', dataIndex: 'rating', render: v => <Rate disabled defaultValue={v} allowHalf style={{ fontSize: 14 }} /> },
        { title: 'Lead Time', dataIndex: 'leadTimeDays', render: v => <span>{v} day{v > 1 ? 's' : ''}</span> },
        { title: 'Status', dataIndex: 'status', render: v => <Tag color={v === 'active' ? 'green' : 'default'}>{v?.toUpperCase()}</Tag> },
        {
            title: 'Actions', render: (_, record) => (
                <div>
                    <EditOutlined className="cart-edit" style={{ marginRight: 12 }} onClick={() => { setEditItem(record); form.setFieldsValue(record); setPopModal(true); }} />
                    <DeleteOutlined className="cart-action" onClick={() => handleDelete(record)} />
                </div>
            ),
        },
    ];

    return (
        <LayoutApp>
            <div className="animate-fadeInUp" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                    <h2 style={{ fontWeight: 800, color: '#0a2540' }}>🏭 Suppliers</h2>
                    <p style={{ color: '#64748b' }}>{data.length} supplier(s) registered</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <Input placeholder="Search suppliers..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: 200 }} suffix={<SearchOutlined />} />
                    <Button className="add-new" onClick={() => { setEditItem(null); form.resetFields(); setPopModal(true); }}>+ Add Supplier</Button>
                </div>
            </div>
            <div className="animate-fadeInUp delay-1">
                <Table dataSource={filtered} columns={columns} bordered rowKey="_id" pagination={{ pageSize: 10 }} />
            </div>
            <Modal title={editItem ? 'Edit Supplier' : 'Add Supplier'} open={popModal} onCancel={() => { setPopModal(false); setEditItem(null); form.resetFields(); }} footer={null}>
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                    <Form.Item name="name" label="Company Name" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="contact" label="Contact Person" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="phone" label="Phone" rules={[{ required: true }]}><Input prefix="+92" /></Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}><Input /></Form.Item>
                    <Form.Item name="address" label="Address" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="categories" label="Categories">
                        <Select mode="multiple" placeholder="Select categories">
                            <Select.Option value="pizzas">Pizzas</Select.Option>
                            <Select.Option value="burgers">Burgers</Select.Option>
                            <Select.Option value="drinks">Drinks</Select.Option>
                            <Select.Option value="desi">Desi</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="leadTimeDays" label="Lead Time (days)" rules={[{ required: true }]}><Input type="number" min={1} /></Form.Item>
                    <Form.Item name="rating" label="Rating"><Input type="number" min={0} max={5} step={0.5} /></Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                        <Select><Select.Option value="active">Active</Select.Option><Select.Option value="inactive">Inactive</Select.Option></Select>
                    </Form.Item>
                    <div className="form-btn-add"><Button htmlType="submit" className="add-new">{editItem ? 'Update' : 'Add'}</Button></div>
                </Form>
            </Modal>
        </LayoutApp>
    );
};
export default Suppliers;
