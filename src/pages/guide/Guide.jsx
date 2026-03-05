import React from 'react';
import {
    ShoppingCartOutlined,
    ShopOutlined,
    UserSwitchOutlined,
    MoneyCollectOutlined,
    SearchOutlined,
    ThunderboltOutlined,
    DashboardOutlined,
    PrinterOutlined,
    WarningOutlined,
    RocketOutlined,
    SafetyOutlined,
    BulbOutlined,
} from '@ant-design/icons';
import LayoutApp from '../../components/Layout';

const Guide = () => {
    return (
        <LayoutApp>
            <div className="guide-container">
                {/* Hero */}
                <div className="guide-hero">
                    <h1>📖 How to Use Smart POS</h1>
                    <p>
                        Your complete guide to managing inventory, sales, and customers
                        efficiently
                    </p>
                </div>

                {/* Quick Start */}
                <div className="guide-section animate-fadeInUp delay-1">
                    <h2>
                        <span className="guide-icon"><RocketOutlined /></span>
                        Quick Start Guide
                    </h2>
                    <ol className="guide-steps">
                        <li>
                            <strong>Login</strong> with your credentials. Test accounts are
                            available: <code>admin@test.com / admin123</code>
                        </li>
                        <li>
                            <strong>Dashboard</strong> shows your business overview — revenue,
                            profit, top products, low stock alerts, and more.
                        </li>
                        <li>
                            Head to <strong>POS</strong> to browse products by category and add
                            them to your cart.
                        </li>
                        <li>
                            Open <strong>Cart</strong> to review items, adjust quantities, and
                            generate invoices.
                        </li>
                        <li>
                            Manage your <strong>Products</strong> — add new items, edit prices,
                            update stock, or delete.
                        </li>
                    </ol>
                </div>

                {/* POS System */}
                <div className="guide-section animate-fadeInUp delay-2">
                    <h2>
                        <span className="guide-icon"><ShoppingCartOutlined /></span>
                        POS System (Point of Sale)
                    </h2>
                    <ol className="guide-steps">
                        <li>
                            Browse products by category: <strong>All, Pizzas, Burgers,
                                Drinks, Desi</strong>. Click a category to filter.
                        </li>
                        <li>
                            Click <strong>"Add To Cart"</strong> on any product to add it to
                            your cart. The cart badge updates in real-time.
                        </li>
                        <li>
                            Products with <span style={{ color: 'red' }}>red stock</span> means
                            low inventory (less than 10). Out-of-stock items can't be added.
                        </li>
                        <li>
                            Use <strong>Ctrl+K</strong> to quickly search for any product
                            instead of browsing.
                        </li>
                    </ol>
                </div>

                {/* Products Management */}
                <div className="guide-section animate-fadeInUp delay-3">
                    <h2>
                        <span className="guide-icon"><ShopOutlined /></span>
                        Product Management
                    </h2>
                    <ol className="guide-steps">
                        <li>
                            Click <strong>"Add Product"</strong> to create a new product with
                            name, category, price, stock, and image URL.
                        </li>
                        <li>
                            Use the <strong>search bar</strong> to find products by name. It
                            searches as you type with smart debouncing.
                        </li>
                        <li>
                            Click the <strong>✏️ edit icon</strong> to modify any product's
                            details.
                        </li>
                        <li>
                            Click the <strong>🗑️ delete icon</strong> to remove a product.
                            Be careful — this can't be undone!
                        </li>
                        <li>
                            You can also <strong>"Add to Cart"</strong> directly from the
                            products table.
                        </li>
                    </ol>
                </div>

                {/* Cart & Invoicing */}
                <div className="guide-section animate-fadeInUp delay-4">
                    <h2>
                        <span className="guide-icon"><MoneyCollectOutlined /></span>
                        Cart & Invoice Generation
                    </h2>
                    <ol className="guide-steps">
                        <li>
                            In the cart, use <strong>+ / −</strong> buttons to adjust
                            quantities for each item.
                        </li>
                        <li>
                            Click <strong>"Generate Invoice"</strong> to open the billing
                            form.
                        </li>
                        <li>
                            Enter the customer's <strong>phone number</strong> — the system
                            will auto-fill if the customer already exists.
                        </li>
                        <li>
                            Choose payment method: <strong>Cash, Card, Easypaisa, or
                                JazzCash</strong>.
                        </li>
                        <li>
                            The system checks stock before generating. If any item exceeds
                            available stock, you'll see a warning.
                        </li>
                        <li>
                            After billing, stock is <strong>automatically updated</strong> and
                            the cart is cleared.
                        </li>
                    </ol>
                </div>

                {/* Customers */}
                <div className="guide-section animate-fadeInUp delay-5">
                    <h2>
                        <span className="guide-icon"><UserSwitchOutlined /></span>
                        Customer Management
                    </h2>
                    <ol className="guide-steps">
                        <li>
                            View all customers with their name, phone (+92), address, and
                            registration date.
                        </li>
                        <li>
                            <strong>Search by phone number</strong> with live search as you
                            type.
                        </li>
                        <li>
                            Customers are <strong>auto-created</strong> during billing if they
                            don't exist yet.
                        </li>
                        <li>
                            Edit or delete customers from the table using the action icons.
                        </li>
                    </ol>
                </div>

                {/* Smart Features */}
                <div className="guide-section animate-fadeInUp delay-5">
                    <h2>
                        <span className="guide-icon"><BulbOutlined /></span>
                        Smart Features
                    </h2>
                    <ol className="guide-steps">
                        <li>
                            <strong>Dashboard Analytics</strong> — real-time revenue, profit,
                            top products, top customers, and payment method breakdown.
                        </li>
                        <li>
                            <strong>Low Stock Alerts</strong> — automatic warnings when
                            product stock drops below 5 units.
                        </li>
                        <li>
                            <strong>Global Search (Ctrl+K)</strong> — instantly search across
                            products, customers, and bills from anywhere.
                        </li>
                        <li>
                            <strong>Keyboard Shortcuts (Alt+/)</strong> — navigate the entire
                            app without touching the mouse.
                        </li>
                        <li>
                            <strong>Profit Tracking</strong> — see net profit alongside
                            revenue on your dashboard.
                        </li>
                        <li>
                            <strong>Smart Customer Lookup</strong> — phone number auto-fills
                            customer info during billing.
                        </li>
                    </ol>
                </div>

                {/* Keyboard Shortcuts */}
                <div className="guide-section animate-fadeInUp delay-5">
                    <h2>
                        <span className="guide-icon"><ThunderboltOutlined /></span>
                        Keyboard Shortcuts
                    </h2>
                    <div className="shortcut-grid" style={{ marginTop: 8 }}>
                        {[
                            { key: 'Ctrl + K', desc: 'Open Global Search' },
                            { key: 'Alt + 1', desc: 'Go to Dashboard' },
                            { key: 'Alt + 2', desc: 'Go to POS' },
                            { key: 'Alt + 3', desc: 'Go to Products' },
                            { key: 'Alt + 4', desc: 'Go to Customers' },
                            { key: 'Alt + 5', desc: 'Go to Bills' },
                            { key: 'Alt + C', desc: 'Open Cart' },
                            { key: 'Alt + /', desc: 'Show All Shortcuts' },
                            { key: 'Escape', desc: 'Close any modal' },
                        ].map((s) => (
                            <div className="shortcut-item" key={s.key}>
                                <span className="shortcut-desc">{s.desc}</span>
                                <kbd>{s.key}</kbd>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tips */}
                <div className="guide-section animate-fadeInUp delay-5" style={{ background: 'linear-gradient(135deg, #fff5f0, #fff9f5)', border: '1px solid #ffe0cc' }}>
                    <h2>
                        <span className="guide-icon"><SafetyOutlined /></span>
                        Pro Tips
                    </h2>
                    <ol className="guide-steps">
                        <li>
                            Keep your product stock updated regularly to avoid overselling.
                        </li>
                        <li>
                            Use the dashboard daily to track performance and identify top
                            sellers.
                        </li>
                        <li>
                            Save customer phone numbers — returning customers get faster
                            billing.
                        </li>
                        <li>
                            Use keyboard shortcuts for blazing-fast navigation during rush
                            hours.
                        </li>
                        <li>
                            Check low-stock alerts daily and restock before items run out!
                        </li>
                    </ol>
                </div>
            </div>
        </LayoutApp>
    );
};

export default Guide;
