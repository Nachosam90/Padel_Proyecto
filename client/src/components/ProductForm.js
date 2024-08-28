import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useParams, useHistory } from 'react-router-dom';

const ProductForm = () => {
    const { id } = useParams();
    const { addProduct, updateProduct, getProductById } = useProducts();
    const history = useHistory();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
    });

    useEffect(() => {
        if (id) {
            const product = getProductById(id);
            if (product) {
                setFormData({
                    name: product.name,
                    price: product.price,
                    description: product.description,
                });
            }
        }
    }, [id, getProductById]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateProduct(id, formData);
        } else {
            await addProduct(formData);
        }
        history.push('/');
    };

    return (
        <div>
            <h2>{id ? 'Actualizar Producto' : 'Agregar Producto'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Precio</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descripción</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{id ? 'Actualizar' : 'Agregar'}</button>
            </form>
        </div>
    );
};

export default ProductForm;
