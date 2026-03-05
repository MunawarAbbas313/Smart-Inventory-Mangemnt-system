import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const cartItems = localStorage.getItem('cartItems');

const preloadedState = {
    root: {
        loading: false,
        cartItems: cartItems ? JSON.parse(cartItems) : [],
    },
};

const store = configureStore({
    reducer: {
        root: rootReducer,
    },
    preloadedState,
});

export default store;