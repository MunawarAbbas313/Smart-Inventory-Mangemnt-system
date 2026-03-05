import React from 'react';
import { Button, Tag, Badge } from 'antd';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { ShoppingCartOutlined, FireOutlined } from '@ant-design/icons';

const Product = ({ product }) => {
    const dispatch = useDispatch();

    const handlerToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { ...product, quantity: 1 },
        });
        message.success(`${product.name} added to cart!`);
    };

    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    const discountPercent = hasDiscount
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const isLowStock = product.stock > 0 && product.stock <= 5;
    const isOutOfStock = product.stock === 0;
    const isHotItem = product.stock <= 10 && product.stock > 0;

    return (
        <div className="product-card-wrapper">
            <div className="product-card">
                {/* Image Section */}
                <div className="product-card-image-container">
                    <img
                        alt={product.name}
                        src={product.image}
                        className="product-card-image"
                    />
                    {/* Badges */}
                    <div className="product-card-badges">
                        {hasDiscount && (
                            <span className="product-badge discount-badge">
                                −{discountPercent}%
                            </span>
                        )}
                        {isHotItem && !isOutOfStock && (
                            <span className="product-badge hot-badge">
                                <FireOutlined /> Hot
                            </span>
                        )}
                    </div>
                    {/* Category Tag */}
                    <span className="product-card-category">
                        {product.category}
                    </span>
                </div>

                {/* Info Section */}
                <div className="product-card-body">
                    <h3 className="product-card-name">{product.name}</h3>

                    {/* Price Section */}
                    <div className="product-card-price-row">
                        <div className="product-card-prices">
                            <span className="product-card-current-price">
                                Rs. {product.price.toLocaleString()}
                            </span>
                            {hasDiscount && (
                                <span className="product-card-original-price">
                                    Rs. {product.originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>
                        {hasDiscount && (
                            <span className="product-card-save">
                                Save Rs. {(product.originalPrice - product.price).toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Stock Section */}
                    <div className="product-card-stock-row">
                        {isOutOfStock ? (
                            <div className="product-card-oos">
                                <span className="oos-dot" /> Out of Stock
                            </div>
                        ) : (
                            <>
                                <div className="product-card-stock-bar-bg">
                                    <div
                                        className="product-card-stock-bar-fill"
                                        style={{
                                            width: `${Math.min((product.stock / 50) * 100, 100)}%`,
                                            background: product.stock < 10
                                                ? 'linear-gradient(90deg, #ff1744, #ff5252)'
                                                : 'linear-gradient(90deg, #00c853, #69f0ae)',
                                        }}
                                    />
                                </div>
                                <span className={`product-card-stock-text ${isLowStock ? 'low' : ''}`}>
                                    {isLowStock ? `Only ${product.stock} left!` : `${product.stock} in stock`}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Action */}
                    {!isOutOfStock && (
                        <button className="product-card-btn" onClick={handlerToCart}>
                            <ShoppingCartOutlined /> Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
