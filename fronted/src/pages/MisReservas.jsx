import { useState, useEffect } from 'react';

export default function MisReservas() {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const fetchReservas = async () => {
            const token = localStorage.getItem('auth_token');
            const res = await fetch('http://localhost:3000/reservations/my-reservations', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setReservas(await res.json());
        };
        fetchReservas();
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ color: '#E50914' }}>Mis Reservas</h2>
            {reservas.length === 0 ? <p style={{ color: 'white' }}>No tienes reservas.</p> : (
                reservas.map(res => (
                    <div key={res.id} style={{ background: '#222', padding: '20px', margin: '15px 0', color: 'white' }}>
                        <h3>{res.Showtime.Movie.title}</h3>
                        <p>Fecha: {new Date(res.Showtime.datetime).toLocaleString()}</p>
                        <p>Sala: {res.Showtime.Room.name}</p>
                        <p>Asientos: {res.Seats.map(s => `${s.row}${s.column}`).join(', ')}</p>
                    </div>
                ))
            )}
        </div>
    );
}