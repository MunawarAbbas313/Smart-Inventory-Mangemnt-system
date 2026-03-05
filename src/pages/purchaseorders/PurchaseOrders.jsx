import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Select, Table, Tag, DatePicker, message } from 'antd';
import LayoutApp from '../../components/Layout';
import { getPurchaseOrders, addPurchaseOrder, updatePurchaseOrder, getSuppliers, getProducts } from '../../services/api';

const statusColors = { pending: 'gold', in_transit: 'blue', delivered: 'green', cancelled: 'red' };
const statusLabels = { pending: 'Pending', in_transit: 'In Transit', delivered: 'Delivered', cancelled: 'Cancelled' };

const PurchaseOrders = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [popModal, setPopModal] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [selectedPO, setSelectedPO] = useState(null);
    const [form] = Form.useForm();

    const loadData = useCallback(async () => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            const [poRes, supRes, prodRes] = await Promise.all([getPurchaseOrders(), getSuppliers(), getProducts()]);
            setData(poRes.data); setSuppliers(supRes.data); setAllProducts(prodRes.data);
            dispatch({ type: 'HIDE_LOADING' });
        } catch { dispatch({ type: 'HIDE_LOADING' }); }
    }, [dispatch]);

    useEffect(() => { loadData(); }, [loadData]);

    const handleSubmit = async (values) => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            const supplier = suppliers.find(s => s._id === values.supplierId);
            const items = values.items.map(item => {
                const prod = allProducts.find(p => p._id === item.productId);
                return { ...item, productName: prod?.name, sku: prod?.sku, unitCost: prod?.cost || 0 };
            });
            const totalCost = items.reduce((s, i) => s + i.unitCost * i.quantity, 0);
            await addPurchaseOrder({
                ...values, supplierName: supplier?.name, items, totalCost,
                expectedDelivery: values.expectedDelivery?.format('YYYY-MM-DD'),
                createdBy: 'user_001',
            });
            message.success('Purchase Order Created!');
            loadData(); setPopModal(false); form.resetFields();
            dispatch({ type: 'HIDE_LOADING' });
        } catch { dispatch({ type: 'HIDE_LOADING' }); message.error('Error!'); }
    };

    const handleStatusUpdate = async (po, newStatus) => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            await updatePurchaseOrder({ poId: po._id, status: newStatus, ...(newStatus === 'delivered' ? { actualDelivery: new Date().toISOString().substring(0, 10) } : {}) });
            message.success(`PO status updated to ${statusLabels[newStatus]}`);
            loadData();
            dispatch({ type: 'HIDE_LOADING' });
        } catch { dispatch({ type: 'HIDE_LOADING' }); }
    };

    const columns = [
        { title: 'PO ID', dataIndex: '_id', width: 80 },
        { title: 'Supplier', dataIndex: 'supplierName' },
        { title: 'Items', dataIndex: 'items', render: items => <span>{items.length} item(s)</span> },
        { title: 'Total Cost', dataIndex: 'totalCost', render: v => <strong>Rs. {v?.toLocaleString()}</strong> },
        { title: 'Status', dataIndex: 'status', render: s => <Tag color={statusColors[s]}>{statusLabels[s]}</Tag> },
        { title: 'Expected', dataIndex: 'expectedDelivery', render: v => v || 'N/A' },
        { title: 'Delivered', dataIndex: 'actualDelivery', render: v => v || '—' },
        {
            title: 'Actions', render: (_, record) => (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Button size="small" onClick={() => { setSelectedPO(record); setDetailModal(true); }}><EyeOutlined /></Button>
                    {record.status === 'pending' && <Button size="small" type="primary" onClick={() => handleStatusUpdate(record, 'in_transit')}>Ship</Button>}
                    {record.status === 'in_transit' && <Button size="small" style={{ background: '#00c853', borderColor: '#00c853', color: '#fff' }} onClick={() => handleStatusUpdate(record, 'delivered')}>Deliver</Button>}
                    {(record.status === 'pending' || record.status === 'in_transit') && <Button size="small" danger onClick={() => handleStatusUpdate(record, 'cancelled')}>Cancel</Button>}
                </div>
            ),
        },
    ];

    return (
        <LayoutApp>
            <div className="animate-fadeInUp" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                    <h2 style={{ fontWeight: 800, color: '#0a2540' }}>📋 Purchase Orders</h2>
                    <p style={{ color: '#64748b' }}>{data.length} order(s) • {data.filter(p => p.status === 'pending').length} pending</p>
                </div>
                <Button className="add-new" onClick={() => { form.resetFields(); setPopModal(true); }}>+ Create PO</Button>
            </div>
            <div className="animate-fadeInUp delay-1">
                <Table dataSource={data} columns={columns} bordered rowKey="_id" pagination={{ pageSize: 10 }} />
            </div>

            {/* Detail Modal */}
            <Modal title={`Purchase Order: ${selectedPO?._id}`} open={detailModal} onCancel={() => setDetailModal(false)} footer={null} width={600}>
                {selectedPO && (
                    <div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                            <div><strong>Supplier:</strong> {selectedPO.supplierName}</div>
                            <div><strong>Status:</strong> <Tag color={statusColors[selectedPO.status]}>{statusLabels[selectedPO.status]}</Tag></div>
                            <div><strong>Expected:</strong> {selectedPO.expectedDelivery}</div>
                            <div><strong>Delivered:</strong> {selectedPO.actualDelivery || '—'}</div>
                            <div><strong>Notes:</strong> {selectedPO.notes || 'None'}</div>
                            <div><strong>Total:</strong> <span style={{ color: '#ff6b35', fontWeight: 700 }}>Rs. {selectedPO.totalCost?.toLocaleString()}</span></div>
                        </div>
                        <Table size="small" bordered dataSource={selectedPO.items} rowKey="productId" pagination={false} columns={[
                            { title: 'Product', dataIndex: 'productName' },
                            { title: 'SKU', dataIndex: 'sku' },
                            { title: 'Qty', dataIndex: 'quantity' },
                            { title: 'Unit Cost', dataIndex: 'unitCost', render: v => `Rs. ${v}` },
                            { title: 'Subtotal', render: (_, r) => `Rs. ${(r.quantity * r.unitCost).toLocaleString()}` },
                        ]} />
                    </div>
                )}
            </Modal>

            {/* Create PO Modal */}
            <Modal title="Create Purchase Order" open={popModal} onCancel={() => setPopModal(false)} footer={null} width={600}>
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                    <Form.Item name="supplierId" label="Supplier" rules={[{ required: true }]}>
                        <Select placeholder="Select supplier">{suppliers.map(s => <Select.Option key={s._id} value={s._id}>{s.name}</Select.Option>)}</Select>
                    </Form.Item>
                    <Form.List name="items" initialValue={[{}]}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...rest }) => (
                                    <div key={key} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                                        <Form.Item {...rest} name={[name, 'productId']} rules={[{ required: true }]} style={{ flex: 2 }}>
                                            <Select placeholder="Product">{allProducts.map(p => <Select.Option key={p._id} value={p._id}>{p.name} ({p.sku})</Select.Option>)}</Select>
                                        </Form.Item>
                                        <Form.Item {...rest} name={[name, 'quantity']} rules={[{ required: true }]} style={{ flex: 1 }}>
                                            <InputNumber placeholder="Qty" min={1} style={{ width: '100%' }} />
                                        </Form.Item>
                                        {fields.length > 1 && <Button danger onClick={() => remove(name)}>✕</Button>}
                                    </div>
                                ))}
                                <Button type="dashed" onClick={() => add()} block>+ Add Item</Button>
                            </>
                        )}
                    </Form.List>
                    <Form.Item name="expectedDelivery" label="Expected Delivery" rules={[{ required: true }]} style={{ marginTop: 12 }}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="notes" label="Notes"><Input.TextArea rows={2} /></Form.Item>
                    <div className="form-btn-add"><Button htmlType="submit" className="add-new">Create PO</Button></div>
                </Form>
            </Modal>
        </LayoutApp>
    );
};
export default PurchaseOrders;
