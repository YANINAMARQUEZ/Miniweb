import React from 'react';
import Plantilla1 from './Generador/Plantilla1';
import Plantilla2 from './Plantillas/Plantilla2';
import Plantilla3 from './Plantillas/Plantilla3';
import Plantilla4 from './Plantillas/Plantilla4';
import Plantilla5 from './Plantillas/Plantilla5';
import Plantilla6 from './Plantillas/Plantilla6';
import Plantilla7 from './Plantillas/Plantilla7';
import Plantilla8 from './Plantillas/Plantilla8';
import Plantilla9 from './Plantillas/Plantilla9';
import Plantilla10 from './Plantillas/Plantilla10';
import Plantilla11 from './Plantillas/Plantilla11';
import './LandingPreview.css';

// 🧠 Mapeo institucional de plantillas
const plantillasMap = {
  plantilla1: Plantilla1,
  plantilla2: Plantilla2,
  plantilla3: Plantilla3,
  plantilla4: Plantilla4,
  plantilla5: Plantilla5,
  plantilla6: Plantilla6,
  plantilla7: Plantilla7,
  plantilla8: Plantilla8,
  plantilla9: Plantilla9,
  plantilla10: Plantilla10,
  plantilla11: Plantilla11,
};

export default function LandingPreview({ formData }) {
  const { plantilla } = formData;
  const PlantillaComponent = plantillasMap[plantilla];

  return (
    <section className="landing-preview">
      <h2>Vista previa institucional</h2>
      {PlantillaComponent ? (
        <PlantillaComponent {...formData} />
      ) : (
        <div>Plantilla no encontrada</div>
      )}
    </section>
  );
}
