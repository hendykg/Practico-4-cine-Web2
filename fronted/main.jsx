import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// 1. IMPORTANTE: Como los paneles de Administrador usan React-Bootstrap, 
// debes importar el CSS de Bootstrap aquí para que no se vea desarmado.
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/css/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);