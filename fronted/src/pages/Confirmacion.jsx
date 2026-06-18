import { useNavigate } from 'react-router-dom';

export default function Confirmacion() {
    const navigate = useNavigate();
    const seleccion = JSON.parse(sessionStorage.getItem('seleccionAsientos'));

    const confirmarCompra = async () => {
        const token = localStorage.getItem('auth_token');
        try {
            const res = await fetch('http://localhost:3000/reservations', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    showtime_id: seleccion.showtime_id,
                    seats: seleccion.seats
                })
            });

            if (res.ok) {
                alert('¡Reserva confirmada con éxito!');
                sessionStorage.clear();
                navigate('/mis-reservas');
            } else {
                const error = await res.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) { console.error(error); }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '40px auto', background: '#222', padding: '30px', color: 'white', borderRadius: '8px' }}>
            <h2>Resumen de Compra</h2>
            <p>Total a pagar: Bs. {seleccion?.total}</p>
            <p>Cantidad de asientos: {seleccion?.seats.length}</p>
            <button onClick={confirmarCompra} style={{ width: '100%', padding: '15px', background: '#E50914', color: 'white', border: 'none', marginTop: '20px', cursor: 'pointer' }}>
                Confirmar y Finalizar
            </button>
        </div>
    );
}