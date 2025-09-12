import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import BotonPago from '../BotonPago';

const Plantilla2 = forwardRef((props, ref) => {
  const {
    whatsapp,
    mensajeContacto,
    modoPreview = false,
    headerTexto,
    fondo = '',
    colorPrimario = '#0055A5',
    colorSecundario = '#333333',
    productos = [],
    clienteID = ''
  } = props;

  const [backgroundImage, setBackgroundImage] = useState(fondo);
  const [primaryColor, setPrimaryColor] = useState(colorPrimario);
  const [secondaryColor, setSecondaryColor] = useState(colorSecundario);
  const [productList, setProductList] = useState(
    productos.length
      ? productos
      : Array.from({ length: 20 }, (_, i) => ({
          nombre: `Producto ${i + 1}`,
          precio: i % 2 === 0 ? '1000' : '1500',
          descripcion: i % 2 === 0 ? 'Descripción breve' : 'Otra descripción',
          imagen: ''
        }))
  );
  const [whatsappNumber, setWhatsappNumber] = useState(whatsapp);
  const [contactMessage, setContactMessage] = useState(mensajeContacto);
  const headerRef = useRef();

  useImperativeHandle(ref, () => ({
    getCurrentValues: () => ({
      headerTexto: headerRef.current?.value || '',
      fondo: backgroundImage,
      colorPrimario: primaryColor,
      colorSecundario: secondaryColor,
      productos: [...productList],
      whatsapp: whatsappNumber,
      mensajeContacto: contactMessage
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
    // Se genera el HTML completo sin el panel de configuración
    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>${headerTexto}</title>
        <style>
          body {
            font-family: sans-serif;
            padding: 2rem;
            background: ${backgroundImage ? `url(${backgroundImage})` : '#fff'};
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            color: ${secondaryColor};
          }
          header {
            background-color: ${primaryColor};
            padding: 1rem;
            color: #fff;
            text-align: center;
          }
          header h1 {
            margin: 0;
            font-size: 2.5rem;
          }
          section {
            margin-top: 2rem;
          }
          .productos-grid {
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
          .producto {
            border: 1px solid ${secondaryColor};
            border-radius: 8px;
            padding: 1rem;
            background-color: #fafafa;
          }
          .producto img {
            width: 100%;
            margin-bottom: 0.5rem;
          }
          .contacto {
            margin-top: 2rem;
          }
          .contacto p {
            margin: 0.5rem 0;
          }
          a.whatsapp {
            display: inline-block;
            margin-top: 0.5rem;
            padding: 0.5rem 1rem;
            background-color: ${primaryColor};
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>${headerTexto}</h1>
        </header>
        <section>
          <h2 style="color: ${secondaryColor};">Catálogo de productos</h2>
          <div class="productos-grid">
            ${productList
              .map(
                prod => `
              <div class="producto">
                ${prod.imagen ? `<img src="${prod.imagen}" alt="${prod.nombre}" />` : ''}
                <h3 style="color: ${primaryColor};">${prod.nombre}</h3>
                <p style="font-weight:bold;">$${prod.precio}</p>
                <p>${prod.descripcion}</p>
              </div>
            `
              )
              .join('')}
          </div>
        </section>
        <section class="contacto">
          <h2 style="color: ${secondaryColor};">Contacto</h2>
          <p>${contactMessage}</p>
          ${whatsappNumber ? `<a class="whatsapp" href="https://wa.me/${whatsappNumber}" target="_blank">Contactame por WhatsApp</a>` : ''}
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
        fontFamily: 'sans-serif',
        padding: '2rem',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#fff'
      }}
    >
      {!modoPreview && (
        <details style={{ marginBottom: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            ⚙️ Personalizar diseño y productos
          </summary>
          <div style={{ display: 'grid', gap: '0.75rem', marginTop: '0.5rem' }}>
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
                placeholder="Número de contacto"
                style={inputStyle}
              />
            </label>
            <label>
              Mensaje institucional:
              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                rows="2"
                style={{ ...inputStyle, resize: 'none' }}
              />
            </label>
          </div>
        </details>
      )}

      <header
        style={{
          backgroundColor: primaryColor,
          padding: '1rem',
          color: '#fff',
          textAlign: 'center'
        }}
      >
        {modoPreview ? (
          <h1>{headerTexto}</h1>
        ) : (
          <input ref={headerRef} defaultValue={headerTexto} style={inputStyle} />
        )}
      </header>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ color: secondaryColor }}>Catálogo de productos</h2>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
          }}
        >
          {productList.map((prod, i) => (
            <div
              key={i}
              style={{
                border: `1px solid ${secondaryColor}`,
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#fafafa'
              }}
            >
              {modoPreview ? (
                <>
                  {prod.imagen && (
                    <img src={prod.imagen} alt={prod.nombre} style={{ width: '100%', marginBottom: '0.5rem' }} />
                  )}
                  <h3 style={{ color: primaryColor }}>{prod.nombre}</h3>
                  <p style={{ fontWeight: 'bold' }}>${prod.precio}</p>
                  <p>{prod.descripcion}</p>
                </>
              ) : (
                <>
                  {prod.imagen && (
                    <img src={prod.imagen} alt={prod.nombre} style={{ width: '100%', marginBottom: '0.5rem' }} />
                  )}
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
                  <textarea
                    value={prod.descripcion}
                    onChange={(e) => {
                      const updated = [...productList];
                      updated[i].descripcion = e.target.value;
                      setProductList(updated);
                    }}
                    rows="2"
                    style={{ ...inputStyle, resize: 'none' }}
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

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ color: secondaryColor }}>Contacto</h2>
        <p>{contactMessage}</p>
        {whatsappNumber && (
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: primaryColor,
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Contactame por WhatsApp
          </a>
        )}
      </section>
{/* Botón de pago institucional */}
      <div style={{ marginTop: '2rem' }}>
        <BotonPago
          nombrePlantilla="Plantilla1"
          precio={1500}
          clienteID={clienteID}
        />
      </div>




{!modoPreview && (
  <section style={{ textAlign: 'center', padding: '2rem' }}>
    <button
      onClick={async () => {
        const nombrePlantilla = "Plantilla Institucional Premium";
        const precio = 1500;

        try {
          const response = await axios.post(`${API_BASE}/crear-pago`, {
            nombrePlantilla,
            precio,
          });

          const { transferencia_url } = response.data;

          if (transferencia_url) {
            window.location.href = transferencia_url; // ✅ Redirige al flujo de pago
          } else {
            alert("No se recibió un enlace de transferencia válido.");
          }
        } catch (error) {
          console.error("Error al iniciar el pago:", error);
          alert("No se pudo iniciar el pago. Verificá tu conexión o intenta más tarde.");
        }
      }}
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

      
    
  </button>
        </section>
      )}
     </section>
 
  );
});

export default Plantilla2