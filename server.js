
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || 'https://tu-backend.onrender.com';

app.use(cors({
  origin: ['https://tu-frontend.vercel.app'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use('/descargas', express.static(path.join(__dirname, 'descargas')));

// Simulación de pago aprobado (reemplazar con lógica real)
const pagosAprobados = new Set();

app.post('/crear-pago', (req, res) => {
  const { email, nombrePlantilla } = req.body;
  pagosAprobados.add(`${email}-${nombrePlantilla}`); // Simula aprobación
  res.json({ url: `${BACKEND_BASE_URL}/pago-aprobado?email=${email}&nombrePlantilla=${nombrePlantilla}` });
});

app.get('/pago-aprobado', (req, res) => {
  res.send('<h1>Pago simulado aprobado. Volvé al editor para descargar tu plantilla.</h1>');
});

app.post('/validar-descarga', (req, res) => {
  const { email, html, nombrePlantilla } = req.body;
  const clave = `${email}-${nombrePlantilla}`;

  if (!pagosAprobados.has(clave)) {
    return res.json({ autorizado: false });
  }

  const fileName = `plantilla-${Date.now()}.html`;
  const filePath = path.join(__dirname, 'descargas', fileName);

  fs.writeFileSync(filePath, html, 'utf8');
  const link = `${BACKEND_BASE_URL}/descargas/${fileName}`;
  res.json({ autorizado: true, link });
});

app.listen(PORT, () => {
  console.log(`✅ Backend institucional activo en http://localhost:${PORT}`);
});
