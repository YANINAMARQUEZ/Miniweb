require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || 'https://tu-backend.onrender.com';

// Simulación de pagos aprobados (reemplazar con lógica real)
const pagosAprobados = new Set();

app.use(cors({
  origin: [
    'https://tu-frontend.vercel.app',
    'https://miniweb-six.vercel.app',
    'https://miniweb-five.vercel.app'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

/* ------------------ RUTAS ------------------ */

// Crear pago (simulado)
app.post('/crear-pago', (req, res) => {
  const { email, nombrePlantilla } = req.body;
  if (!email || !nombrePlantilla) {
    return res.status(400).json({ error: 'Faltan datos para generar el pago.' });
  }

  const clave = `${email}-${nombrePlantilla}`;
  pagosAprobados.add(clave); // Simula aprobación

  const url = `${BACKEND_BASE_URL}/pago-aprobado?email=${encodeURIComponent(email)}&nombrePlantilla=${encodeURIComponent(nombrePlantilla)}`;
  res.json({ url });
});

// Página de confirmación (simulada)
app.get('/pago-aprobado', (req, res) => {
  res.send(`
    <html>
      <head><title>Pago aprobado</title></head>
      <body style="font-family: sans-serif; text-align: center; padding: 2rem;">
        <h1>✅ Pago simulado aprobado</h1>
        <p>Volvé al editor para descargar tu plantilla personalizada.</p>
      </body>
    </html>
  `);
});

// Verificar si el pago fue aprobado
app.get('/verificar-pago', (req, res) => {
  const { email, nombrePlantilla } = req.query;
  if (!email || !nombrePlantilla) {
    return res.status(400).json({ error: 'Faltan datos para verificar el pago.' });
  }

  const clave = `${email}-${nombrePlantilla}`;
  const aprobado = pagosAprobados.has(clave);
  res.json({ aprobado });
});

/* ------------------ INICIO ------------------ */
app.listen(PORT, () => {
  console.log(`✅ Backend institucional activo en http://localhost:${PORT}`);
});

