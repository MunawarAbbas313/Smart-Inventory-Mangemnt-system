import {
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoneyCollectOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserSwitchOutlined,
    DashboardOutlined,
    BookOutlined,
    SearchOutlined,
    ThunderboltOutlined,
    TeamOutlined,
    FileProtectOutlined,
    SwapOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Modal } from 'antd';
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import brandLogo from '../asset/images/brand-logo.png';
import './layout.css';
import Spinner from './Spinner';
import GlobalSearch from './GlobalSearch';
import NotificationPanel from './NotificationPanel';

const { Header, Sider, Content, Footer } = Layout;

const LayoutApp = ({ children }) => {
    const { cartItems, loading } = useSelector((state) => state.root);
    const [collapsed, setCollapsed] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const [shortcutsVisible, setShortcutsVisible] = useState(false);
    const [userRole] = useState(() => {
        const auth = localStorage.getItem('auth');
        return auth ? JSON.parse(auth).role : 'user';
    });
    const navigate = useNavigate();
    const location = useLocation();

    const toggle = () => setCollapsed(!collapsed);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleKeyboard = useCallback(
        (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setSearchVisible(true); }
            if (e.key === 'Escape') { setSearchVisible(false); setShortcutsVisible(false); }
            if (e.altKey && e.key === '1') { e.preventDefault(); navigate('/'); }
            if (e.altKey && e.key === '2') { e.preventDefault(); navigate('/pos'); }
            if (e.altKey && e.key === '3') { e.preventDefault(); navigate('/products'); }
            if (e.altKey && e.key === '4') { e.preventDefault(); navigate('/customers'); }
            if (e.altKey && e.key === '5') { e.preventDefault(); navigate('/bills'); }
            if (e.altKey && e.key === '6') { e.preventDefault(); navigate('/suppliers'); }
            if (e.altKey && e.key === '7') { e.preventDefault(); navigate('/purchase-orders'); }
            if (e.altKey && e.key === '8') { e.preventDefault(); navigate('/transactions'); }
            if (e.altKey && e.key === 'c') { e.preventDefault(); navigate('/cart'); }
            if (e.altKey && e.key === '/') { e.preventDefault(); setShortcutsVisible(true); }
        },
        [navigate]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyboard);
        return () => window.removeEventListener('keydown', handleKeyboard);
    }, [handleKeyboard]);

    const menuItems = [
        { key: '/', icon: <DashboardOutlined />, label: <Link to="/">Dashboard</Link> },
        { key: '/pos', icon: <ShoppingOutlined />, label: <Link to="/pos">POS</Link> },
        { key: '/products', icon: <ShopOutlined />, label: <Link to="/products">Products</Link> },
        { key: '/customers', icon: <UserSwitchOutlined />, label: <Link to="/customers">Customers</Link> },
        { key: '/bills', icon: <MoneyCollectOutlined />, label: <Link to="/bills">Bills</Link> },
        ...(userRole === 'admin' || userRole === 'agent' ? [
            { key: '/suppliers', icon: <TeamOutlined />, label: <Link to="/suppliers">Suppliers</Link> },
            { key: '/purchase-orders', icon: <FileProtectOutlined />, label: <Link to="/purchase-orders">Purchase Orders</Link> },
            { key: '/transactions', icon: <SwapOutlined />, label: <Link to="/transactions">Transactions</Link> },
        ] : []),
        { key: '/guide', icon: <BookOutlined />, label: <Link to="/guide">How to Use</Link> },
        {
            key: '/logout',
            icon: <LogoutOutlined />,
            label: 'LogOut',
            onClick: () => { localStorage.removeItem('auth'); navigate('/login'); },
        },
    ];

    const shortcuts = [
        { key: 'Ctrl + K', desc: 'Global Search' },
        { key: 'Alt + 1', desc: 'Dashboard' },
        { key: 'Alt + 2', desc: 'POS System' },
        { key: 'Alt + 3', desc: 'Products' },
        { key: 'Alt + 4', desc: 'Customers' },
        { key: 'Alt + 5', desc: 'Bills' },
        { key: 'Alt + 6', desc: 'Suppliers' },
        { key: 'Alt + 7', desc: 'Purchase Orders' },
        { key: 'Alt + 8', desc: 'Transactions' },
        { key: 'Alt + C', desc: 'Cart' },
        { key: 'Alt + /', desc: 'Shortcuts' },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {loading && <Spinner />}
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <img src={brandLogo} alt="brand-logo" className="brand-logo" />
                    <h4 className="logo-title">{collapsed ? '' : 'Smart POS'}</h4>
                </div>
                <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
                <div className="powered-by-container">
                    {!collapsed && (
                        <div>
                            <p className="powered-by" style={{ fontSize: 10, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
                                {userRole === 'admin' ? '👑 Admin' : userRole === 'agent' ? '🧑‍💼 Agent' : '👤 User'}
                            </p>
                            <p className="powered-by">🇵🇰 Made in Pakistan</p>
                        </div>
                    )}
                </div>
            </Sider>
            <Layout className="site-layout" style={{ display: 'flex', flexDirection: 'column' }}>
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, { className: 'trigger', onClick: toggle })}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <div className="shortcuts-badge" onClick={() => setSearchVisible(true)} title="Global Search (Ctrl+K)">
                            <SearchOutlined /> <kbd>Ctrl+K</kbd>
                        </div>
                        <div className="shortcuts-badge" onClick={() => setShortcutsVisible(true)} title="Keyboard Shortcuts (Alt+/)">
                            <ThunderboltOutlined /> <kbd>Alt+/</kbd>
                        </div>
                        <NotificationPanel />
                        <div className="cart-items" onClick={() => navigate('/cart')}>
                            <ShoppingCartOutlined />
                            <span className="cart-badge">{cartItems.length}</span>
                        </div>
                    </div>
                </Header>
                <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 280, flex: 1 }}>
                    {children}
                </Content>
                <Footer className="app-footer">
                    <div className="footer-content">
                        <div className="footer-left">
                            <div className="footer-brand">
                                <img src={brandLogo} alt="logo" className="footer-logo" />
                                <div>
                                    <strong className="footer-title">Smart POS System</strong>
                                    <span className="footer-sub">Intelligent Inventory Management</span>
                                </div>
                            </div>
                        </div>
                        <div className="footer-center">
                            <div className="footer-links">
                                <Link to="/" className="footer-link">Dashboard</Link>
                                <span className="footer-divider">•</span>
                                <Link to="/pos" className="footer-link">POS</Link>
                                <span className="footer-divider">•</span>
                                <Link to="/products" className="footer-link">Products</Link>
                                <span className="footer-divider">•</span>
                                <Link to="/suppliers" className="footer-link">Suppliers</Link>
                                <span className="footer-divider">•</span>
                                <Link to="/guide" className="footer-link">Guide</Link>
                            </div>
                            <div className="footer-shortcuts-hint">
                                Press <kbd>Ctrl+K</kbd> to search • <kbd>Alt+/</kbd> for shortcuts
                            </div>
                        </div>
                        <div className="footer-right">
                            <span className="footer-flag">🇵🇰</span>
                            <span className="footer-copy">
                                © {new Date().getFullYear()} Smart POS
                                <br />
                                <span className="footer-team">Munawar Abbas</span>
                            </span>
                        </div>
                    </div>
                </Footer>
            </Layout>
            <GlobalSearch visible={searchVisible} onClose={() => setSearchVisible(false)} />
            <Modal
                title={<span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><ThunderboltOutlined style={{ color: '#ff6b35' }} /> Keyboard Shortcuts</span>}
                open={shortcutsVisible} onCancel={() => setShortcutsVisible(false)} footer={null} width={520}
            >
                <div className="shortcut-grid">
                    {shortcuts.map(s => (
                        <div className="shortcut-item" key={s.key}>
                            <span className="shortcut-desc">{s.desc}</span>
                            <kbd>{s.key}</kbd>
                        </div>
                    ))}
                </div>
            </Modal>
        </Layout>
    );
};

export default LayoutApp;
