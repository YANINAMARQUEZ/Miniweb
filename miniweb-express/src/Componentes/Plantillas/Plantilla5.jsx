import React, { useState, useImperativeHandle, forwardRef } from 'react';

const Plantilla5 = forwardRef((props, ref) => {
  const {
    productos = [],
    whatsapp = '',
    message = '',
    ubicacion = 'Ciudad, País',
    modoPreview = false,
    colorPrimario = '#D4AF37',
    colorSecundario = '#222',
    fondo = '',
    tipografia = "'Anton', sans-serif"
  } = props;

  const [productList, setProductList] = useState(
    productos.length
      ? productos
      : [
          { nombre: 'Producto 1', precio: '1000', imagen: '' },
          { nombre: 'Producto 2', precio: '1500', imagen: '' }
        ]
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState(whatsapp);
  const [mensajeContacto, setMensajeContacto] = useState(message);
  const [ubicacionTexto, setUbicacionTexto] = useState(ubicacion);
  const [primaryColor, setPrimaryColor] = useState(colorPrimario);
  const [secondaryColor, setSecondaryColor] = useState(colorSecundario);
  const [backgroundImage, setBackgroundImage] = useState(fondo);
  const [fontFamily, setFontFamily] = useState(tipografia);

  useImperativeHandle(ref, () => ({
    getCurrentValues: () => ({
      productos: [...productList],
      whatsapp: whatsappNumber,
      message: mensajeContacto,
      ubicacion: ubicacionTexto,
      colorPrimario: primaryColor,
      colorSecundario: secondaryColor,
      fondo: backgroundImage,
      tipografia: fontFamily
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

  const filteredProducts = productList.filter((prod) =>
    prod.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportarHTML = () => {
    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Inicio</title>
        <style>
          body {
            font-family: ${fontFamily};
            padding: 2rem;
            background: ${backgroundImage ? `url(${backgroundImage})` : '#fff'};
            background-size: cover;
            background-position: center;
            color: ${secondaryColor};
          }
          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            border-bottom: 2px solid ${primaryColor};
            padding-bottom: 1rem;
          }
          header h1 {
            font-size: 2.5rem;
            color: ${primaryColor};
          }
          header input {
            padding: 0.5rem 1rem;
            font-size: 1rem;
            border-radius: 4px;
            border: 1px solid ${primaryColor};
            font-family: ${fontFamily};
            width: 250px;
          }
          section {
            margin-bottom: 2rem;
          }
          .productos-grid {
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
          .producto {
            border: 1px solid ${secondaryColor};
            border-radius: 6px;
            padding: 1rem;
          }
          .producto img {
            width: 100%;
            margin-bottom: 0.5rem;
          }
          .contacto a {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.75rem 1.5rem;
            background-color: ${primaryColor};
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Inicio</h1>
          <input type="text" placeholder="Buscar producto..." value="${searchTerm}" readonly />
        </header>
        <section>
          <h2 style="color: ${secondaryColor}">Productos</h2>
          <div class="productos-grid">
            ${filteredProducts.map(prod => `
              <div class="producto">
                ${prod.imagen ? `<img src="${prod.imagen}" alt="${prod.nombre}" />` : ''}
                <h3 style="color: ${primaryColor}">${prod.nombre}</h3>
                <p style="font-weight: bold;">$${prod.precio}</p>
              </div>
            `).join('')}
          </div>
        </section>
        <section class="contacto">
          <h2 style="color: ${secondaryColor}">Contacto</h2>
          ${modoPreview ? `
            <p><strong>WhatsApp:</strong> ${whatsappNumber}</p>
            <p><strong>Mensaje:</strong> ${mensajeContacto}</p>
            <p><strong>Ubicación:</strong> ${ubicacionTexto}</p>
          ` : ''}
          ${
            whatsappNumber && mensajeContacto
              ? `<a href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensajeContacto)}" target="_blank">
                   Contactar por WhatsApp
                 </a>`
              : ''
          }
        </section>
      </body>
      </html>
    `;
    const blob = new Blob([html.replace(/\n\s*/g, ' ')], { type: 'text/html' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'miniweb_institucional.html';
    downloadLink.click();
  };

  return (
    <section
      style={{
        fontFamily: fontFamily,
        padding: '2rem',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#fff',
        color: secondaryColor
      }}
    >
      {/* Panel de configuración */}
      {!modoPreview && (
        <details style={{ marginBottom: '2rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            ⚙️ Configurar diseño institucional
          </summary>
          <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
            <label>
              Tipografía:
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                style={inputStyle}
              >
                <option value="'Anton', sans-serif">Anton</option>
                <option value="'Bebas Neue', sans-serif">Bebas Neue</option>
                <option value="sans-serif">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </label>
            <label>
              Fondo:
              <input
                type="text"
                value={backgroundImage}
                onChange={(e) => setBackgroundImage(e.target.value)}
                placeholder="URL de fondo"
                style={inputStyle}
              />
            </label>
            <label>
              Color primario:
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
            </label>
            <label>
              Color secundario:
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
              />
            </label>
            <label>
              WhatsApp:
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="Número de WhatsApp"
                style={inputStyle}
              />
            </label>
            <label>
              Mensaje institucional:
              <textarea
                value={mensajeContacto}
                onChange={(e) => setMensajeContacto(e.target.value)}
                placeholder="Mensaje"
                rows="2"
                style={{ ...inputStyle, resize: 'none' }}
              />
            </label>
            <label>
              Ubicación:
              <input
                type="text"
                value={ubicacionTexto}
                onChange={(e) => setUbicacionTexto(e.target.value)}
                placeholder="Ubicación"
                style={inputStyle}
              />
            </label>
          </div>
        </details>
      )}

      {/* Header institucional */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          borderBottom: `2px solid ${primaryColor}`,
          paddingBottom: '1rem'
        }}
      >
        <h1 style={{ fontSize: '2.5rem', color: primaryColor }}>Inicio</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar producto..."
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: `1px solid ${primaryColor}`,
            fontFamily: fontFamily,
            width: '250px'
          }}
        />
      </header>

      {/* Sección de productos */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: secondaryColor }}>Productos</h2>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
          }}
        >
          {filteredProducts.map((prod, i) => (
            <div key={i} style={{ border: `1px solid ${secondaryColor}`, borderRadius: '6px', padding: '1rem' }}>
              {modoPreview ? (
                <>
                  {prod.imagen && (
                    <img src={prod.imagen} alt={prod.nombre} style={{ width: '100%', marginBottom: '0.5rem' }} />
                  )}
                  <h3 style={{ color: primaryColor }}>{prod.nombre}</h3>
                  <p style={{ fontWeight: 'bold' }}>${prod.precio}</p>
                </>
              ) : (
                <>
                  <input
                    value={prod.nombre}
                    onChange={(e) => {
                      const updated = [...productList];
                      updated[i].nombre = e.target.value;
                      setProductList(updated);
                    }}
                    placeholder="Nombre del producto"
                    style={inputStyle}
                  />
                  <input
                    value={prod.precio}
                    onChange={(e) => {
                      const updated = [...productList];
                      updated[i].precio = e.target.value;
                      setProductList(updated);
                    }}
                    placeholder="Precio"
                    style={inputStyle}
                  />
                  <input
                    value={prod.imagen}
                    onChange={(e) => {
                      const updated = [...productList];
                      updated[i].imagen = e.target.value;
                      setProductList(updated);
                    }}
                    placeholder="URL de imagen"
                    style={inputStyle}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sección de contacto */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: secondaryColor }}>Contacto</h2>
        {modoPreview ? (
          <>
            <p>
              <strong>WhatsApp:</strong> {whatsappNumber}
            </p>
            <p>
              <strong>Mensaje:</strong> {mensajeContacto}
            </p>
            <p>
              <strong>Ubicación:</strong> {ubicacionTexto}
            </p>
          </>
        ) : null}
        {whatsappNumber && mensajeContacto && (
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensajeContacto)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: primaryColor,
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 'bold'
            }}
          >
            Contactar por WhatsApp
          </a>
        )}
      </section>

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

export default Plantilla5;