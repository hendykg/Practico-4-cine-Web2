import { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Row, Col } from 'react-bootstrap';
import apiClient from '../api/client.js';

export default function AdminMovies() {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    title: '', synopsis: '', genre: '', duration: '', classification: '+14'
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null); // NUEVO: Estado para saber si editamos

  const fetchMovies = async () => {
    const res = await apiClient.get('/movies');
    setMovies(res.data);
  };

  useEffect(() => { fetchMovies(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (file) data.append('poster_image', file);

      if (editingId) {
        // Lógica de Editar
        await apiClient.put(`/movies/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Película actualizada con éxito');
      } else {
        // Lógica de Crear
        await apiClient.post('/movies', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Película creada con éxito');
      }
      
      setEditingId(null);
      setFormData({ title: '', synopsis: '', genre: '', duration: '', classification: '+14' });
      setFile(null);
      fetchMovies();
      e.target.reset();
    } catch (error) {
      alert('Error al guardar la película');
    }
  };

  const handleEdit = (movie) => {
    setEditingId(movie.id);
    setFormData({
      title: movie.title, synopsis: movie.synopsis, genre: movie.genre, 
      duration: movie.duration, classification: movie.classification
    });
    window.scrollTo(0, 0); // Sube al formulario
  };

  const handleDelete = async (id) => {
    if(window.confirm('¿Eliminar película?')) {
      await apiClient.delete(`/movies/${id}`);
      fetchMovies();
    }
  };

  return (
    <Container className="mt-4">
      <h2>Gestión de Películas</h2>
      <Form onSubmit={handleSubmit} className="mb-5 p-3 border rounded bg-light">
        <Row>
          {/* ... (Tus inputs de Row/Col se mantienen exactamente igual) ... */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Género</Form.Label>
              <Form.Control type="text" value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duración (minutos)</Form.Label>
              <Form.Control type="number" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Clasificación</Form.Label>
              <Form.Select value={formData.classification} onChange={e => setFormData({...formData, classification: e.target.value})}>
                <option value="+14">+14</option>
                <option value="R">R</option>
                <option value="Todo público">Todo público</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Póster (Imagen)</Form.Label>
              <Form.Control type="file" onChange={e => setFile(e.target.files[0])} required={!editingId} /> {/* No exigimos archivo si solo está editando texto */}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sinopsis</Form.Label>
              <Form.Control as="textarea" rows={3} value={formData.synopsis} onChange={e => setFormData({...formData, synopsis: e.target.value})} required />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant={editingId ? "success" : "primary"}>
          {editingId ? "Actualizar Película" : "Crear Película"}
        </Button>
        {editingId && (
          <Button variant="secondary" className="ms-2" onClick={() => { setEditingId(null); setFormData({ title: '', synopsis: '', genre: '', duration: '', classification: '+14' }); }}>
            Cancelar Edición
          </Button>
        )}
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Género</th>
            <th>Duración</th>
            <th>Clasificación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>{movie.duration} min</td>
              <td>{movie.classification}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(movie)}>Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(movie.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}