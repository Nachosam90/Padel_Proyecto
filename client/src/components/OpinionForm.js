import React, { useState } from 'react';

const OpinionForm = ({ palaId, onOpinionAdded }) => {
    const [texto, setTexto] = useState('');
    const [calificacion, setCalificacion] = useState(1);

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/palas/${palaId}/opiniones`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ texto, calificacion }),
            });
            if (response.ok) {
                const updatedPala = await response.json();
                onOpinionAdded(updatedPala.opiniones);
                setTexto('');
                setCalificacion(1);
            }
        } catch (error) {
            console.error('Error creating opinion:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Opinión</label>
                <textarea value={texto} onChange={(e) => setTexto(e.target.value)} required />
            </div>
            <div>
                <label>Calificación</label>
                <select value={calificacion} onChange={(e) => setCalificacion(e.target.value)} required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <button type="submit">Enviar Opinión</button>
        </form>
    );
};

export default OpinionForm;
