import React, { useState } from 'react';
import axios from 'axios';


const BotonPago = ({ nombrePlantilla, precio }) => {
  const [email, setEmail] = useState('');
  const [contenidoEditado, setContenidoEditado] = useState('<h1>Mi plantilla institucional</h1><p>Contacto por WhatsApp</p>');

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Editor de plantilla</h2>
      <input
        type="email"
        placeholder="Ingresá tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '0.75rem', marginBottom: '1rem', width: '300px' }}
      />
      <br />
      <textarea
        value={contenidoEditado}
        onChange={(e) => setContenidoEditado(e.target.value)}
        rows={10}
        style={{ width: '100%', maxWidth: '600px', padding: '1rem', marginBottom: '1rem' }}
      />
    </div>
  );
};

export default BotonPago;

