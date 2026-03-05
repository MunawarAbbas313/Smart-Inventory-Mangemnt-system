import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, Tag, DatePicker, message } from 'antd';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import LayoutApp from '../../components/Layout';
import { getProducts, addProduct, updateProduct, deleteProduct, getLocations } from '../../services/api';

const Products = () => {
    const [userId] = useState(() => {
        const auth = localStorage.getItem('auth');
        return auth ? JSON.parse(auth)._id : null;
    });

    const dispatch = useDispatch();
    const [productData, setProductData] = useState([]);
    const [locations, setLocations] = useState([]);
    const [popModal, setPopModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const getAllProducts = useCallback(async (search = '') => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            const [prodRes, locRes] = await Promise.all([getProducts({ createdBy: userId, search }), getLocations()]);
            setProductData(prodRes.data);
            setLocations(locRes.data);
            dispatch({ type: 'HIDE_LOADING' });
        } catch { dispatch({ type: 'HIDE_LOADING' }); }
    }, [dispatch, userId]);

    useEffect(() => { getAllProducts(); }, [getAllProducts]);

    useEffect(() => {
        const timer = setTimeout(() => getAllProducts(searchQuery), 300);
        return () => clearTimeout(timer);
    }, [searchQuery, getAllProducts]);

    const handlerDelete = async (record) => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            await deleteProduct({ productId: record._id });
            message.success('Product Deleted!');
            getAllProducts();
            dispatch({ type: 'HIDE_LOADING' });
        } catch { dispatch({ type: 'HIDE_LOADING' }); message.error('Error deleting product'); }
    };

    const columns = [
        {
            title: 'Product', dataIndex: 'name',
            render: (name, r) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={r.image} alt={name} width={45} height={45} style={{ objectFit: 'cover', borderRadius: 8 }} />
                    <div>
                        <strong>{name}</strong>
                        <div style={{ fontSize: 11, color: '#64748b' }}>{r.sku || '—'}</div>
                    </div>
                </div>
            ),
        },
        { title: 'Category', dataIndex: 'category', render: v => <Tag color="orange" style={{ textTransform: 'capitalize' }}>{v}</Tag> },
        {
            title: 'Price', dataIndex: 'price', render: (p, r) => (
                <div>
                    <strong>Rs. {p}</strong>
                    {r.originalPrice && r.originalPrice > p && <div style={{ fontSize: 11, color: '#b0b0b0', textDecoration: 'line-through' }}>Rs. {r.originalPrice}</div>}
                </div>
            )
        },
        { title: 'Cost', dataIndex: 'cost', render: v => <span>Rs. {v || 0}</span> },
        {
            title: 'Stock', dataIndex: 'stock',
            render: (stock, r) => (
                <span style={{ color: stock === 0 ? '#ff1744' : stock <= (r.minStock || 5) ? '#ff6b35' : '#00c853', fontWeight: 700 }}>
                    {stock} {stock <= (r.minStock || 5) && stock > 0 ? '⚠️' : stock === 0 ? '❌' : ''}
                </span>
            ),
        },
        { title: 'Location', dataIndex: 'location', render: v => v || '—' },
        {
            title: 'Expiry', dataIndex: 'expiryDate',
            render: v => {
                if (!v) return <span style={{ color: '#94a3b8' }}>—</span>;
                const isNear = new Date(v) <= new Date(Date.now() + 30 * 86400000);
                return <Tag color={isNear ? 'red' : 'default'}>{v}</Tag>;
            },
        },
        {
            title: 'Actions', dataIndex: '_id',
            render: (_, record) => (
                <div>
                    <Button type="primary" size="small" onClick={() => { dispatch({ type: 'ADD_TO_CART', payload: { ...record, quantity: 1 } }); message.success('Added to cart'); }} style={{ marginRight: 8 }}>Cart</Button>
                    <EditOutlined className="cart-edit" onClick={() => { setEditProduct(record); setPopModal(true); }} />
                    <DeleteOutlined className="cart-action" onClick={() => handlerDelete(record)} />
                </div>
            ),
        },
    ];

    return (
        <LayoutApp>
            <div className="animate-fadeInUp" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                    <h2 style={{ fontWeight: 800, color: '#0a2540' }}>📦 All Products</h2>
                    <p style={{ color: '#64748b' }}>{productData.length} product(s)</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <Input placeholder="Search name or SKU..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: 200 }} suffix={<SearchOutlined />} />
                    <Button className="add-new" onClick={() => { setEditProduct(null); setPopModal(true); }}>+ Add Product</Button>
                </div>
            </div>
            <div className="animate-fadeInUp delay-2">
                <Table dataSource={productData} columns={columns} bordered pagination={{ pageSize: 10 }} rowKey="_id" />
            </div>

            <Modal title={editProduct ? 'Edit Product' : 'Add New Product'} open={popModal} onCancel={() => { setEditProduct(null); setPopModal(false); }} footer={null} width={520}>
                <Form layout="vertical" initialValues={editProduct} onFinish={async (value) => {
                    try {
                        dispatch({ type: 'SHOW_LOADING' });
                        if (!editProduct) { await addProduct({ ...value, createdBy: userId }); message.success('Product Added!'); }
                        else { await updateProduct({ ...value, productId: editProduct._id }); message.success('Product Updated!'); }
                        getAllProducts(); setPopModal(false); setEditProduct(null);
                        dispatch({ type: 'HIDE_LOADING' });
                    } catch { dispatch({ type: 'HIDE_LOADING' }); message.error('Error!'); }
                }} key={editProduct?._id || 'new'}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                        <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
                        <Form.Item name="sku" label="SKU Code"><Input placeholder="e.g. PIZ-CTK-001" /></Form.Item>
                        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                            <Select>
                                <Select.Option value="pizzas">Pizzas</Select.Option>
                                <Select.Option value="burgers">Burgers</Select.Option>
                                <Select.Option value="drinks">Drinks</Select.Option>
                                <Select.Option value="desi">Desi</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="location" label="Location">
                            <Select placeholder="Select location" allowClear>
                                {locations.map(l => <Select.Option key={l._id} value={l.name}>{l.name}</Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item name="price" label="Price (Rs.)" rules={[{ required: true }]}><Input type="number" /></Form.Item>
                        <Form.Item name="originalPrice" label="Original Price (Rs.)"><Input type="number" /></Form.Item>
                        <Form.Item name="cost" label="Cost Price (Rs.)"><Input type="number" /></Form.Item>
                        <Form.Item name="stock" label="Stock" rules={[{ required: true }]}><Input type="number" /></Form.Item>
                        <Form.Item name="minStock" label="Min Stock Alert"><Input type="number" placeholder="Default: 5" /></Form.Item>
                    </div>
                    <Form.Item name="image" label="Image URL" rules={[{ required: true }]}><Input /></Form.Item>
                    <div className="form-btn-add"><Button htmlType="submit" className="add-new">{editProduct ? 'Save' : 'Add'}</Button></div>
                </Form>
            </Modal>
        </LayoutApp>
    );
};

export default Products;
