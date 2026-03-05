import { EyeOutlined } from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import LayoutApp from '../../components/Layout';
import { getBills } from '../../services/api';

const Bills = () => {
    const [userId] = useState(() => {
        const auth = localStorage.getItem('auth');
        return auth ? JSON.parse(auth)._id : null;
    });

    const componentRef = useRef();
    const dispatch = useDispatch();
    const [billsData, setBillsData] = useState([]);
    const [popModal, setPopModal] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);

    useEffect(() => {
        const getAllBills = async () => {
            try {
                if (!userId) return;
                dispatch({ type: 'SHOW_LOADING' });
                const { data } = await getBills({ createdBy: userId });
                setBillsData(data);
                dispatch({ type: 'HIDE_LOADING' });
            } catch (error) {
                dispatch({ type: 'HIDE_LOADING' });
            }
        };
        getAllBills();
    }, [userId, dispatch]);

    const columns = [
        { title: 'ID', dataIndex: '_id', width: 100 },
        { title: 'Customer', dataIndex: 'customerName' },
        {
            title: 'Phone',
            dataIndex: 'customerPhone',
            render: (phone) => `+92 ${phone}`,
        },
        { title: 'Address', dataIndex: 'customerAddress' },
        {
            title: 'Sub Total',
            dataIndex: 'subTotal',
            render: (val) => `Rs. ${val}`,
        },
        {
            title: 'Tax',
            dataIndex: 'tax',
            render: (val) => `Rs. ${val}`,
        },
        {
            title: 'Total',
            dataIndex: 'totalAmount',
            render: (val) => <strong style={{ color: '#ff6b35' }}>Rs. {val}</strong>,
        },
        {
            title: 'Payment',
            dataIndex: 'paymentMethod',
            render: (method) => (
                <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>
                    {method === 'easypaisa' ? '📱 Easypaisa'
                        : method === 'jazzcash' ? '📱 JazzCash'
                            : method === 'card' ? '💳 Card'
                                : '💵 Cash'}
                </span>
            ),
        },
        {
            title: 'Action',
            dataIndex: '_id',
            render: (_, record) => (
                <EyeOutlined
                    className="cart-edit eye"
                    onClick={() => {
                        setSelectedBill(record);
                        setPopModal(true);
                    }}
                />
            ),
        },
    ];

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <LayoutApp>
            <div className="animate-fadeInUp">
                <h2 style={{ fontWeight: 800, color: '#0a2540' }}>🧾 All Invoices</h2>
                <p style={{ color: '#64748b', marginBottom: 16 }}>{billsData.length} invoice(s) found</p>
            </div>

            <div className="animate-fadeInUp delay-1">
                <Table dataSource={billsData} columns={columns} bordered rowKey="_id" />
            </div>

            {popModal && selectedBill && (
                <Modal
                    title="Invoice Details"
                    width={420}
                    open={popModal}
                    onCancel={() => setPopModal(false)}
                    footer={null}
                >
                    <div className="card" ref={componentRef}>
                        <div className="cardHeader" style={{ textAlign: 'center', borderBottom: '2px dashed #e2e8f0', paddingBottom: 16 }}>
                            <h2 style={{ fontSize: 18, fontWeight: 800 }}>🇵🇰 Smart POS</h2>
                            <span>Invoice: <b>{selectedBill._id}</b></span><br />
                            <span>📞 <b>+92 300 1234567</b></span><br />
                            <span>📍 <b>Lahore, Pakistan</b></span>
                        </div>
                        <div className="cardBody">
                            <div className="group"><span>Customer:</span><span><b>{selectedBill.customerName}</b></span></div>
                            <div className="group"><span>Phone:</span><span><b>+92 {selectedBill.customerPhone}</b></span></div>
                            <div className="group"><span>Address:</span><span><b>{selectedBill.customerAddress}</b></span></div>
                            <div className="group"><span>Date:</span><span><b>{selectedBill.createdAt?.substring(0, 10) || 'N/A'}</b></span></div>
                            <div className="group"><span>Payment:</span><span><b style={{ textTransform: 'capitalize' }}>{selectedBill.paymentMethod}</b></span></div>
                        </div>
                        <div className="cardFooter">
                            <h4>Your Order</h4>
                            {selectedBill.cartItems.map((product) => (
                                <div className="footerCard" key={product._id}>
                                    <div className="group"><span>{product.name}</span><span><b>x{product.quantity}</b></span></div>
                                    <div className="group"><span>Price:</span><span><b>Rs. {product.price * product.quantity}</b></span></div>
                                </div>
                            ))}
                            <div className="footerCardTotal" style={{ width: 160 }}>
                                <div className="group"><span>SubTotal:</span><span><b>Rs. {selectedBill.subTotal}</b></span></div>
                                <div className="group"><span>Tax:</span><span><b>Rs. {selectedBill.tax}</b></span></div>
                                <div className="group" style={{ borderTop: '2px solid #0a2540', paddingTop: 8, marginTop: 8 }}>
                                    <h3>Total:</h3>
                                    <h3><b style={{ color: '#ff6b35' }}>Rs. {selectedBill.totalAmount}</b></h3>
                                </div>
                            </div>
                            <div className="footerThanks">
                                <span>Thank You! Shukriya 🇵🇰</span>
                            </div>
                        </div>
                    </div>
                    <div className="bills-btn-add">
                        <Button onClick={handlePrint} className="add-new">🖨️ Print Invoice</Button>
                    </div>
                </Modal>
            )}
        </LayoutApp>
    );
};

export default Bills;
