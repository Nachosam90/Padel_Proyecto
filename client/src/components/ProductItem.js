import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
    return (
        <div>
            <Link to={`/palas/${product._id}`}>
                <h3>{product.name}</h3>
            </Link>
            <p>{product.price}€</p>
        </div>
    );
};

export default ProductItem;
