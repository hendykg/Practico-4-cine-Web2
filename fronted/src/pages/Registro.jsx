import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Registro() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'cliente' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert('Registro exitoso. Ahora inicia sesión.');
                navigate('/login');
            } else {
                alert('Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', color: 'white' }}>
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="Nombre completo" required onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ padding: '10px' }} />
                <input type="email" placeholder="Correo" required onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ padding: '10px' }} />
                <input type="password" placeholder="Contraseña" required onChange={(e) => setFormData({...formData, password: e.target.value})} style={{ padding: '10px' }} />
                <button type="submit" style={{ padding: '10px', background: '#E50914', color: 'white', border: 'none', cursor: 'pointer' }}>Registrarse</button>
            </form>
            <p style={{ marginTop: '15px' }}>¿Ya tienes cuenta? <Link to="/login" style={{ color: '#E50914' }}>Inicia sesión aquí</Link></p>
        </div>
    );
}