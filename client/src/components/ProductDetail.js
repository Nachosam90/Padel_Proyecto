import React, { useEffect, useState } from 'react';
import useProducts from './hooks/useProducts';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const { fetchProductById, loading, error } = useProducts();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            const fetchedProduct = await fetchProductById(id);
            setProduct(fetchedProduct);
        };

        getProduct();
    }, [id]);

    if (loading) return <p>Cargando producto...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>Producto no encontrado</p>;

    return (
        <div>
            <h2>{product.name}</h2>
            <p>Precio: ${product.price}</p>
            <p>Categoría: {product.categoria}</p>
            <p>Descripción: {product.descripcion}</p>
        </div>
    );
};

export default ProductDetail;

