
import React, { useState, useImperativeHandle, forwardRef } from 'react';

const Plantilla9 = forwardRef((props, ref) => {
  const {
    nombre = 'MiniWeb Express',
    fondoHeader = '',
    colorPrimario = '#FF6347',
    colorSecundario = '#333',
    tipografia = "'Poppins', sans-serif",
    productos = [],
    contacto = { email: '', telefono: '', direccion: '' },
    audioFooter = '',
    modoPreview = false
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
    // Se genera un HTML completo con la misma apariencia que en la vista (sin configuración) 
    // y se agrega el script del buscador para filtrar los productos.
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
          input[type="text"] {
            width: 100%;
            padding: 0.75rem;
            font-size: 1rem;
            border-radius: 8px;
            border: 1px solid ${primaryColor};
            margin-bottom: 1.5rem;
            box-sizing: border-box;
          }
          input[readonly] {
            background-color: #eee;
          }
          .productos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
          }
          .producto {
            text-align: center;
          }
          .producto img {
            width: 100%;
            border-radius: 8px;
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
          <input id="searchInput" type="text" placeholder="🔍 Buscar producto por nombre" />
        </section>
        <section>
          <h2 style="color: ${primaryColor};">Productos</h2>
          <div class="productos-grid">
          ${items.map(item => `
            <div class="producto" data-nombre="${item.nombre.toLowerCase()}">
              ${
                item.imagen 
                  ? `<img src="${item.imagen}" alt="${item.nombre}" />`
                  : `<div style="width:100%; height:150px; background:#eee; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#999;">Sin imagen</div>`
              }
              <p>${item.nombre}</p>
            </div>
          `).join('')}
          </div>
        </section>
        <section>
          <h2 style="color: ${primaryColor};">Contacto</h2>
          <div style="display: grid; gap: 1rem;">
            <input type="text" value="${contact.email}" placeholder="Email" readonly />
            <input type="text" value="${contact.telefono}" placeholder="Teléfono" readonly />
            <input type="text" value="${contact.direccion}" placeholder="Dirección" readonly />
          </div>
        </section>
        ${
          footerAudio 
            ? `<section style="text-align:center; margin-top:2rem;">
                 <audio controls style="width:100%;">
                   <source src="${footerAudio}" type="audio/mpeg">
                   Tu navegador no soporta audio.
                 </audio>
               </section>` 
            : ''
        }
        <footer>
          <p>© ${new Date().getFullYear()} ${titulo}</p>
        </footer>
        <script>
          document.getElementById("searchInput").addEventListener("input", function() {
            var value = this.value.toLowerCase();
            var productos = document.querySelectorAll(".producto");
            productos.forEach(function(prod) {
              var nombre = prod.getAttribute("data-nombre");
              prod.style.display = nombre.indexOf(value) > -1 ? "block" : "none";
            });
          });
        </script>
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
      {/* Configuración para editar el diseño */}
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
      <header
        style={{
          backgroundImage: headerFondo ? `url(${headerFondo})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem',
          textAlign: 'center',
          color: primaryColor,
        }}
      >
        <h1 style={{ fontSize: '2.5rem' }}>{titulo}</h1>
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
            marginBottom: '1.5rem',
          }}
        />
      </section>
      <section style={{ padding: '2rem' }}>
        <h2 style={{ color: primaryColor, marginBottom: '1rem' }}>Productos</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '1rem',
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
                    color: '#999',
                  }}
                >
                  Sin imagen
                </div>
              )}
              <p style={{ marginTop: '0.5rem' }}>{item.nombre}</p>
              {!modoPreview && (
                <>
                  <input
                    type="text"
                    value={item.nombre}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[index].nombre = e.target.value;
                      setItems(updated);
                    }}
                    placeholder="Nombre del producto"
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    value={item.imagen}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[index].imagen = e.target.value;
                      setItems(updated);
                    }}
                    placeholder="URL de imagen"
                    style={{ ...inputStyle, marginTop: '0.5rem' }}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </section>
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
            cursor: 'pointer',
          }}
        >
          📦 Exportar HTML institucional
        </button>
      </section>
    </section>
  );
});

export default Plantilla9;