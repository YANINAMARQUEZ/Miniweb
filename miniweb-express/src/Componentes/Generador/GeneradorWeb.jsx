import React, { useRef, useState } from 'react';
import Plantilla1 from '../components/Plantilla1';
import Plantilla1Estatica from './Componentes/Generador/Plantilla1Estatica';
import { renderToStaticMarkup } from 'react-dom/server';

import { renderToStaticMarkup } from 'react-dom/server';

const GeneradorWeb = () => {
  const plantillaRef = useRef();
  const [modoPreview, setModoPreview] = useState(false);

  const handleExportar = () => {
    const valoresActuales = plantillaRef.current?.getCurrentValues();
    if (!valoresActuales) {
      alert('No se pudieron obtener los datos editados.');
      return;
    }

    const html = renderToStaticMarkup(<Plantilla1Estatica {...valoresActuales} />);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'landing-institucional.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

}
export default GeneradorWeb;
