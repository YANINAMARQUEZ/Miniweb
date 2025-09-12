// src/Componentes/UI/InputTexto.jsx
export default function InputTexto({ label, value, onChange, name }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 'bold' }}>
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
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
