import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import BotonPago from '../BotonPago';
const Plantilla3 = forwardRef((props, ref) => {
  const {
    title = 'Nombre profesional',
    description = 'Breve presentación institucional',
    imagen = '',
    whatsapp = '',
    message = '',
    modoPreview = false,
    colorPrimario = '#D4AF37',
    colorSecundario = '#444',
    fondo = '',
    tipografia = 'sans-serif',
    clienteID = ''
  } = props;

  const [titulo, setTitulo] = useState(title);
  const [descripcion, setDescripcion] = useState(description);
  const [imagenPerfil, setImagenPerfil] = useState(imagen);
  const [whatsappNumber, setWhatsappNumber] = useState(whatsapp);
  const [mensajeContacto, setMensajeContacto] = useState(message);
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
      imagen: imagenPerfil,
      whatsapp: whatsappNumber,
      message: mensajeContacto,
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
    // Se genera el HTML completo sin el panel de configuración, reflejando las ediciones realizadas
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
            padding-bottom: 1rem;
            border-bottom: 2px solid ${primaryColor};
          }
          header h1 {
            color: ${primaryColor};
            font-size: 2.5rem;
          }
          header p {
            font-size: 1.1rem;
          }
          img {
            max-width: 100%;
            border-radius: 6px;
            margin-bottom: 1rem;
          }
          a {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background-color: ${primaryColor};
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 1rem;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>${titulo}</h1>
          <p>${descripcion}</p>
        </header>
        ${imagenPerfil ? `<img src="${imagenPerfil}" alt="Imagen institucional" />` : ''}
        ${whatsappNumber ? `<a href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensajeContacto)}" target="_blank">Solicitar</a>` : ''}
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
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                style={inputStyle}
              >
                <option value="sans-serif">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
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
          </div>
        </details>
      )}

      {modoPreview ? (
        <h1 style={{ color: primaryColor }}>{titulo}</h1>
      ) : (
        <input
          ref={tituloRef}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Nombre profesional"
          style={{ ...inputStyle, fontSize: '2rem', fontWeight: 'bold', color: primaryColor }}
        />
      )}

      {modoPreview ? (
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{descripcion}</p>
      ) : (
        <textarea
          ref={descripcionRef}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción institucional"
          rows="3"
          style={{ ...inputStyle, fontSize: '1.1rem', marginBottom: '1rem', resize: 'none' }}
        />
      )}

      {imagenPerfil && (
        <img
          src={imagenPerfil}
          alt="Imagen institucional"
          style={{ maxWidth: '100%', borderRadius: '6px', marginBottom: '1rem' }}
        />
      )}

      {!modoPreview && (
        <input
          type="text"
          value={imagenPerfil}
          onChange={(e) => setImagenPerfil(e.target.value)}
          placeholder="URL de imagen"
          style={inputStyle}
        />
      )}

      {!modoPreview && (
        <>
          <input
            type="text"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="Número de WhatsApp"
            style={inputStyle}
          />
          <textarea
            value={mensajeContacto}
            onChange={(e) => setMensajeContacto(e.target.value)}
            placeholder="Mensaje institucional"
            rows="2"
            style={{ ...inputStyle, resize: 'none', marginTop: '0.5rem' }}
          />
        </>
      )}

      {whatsappNumber && (
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensajeContacto)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: primaryColor,
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
            marginTop: '1rem'
          }}
        >
          Solicitar
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
       
        );
      });
      
      export default Plantilla3