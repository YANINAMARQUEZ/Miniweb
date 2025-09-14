import React, { useState } from 'react';
import axios from 'axios';

/**
 * Botón institucional para iniciar suscripción con Mercado Pago.
 * Props:
 * - nombrePlantilla: string (ej. "InstitucionalPremium")
 * - precio: número (ej. 1500)
 */

const BotonSuscripcion = ({ nombrePlantilla, precio }) => {
  const [email, setEmail] = useState('');
  const [cargando, setCargando] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL || 'https://miniweb-46n0.onrender.com';

  const iniciarSuscripcion = async () => {
    if (!email || !nombrePlantilla || !precio) {
      alert('Completá todos los datos para continuar.');
      return;
    }

    setCargando(true);

    try {
      const response = await axios.post(`${API_BASE}/crear-suscripcion`, {
        email,
        nombrePlantilla,
        precio,
      });

      const { url } = response.data;

      if (url) {
        window.location.href = url; // Redirige a Mercado Pago
      } else {
        alert('No se recibió un enlace válido de Mercado Pago.');
      }
    } catch (error) {
      console.error('Error al iniciar la suscripción:', error.response || error.message);
      alert('No se pudo iniciar la suscripción. Verificá tu conexión o intentá más tarde.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <input
        type="email"
        placeholder="Ingresá tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: '0.75rem',
          fontSize: '1rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
          marginBottom: '1rem',
          width: '100%',
          maxWidth: '300px',
        }}
      />
      <br />
      <button
        onClick={iniciarSuscripcion}
        disabled={cargando}
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#0077B6',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '1rem',
          cursor: cargando ? 'not-allowed' : 'pointer',
          opacity: cargando ? 0.6 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        {cargando ? 'Conectando con Mercado Pago...' : '💳 Suscribirme'}
      </button>
    </div>
  );
};

export default BotonSuscripcion;
