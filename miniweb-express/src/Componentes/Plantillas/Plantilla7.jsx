import React, { useState, useImperativeHandle, forwardRef } from 'react';

const Plantilla7 = forwardRef((props, ref) => {
  const {
    titulo = 'Bienvenidos',
    subtitulo = 'Explorá nuestro universo institucional',
    fondo = '',
    carrusel = [],
    colorPrimario = '#00BFFF',
    colorSecundario = '#222',
    tipografia = "'Poppins', sans-serif",
    modoPreview = false
  } = props;

  const [bannerTitulo, setBannerTitulo] = useState(titulo);
  const [bannerSubtitulo, setBannerSubtitulo] = useState(subtitulo);
  const [backgroundImage, setBackgroundImage] = useState(fondo);
  const [carouselItems, setCarouselItems] = useState(
    carrusel.length
      ? carrusel
      : [
          { imagen: '', texto: 'Slide 1' },
          { imagen: '', texto: 'Slide 2' },
          { imagen: '', texto: 'Slide 3' }
        ]
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [primaryColor, setPrimaryColor] = useState(colorPrimario);
  const [secondaryColor, setSecondaryColor] = useState(colorSecundario);
  const [fontFamily, setFontFamily] = useState(tipografia);

  useImperativeHandle(ref, () => ({
    getCurrentValues: () => ({
      titulo: bannerTitulo,
      subtitulo: bannerSubtitulo,
      fondo: backgroundImage,
      carrusel: [...carouselItems],
      colorPrimario: primaryColor,
      colorSecundario: secondaryColor,
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
        <title>${bannerTitulo}</title>
        <style>
          body {
            font-family: ${fontFamily};
            margin: 0;
            padding: 2rem;
            color: ${secondaryColor};
            background-image: ${backgroundImage ? `url(${backgroundImage})` : 'none'};
            background-size: cover;
            background-position: center;
          }
          header {
            text-align: center;
            margin-bottom: 2rem;
          }
          header h1 {
            font-size: 3rem;
            color: ${primaryColor};
          }
          header p {
            font-size: 1.25rem;
          }
          .carousel-container {
            text-align: center;
          }
          .carousel {
            position: relative;
            min-height: 250px;
          }
          .slide {
            display: none;
          }
          .slide img {
            max-width: 100%;
            border-radius: 8px;
          }
          .slide p {
            font-size: 1.1rem;
          }
          .carousel-placeholder {
            width: 100%;
            height: 250px;
            background: #eee;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
          }
          .buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 1rem;
          }
          .buttons button {
            padding: 0.5rem 1rem;
            background-color: ${secondaryColor};
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>${bannerTitulo}</h1>
          <p>${bannerSubtitulo}</p>
        </header>
        <section class="carousel-container">
          <div class="carousel">
            ${carouselItems.map((item, idx) => `
              <div class="slide" data-index="${idx}" style="${idx === currentSlide ? 'display:block;' : 'display:none;'}">
                ${item.imagen 
                  ? `<img src="${item.imagen}" alt="Slide ${idx + 1}" />`
                  : `<div class="carousel-placeholder">Sin imagen</div>`
                }
                <p>${item.texto}</p>
              </div>
            `).join('')}
          </div>
          <div class="buttons">
            <button id="prevBtn">◀ Anterior</button>
            <button id="nextBtn">Siguiente ▶</button>
          </div>
        </section>
        <script>
          let currentSlide = ${currentSlide};
          const slides = document.querySelectorAll('.slide');
          document.getElementById('prevBtn').addEventListener('click', function() {
            slides[currentSlide].style.display = 'none';
            currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
            slides[currentSlide].style.display = 'block';
          });
          document.getElementById('nextBtn').addEventListener('click', function() {
            slides[currentSlide].style.display = 'none';
            currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
            slides[currentSlide].style.display = 'block';
          });
        </script>
      </body>
      </html>
    `;
    const blob = new Blob([html.replace(/\n\s*/g, ' ')], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'miniweb_institucional.html';
    link.click();
  };

  return (
    <section
      style={{
        fontFamily: fontFamily,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '2rem',
        color: secondaryColor
      }}
    >
      {/* Panel de configuración */}
      {!modoPreview && (
        <details style={{ marginBottom: '2rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>⚙️ Configurar diseño</summary>
          <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
            <label>
              Tipografía:
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                style={inputStyle}
              >
                <option value="'Poppins', sans-serif">Poppins</option>
                <option value="'Anton', sans-serif">Anton</option>
                <option value="sans-serif">Sans Serif</option>
                <option value="serif">Serif</option>
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

      {/* Banner */}
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {modoPreview ? (
          <>
            <h1 style={{ fontSize: '3rem', color: primaryColor }}>{bannerTitulo}</h1>
            <p style={{ fontSize: '1.25rem' }}>{bannerSubtitulo}</p>
          </>
        ) : (
          <>
            <input
              value={bannerTitulo}
              onChange={(e) => setBannerTitulo(e.target.value)}
              placeholder="Título institucional"
              style={{ ...inputStyle, fontSize: '2rem', fontWeight: 'bold', color: primaryColor }}
            />
            <textarea
              value={bannerSubtitulo}
              onChange={(e) => setBannerSubtitulo(e.target.value)}
              placeholder="Subtítulo"
              rows="2"
              style={{ ...inputStyle, fontSize: '1.1rem', resize: 'none' }}
            />
          </>
        )}
      </header>

      {/* Carrusel */}
      <section style={{ textAlign: 'center' }}>
        <div style={{ position: 'relative', minHeight: '250px' }}>
          {carouselItems[currentSlide].imagen ? (
            <img
              src={carouselItems[currentSlide].imagen}
              alt={`Slide ${currentSlide + 1}`}
              style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '1rem' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '250px',
                backgroundColor: '#eee',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                marginBottom: '1rem'
              }}
            >
              Sin imagen
            </div>
          )}
          {!modoPreview && (
            <input
              type="text"
              value={carouselItems[currentSlide].imagen}
              onChange={(e) => {
                const updated = [...carouselItems];
                updated[currentSlide] = {
                  ...updated[currentSlide],
                  imagen: e.target.value
                };
                setCarouselItems(updated);
              }}
              placeholder={`URL imagen ${currentSlide + 1}`}
              style={inputStyle}
            />
          )}
          <div style={{ marginTop: '0.5rem' }}>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev > 0 ? prev - 1 : carouselItems.length - 1))
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
                setCurrentSlide((prev) => (prev < carouselItems.length - 1 ? prev + 1 : 0))
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
                  const updated = [...carouselItems, { imagen: '', texto: '' }];
                  setCarouselItems(updated);
                  setCurrentSlide(updated.length - 1);
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
                ➕ Agregar slide
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Edición de textos del banner */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: secondaryColor }}>Editar contenido</h2>
        {!modoPreview && (
          <>
            <input
              value={bannerTitulo}
              onChange={(e) => setBannerTitulo(e.target.value)}
              placeholder="Título institucional"
              style={inputStyle}
            />
            <textarea
              value={bannerSubtitulo}
              onChange={(e) => setBannerSubtitulo(e.target.value)}
              placeholder="Subtítulo"
              rows="2"
              style={{ ...inputStyle, resize: 'none' }}
            />
          </>
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

export default Plantilla7;