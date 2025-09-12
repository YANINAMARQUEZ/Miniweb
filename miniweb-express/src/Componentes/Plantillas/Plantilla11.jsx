import React, { useState } from 'react';



function Plantilla11() {
  const [formData, setFormData] = useState({});
  const [estilos, setEstilos] = useState({
    colorPrimario: '#d4af37',
    colorFondo: '#f9f9f9',
    tipografia: 'Playfair Display',
  });

  const config = {
    titulo: 'Invitación Institucional',
    descripcion: 'Complete los datos para confirmar su asistencia al evento.',
    campos: [
      { id: 'nombre', label: 'Nombre completo', tipo: 'text', requerido: true },
      { id: 'email', label: 'Email de contacto', tipo: 'email', requerido: true },
      { id: 'evento', label: 'Nombre del evento', tipo: 'text', requerido: true },
      { id: 'fecha', label: 'Fecha del evento', tipo: 'date', requerido: true },
      { id: 'mensaje', label: 'Mensaje personalizado', tipo: 'textarea', requerido: false },
    ],
  };

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const exportarHTML = () => {
    const camposHTML = config.campos.map((campo) => {
      const inputTag = campo.tipo === 'textarea'
        ? `<textarea placeholder="${campo.label}"></textarea>`
        : `<input type="${campo.tipo}" placeholder="${campo.label}" />`;
      return `<label>${campo.label}</label>${inputTag}`;
    }).join('<br/>');

    const html = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>${config.titulo}</title>
          <style>
            body {
              font-family: '${estilos.tipografia}', serif;
              background-color: ${estilos.colorFondo};
              padding: 2rem;
              color: #333;
            }
            .invitacion {
              border: 2px solid ${estilos.colorPrimario};
              padding: 2rem;
              border-radius: 12px;
              background-color: white;
              max-width: 600px;
              margin: auto;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            h1 {
              color: ${estilos.colorPrimario};
              text-align: center;
              font-size: 2rem;
              margin-bottom: 1rem;
            }
            label {
              font-weight: bold;
              display: block;
              margin-top: 1rem;
            }
            input, textarea {
              width: 100%;
              padding: 0.75rem;
              margin-top: 0.5rem;
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 1rem;
            }
          </style>
        </head>
        <body>
          <div class="invitacion">
            <h1>${config.titulo}</h1>
            <p>${config.descripcion}</p>
            <form>${camposHTML}</form>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'invitacion_institucional.html';
    link.click();
  };

  const enviarPorWhatsApp = () => {
    const { nombre, email, evento, fecha, mensaje } = formData;

    if (!nombre || !email || !evento || !fecha) {
      alert('Por favor complete los campos obligatorios antes de enviar por WhatsApp.');
      return;
    }

    const texto = `
📨 *${config.titulo}*

👤 Nombre: ${nombre}
📧 Email: ${email}
📅 Evento: ${evento}
🗓️ Fecha: ${fecha}
📝 Mensaje: ${mensaje || 'Sin mensaje adicional'}

Confirmo mi asistencia.
    `.trim();

    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="plantilla11">
      <h1>{config.titulo}</h1>
      <p>{config.descripcion}</p>

      <form className="formulario11">
        {config.campos.map((campo, i) => (
          <div key={i} className="campo">
            <label htmlFor={campo.id}>{campo.label}</label>
            {campo.tipo === 'textarea' ? (
              <textarea id={campo.id} onChange={(e) => handleChange(campo.id, e.target.value)} />
            ) : (
              <input type={campo.tipo} id={campo.id} onChange={(e) => handleChange(campo.id, e.target.value)} />
            )}
          </div>
        ))}
      </form>

      <div className="editor-visual">
        <h2>🎨 Editor de Estilos</h2>
        <label>Color Primario</label>
        <input
          type="color"
          value={estilos.colorPrimario}
          onChange={(e) => setEstilos({ ...estilos, colorPrimario: e.target.value })}
        />

        <label>Color de Fondo</label>
        <input
          type="color"
          value={estilos.colorFondo}
          onChange={(e) => setEstilos({ ...estilos, colorFondo: e.target.value })}
        />

        <label>Tipografía</label>
        <select
          value={estilos.tipografia}
          onChange={(e) => setEstilos({ ...estilos, tipografia: e.target.value })}
        >
          <option value="Playfair Display">Playfair Display</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Roboto">Roboto</option>
          <option value="Open Sans">Open Sans</option>
        </select>
      </div>

      <button className="descargar" onClick={exportarHTML}>📤 Descargar Invitación HTML</button>
      <button className="whatsapp" onClick={enviarPorWhatsApp}>📲 Enviar por WhatsApp</button>
    </div>
  );
}

export default Plantilla11;
