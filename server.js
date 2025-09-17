require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');


const app = express();
const PORT = process.env.PORT || 4000;
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || 'https://tu-backend.onrender.com';
const { Pool } = require('pg');

const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

db.connect()
  .then(() => console.log('✅ Conexión a PostgreSQL establecida'))
  .catch(err => console.error('❌ Error de conexión:', err));



// Configurar Mercado Pago con tu Access Token

mercadopago.access_token = process.env.MP_ACCESS_TOKEN;


app.use(cors({
  origin: ['https://tu-frontend.vercel.app'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Base de datos simulada (reemplazar por MongoDB o PostgreSQL)
const pagosAprobados = new Set();

/* ------------------ RUTAS ------------------ */

// Crear preferencia de pago con tarjeta
app.post('/crear-pago', async (req, res) => {
  const { email, nombrePlantilla, precio } = req.body;

  if (!email || !nombrePlantilla || !precio) {
    return res.status(400).json({ error: 'Faltan datos para generar el pago.' });
  }

  try {
    const preference = await mercadopago.preferences.create({
      items: [{
        title: `Plantilla: ${nombrePlantilla}`,
        unit_price: Number(precio),
        quantity: 1
      }],
      payer: { email },
      back_urls: {
        success: `${BACKEND_BASE_URL}/pago-aprobado?email=${email}&nombrePlantilla=${nombrePlantilla}`,
        failure: `${BACKEND_BASE_URL}/pago-fallido`,
      },
      auto_return: 'approved',
      notification_url: `${BACKEND_BASE_URL}/webhook`
    });

    res.json({ url: preference.body.init_point });
  } catch (error) {
    console.error('❌ Error al crear preferencia:', error);
    res.status(500).json({ error: 'No se pudo generar el pago.' });
  }
});

// Webhook de Mercado Pago
app.post('/webhook', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'payment') {
    try {
      const payment = await mercadopago.payment.findById(data.id);
      if (payment.body.status === 'approved') {
        const email = payment.body.payer.email;
        const nombrePlantilla = payment.body.additional_info?.items?.[0]?.title?.split(': ')[1] || 'plantilla';
        const clave = `${email}-${nombrePlantilla}`;
        pagosAprobados.add(clave);
        console.log(`✅ Pago aprobado: ${clave}`);
      }
    } catch (error) {
      console.error('❌ Error al procesar webhook:', error);
    }
  }

  res.sendStatus(200);
});

// Verificar si el pago fue aprobado
app.get('/verificar-pago', (req, res) => {
  const { email, nombrePlantilla } = req.query;
  const clave = `${email}-${nombrePlantilla}`;
  const aprobado = pagosAprobados.has(clave);
  res.json({ aprobado });
});

// Página de confirmación
app.get('/pago-aprobado', (req, res) => {
  res.send(`
    <html>
      <head><title>Pago aprobado</title></head>
      <body style="font-family: sans-serif; text-align: center; padding: 2rem;">
        <h1>✅ Pago aprobado</h1>
        <p>Volvé al editor para descargar tu plantilla personalizada.</p>
      </body>
    </html>
  `);
});

// Página de fallo
app.get('/pago-fallido', (req, res) => {
  res.send(`
    <html>
      <head><title>Pago fallido</title></head>
      <body style="font-family: sans-serif; text-align: center; padding: 2rem;">
        <h1>❌ El pago no fue aprobado</h1>
        <p>Intentá nuevamente desde el editor.</p>
      </body>
    </html>
  `);
});

/* ------------------ INICIO ------------------ */
app.listen(PORT, () => {
  console.log(`✅ Backend institucional activo en http://localhost:${PORT}`);
});

