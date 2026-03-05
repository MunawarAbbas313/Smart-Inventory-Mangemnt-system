import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DatePicker, Segmented } from 'antd';
import {
    WarningOutlined,
    BarChartOutlined,
    WalletOutlined,
    CrownOutlined,
    UserOutlined,
    FireOutlined,
    FallOutlined,
    PieChartOutlined,
    FundOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import LayoutApp from '../../components/Layout';
import { getDashboardStats } from '../../services/api';

const { RangePicker } = DatePicker;

const Dashboard = () => {
    const [userId] = useState(() => {
        const auth = localStorage.getItem('auth');
        return auth ? JSON.parse(auth)._id : null;
    });
    const [userName] = useState(() => {
        const auth = localStorage.getItem('auth');
        return auth ? JSON.parse(auth).name : 'User';
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [dateRange, setDateRange] = useState(null);
    const [quickRange, setQuickRange] = useState('All Time');

    const loadStats = useCallback(async (range = null) => {
        try {
            dispatch({ type: 'SHOW_LOADING' });
            const { data } = await getDashboardStats({ createdBy: userId, dateRange: range });
            setStats(data);
            dispatch({ type: 'HIDE_LOADING' });
        } catch (err) {
            dispatch({ type: 'HIDE_LOADING' });
        }
    }, [dispatch, userId]);

    useEffect(() => { loadStats(dateRange); }, [loadStats, dateRange]);

    const handleQuickRange = (val) => {
        setQuickRange(val);
        const now = new Date();
        let start = null;
        if (val === 'Today') {
            start = now.toISOString().substring(0, 10);
            setDateRange({ start, end: start });
        } else if (val === 'This Week') {
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            setDateRange({ start: startOfWeek.toISOString().substring(0, 10), end: now.toISOString().substring(0, 10) });
        } else if (val === 'This Month') {
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            setDateRange({ start: startOfMonth.toISOString().substring(0, 10), end: now.toISOString().substring(0, 10) });
        } else {
            setDateRange(null);
        }
    };

    const handleDatePicker = (dates) => {
        if (dates && dates[0] && dates[1]) {
            setQuickRange('Custom');
            setDateRange({
                start: dates[0].format('YYYY-MM-DD'),
                end: dates[1].format('YYYY-MM-DD'),
            });
        } else {
            setQuickRange('All Time');
            setDateRange(null);
        }
    };

    if (!stats) return <LayoutApp><div /></LayoutApp>;

    const maxSale = Math.max(...stats.dailySales.map(d => d.total), 1);
    const maxCatSale = Math.max(...(stats.categoryBreakdown?.map(c => c.totalRevenue) || [1]), 1);

    const formatPKR = (num) => {
        if (num >= 100000) return `Rs. ${(num / 100000).toFixed(1)}L`;
        if (num >= 1000) return `Rs. ${(num / 1000).toFixed(1)}K`;
        return `Rs. ${Math.round(num)}`;
    };

    const getGreeting = () => {
        const h = new Date().getHours();
        if (h < 12) return '🌅 Good Morning';
        if (h < 17) return '☀️ Good Afternoon';
        return '🌙 Good Evening';
    };

    return (
        <LayoutApp>
            {/* Header */}
            <div className="animate-fadeInUp" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
                <div>
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0a2540' }}>
                        {getGreeting()}, {userName.split(' ')[0]}!
                    </h2>
                    <p style={{ color: '#64748b', marginTop: 4 }}>Here's your business overview</p>
                </div>

                {/* Date Filter */}
                <div className="dashboard-date-filter">
                    <Segmented
                        options={['All Time', 'Today', 'This Week', 'This Month']}
                        value={quickRange === 'Custom' ? undefined : quickRange}
                        onChange={handleQuickRange}
                        size="middle"
                    />
                    <RangePicker
                        onChange={handleDatePicker}
                        style={{ marginLeft: 8 }}
                        placeholder={['Start', 'End']}
                        size="middle"
                    />
                </div>
            </div>

            {/* Low Stock Alert */}
            {stats.lowStockProducts.length > 0 && (
                <div className="low-stock-banner animate-fadeInUp delay-1">
                    <WarningOutlined className="alert-icon" />
                    <div>
                        <div className="alert-text">
                            ⚠️ {stats.lowStockProducts.length} product(s) running low on stock!
                        </div>
                        <div className="alert-items">
                            {stats.lowStockProducts.map(p => (
                                <span key={p._id} className="low-stock-tag">{p.name} ({p.stock} left)</span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {stats.outOfStockProducts.length > 0 && (
                <div className="low-stock-banner animate-fadeInUp delay-1" style={{ background: 'linear-gradient(135deg, #fefefe, #f5f5f5)', borderColor: '#e0e0e0' }}>
                    <WarningOutlined className="alert-icon" style={{ color: '#757575' }} />
                    <div>
                        <div className="alert-text" style={{ color: '#424242' }}>
                            ❌ {stats.outOfStockProducts.length} product(s) are out of stock
                        </div>
                        <div className="alert-items">
                            {stats.outOfStockProducts.map(p => (
                                <span key={p._id} className="low-stock-tag" style={{ background: '#e0e0e0', color: '#424242' }}>
                                    {p.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="stats-grid">
                {[
                    { icon: '💰', value: formatPKR(stats.totalRevenue), label: 'Total Revenue', onClick: () => navigate('/bills') },
                    { icon: '📈', value: formatPKR(stats.totalProfit), label: 'Net Profit' },
                    { icon: '🧾', value: stats.totalOrders, label: 'Total Orders', onClick: () => navigate('/bills') },
                    { icon: '👥', value: stats.totalCustomers, label: 'Customers', onClick: () => navigate('/customers') },
                    { icon: '📦', value: stats.totalProducts, label: 'Products', onClick: () => navigate('/products') },
                    { icon: '💵', value: formatPKR(stats.avgOrderValue), label: 'Avg Order Value' },
                ].map((s, i) => (
                    <div key={i} className={`stat-card animate-fadeInUp delay-${Math.min(i + 1, 5)}`} onClick={s.onClick} style={s.onClick ? { cursor: 'pointer' } : {}}>
                        <div className="stat-icon">{s.icon}</div>
                        <div className="stat-value">{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Row 1: Sales Chart + Payment Methods */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
                <div className="chart-card animate-fadeInUp delay-2">
                    <h3><BarChartOutlined /> Sales Trend</h3>
                    <div className="bar-chart">
                        {stats.dailySales.map((day, i) => (
                            <div className="bar-col" key={i}>
                                <div className="bar-value">{day.total > 0 ? formatPKR(day.total) : '-'}</div>
                                <div className="bar" style={{
                                    height: `${Math.max((day.total / maxSale) * 130, 4)}px`,
                                    animationDelay: `${i * 0.1}s`,
                                }} />
                                <div className="bar-label">{day.day}</div>
                                {day.orders > 0 && <div className="bar-label" style={{ fontSize: 10, opacity: 0.6 }}>{day.orders} orders</div>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chart-card animate-fadeInUp delay-3">
                    <h3><WalletOutlined /> Payment Methods</h3>
                    <div className="payment-pills" style={{ flexDirection: 'column' }}>
                        {Object.entries(stats.paymentMethods).map(([method, amount]) => (
                            <div className="payment-pill" key={method}>
                                <span className="pill-label">
                                    {method === 'easypaisa' ? '📱 Easypaisa' : method === 'jazzcash' ? '📱 JazzCash' : method === 'card' ? '💳 Card' : '💵 Cash'}
                                </span>
                                <span className="pill-value">{formatPKR(amount)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Row 2: Hot Selling + Low Selling */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 4 }}>
                <div className="chart-card animate-fadeInUp delay-3">
                    <h3><FireOutlined style={{ color: '#ff6b35' }} /> 🔥 Hot Selling Items</h3>
                    <ul className="top-list">
                        {stats.hotSellingProducts.map((p, i) => (
                            <li key={i}>
                                <span className="rank" style={{ background: 'linear-gradient(135deg, #ff6b35, #ff3d00)' }}>{i + 1}</span>
                                <span className="item-name">
                                    {p.name}
                                    <span style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>{p.totalQty} sold</span>
                                </span>
                                <span className="item-value">{formatPKR(p.totalRevenue)}</span>
                            </li>
                        ))}
                        {stats.hotSellingProducts.length === 0 && <li style={{ color: '#64748b', justifyContent: 'center' }}>No data</li>}
                    </ul>
                </div>

                <div className="chart-card animate-fadeInUp delay-4">
                    <h3><FallOutlined style={{ color: '#ff1744' }} /> 📉 Low Selling Items</h3>
                    <ul className="top-list">
                        {stats.lowSellingProducts.map((p, i) => (
                            <li key={i}>
                                <span className="rank" style={{ background: 'linear-gradient(135deg, #78909c, #546e7a)' }}>{i + 1}</span>
                                <span className="item-name">
                                    {p.name}
                                    <span style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>{p.totalQty} sold</span>
                                </span>
                                <span className="item-value">{formatPKR(p.totalRevenue)}</span>
                            </li>
                        ))}
                        {stats.lowSellingProducts.length === 0 && <li style={{ color: '#64748b', justifyContent: 'center' }}>No data</li>}
                    </ul>
                </div>
            </div>

            {/* Row 3: Category Breakdown + Profit Margins */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 4 }}>
                <div className="chart-card animate-fadeInUp delay-4">
                    <h3><PieChartOutlined /> Category Breakdown</h3>
                    {stats.categoryBreakdown && stats.categoryBreakdown.length > 0 ? (
                        <div>
                            {stats.categoryBreakdown.map((cat, i) => (
                                <div key={i} className="category-bar-row">
                                    <div className="category-bar-label">
                                        <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{cat.category}</span>
                                        <span style={{ color: '#64748b', fontSize: 12 }}>{cat.totalQty} items • {cat.orders} orders</span>
                                    </div>
                                    <div className="category-bar-track">
                                        <div
                                            className="category-bar-fill"
                                            style={{ width: `${(cat.totalRevenue / maxCatSale) * 100}%` }}
                                        />
                                    </div>
                                    <span className="category-bar-amount">{formatPKR(cat.totalRevenue)}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#64748b', padding: 20 }}>No data</div>
                    )}
                </div>

                <div className="chart-card animate-fadeInUp delay-5">
                    <h3><FundOutlined /> 💹 Profit Margins</h3>
                    <ul className="top-list">
                        {stats.profitMargins && stats.profitMargins.map((p, i) => (
                            <li key={i}>
                                <span className="rank" style={{ background: 'linear-gradient(135deg, #00c853, #69f0ae)', color: '#1b5e20' }}>{i + 1}</span>
                                <span className="item-name">
                                    {p.name}
                                    <span style={{ fontSize: 12, color: '#00c853', marginLeft: 8, fontWeight: 700 }}>{p.margin}%</span>
                                </span>
                                <span className="item-value" style={{ color: '#00c853' }}>{formatPKR(p.profit)}</span>
                            </li>
                        ))}
                        {(!stats.profitMargins || stats.profitMargins.length === 0) && (
                            <li style={{ color: '#64748b', justifyContent: 'center' }}>No data</li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Row 4: Top Customers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 4 }}>
                <div className="chart-card animate-fadeInUp delay-5">
                    <h3><CrownOutlined /> Top Selling Products</h3>
                    <ul className="top-list">
                        {stats.topProducts.map((p, i) => (
                            <li key={i}>
                                <span className="rank">{i + 1}</span>
                                <span className="item-name">{p.name}</span>
                                <span className="item-value">{formatPKR(p.totalRevenue)}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="chart-card animate-fadeInUp delay-5">
                    <h3><UserOutlined /> Top Customers</h3>
                    <ul className="top-list">
                        {stats.topCustomers.map((c, i) => (
                            <li key={i}>
                                <span className="rank">{i + 1}</span>
                                <span className="item-name">
                                    {c.name}
                                    <span style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>{c.orders} order{c.orders > 1 ? 's' : ''}</span>
                                </span>
                                <span className="item-value">{formatPKR(c.totalSpent)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </LayoutApp>
    );
};

export default Dashboard;
