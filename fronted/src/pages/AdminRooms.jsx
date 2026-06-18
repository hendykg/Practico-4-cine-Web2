import { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Alert } from 'react-bootstrap';
import apiClient from '../api/client.js';
import { roomSchema } from '../validation/schemas.js'; // Importamos la validación

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({ name: '', rows_count: '', columns_count: '' });
  const [errors, setErrors] = useState([]);

  const fetchRooms = async () => {
    try {
      const res = await apiClient.get('/rooms');
      setRooms(res.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchRooms(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // Limpiar errores previos

    try {
      // 1. Validar datos con Yup antes de ir al backend
      await roomSchema.validate(formData, { abortEarly: false });
      
      // 2. Si es válido, enviamos al backend
      await apiClient.post('/rooms', formData);
      fetchRooms();
      alert('Sala creada exitosamente');
      e.target.reset();
    } catch (error) {
      // Si falla Yup, mostramos los errores
      if (error.name === 'ValidationError') {
        setErrors(error.errors);
      } else {
        alert('Error al crear sala en el servidor');
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Gestión de Salas</h2>
      
      {errors.length > 0 && (
        <Alert variant="danger">
          <ul className="mb-0">
            {errors.map((err, idx) => <li key={idx}>{err}</li>)}
          </ul>
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light">
        <Form.Group className="mb-3">
          <Form.Label>Nombre o Número de Sala</Form.Label>
          <Form.Control type="text" onChange={e => setFormData({...formData, name: e.target.value})} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cantidad de Filas</Form.Label>
          <Form.Control type="number" onChange={e => setFormData({...formData, rows_count: Number(e.target.value)})} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cantidad de Columnas</Form.Label>
          <Form.Control type="number" onChange={e => setFormData({...formData, columns_count: Number(e.target.value)})} />
        </Form.Group>
        <Button type="submit">Crear Sala</Button>
      </Form>

      <Table striped hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Filas</th>
            <th>Columnas</th>
            <th>Capacidad Total</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.rows_count}</td>
              <td>{room.columns_count}</td>
              <td>{room.rows_count * room.columns_count} Asientos</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}