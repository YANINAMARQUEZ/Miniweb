import React from 'react';
import SelectorPlantilla from '../UI/SelectorPlantilla';
import  plantillas from './index';
import './PlantillaSelector.css'; 

export default function PlantillaSelector({ value, onChange }) {
  const opciones = Object.keys(plantillas).map((key) => ({
    value: key,
    label: key.replace('plantilla', 'Plantilla '),
  }));

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>
        Seleccionar plantilla:
      </label>
      <SelectorPlantilla
        opciones={opciones}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
