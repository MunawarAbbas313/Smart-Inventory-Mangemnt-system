import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, message } from 'antd';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import LayoutApp from '../../components/Layout';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../services/api';

const Products = () => {
    const [userId] = useState(() => {
        const auth = localStorage.getItem('auth');
        return auth ? JSON.parse(auth)._id : null;
    });

    const dispatch = useDispatch();
    const [productData, setProductData] = useState([]);
    const [popModal, setPopModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const getAllProducts = useCallback(async (search = '') => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            const { data } = await getProducts({ createdBy: userId, search });
            setProductData(data);
            dispatch({ type: 'HIDE_LOADING' });
        } catch (error) {
            dispatch({ type: 'HIDE_LOADING' });
        }
    }, [dispatch, userId]);

    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);

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
        } catch (error) {
            dispatch({ type: 'HIDE_LOADING' });
            message.error('Error deleting product');
        }
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
            render: (price) => <span style={{ fontWeight: 600 }}>Rs. {price}</span>,
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            render: (stock) => (
                <span style={{ color: stock < 10 ? '#ff1744' : '#00c853', fontWeight: 700 }}>
                    {stock}
                </span>
            ),
        },
        {
            title: 'Actions',
            dataIndex: '_id',
            render: (_, record) => (
                <div>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                            dispatch({ type: 'ADD_TO_CART', payload: { ...record, quantity: 1 } });
                            message.success('Added to cart');
                        }}
                        style={{ marginRight: 10 }}
                    >
                        Add to Cart
                    </Button>
                    <EditOutlined
                        className="cart-edit"
                        onClick={() => { setEditProduct(record); setPopModal(true); }}
                    />
                    <DeleteOutlined className="cart-action" onClick={() => handlerDelete(record)} />
                </div>
            ),
        },
    ];

    const handlerSubmit = async (value) => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            if (!editProduct) {
                await addProduct({ ...value, createdBy: userId });
                message.success('Product Added!');
            } else {
                await updateProduct({ ...value, productId: editProduct._id });
                message.success('Product Updated!');
            }
            getAllProducts();
            setPopModal(false);
            setEditProduct(null);
            dispatch({ type: 'HIDE_LOADING' });
        } catch (error) {
            dispatch({ type: 'HIDE_LOADING' });
            message.error('Error!');
        }
    };

    return (
        <LayoutApp>
            <div className="animate-fadeInUp" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ fontWeight: 800, color: '#0a2540' }}>📦 All Products</h2>
                <div style={{ display: 'flex', gap: 12 }}>
                    <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: 200 }}
                        suffix={<SearchOutlined />}
                    />
                    <Button className="add-new" onClick={() => { setEditProduct(null); setPopModal(true); }}>
                        + Add Product
                    </Button>
                </div>
            </div>

            <div className="animate-fadeInUp delay-2">
                <Table
                    dataSource={productData}
                    columns={columns}
                    bordered
                    pagination={false}
                    rowKey="_id"
                    locale={{ emptyText: searchQuery ? 'No matching products' : 'No products available' }}
                />
            </div>

            <Modal
                title={editProduct ? 'Edit Product' : 'Add New Product'}
                open={popModal}
                onCancel={() => { setEditProduct(null); setPopModal(false); }}
                footer={null}
            >
                <Form layout="vertical" initialValues={editProduct} onFinish={handlerSubmit} key={editProduct?._id || 'new'}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="pizzas">Pizzas</Select.Option>
                            <Select.Option value="burgers">Burgers</Select.Option>
                            <Select.Option value="drinks">Drinks</Select.Option>
                            <Select.Option value="desi">Desi</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="price" label="Price (Rs.)" rules={[{ required: true }]}><Input type="number" /></Form.Item>
                    <Form.Item name="cost" label="Cost Price (Rs.)"><Input type="number" /></Form.Item>
                    <Form.Item name="stock" label="Stock" rules={[{ required: true }]}><Input type="number" /></Form.Item>
                    <Form.Item name="image" label="Image URL" rules={[{ required: true }]}><Input /></Form.Item>
                    <div className="form-btn-add">
                        <Button htmlType="submit" className="add-new">{editProduct ? 'Save' : 'Add'}</Button>
                    </div>
                </Form>
            </Modal>
        </LayoutApp>
    );
};

export default Products;
