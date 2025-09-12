export default function ConfigImagen({ value, onChange }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>
        URL de imagen institucional
      </label>
      <input
        type="text"
        name="imagen"
        value={value}
        onChange={onChange}
        placeholder="https://ejemplo.com/logo.png"
        style={{
          width: '100%',
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
}
