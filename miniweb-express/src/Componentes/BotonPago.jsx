import React, { useState } from 'react';
import axios from 'axios';

const BotonPago = ({ nombrePlantilla, precio }) => {
  const [email, setEmail] = useState('');
  const [cargando, setCargando] = useState(false);

  // Variables de entorno
  const API_BASE = import.meta.env.VITE_API_URL;
fetch(`${API_BASE}/api/consulta`)
  .then(response => response.json())
  .then(data => {
    console.log('✅ Respuesta del backend:', data);
  })
  .catch(error => {
    console.error('❌ Error al consultar la API:', error);
  });
  
  const nombreEmpresa = import.meta.env.VITE_NOMBRE_EMPRESA;

  const simularPago = () => {
    if (!email) {
      alert('Ingresá tu email para simular el pago.');
      return;
    }

    fetch(`${API_BASE}/simular-pago`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'approved') {
          alert('✅ Pago simulado exitoso. Redirigiendo...');
          window.location.href = `${API_BASE}/transferencia?template=${encodeURIComponent(nombrePlantilla)}`;
        } else {
          alert('❌ Pago fallido');
        }
      })
      .catch(err => {
        console.error('Error al simular pago:', err);
        alert('Hubo un error al simular el pago.');
      });
  };

  const iniciarPago = async () => {
    if (!nombrePlantilla || !precio || !email) {
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
        window.location.href = url;
      } else {
        alert('No se recibió un enlace válido.');
      }
    } catch (error) {
      console.error('Error al iniciar el pago:', error.response || error.message);
      alert('No se pudo realizar el pago.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Generador de pago - {nombreEmpresa}</h2>
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
        onClick={iniciarPago}
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
        {cargando ? 'Generando pago...' : '💳 Pagar y descargar HTML'}
      </button>
      <br />
      <button
        onClick={simularPago}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#90E0EF',
          color: '#000',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '500',
          fontSize: '0.95rem',
          cursor: 'pointer',
        }}
      >
        🧪 Simular pago
      </button>
    </div>
  );
};

export default BotonPago;
