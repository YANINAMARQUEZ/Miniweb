import React, { useRef } from 'react';
import Plantilla1 from './Componentes/Generador/Plantilla1';
import ExportadorHTML from './Componentes/ExportadorHTML';
import ReactDOMServer from 'react-dom/server';

export default function VistaLanding({ formData }) {
  const plantillaRef = useRef();

  const getHTML = () => {
    const currentValues = plantillaRef.current?.getCurrentValues?.();
    if (!currentValues) return '';

    const html = ReactDOMServer.renderToStaticMarkup(
      <Plantilla1 {...currentValues} />
    );
    return html;
  };

  return (
    <>
      <Plantilla1 ref={plantillaRef} {...formData} />
      <ExportadorHTML getHTML={getHTML} formData={formData} />
    </>
  );
}
