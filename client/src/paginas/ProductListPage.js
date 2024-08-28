import React from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const ProductListPage = () => {
    return (
        <div>
            <ProductForm />
            <ProductList />
        </div>
    );
};

export default ProductListPage;
