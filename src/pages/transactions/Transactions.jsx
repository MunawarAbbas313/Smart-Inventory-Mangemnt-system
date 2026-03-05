import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SearchOutlined, SwapOutlined, ArrowUpOutlined, ArrowDownOutlined, ToolOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Select, Table, Tag, message } from 'antd';
import LayoutApp from '../../components/Layout';
import { getTransactions, addTransaction, getProducts, getLocations } from '../../services/api';

const typeConfig = {
    in: { color: 'green', label: 'Stock In', icon: <ArrowDownOutlined /> },
    out: { color: 'red', label: 'Stock Out', icon: <ArrowUpOutlined /> },
    adjust: { color: 'orange', label: 'Adjustment', icon: <ToolOutlined /> },
    transfer: { color: 'blue', label: 'Transfer', icon: <SwapOutlined /> },
};

const Transactions = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [locs, setLocs] = useState([]);
    const [popModal, setPopModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [form] = Form.useForm();

    const loadData = useCallback(async () => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            const [txnRes, prodRes, locRes] = await Promise.all([
                getTransactions({ search: searchQuery, type: filterType }),
                getProducts(),
                getLocations(),
            ]);
            setData(txnRes.data); setAllProducts(prodRes.data); setLocs(locRes.data);
            dispatch({ type: 'HIDE_LOADING' });
        } catch { dispatch({ type: 'HIDE_LOADING' }); }
    }, [dispatch, searchQuery, filterType]);

    useEffect(() => { loadData(); }, [loadData]);

    const handleSubmit = async (values) => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            const prod = allProducts.find(p => p._id === values.productId);
            await addTransaction({
                ...values,
                productName: prod?.name,
                sku: prod?.sku,
                createdBy: 'user_001',
            });
            message.success('Transaction Recorded!');
            loadData(); setPopModal(false); form.resetFields();
            dispatch({ type: 'HIDE_LOADING' });
        } catch { dispatch({ type: 'HIDE_LOADING' }); message.error('Error!'); }
    };

    const columns = [
        {
            title: 'Type', dataIndex: 'type', width: 120,
            render: t => {
                const cfg = typeConfig[t] || typeConfig.adjust;
                return <Tag color={cfg.color} icon={cfg.icon}>{cfg.label}</Tag>;
            },
        },
        {
            title: 'Product', dataIndex: 'productName',
            render: (name, r) => (
                <div>
                    <strong>{name}</strong>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{r.sku}</div>
                </div>
            ),
        },
        {
            title: 'Qty', dataIndex: 'quantity',
            render: (q, r) => (
                <strong style={{ color: r.type === 'in' ? '#00c853' : r.type === 'out' ? '#ff1744' : '#ff6b35' }}>
                    {r.type === 'in' ? '+' : r.type === 'out' ? '-' : ''}{Math.abs(q)}
                </strong>
            ),
        },
        { title: 'Location', dataIndex: 'location' },
        { title: 'Reference', dataIndex: 'reference', render: v => <code>{v}</code> },
        { title: 'Notes', dataIndex: 'notes', ellipsis: true },
        {
            title: 'Date', dataIndex: 'createdAt',
            render: d => new Date(d).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' }),
        },
    ];

    const summary = {
        totalIn: data.filter(t => t.type === 'in').reduce((s, t) => s + t.quantity, 0),
        totalOut: data.filter(t => t.type === 'out').reduce((s, t) => s + t.quantity, 0),
        totalAdjust: data.filter(t => t.type === 'adjust').length,
        totalTransfer: data.filter(t => t.type === 'transfer').length,
    };

    return (
        <LayoutApp>
            <div className="animate-fadeInUp" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h2 style={{ fontWeight: 800, color: '#0a2540' }}>📊 Inventory Transactions</h2>
                    <p style={{ color: '#64748b' }}>{data.length} transactions</p>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <Input placeholder="Search by product/SKU..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: 200 }} suffix={<SearchOutlined />} />
                    <Select value={filterType} onChange={v => setFilterType(v)} style={{ width: 140 }}>
                        <Select.Option value="all">All Types</Select.Option>
                        <Select.Option value="in">Stock In</Select.Option>
                        <Select.Option value="out">Stock Out</Select.Option>
                        <Select.Option value="adjust">Adjustment</Select.Option>
                        <Select.Option value="transfer">Transfer</Select.Option>
                    </Select>
                    <Button className="add-new" onClick={() => { form.resetFields(); setPopModal(true); }}>+ Record Transaction</Button>
                </div>
            </div>

            {/* Summary Badges */}
            <div className="animate-fadeInUp delay-1" style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
                <div style={{ padding: '8px 16px', background: '#e8f5e9', borderRadius: 8, fontWeight: 600 }}>
                    <ArrowDownOutlined style={{ color: '#00c853' }} /> In: +{summary.totalIn}
                </div>
                <div style={{ padding: '8px 16px', background: '#ffebee', borderRadius: 8, fontWeight: 600 }}>
                    <ArrowUpOutlined style={{ color: '#ff1744' }} /> Out: -{summary.totalOut}
                </div>
                <div style={{ padding: '8px 16px', background: '#fff3e0', borderRadius: 8, fontWeight: 600 }}>
                    <ToolOutlined style={{ color: '#ff6b35' }} /> Adjustments: {summary.totalAdjust}
                </div>
                <div style={{ padding: '8px 16px', background: '#e3f2fd', borderRadius: 8, fontWeight: 600 }}>
                    <SwapOutlined style={{ color: '#1976d2' }} /> Transfers: {summary.totalTransfer}
                </div>
            </div>

            <div className="animate-fadeInUp delay-2">
                <Table dataSource={data} columns={columns} bordered rowKey="_id" pagination={{ pageSize: 15 }} />
            </div>

            <Modal title="Record Transaction" open={popModal} onCancel={() => setPopModal(false)} footer={null}>
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                    <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="in">Stock In</Select.Option>
                            <Select.Option value="out">Stock Out</Select.Option>
                            <Select.Option value="adjust">Adjustment</Select.Option>
                            <Select.Option value="transfer">Transfer</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="productId" label="Product" rules={[{ required: true }]}>
                        <Select showSearch optionFilterProp="children" placeholder="Select product">
                            {allProducts.map(p => <Select.Option key={p._id} value={p._id}>{p.name} ({p.sku})</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="location" label="Location" rules={[{ required: true }]}>
                        <Select>{locs.map(l => <Select.Option key={l._id} value={l.name}>{l.name} ({l.type})</Select.Option>)}</Select>
                    </Form.Item>
                    <Form.Item name="reference" label="Reference"><Input placeholder="e.g. PO-001, BILL-005, WASTE" /></Form.Item>
                    <Form.Item name="notes" label="Notes"><Input.TextArea rows={2} /></Form.Item>
                    <div className="form-btn-add"><Button htmlType="submit" className="add-new">Record</Button></div>
                </Form>
            </Modal>
        </LayoutApp>
    );
};
export default Transactions;
