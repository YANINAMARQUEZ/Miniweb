import React, { useState } from 'react';
import axios from 'axios';

/**
 * Botón institucional para generar pagos automáticos.
 * Props:
 * - nombrePlantilla: string (ej. "Plantilla 10")
 * - precio: número (ej. 1500)
 *
 * Redirige al link de pago generado por el backend.
 * Visual editable por equipos no técnicos.
 */

const BotonPago = ({ nombrePlantilla, precio }) => {
  const [cargando, setCargando] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const iniciarPago = async () => {
    if (!nombrePlantilla || !precio) {
      alert('Faltan datos para generar el pago.');
      return;
    }

    setCargando(true);

    try {
      console.log('Iniciando pago con:', { nombrePlantilla, precio });

      const response = await axios.post(`${API_BASE}/crear-pago`, {
        nombrePlantilla,
        precio,
      });

      const { transferencia_url } = response.data;

      if (transferencia_url) {
        window.location.href = transferencia_url; // ✅ Redirige al flujo institucional
      } else {
        console.warn('Respuesta sin transferencia_url:', response.data);
        alert('No se recibió un enlace de transferencia válido.');
      }
    } catch (error) {
      console.error('Error al iniciar el pago:', error.response || error.message);
      alert('No se pudo iniciar el pago. Verificá tu conexión o intenta más tarde.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <button
      onClick={iniciarPago}
      disabled={cargando}
      className={`boton-pago ${cargando ? 'cargando' : ''}`}
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
  );
};

export default BotonPago;
