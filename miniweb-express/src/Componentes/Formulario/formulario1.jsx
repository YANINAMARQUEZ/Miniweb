export default function TemplateA({ title, description, whatsapp, message }) {
  const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div style={{ border: '2px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">Contactar por WhatsApp</a>
    </div>
  );
}
