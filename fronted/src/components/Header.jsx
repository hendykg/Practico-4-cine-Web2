import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/index.css';

export default function Header() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('auth_token');

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <header>
            <h1 className="logo">CINE-KALAF</h1>
            <nav className="menu-container">
                <ul className="menu">
                    <li><Link to="/"><i className="fas fa-film"></i> Cartelera</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/mis-reservas"><i className="fas fa-ticket-alt"></i> Mis Reservas</Link></li>
                            <li><a href="#" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Salir</a></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login"><i className="fas fa-sign-in-alt"></i> Ingresar</Link></li>
                            <li><Link to="/registro"><i className="fas fa-user-plus"></i> Registro</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}