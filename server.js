require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline'");
  res.send('Bienvenido a la API de Miniweb');
});

// Simulación de pago (para botón 🧪 Simular pago)
app.post('/simular-pago', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email requerido' });

  res.json({ status: 'approved' });
});

// Crear suscripción (simulada para botón 💳 Pagar y descargar HTML)
app.post('/crear-suscripcion', (req, res) => {
  const { email, nombrePlantilla, precio } = req.body;
  if (!email || !nombrePlantilla || !precio) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  // Simulación: redirige a la página de transferencia
  const url = `${process.env.VITE_API_URL || 'https://miniweb-46n0.onrender.com'}/transferencia?template=${encodeURIComponent(nombrePlantilla)}`;
  res.json({ url });
});

// Página de transferencia
app.get('/transferencia', (req, res) => {
  const { template } = req.query;
  res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline'");

  res.send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Transferencia bancaria - ${template}</title>
        <style>
          body {
            font-family: 'Poppins', sans-serif;
            background: #fdfdfd;
            color: #333;
            text-align: center;
            padding: 2rem;
            margin: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 2rem;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #0055A5;
            margin-bottom: 1rem;
          }
          .info {
            margin: 1rem 0;
            font-size: 1rem;
            line-height: 1.6;
          }
          a {
            display: inline-block;
            margin-top: 1.5rem;
            padding: 0.75rem 1.5rem;
            background-color: #0055A5;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Pago por transferencia</h1>
          <p class="info">
            Realice la transferencia bancaria a la siguiente cuenta:<br><br>
            <strong>Banco:</strong> Banco Macro<br>
            <strong>Cuenta:</strong> 1234567890<br>
            <strong>Titular:</strong> MARQUEZ Rivero Damiana Yanina<br>
            <strong>DNI:</strong> 37.159.913
          </p>
          <p class="info">
            Una vez realizada la transferencia, haga clic en el botón para descargar su plantilla.
          </p>
          <a href="/descargar-html?nombre=${template}" target="_blank">Descargar Plantilla</a>
        </div>
      </body>
    </html>
  `);
});

// Descarga de plantilla HTML
app.get('/descargar-html', (req, res) => {
  const { nombre } = req.query;
  const safeNombre = nombre || 'plantilla';

  const html = `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Plantilla de ${safeNombre}</title>
        <style>
          body {
            font-family: 'Poppins', sans-serif;
            background: #fdfdfd;
            color: #333;
            text-align: center;
            padding: 3rem;
            margin: 0;
          }
          h1 {
            color: #0055A5;
            font-size: 2rem;
            margin-bottom: 1rem;
          }
          p {
            font-size: 1.2rem;
          }
        </style>
      </head>
      <body>
        <h1>Gracias por su compra (${safeNombre})</h1>
        <p>Aquí se descarga su plantilla institucional.</p>
      </body>
    </html>
  `;

  res.setHeader('Content-Disposition', `attachment; filename=${safeNombre}.html`);
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
