import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    SearchOutlined,
    ShopOutlined,
    UserOutlined,
    FileTextOutlined,
} from '@ant-design/icons';
import { globalSearch } from '../services/api';

const GlobalSearch = ({ visible, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ products: [], customers: [], bills: [] });
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (visible && inputRef.current) {
            inputRef.current.focus();
            setQuery('');
            setResults({ products: [], customers: [], bills: [] });
        }
    }, [visible]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length >= 2) {
                const { data } = await globalSearch(query);
                setResults(data);
            } else {
                setResults({ products: [], customers: [], bills: [] });
            }
        }, 150);
        return () => clearTimeout(timer);
    }, [query]);

    const handleSelect = (type, item) => {
        onClose();
        if (type === 'products') navigate('/products');
        else if (type === 'customers') navigate('/customers');
        else if (type === 'bills') navigate('/bills');
    };

    if (!visible) return null;

    const hasResults =
        results.products.length > 0 ||
        results.customers.length > 0 ||
        results.bills.length > 0;

    return (
        <div className="search-overlay" onClick={onClose}>
            <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                <div className="search-input-wrapper">
                    <SearchOutlined className="search-icon" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products, customers, bills..."
                    />
                    <span className="search-shortcut">ESC</span>
                </div>

                <div className="search-results">
                    {!query && (
                        <div className="search-empty">
                            <p>Type to search across everything</p>
                            <p style={{ fontSize: 12, marginTop: 8, opacity: 0.6 }}>
                                Products • Customers • Bills
                            </p>
                        </div>
                    )}

                    {query && !hasResults && query.length >= 2 && (
                        <div className="search-empty">
                            <p>No results found for "{query}"</p>
                        </div>
                    )}

                    {results.products.length > 0 && (
                        <>
                            <div className="search-category-label">Products</div>
                            {results.products.map((p) => (
                                <div
                                    key={p._id}
                                    className="search-result-item"
                                    onClick={() => handleSelect('products', p)}
                                >
                                    <div className="result-icon">
                                        <ShopOutlined />
                                    </div>
                                    <div className="result-info">
                                        <div className="result-name">{p.name}</div>
                                        <div className="result-meta">
                                            Rs. {p.price} • Stock: {p.stock}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {results.customers.length > 0 && (
                        <>
                            <div className="search-category-label">Customers</div>
                            {results.customers.map((c) => (
                                <div
                                    key={c._id}
                                    className="search-result-item"
                                    onClick={() => handleSelect('customers', c)}
                                >
                                    <div className="result-icon">
                                        <UserOutlined />
                                    </div>
                                    <div className="result-info">
                                        <div className="result-name">{c.name}</div>
                                        <div className="result-meta">+92 {c.phone}</div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {results.bills.length > 0 && (
                        <>
                            <div className="search-category-label">Bills</div>
                            {results.bills.map((b) => (
                                <div
                                    key={b._id}
                                    className="search-result-item"
                                    onClick={() => handleSelect('bills', b)}
                                >
                                    <div className="result-icon">
                                        <FileTextOutlined />
                                    </div>
                                    <div className="result-info">
                                        <div className="result-name">{b.customerName}</div>
                                        <div className="result-meta">
                                            Rs. {b.totalAmount} • {b._id}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GlobalSearch;
