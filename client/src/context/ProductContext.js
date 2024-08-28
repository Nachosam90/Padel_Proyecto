import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

const initialState = {
    products: [],
    product: null,
};

const productReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'SET_PRODUCT':
            return { ...state, product: action.payload };
        case 'ADD_PRODUCT':
            return { ...state, products: [...state.products, action.payload] };
        case 'DELETE_PRODUCT':
            return { ...state, products: state.products.filter(p => p._id !== action.payload) };
        case 'ADD_OPINION':
            return { ...state, product: action.payload };
        case 'UPDATE_OPINION':
            return { ...state, product: action.payload };
        case 'DELETE_OPINION':
            return { ...state, product: action.payload };
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map(p =>
                    p._id === action.payload._id ? action.payload : p
                ),
            };
        default:
            return state;
    }
};

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    useEffect(() => {
        axios.get('/palas').then(res => {
            dispatch({ type: 'SET_PRODUCTS', payload: res.data });
        });
    }, []);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};
