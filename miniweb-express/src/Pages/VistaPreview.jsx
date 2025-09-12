import { getPlantilla } from '../Plantillas';
import React, { useRef } from 'react';

const VistaPreview = ({ contenido }) => {
  const previewRef = useRef();

  return (
    <div id="preview">
  {/* Aquí se renderiza el contenido editado */}
  {contenidoEditado}
</div>

  );
};



export default function VistaPreview({ formData }) {
  const { plantilla, title, description, whatsapp, message, imagen } = formData;
  const PlantillaSeleccionada = getPlantilla(plantilla);

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '1rem',
      backgroundColor: '#fafafa',
    }}>
      <h3 style={{ marginBottom: '1rem' }}>Vista previa institucional</h3>
      <PlantillaSeleccionada
        title={title}
        description={description}
        whatsapp={whatsapp}
        message={message}
        imagen={imagen}
      />
    </div>
  );
}
