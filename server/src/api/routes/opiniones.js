const express = require('express');
const router = express.Router();
const Pala = require('../models/pala');
const { protect } = require('./auth');

// Obtención de una opinión
import React, { useEffect, useState } from 'react';

const OpinionList = ({ palaId }) => {
    const [opinions, setOpinions] = useState([]);

    useEffect(() => {
        const fetchOpinions = async () => {
            try {
                const response = await fetch(`http://localhost:5000/palas/${palaId}`);
                const data = await response.json();
                setOpinions(data.opiniones);
            } catch (error) {
                console.error('Error fetching opinions:', error);
            }
        };

        fetchOpinions();
    }, [palaId]);

    return (
        <div>
            <h3>Opiniones</h3>
            {opinions.map((opinion) => (
                <div key={opinion._id}>
                    <p><strong>{opinion.usuario.name}</strong>: {opinion.texto}</p>
                    <p>Calificación: {opinion.calificacion}</p>
                </div>
            ))}
        </div>
    );
};

export default OpinionList;


// Crear una opinión a una pala
const OpinionForm = ({ palaId, onOpinionAdded }) => {
    const [texto, setTexto] = useState('');
    const [calificacion, setCalificacion] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/palas/${palaId}/opiniones`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Si tienes autenticación
                },
                body: JSON.stringify({ texto, calificacion }),
            });
            if (response.ok) {
                const updatedPala = await response.json();
                onOpinionAdded(updatedPala.opiniones); // Actualiza la lista de opiniones
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


// Actualizar opinión de una pala
const updateOpinion = async (palaId, opinionId, updatedOpinion, onOpinionUpdated) => {
    try {
        const response = await fetch(`http://localhost:5000/palas/${palaId}/opiniones/${opinionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedOpinion),
        });
        if (response.ok) {
            const updatedPala = await response.json();
            onOpinionUpdated(updatedPala.opiniones); // Actualiza la lista de opiniones
        }
    } catch (error) {
        console.error('Error updating opinion:', error);
    }
};


// Eliminar una opinión de una pala
const deleteOpinion = async (palaId, opinionId, onOpinionDeleted) => {
    try {
        const response = await fetch(`http://localhost:5000/palas/${palaId}/opiniones/${opinionId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (response.ok) {
            const updatedPala = await response.json();
            onOpinionDeleted(updatedPala.opiniones); // Actualiza la lista de opiniones
        }
    } catch (error) {
        console.error('Error deleting opinion:', error);
    }
};


module.exports = router;
