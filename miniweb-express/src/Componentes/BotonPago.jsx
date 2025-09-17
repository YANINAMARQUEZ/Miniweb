import React, { useState } from 'react';
import axios from 'axios';

const BotonPago = ({ nombrePlantilla, precio }) => {
  const [email, setEmail] = useState('');
  const [contenidoEditado, setContenidoEditado] = useState('<h1>Mi plantilla institucional</h1><p>Contacto por WhatsApp</p>');
  const [cargando, setCargando] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL;
  const nombreEmpresa = import.meta.env.VITE_NOMBRE_EMPRESA;

  const iniciarPago = async () => {
    if (!email || !nombrePlantilla || !precio) {
      alert('Completá todos los datos para continuar.');
      return;
    }

    setCargando(true);

    try {
      const response = await axios.post(`${API_BASE}/crear-pago`, {
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
      console.error('Error al iniciar el pago:', error);
      alert('No se pudo realizar el pago.');
    } finally {
      setCargando(false);
    }
  };

  const solicitarDescarga = async () => {
    const htmlFinal = `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <title>Plantilla personalizada</title>
        </head>
        <body>
          ${contenidoEditado}
        </body>
      </html>
    `;

    try {
      const res = await axios.post(`${API_BASE}/validar-descarga`, {
        email,
        html: htmlFinal,
        nombrePlantilla,
      });

      if (res.data.autorizado && res.data.link) {
        window.location.href = res.data.link;
      } else {
        alert('❌ El pago no fue aprobado o la descarga no está habilitada.');
      }
    } catch (error) {
      console.error('Error al solicitar descarga:', error);
      alert('No se pudo verificar el estado del pago.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Editor de plantilla - {nombreEmpresa}</h2>
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
      <br />
      <button onClick={iniciarPago} disabled={cargando} style={{ padding: '1rem 2rem', marginBottom: '1rem' }}>
        {cargando ? 'Procesando pago...' : '💳 Pagar ahora'}
      </button>
      <br />
      <button onClick={solicitarDescarga} style={{ padding: '0.75rem 1.5rem' }}>
        ⬇️ Descargar plantilla (requiere pago aprobado)
      </button>
    </div>
  );
};

export default BotonPago;
