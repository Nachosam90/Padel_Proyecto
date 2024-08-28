import React, { useState } from 'react';
import useProducts from './hooks/useProducts';

const AddProduct = () => {
    const { addProduct } = useProducts();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addProduct({ name, price, categoria, descripcion });
        setName('');
        setPrice('');
        setCategoria('');
        setDescripcion('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Precio</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div>
                <label>Categoría</label>
                <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
            </div>
            <div>
                <label>Descripción</label>
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
            </div>
            <button type="submit">Agregar Producto</button>
        </form>
    );
};

export default AddProduct;
