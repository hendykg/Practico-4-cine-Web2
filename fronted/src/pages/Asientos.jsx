import apiClient from '../api/client.js'; 
import '../assets/css/haciendo.css';
import '../assets/css/index.css';

// Modifica el useEffect existente para que quede así:
useEffect(() => {
    const sessionMovie = JSON.parse(sessionStorage.getItem('movieSelection') || '{}');
    setMovieInfo(sessionMovie);

    // NUEVO: Traer asientos ocupados reales de esa función desde el backend
    const fetchOccupiedSeats = async () => {
        if(sessionMovie?.showtime?.id) {
            try {
                // Asumiendo que tu backend tiene una ruta para ver asientos por función
                const res = await apiClient.get(`/showtimes/${sessionMovie.showtime.id}/seats`); 
                // Convierte [{row: 'A', column: 1}] a ['A1']
                const ocupados = res.data.map(seat => `${seat.row}${seat.column}`);
                setOccupiedSeats(ocupados);
            } catch (error) {
                console.error("Error cargando asientos", error);
            }
        }
    };
    fetchOccupiedSeats();

    const savedSelection = JSON.parse(sessionStorage.getItem('seleccionAsientos') || '{}');
    if (savedSelection.asientos) {
        setSelectedSeats(savedSelection.asientos);
    }
}, []);