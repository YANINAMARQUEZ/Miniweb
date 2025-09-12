
import React, { useState, useImperativeHandle, forwardRef } from 'react';

const Plantilla8 = forwardRef((props, ref) => {
  const {
    nombre = 'MiniWeb Express',
    fondoHeader = '',
    colorPrimario = '#FF6347',
    colorSecundario = '#333',
    tipografia = "'Poppins', sans-serif",
    imagenes = [],
    contacto = { email: '', telefono: '', direccion: '' },
    audioFooter = '',
    modoPreview = false
  } = props;

  const [titulo, setTitulo] = useState(nombre);
  const [headerFondo, setHeaderFondo] = useState(fondoHeader);
  const [primaryColor, setPrimaryColor] = useState(colorPrimario);
  const [secondaryColor, setSecondaryColor] = useState(colorSecundario);
  const [fontFamily, setFontFamily] = useState(tipografia);
  const [gallery, setGallery] = useState(
    imagenes.length ? imagenes : Array.from({ length: 50 }, () => '')
  );
  const [contact, setContact] = useState(contacto);
  const [footerAudio, setFooterAudio] = useState(audioFooter);

  useImperativeHandle(ref, () => ({
    getCurrentValues: () => ({
      nombre: titulo,
      fondoHeader: headerFondo,
      colorPrimario: primaryColor,
      colorSecundario: secondaryColor,
      tipografia: fontFamily,
      imagenes: [...gallery],
      contacto: { ...contact },
      audioFooter: footerAudio
    })
  }));

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit'
  };

  const exportarHTML = () => {
    // Se genera el HTML completo sin la sección de configuración,
    // manteniendo la apariencia de la plantilla editada.
    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>${titulo}</title>
        <style>
          body {
            font-family: ${fontFamily};
            background-color: #fdfdfd;
            color: ${secondaryColor};
            margin: 0;
            padding: 2rem;
          }
          header {
            background-image: ${headerFondo ? `url(${headerFondo})` : 'none'};
            background-size: cover;
            background-position: center;
            padding: 2rem;
            text-align: center;
            color: ${primaryColor};
          }
          header h1 {
            font-size: 2.5rem;
          }
          section {
            padding: 2rem;
          }
          .galeria-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
          }
          .oferta {
            text-align: center;
          }
          .oferta img {
            width: 100%;
            border-radius: 8px;
          }
          .placeholder {
            width: 100%;
            height: 150px;
            background-color: #eee;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
          }
          footer {
            padding: 2rem;
            background-color: ${secondaryColor};
            color: #fff;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>${titulo}</h1>
        </header>
        <section>
          <h2 style="color: ${primaryColor};">Ofertas destacadas</h2>
          <div class="galeria-grid">
            ${gallery.map((img, index) => `
              <div class="oferta">
                ${img 
                  ? `<img src="${img}" alt="Oferta ${index + 1}" />`
                  : `<div class="placeholder">Sin imagen</div>`
                }
              </div>
            `).join('')}
          </div>
        </section>
        <section style="background-color:#f9f9f9; padding:2rem;">
          <h2 style="color: ${primaryColor};">Contacto</h2>
          <div style="display: grid; gap: 1rem;">
            <input type="text" value="${contact.email}" placeholder="Email" readonly />
            <input type="text" value="${contact.telefono}" placeholder="Teléfono" readonly />
            <input type="text" value="${contact.direccion}" placeholder="Dirección" readonly />
          </div>
        </section>
        <footer>
          <p>© ${new Date().getFullYear()} ${titulo}</p>
          ${
            footerAudio 
              ? `<audio controls style="margin-top:1rem; width:100%;">
                   <source src="${footerAudio}" type="audio/mpeg">
                   Tu navegador no soporta audio.
                 </audio>`
              : ''
          }
        </footer>
      </body>
      </html>
    `;
    const blob = new Blob([html.replace(/\n\s*/g, '')], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'miniweb_institucional.html';
    link.click();
  };

  return (
    <section style={{ fontFamily: fontFamily, color: secondaryColor }}>
      {/* Panel de configuración */}
      {!modoPreview && (
        <details style={{ marginBottom: '2rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>⚙️ Configurar diseño</summary>
          <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
            <label>
              Nombre institucional:
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                style={inputStyle}
              />
            </label>
            <label>
              Fondo del header:
              <input
                type="text"
                value={headerFondo}
                onChange={(e) => setHeaderFondo(e.target.value)}
                placeholder="URL de fondo"
                style={inputStyle}
              />
            </label>
            <label>
              Tipografía:
              <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} style={inputStyle}>
                <option value="'Poppins', sans-serif">Poppins</option>
                <option value="'Anton', sans-serif">Anton</option>
                <option value="sans-serif">Sans Serif</option>
                <option value="serif">Serif</option>
              </select>
            </label>
            <label>
              Color primario:
              <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
            </label>
            <label>
              Color secundario:
              <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
            </label>
          </div>
        </details>
      )}

      {/* Header */}
      <header
        style={{
          backgroundImage: headerFondo ? `url(${headerFondo})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem',
          textAlign: 'center',
          color: primaryColor
        }}
      >
        <h1 style={{ fontSize: '2.5rem' }}>{titulo}</h1>
      </header>

      {/* Galería de ofertas */}
      <section style={{ padding: '2rem' }}>
        <h2 style={{ color: primaryColor, marginBottom: '1rem' }}>Ofertas destacadas</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '1rem'
          }}
        >
          {gallery.map((img, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              {img ? (
                <img
                  src={img}
                  alt={`Oferta ${index + 1}`}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '150px',
                    backgroundColor: '#eee',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999'
                  }}
                >
                  Sin imagen
                </div>
              )}
              {!modoPreview && (
                <input
                  type="text"
                  value={img}
                  onChange={(e) => {
                    const updated = [...gallery];
                    updated[index] = e.target.value;
                    setGallery(updated);
                  }}
                  placeholder={`URL imagen ${index + 1}`}
                  style={{ ...inputStyle, marginTop: '0.5rem' }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sección de contacto */}
      <section style={{ padding: '2rem', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ color: primaryColor }}>Contacto</h2>
        {modoPreview ? (
          <ul>
            <li>📧 {contact.email}</li>
            <li>📞 {contact.telefono}</li>
            <li>📍 {contact.direccion}</li>
          </ul>
        ) : (
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <input
              type="text"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              placeholder="Email"
              style={inputStyle}
            />
            <input
              type="text"
              value={contact.telefono}
              onChange={(e) => setContact({ ...contact, telefono: e.target.value })}
              placeholder="Teléfono"
              style={inputStyle}
            />
            <input
              type="text"
              value={contact.direccion}
              onChange={(e) => setContact({ ...contact, direccion: e.target.value })}
              placeholder="Dirección"
              style={inputStyle}
            />
          </div>
        )}
      </section>

      {/* Footer con audio */}
      <footer style={{ padding: '2rem', backgroundColor: secondaryColor, color: '#fff', textAlign: 'center' }}>
        <p>© {new Date().getFullYear()} {titulo}</p>
        {footerAudio && (
          <audio controls src={footerAudio} style={{ marginTop: '1rem' }}>
            Tu navegador no soporta audio.
          </audio>
        )}
        {!modoPreview && (
          <input
            type="text"
            value={footerAudio}
            onChange={(e) => setFooterAudio(e.target.value)}
            placeholder="URL de audio para el footer"
            style={{ ...inputStyle, marginTop: '1rem', color: '#fff' }}
          />
        )}
      </footer>

      {/* Botón para exportar HTML */}
      <section style={{ textAlign: 'center', padding: '2rem' }}>
        <button
          onClick={exportarHTML}
          style={{
            backgroundColor: primaryColor,
            color: '#fff',
            padding: '1rem 2rem',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          📦 Exportar HTML institucional
        </button>
      </section>
    </section>
  );
});

export default Plantilla8;