import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/css/hora.css';

export default function DetallePelicula() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pelicula, setPelicula] = useState(null);

    useEffect(() => {
        const fetchDetalle = async () => {
            const res = await fetch(`http://localhost:3000/movies/${id}`);
            setPelicula(await res.json());
        };
        fetchDetalle();
    }, [id]);

    const seleccionarFuncion = (funcion) => {
        if (!localStorage.getItem('auth_token')) {
            alert("Debes iniciar sesión para reservar entradas.");
            navigate('/login');
            return;
        }
        sessionStorage.setItem('movieSelection', JSON.stringify({ movie: pelicula, showtime: funcion }));
        navigate('/asientos');
    };

    if (!pelicula) return <h2 style={{ color: 'white' }}>Cargando...</h2>;

    return (
        <div className="movie-details">
            <div className="movie-poster">
                <img src={`http://localhost:3000${pelicula.poster_image}`} alt={pelicula.title} />
            </div>
            <div className="movie-info">
                <h1 className="movie-title">{pelicula.title}</h1>
                <div className="movie-meta">
                    <span className="rating-badge">{pelicula.classification}</span>
                    <span>{pelicula.duration} min</span>
                    <span>{pelicula.genre}</span>
                </div>
                <div className="synopsis"><p>{pelicula.synopsis}</p></div>
                
                <h2 className="showtimes-title">Funciones Disponibles</h2>
                <div className="showtimes-grid">
                    {pelicula.Showtimes?.map(funcion => (
                        <div key={funcion.id} className="time-slot" onClick={() => seleccionarFuncion(funcion)}>
                            <div className="time">{new Date(funcion.datetime).toLocaleString()}</div>
                            <div className="format">Bs. {funcion.price}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}