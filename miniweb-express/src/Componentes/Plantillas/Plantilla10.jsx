import React, { useState, useImperativeHandle, forwardRef } from 'react';
import BotonPago from '../BotonPago';
const Plantilla10 = forwardRef((props, ref) => {
  const {
    nombre = 'MiniWeb Express',
    fondoHeader = '',
    colorPrimario = '#FF4500',
    colorSecundario = '#222',
    tipografia = "'Anton', sans-serif",
    productos = [],
    contacto = { email: '', telefono: '', direccion: '' },
    audioFooter = '',
    modoPreview = false,
    clienteID = ''
  } = props;

  const [titulo, setTitulo] = useState(nombre);
  const [headerFondo, setHeaderFondo] = useState(fondoHeader);
  const [primaryColor, setPrimaryColor] = useState(colorPrimario);
  const [secondaryColor, setSecondaryColor] = useState(colorSecundario);
  const [fontFamily, setFontFamily] = useState(tipografia);
  const [items, setItems] = useState(
    productos.length
      ? productos
      : Array.from({ length: 50 }, (_, i) => ({ nombre: `Producto ${i + 1}`, imagen: '' }))
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [contact, setContact] = useState(contacto);
  const [footerAudio, setFooterAudio] = useState(audioFooter);

  useImperativeHandle(ref, () => ({
    getCurrentValues: () => ({
      nombre: titulo,
      fondoHeader: headerFondo,
      colorPrimario: primaryColor,
      colorSecundario: secondaryColor,
      tipografia: fontFamily,
      productos: [...items],
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

  const filteredItems = items.filter((item) =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportarHTML = () => {
    // Se genera el HTML completo, tal como se ve la plantilla con la edición
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
              padding: 2rem;
              color: ${secondaryColor};
              margin: 0;
            }
            h1 {
              color: ${primaryColor};
              text-align: center;
              font-size: 2.5rem;
              margin-bottom: 2rem;
            }
            h2 {
              color: ${primaryColor};
              text-align: center;
              margin-bottom: 1rem;
            }
            section {
              margin-bottom: 2rem;
            }
            input {
              width: 100%;
              padding: 0.75rem;
              font-size: 1rem;
              border: 1px solid ${primaryColor};
              border-radius: 8px;
              margin-bottom: 1.5rem;
              box-sizing: border-box;
            }
            input[readonly] {
              background-color: #eee;
            }
            select {
              width: 100%;
              padding: 0.75rem;
              font-size: 1rem;
              border: 1px solid ${primaryColor};
              border-radius: 8px;
              margin-bottom: 1.5rem;
              box-sizing: border-box;
            }
            img {
              width: 100%;
              border-radius: 8px;
              display: block;
              margin: 0 auto;
            }
            .config-section {
              margin-bottom: 2rem;
            }
            .productos-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
              gap: 1rem;
            }
            .producto {
              text-align: center;
              margin-bottom: 1rem;
            }
            header {
              background-image: ${headerFondo ? `url(${headerFondo})` : 'none'};
              background-size: cover;
              background-position: center;
              padding: 2rem;
              text-align: center;
              color: ${primaryColor};
            }
            footer {
              text-align: center;
              margin-top: 2rem;
            }
            details {
              margin-bottom: 2rem;
            }
            summary {
              cursor: pointer;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <section style="font-family: ${fontFamily}; color: ${secondaryColor}">
            <details class="config-section" open>
              <summary>⚙️ Configurar diseño</summary>
              <div style="display: grid; gap: 0.75rem; margin-top: 1rem;">
                <label>Nombre institucional:
                  <input type="text" value="${titulo}" readonly />
                </label>
                <label>Fondo del header:
                  <input type="text" value="${headerFondo}" placeholder="URL de fondo" readonly />
                </label>
                <label>Tipografía cartel:
                  <select disabled>
                    <option ${fontFamily === "'Anton', sans-serif" ? "selected" : ""}>'Anton', sans-serif</option>
                    <option ${fontFamily === "'Bebas Neue', sans-serif" ? "selected" : ""}>'Bebas Neue', sans-serif</option>
                    <option ${fontFamily === "'Impact', sans-serif" ? "selected" : ""}>'Impact', sans-serif</option>
                    <option ${fontFamily === "'Poppins', sans-serif" ? "selected" : ""}>'Poppins', sans-serif</option>
                  </select>
                </label>
                <label>Color primario:
                  <input type="color" value="${primaryColor}" disabled />
                </label>
                <label>Color secundario:
                  <input type="color" value="${secondaryColor}" disabled />
                </label>
                <label>Audio footer (URL):
                  <input type="text" value="${footerAudio}" placeholder="URL del audio" readonly />
                </label>
              </div>
            </details>

            <header>
              <h1 style="font-size: 3rem; letter-spacing: 1px;">${titulo}</h1>
            </header>
  
            <section style="padding: 2rem;">
              <input type="text" value="${searchTerm}" placeholder="🔍 Buscar producto por nombre" readonly />
            </section>
  
            <section style="padding: 2rem;">
              <h2>Productos</h2>
              <div class="productos-grid">
                ${items
                  .map(
                    (item) => `
                  <div class="producto">
                    ${item.imagen ? `<img src="${item.imagen}" alt="${item.nombre}" />` : ''}
                    <input type="text" value="${item.nombre}" readonly />
                    ${!modoPreview ? `<input type="text" value="${item.imagen}" placeholder="URL de imagen" readonly />` : ''}
                  </div>
                `
                  )
                  .join('')}
              </div>
            </section>
  
            <section style="padding: 2rem;">
              <h2>Contacto</h2>
              <div style="display: grid; gap: 1rem;">
                <input type="text" value="${contact.email}" placeholder="Email" readonly />
                <input type="text" value="${contact.telefono}" placeholder="Teléfono" readonly />
                <input type="text" value="${contact.direccion}" placeholder="Dirección" readonly />
              </div>
            </section>
  
            ${footerAudio ? `
            <section style="text-align: center; padding: 2rem; margin-top: 2rem;">
              <audio controls style="width: 100%;">
                <source src="${footerAudio}" type="audio/mpeg">
                Tu navegador no soporta el elemento de audio.
              </audio>
            </section>
            ` : ''}
  
            <footer>
              <p>© ${new Date().getFullYear()} ${titulo}</p>
            </footer>
          </section>
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
              Tipografía cartel:
              <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} style={inputStyle}>
                <option value="'Anton', sans-serif">Anton</option>
                <option value="'Bebas Neue', sans-serif">Bebas Neue</option>
                <option value="'Impact', sans-serif">Impact</option>
                <option value="'Poppins', sans-serif">Poppins</option>
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
            <label>
              Audio footer (URL):
              <input
                type="text"
                value={footerAudio}
                onChange={(e) => setFooterAudio(e.target.value)}
                placeholder="URL del audio"
                style={inputStyle}
              />
            </label>
          </div>
        </details>
      )}

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
        <h1 style={{ fontSize: '3rem', letterSpacing: '1px' }}>{titulo}</h1>
      </header>

      <section style={{ padding: '2rem' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Buscar producto por nombre"
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: `1px solid ${primaryColor}`,
            marginBottom: '1.5rem'
          }}
        />
      </section>

      <section style={{ padding: '2rem' }}>
        <h2 style={{ color: primaryColor, marginBottom: '1rem', textAlign: 'center' }}>Productos</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '1rem'
          }}
        >
          {filteredItems.map((item, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              {item.imagen ? (
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              ) : null}
              <input
                type="text"
                value={item.nombre}
                onChange={(e) => {
                  const nuevosItems = [...items];
                  nuevosItems[index].nombre = e.target.value;
                  setItems(nuevosItems);
                }}
                placeholder="Nombre del producto"
                style={{
                  marginTop: '0.5rem',
                  fontWeight: 'bold',
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: `1px solid ${primaryColor}`
                }}
              />
              {!modoPreview && (
                <input
                  type="text"
                  value={item.imagen}
                  onChange={(e) => {
                    const nuevosItems = [...items];
                    nuevosItems[index].imagen = e.target.value;
                    setItems(nuevosItems);
                  }}
                  placeholder="URL de imagen"
                  style={{
                    width: '100%',
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: `1px solid ${primaryColor}`
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '2rem' }}>
        <h2 style={{ color: primaryColor, marginBottom: '1rem', textAlign: 'center' }}>Contacto</h2>
        {!modoPreview && (
          <div style={{ display: 'grid', gap: '1rem' }}>
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
        {modoPreview && (
          <div>
            <p>Email: {contact.email}</p>
            <p>Teléfono: {contact.telefono}</p>
            <p>Dirección: {contact.direccion}</p>
          </div>
        )}
            <div style={{ marginTop: '2rem' }}>
        <BotonPago
          nombrePlantilla="Plantilla1"
          precio={1500}
          clienteID={clienteID}
        />
      </div>

      
     </section>
  </section>
  );
});

export default Plantilla10;