import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/haciendo.css';
import '../assets/css/index.css';

export default function Cartelera() {
    const navigate = useNavigate();
    const [peliculas, setPeliculas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtroGenero, setFiltroGenero] = useState('');

    useEffect(() => {
        const fetchPeliculas = async () => {
            try {
                const response = await fetch('http://localhost:3000/movies');
                const data = await response.json();
                setPeliculas(data);
            } catch (error) { console.error("Error", error); }
        };
        fetchPeliculas();
    }, []);

    const peliculasFiltradas = peliculas.filter(pelicula => {
        return pelicula.title.toLowerCase().includes(busqueda.toLowerCase()) &&
               (filtroGenero === '' || pelicula.genre === filtroGenero);
    });

    return (
        <section className="movie-grid-section">
            <h2>CARTELERA DE CINE</h2>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <input type="text" placeholder="Buscar película..." onChange={(e) => setBusqueda(e.target.value)} style={{ padding: '10px', flex: 1 }} />
                <select onChange={(e) => setFiltroGenero(e.target.value)} style={{ padding: '10px' }}>
                    <option value="">Todos los géneros</option>
                    <option value="Acción">Acción</option>
                    <option value="Comedia">Comedia</option>
                    <option value="Ciencia Ficción">Ciencia Ficción</option>
                </select>
            </div>

            <div className="movie-grid">
                {peliculasFiltradas.map(peli => (
                    <div key={peli.id} className="movie-card" onClick={() => navigate(`/pelicula/${peli.id}`)}>
                        <img src={`http://localhost:3000${peli.poster_image}`} alt={peli.title} />
                        <span className="rating-badge">{peli.classification}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}