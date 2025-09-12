// src/Componentes/Plantillas/index.jsx

// 🧩 Importación individual de cada plantilla (modular y escalable)
import Plantilla1 from '../Generador/Plantilla1';
import Plantilla2 from './Plantilla2';
import Plantilla3 from './Plantilla3';
import Plantilla4 from './Plantilla4';
import Plantilla5 from './Plantilla5';
import Plantilla6 from './Plantilla6';
import Plantilla7 from './Plantilla7';
import Plantilla8 from './Plantilla8';
import Plantilla9 from './Plantilla9';
import Plantilla10 from './Plantilla10';
import Plantilla11 from './Plantilla11';

// 🎛️ Componente selector visual
import PlantillaSelector from './PlantillaSelector';
export { PlantillaSelector };

// 🗂️ Mapa centralizado de plantillas (clave institucional)
const plantillas = {
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

// 🛡️ Fallback institucional en caso de nombre inválido
export function getPlantilla(nombre = 'plantilla1') {
  return plantillas[nombre] || Plantilla1;

}

// 📦 Exportación por defecto del mapa completo
export default plantillas;
