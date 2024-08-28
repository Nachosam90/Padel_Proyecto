import React, { useEffect, useState } from 'react';


const OpinionList = ({ palaId }) => {
    const [opinions, setOpinions] = useState([]);

    // Obtenemos opiniones desde el backend
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

    // Actualizar una opinión
    const updateOpinion = async (opinionId, updatedOpinion) => {
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
                setOpinions(updatedPala.opiniones);
            }
        } catch (error) {
            console.error('Error updating opinion:', error);
        }
    };

    // Eliminar una opinión
    const deleteOpinion = async (opinionId) => {
        try {
            const response = await fetch(`http://localhost:5000/palas/${palaId}/opiniones/${opinionId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                const updatedPala = await response.json();
                setOpinions(updatedPala.opiniones);
            }
        } catch (error) {
            console.error('Error deleting opinion:', error);
        }
    };

    return (
        <div>
            <h3>Opiniones</h3>
            {opinions.map((opinion) => (
                <div key={opinion._id}>
                    <p><strong>{opinion.usuario.name}</strong>: {opinion.texto}</p>
                    <p>Calificación: {opinion.calificacion}</p>
                    <button onClick={() => updateOpinion}>Editar</button>
                    <button onClick={() => deleteOpinion}>Eliminar</button>
                </div>
            ))}
        </div>
    );
};

export default OpinionList;

