import React from 'react';

const Plantilla1Estatica = ({
  title,
  description,
  imagen,
  whatsapp = '',
  message = '',
  colorPrimario = '#D4AF37',
  colorSecundario = '#444444',
  headerTexto,
  footerTexto,
  fondo = '',
  servicios = []
}) => {
  return (
    <section
      style={{
        fontFamily: 'sans-serif',
        padding: '2rem',
        backgroundImage: fondo ? `url(${fondo})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#fdfdfd'
      }}
    >
      {/* 🏛 Header */}
      <header
        style={{
          backgroundColor: colorPrimario,
          padding: '1rem',
          color: '#fff'
        }}
      >
        <h1>{headerTexto}</h1>
      </header>

      {/* 🏠 Inicio */}
      <section style={{ marginTop: '1rem' }}>
        <h1 style={{ color: colorPrimario }}>{title}</h1>
        <p>{description}</p>
        {imagen && (
          <img
            src={imagen}
            alt="Imagen institucional"
            style={{ maxWidth: '100%', marginBottom: '1rem' }}
          />
        )}
      </section>

      {/* 🧩 Servicios */}
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ color: colorSecundario }}>Servicios</h2>
        <ul style={{ paddingLeft: '1rem' }}>
          {servicios.map((serv, i) => (
            <li key={i} style={{ marginBottom: '0.5rem' }}>{serv}</li>
          ))}
        </ul>
      </section>

      {/* 📞 Contacto */}
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ color: colorSecundario }}>Contacto</h2>
        <p>{message}</p>
        {whatsapp && (
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: colorPrimario,
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Contactar por WhatsApp
          </a>
        )}
      </section>

      {/* 🧾 Footer */}
      <footer
        style={{
          backgroundColor: colorSecundario,
          color: '#fff',
          padding: '1rem',
          marginTop: '2rem'
        }}
      >
        <p>{footerTexto}</p>
      </footer>
    </section>
  );
};

export default Plantilla1Estatica;
