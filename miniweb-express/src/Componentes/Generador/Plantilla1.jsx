import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';


import BotonPago from '../BotonPago';





const Plantilla1 = forwardRef((props, ref) => {
  const {
    title,
    description,
    imagen,
    whatsapp = '',
    message = '',
    colorPrimario = '#D4AF37', // Dorado
    colorSecundario = '#444444', // Gris institucional
    headerTexto,
    footerTexto,
    fondo = '',
    modoPreview = false,
    clienteID = '',
  } = props;

  const [primaryColor, setPrimaryColor] = useState(colorPrimario);
  const [secondaryColor, setSecondaryColor] = useState(colorSecundario);
  const [backgroundImage, setBackgroundImage] = useState(fondo);
  const [imageSrc, setImageSrc] = useState(imagen);
  const [services, setServices] = useState(['Servicio 1', 'Servicio 2']);
  const [whatsappNumber, setWhatsappNumber] = useState(whatsapp);
  const [contactMessage, setContactMessage] = useState(message);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const headerRef = useRef();
  const footerRef = useRef();

  useImperativeHandle(ref, () => ({
    getCurrentValues: () => ({
      title: titleRef.current?.value || '',
      description: descriptionRef.current?.value || '',
      headerTexto: headerRef.current?.value || '',
      footerTexto: footerRef.current?.value || '',
      colorPrimario: primaryColor,
      colorSecundario: secondaryColor,
      fondo: backgroundImage,
      imagen: imageSrc,
      servicios: [...services],
      whatsapp: whatsappNumber,
      message: contactMessage
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

  const textareaStyle = {
    ...inputStyle,
    resize: 'none'
  };

  // Función para generar y descargar el HTML editado
  const exportarHTML = () => {
    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
        <style>
          body {
            font-family: sans-serif;
            padding: 2rem;
            background: ${backgroundImage ? `url(${backgroundImage})` : '#fdfdfd'};
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
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
            margin-top: 1rem;
          }
          img {
            max-width: 100%;
            border-radius: 6px;
            margin-bottom: 1rem;
          }
          ul {
            padding-left: 1rem;
          }
          li {
            margin-bottom: 0.5rem;
          }
          a {
            display: inline-block;
            margin-top: 0.5rem;
            padding: 0.5rem 1rem;
            background-color: ${primaryColor};
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
          }
          footer {
            background-color: ${secondaryColor};
            color: #fff;
            padding: 1rem;
            text-align: center;
            margin-top: 2rem;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>${headerRef.current ? headerRef.current.value : headerTexto}</h1>
        </header>
        <section>
          <h1>${title}</h1>
          <p>${description}</p>
          ${imageSrc ? `<img src="${imageSrc}" alt="Imagen institucional" />` : ''}
        </section>
        <section>
          <h2>Servicios</h2>
          <ul>
            ${services.map(serv => `<li>${serv}</li>`).join('')}
          </ul>
        </section>
        <section>
          <h2>Contacto</h2>
          <p>${contactMessage}</p>
          ${whatsappNumber ? `<a href="https://wa.me/${whatsappNumber}">Contactar por WhatsApp</a>` : ''}
        </section>
        <footer>
          <p>${footerRef.current ? footerRef.current.value : footerTexto}</p>
        </footer>
      </body>
      </html>
    `;
    const blob = new Blob([html.replace(/\n\s*/g, ' ')], { type: 'text/html' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'plantilla1.html';
    downloadLink.click();
  };

  return (
    <section
      id="editable"
      style={{
        fontFamily: 'sans-serif',
        padding: '2rem',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#fdfdfd'
      }}
    >
      {!modoPreview && (
        <details style={{ marginBottom: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            ⚙️ Personalizar diseño y contenido
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
              Imagen institucional:
              <input
                type="text"
                value={imageSrc}
                onChange={(e) => setImageSrc(e.target.value)}
                placeholder="URL de imagen"
                style={inputStyle}
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
                style={textareaStyle}
              />
            </label>
            <label>
              Servicios:
              {services.map((serv, i) => (
                <input
                  key={i}
                  value={serv}
                  onChange={(e) => {
                    const newServices = [...services];
                    newServices[i] = e.target.value;
                    setServices(newServices);
                  }}
                  placeholder={`Servicio ${i + 1}`}
                  style={{ ...inputStyle, marginBottom: '0.5rem' }}
                />
              ))}
            </label>
          </div>
        </details>
      )}

      {/* Header */}
      <header style={{ backgroundColor: primaryColor, padding: '1rem', color: '#fff' }}>
        {modoPreview ? (
          <h1>{headerTexto}</h1>
        ) : (
          <input ref={headerRef} defaultValue={headerTexto} style={inputStyle} />
        )}
      </header>

      {/* Título y descripción */}
      <section style={{ marginTop: '1rem' }}>
        <h1 style={{ color: primaryColor }}>
          {modoPreview ? (
            title
          ) : (
            <input ref={titleRef} defaultValue={title} style={{ ...inputStyle, fontSize: '2rem' }} />
          )}
        </h1>
        {modoPreview ? (
          <p>{description}</p>
        ) : (
          <textarea ref={descriptionRef} defaultValue={description} rows="3" style={textareaStyle} />
        )}
        {imageSrc && (
          <img src={imageSrc} alt="Imagen institucional" />
        )}
      </section>

      {/* Servicios */}
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ color: secondaryColor }}>Servicios</h2>
        <ul style={{ paddingLeft: '1rem' }}>
          {services.map((serv, i) => (
            <li key={i} style={{ marginBottom: '0.5rem' }}>
              {modoPreview ? serv : (
                <input
                  value={serv}
                  onChange={(e) => {
                    const newServices = [...services];
                    newServices[i] = e.target.value;
                    setServices(newServices);
                  }}
                  style={inputStyle}
                />
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Contacto */}
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ color: secondaryColor }}>Contacto</h2>
        <p>{modoPreview ? contactMessage : (
          <textarea
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
            rows="2"
            style={textareaStyle}
          />
        )}</p>
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
            Contactar por WhatsApp
          </a>
        )}
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: secondaryColor, color: '#fff', padding: '1rem', marginTop: '2rem' }}>
        {modoPreview ? (
          <p>{footerTexto}</p>
        ) : (
          <input ref={footerRef} defaultValue={footerTexto} style={inputStyle} />
        )}
      </footer>

      {/* Botón de pago + exportación institucional */}

{/* Botón de pago institucional */}
      <div style={{ marginTop: '2rem' }}>
        <BotonPago
          nombrePlantilla="Plantilla1"
          precio={1500}
          clienteID={clienteID}
        />
      </div>








    </section>
  );
});

export default Plantilla1;