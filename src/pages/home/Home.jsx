import { Col, Empty, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LayoutApp from '../../components/Layout';
import Product from '../../components/Product';
import { getProducts } from '../../services/api';
import './home.css';

import allCategories from '../../asset/images/all-cat.png';

const Home = () => {
    const [userId] = useState(() => {
        const auth = localStorage.getItem('auth');
        return auth ? JSON.parse(auth)._id : null;
    });

    const dispatch = useDispatch();
    const [productData, setProductData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        {
            name: 'all',
            imageUrl: allCategories,
        },
        {
            name: 'pizzas',
            imageUrl:
                'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/27954/pizza-pepperoni-clipart-xl.png',
        },
        {
            name: 'burgers',
            imageUrl:
                'https://cdn.pixabay.com/photo/2022/01/04/23/00/fast-food-6916101_960_720.png',
        },
        {
            name: 'drinks',
            imageUrl:
                'https://images.vexels.com/media/users/3/246333/isolated/preview/9626dce3278f72220ea2736de64e6233-pink-cocktail-color-stroke.png',
        },
        {
            name: 'desi',
            imageUrl:
                'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=60&h=60&fit=crop',
        },
    ];

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                dispatch({ type: 'SHOW_LOADING' });
                const { data } = await getProducts({ createdBy: userId });
                setProductData(data);
                dispatch({ type: 'HIDE_LOADING' });
            } catch (error) {
                dispatch({ type: 'HIDE_LOADING' });
            }
        };
        getAllProducts();
    }, [dispatch, userId]);

    return (
        <LayoutApp>
            <div className="animate-fadeInUp">
                <h2 style={{ fontWeight: 800, color: '#0a2540' }}>🛒 POS System</h2>
                <p style={{ color: '#64748b', marginBottom: 20 }}>Browse & add products to cart</p>
            </div>
            {productData.length === 0 ? (
                <div className="no-product animate-fadeIn">
                    <h3 className="no-product-text">No Product Found</h3>
                    <Empty />
                </div>
            ) : (
                <div>
                    <div className="category animate-fadeInUp delay-1">
                        {categories.map((category) => (
                            <div
                                key={category.name}
                                className={`categoryFlex ${selectedCategory === category.name ? 'category-active' : ''
                                    }`}
                                onClick={() => setSelectedCategory(category.name)}
                            >
                                <h3 className="categoryName">{category.name}</h3>
                                <img
                                    src={category.imageUrl}
                                    alt={category.name}
                                    height={60}
                                    width={60}
                                    style={{ borderRadius: 8, objectFit: 'cover' }}
                                />
                            </div>
                        ))}
                    </div>
                    <Row gutter={[16, 16]}>
                        {(selectedCategory === 'all'
                            ? productData
                            : productData.filter((i) => i.category === selectedCategory)
                        ).length > 0 ? (
                            (selectedCategory === 'all'
                                ? productData
                                : productData.filter((i) => i.category === selectedCategory)
                            ).map((product, idx) => (
                                <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                                    <div className="animate-scaleIn" style={{ animationDelay: `${idx * 0.05}s` }}>
                                        <Product product={product} />
                                    </div>
                                </Col>
                            ))
                        ) : (
                            <Col xs={24}>
                                <div className="empty-container animate-fadeIn">
                                    <Empty description={<span>No Product Found</span>} />
                                </div>
                            </Col>
                        )}
                    </Row>
                </div>
            )}
        </LayoutApp>
    );
};

export default Home;
