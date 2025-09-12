import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import BotonPago from '../BotonPago';
const Plantilla4 = forwardRef((props, ref) => {
  const {
    title = 'Nombre institucional',
    description = 'Presentación profesional',
    imagenes = [],
    productos = [],
    whatsapp = '',
    message = '',
    ubicacion = 'Ciudad, País',
    modoPreview = false,
    colorPrimario = '#D4AF37',
    colorSecundario = '#444',
    fondo = '',
    tipografia = 'sans-serif',
    clienteID = ''
  } = props;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [titulo, setTitulo] = useState(title);
  const [descripcion, setDescripcion] = useState(description);
  const [carouselImages, setCarouselImages] = useState(imagenes.length ? imagenes : ['']);
  const [productList, setProductList] = useState(
    productos.length
      ? productos
      : [
          { nombre: 'Producto 1', precio: '1000', imagen: '' },
          { nombre: 'Producto 2', precio: '1500', imagen: '' }
        ]
  ); // <-- Punto y coma agregado

  const [whatsappNumber, setWhatsappNumber] = useState(whatsapp);
  const [mensajeContacto, setMensajeContacto] = useState(message);
  const [ubicacionTexto, setUbicacionTexto] = useState(ubicacion);
  const [primaryColor, setPrimaryColor] = useState(colorPrimario);
  const [secondaryColor, setSecondaryColor] = useState(colorSecundario);
  const [backgroundImage, setBackgroundImage] = useState(fondo);
  const [fontFamily, setFontFamily] = useState(tipografia);

  const tituloRef = useRef();
  const descripcionRef = useRef();

  useImperativeHandle(ref, () => ({
    getCurrentValues: () => ({
      title: tituloRef.current?.value || titulo,
      description: descripcionRef.current?.value || descripcion,
      imagenes: [...carouselImages],
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

  const exportarHTML = () => {
    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>${titulo}</title>
        <style>
          body {
            font-family: ${fontFamily};
            padding: 2rem;
            background: ${backgroundImage ? `url(${backgroundImage})` : '#fdfdfd'};
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            color: ${secondaryColor};
          }
          header {
            margin-bottom: 1rem;
            border-bottom: 2px solid ${primaryColor};
            padding-bottom: 1rem;
          }
          header h1 {
            font-size: 2.5rem;
            color: ${primaryColor};
          }
          header p {
            font-size: 1.1rem;
          }
          section {
            margin-bottom: 2rem;
          }
          .carousel {
            text-align: center;
            margin-bottom: 2rem;
          }
          .carousel img {
            max-width: 100%;
            border-radius: 6px;
            margin-bottom: 1rem;
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
          .contacto {
            margin-bottom: 2rem;
          }
          .contacto p {
            margin: 0.5rem 0;
          }
          .whatsapp-btn {
            display: inline-block;
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
          <h1>${titulo}</h1>
          <p>${descripcion}</p>
        </header>
        <section class="carousel">
          <h2 style="color: ${secondaryColor};">Galería institucional</h2>
          ${carouselImages.length > 0 ? `
            <img src="${carouselImages[currentImageIndex] || ''}" alt="Imagen ${currentImageIndex + 1}" onerror="this.style.display='none'" />
          ` : '<div>Imagen no disponible</div>'}
        </section>
        <section>
          <h2 style="color: ${secondaryColor};">Productos</h2>
          <div class="productos-grid">
            ${productList.map(prod => `
              <div class="producto">
                ${prod.imagen ? `<img src="${prod.imagen}" alt="${prod.nombre}" />` : ''}
                <h3 style="color: ${primaryColor};">${prod.nombre}</h3>
                <p style="font-weight: bold;">$${prod.precio}</p>
              </div>
            `).join('')}
          </div>
        </section>
        <section class="contacto">
          <h2 style="color: ${secondaryColor};">Contacto</h2>
          <p><strong>WhatsApp:</strong> ${whatsappNumber}</p>
          <p><strong>Mensaje:</strong> ${mensajeContacto}</p>
          <p><strong>Ubicación:</strong> ${ubicacionTexto}</p>
          ${whatsappNumber && mensajeContacto ?
            `<a class="whatsapp-btn" href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensajeContacto)}" target="_blank">
              Contactar por WhatsApp
            </a>` : ''}
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
        backgroundColor: '#fdfdfd',
        border: '1px solid #ccc',
        borderRadius: '8px',
        color: secondaryColor
      }}
    >
      {!modoPreview && (
        <details style={{ marginBottom: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            ⚙️ Configurar diseño institucional
          </summary>
          <div style={{ display: 'grid', gap: '0.75rem', marginTop: '0.5rem' }}>
            <label>
              Tipografía:
              <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} style={inputStyle}>
                <option value="sans-serif">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
              </select>
            </label>
            <label>
              Fondo:
              <input type="text" value={backgroundImage} onChange={(e) => setBackgroundImage(e.target.value)} placeholder="URL de fondo" style={inputStyle} />
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
      {modoPreview ? (
        <>
          <h1 style={{ color: primaryColor }}>{titulo}</h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{descripcion}</p>
        </>
      ) : (
        <>
          <input ref={tituloRef} value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título institucional" style={{ ...inputStyle, fontSize: '2rem', fontWeight: 'bold', color: primaryColor }} />
          <textarea ref={descripcionRef} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción institucional" rows="3" style={{ ...inputStyle, fontSize: '1.1rem', marginBottom: '1rem', resize: 'none' }} />
        </>
      )}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: secondaryColor }}>Galería institucional</h2>
        {carouselImages.length > 0 && (
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ minHeight: '200px' }}>
              {carouselImages[currentImageIndex] ? (
                <img
                  src={carouselImages[currentImageIndex]}
                  alt={`Imagen ${currentImageIndex + 1}`}
                  style={{ maxWidth: '100%', borderRadius: '6px', marginBottom: '1rem' }}
                  onError={(e) => (e.target.style.display = 'none')}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#eee',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    marginBottom: '1rem'
                  }}
                >
                  Imagen no disponible
                </div>
              )}
            </div>
            {!modoPreview && (
              <input
                type="text"
                value={carouselImages[currentImageIndex]}
                onChange={(e) => {
                  const updated = [...carouselImages];
                  updated[currentImageIndex] = e.target.value;
                  setCarouselImages(updated);
                }}
                placeholder={`URL imagen ${currentImageIndex + 1}`}
                style={inputStyle}
              />
            )}
            <div style={{ marginTop: '0.5rem' }}>
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : carouselImages.length - 1))
                }
                style={{
                  marginRight: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: secondaryColor,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                ◀ Anterior
              </button>
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) => (prev < carouselImages.length - 1 ? prev + 1 : 0))
                }
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: secondaryColor,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Siguiente ▶
              </button>
              {!modoPreview && (
                <button
                  onClick={() => {
                    const updated = [...carouselImages, ''];
                    setCarouselImages(updated);
                    setCurrentImageIndex(updated.length - 1);
                  }}
                  style={{
                    marginLeft: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: primaryColor,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  ➕ Agregar imagen
                </button>
              )}
            </div>
          </div>
        )}
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: secondaryColor }}>Productos</h2>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {productList.map((prod, i) => (
            <div
              key={i}
              style={{
                border: `1px solid ${secondaryColor}`,
                borderRadius: '6px',
                padding: '1rem',
                backgroundColor: prod.seleccionado ? '#fffbe6' : '#fafafa'
              }}
            >
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
                    style={{ ...inputStyle, fontWeight: 'bold', marginBottom: '0.5rem' }}
                  />
                  <input
                    value={prod.precio}
                    onChange={(e) => {
                      const updated = [...productList];
                      updated[i].precio = e.target.value;
                      setProductList(updated);
                    }}
                    placeholder="Precio"
                    style={{ ...inputStyle, marginBottom: '0.5rem' }}
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
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: secondaryColor }}>Contacto</h2>
        {modoPreview ? (
          <>
            <p><strong>WhatsApp:</strong> {whatsappNumber}</p>
            <p><strong>Mensaje:</strong> {mensajeContacto}</p>
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
            Enviar pedido por WhatsApp
          </a>
        )}
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
      
            💳 Pagar y exportar HTML institucional
          
        </button>
              </section>
            )}
           </section>
          </section>
        );
      });
      
      export default Plantilla4