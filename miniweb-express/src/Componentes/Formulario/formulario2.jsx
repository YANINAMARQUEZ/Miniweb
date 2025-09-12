export default function TemplateB({ title, description, whatsapp, message }) {
  const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div style={{ background: '#f0f0f0', padding: '2rem', borderRadius: '12px', marginTop: '1rem' }}>
      <h1 style={{ color: '#333' }}>{title}</h1>
      <p style={{ fontStyle: 'italic' }}>{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 'bold' }}>
        👉 Contactar por WhatsApp
      </a>
    </div>
  );
}
