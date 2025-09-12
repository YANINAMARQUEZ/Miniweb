// src/Componentes/Formulario/index.jsx

import Formulario1 from './formulario1';
import Formulario2 from './formulario2';
import  FormularioSelector  from './formularioSelector';

import FormularioEditable from './formularioEditable';

// Exportaciones nombradas
export { FormularioSelector, FormularioEditable };

// Objeto de formularios institucionales
const formularios = {
  formulario1: Formulario1,
  formulario2: Formulario2,
};

// Función para obtener el formulario por nombre
export function getFormulario(nombre) {
  return formularios[nombre] || Formulario1; // fallback si no se encuentra
}

// Exportación por defecto del objeto completo (opcional)
export default formularios;
