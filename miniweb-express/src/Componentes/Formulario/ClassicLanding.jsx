// src/templates/ClassicLanding.jsx
function ClassicLanding({ config }) {
  const { nombre, rubro, color, mensaje, whatsapp } = config;

  const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`;

  return (
    <div style={{ backgroundColor: color, padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>{nombre}</h1>
      <h2>{rubro}</h2>
      <p>Conocé nuestros servicios y escribinos directo por WhatsApp.</p>
      <a href={waLink} target="_blank" rel="noopener noreferrer">
        <button>Contactar por WhatsApp</button>
      </a>
    </div>
  );
}

export default ClassicLanding;
