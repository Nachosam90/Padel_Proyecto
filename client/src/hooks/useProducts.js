import { useState, useEffect } from 'react';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener todos los productos
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/palas');
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Obtener un producto por su ID
    const fetchProductById = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/palas/${id}`);
            if (!response.ok) {
                throw new Error('Error al obtener el producto');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Agrega un nuevo producto
    const addProduct = async (product) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/palas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            if (!response.ok) {
                throw new Error('Error al agregar el producto');
            }
            const newProduct = await response.json();
            setProducts([...products, newProduct]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Actualiza un producto
    const updateProduct = async (id, updatedProduct) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/palas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }
            const updatedData = await response.json();
            setProducts(products.map(product => (product._id === id ? updatedData : product)));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Elimina un producto
    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/palas/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        loading,
        error,
        fetchProductById,
        addProduct,
        updateProduct,
        deleteProduct,
    };
};

export default useProducts;

