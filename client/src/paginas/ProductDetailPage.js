import React, { useState } from 'react';
import OpinionList from '../components/OpinionList';
import OpinionForm from '../components/OpinionForm';
import ProductDetail from '../components/ProductDetail';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [opinions, setOpinions] = useState([]);

    const handleOpinionAdded = (updatedOpinions) => {
        setOpinions(updatedOpinions);
    };

    return (
        <div>
            <h2>Detalles del Producto</h2>
            <ProductDetail />
            <OpinionList palaId={id} />
            <OpinionForm palaId={id} onOpinionAdded={handleOpinionAdded} />
        </div>
    );
};

export default ProductDetailPage;

