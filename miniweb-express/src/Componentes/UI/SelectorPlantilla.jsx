import React from 'react';

export default function SelectorPlantilla({ opciones, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)} // ✅ Usamos onChange correctamente
      style={{
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      {opciones.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
