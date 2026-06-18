import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            
            if (res.ok && data.token) { // Asegúrate de que tu backend envíe el token en el JSON
                localStorage.setItem('auth_token', data.token);
                navigate('/');
            } else {
                alert('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', color: 'white' }}>
            <h2>Inicio de Sesión</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="email" placeholder="Correo" required onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ padding: '10px' }} />
                <input type="password" placeholder="Contraseña" required onChange={(e) => setFormData({...formData, password: e.target.value})} style={{ padding: '10px' }} />
                <button type="submit" style={{ padding: '10px', background: '#E50914', color: 'white', border: 'none', cursor: 'pointer' }}>Ingresar</button>
            </form>
        </div>
    );
}