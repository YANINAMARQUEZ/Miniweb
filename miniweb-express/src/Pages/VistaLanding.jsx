import React, { useRef } from 'react';
import Plantilla1 from './Componentes/Plantillas/Plantilla1';
import ExportadorHTML from './Componentes/ExportadorHTML';
import ReactDOMServer from 'react-dom/server';

export default function VistaLanding({ formData }) {
  const plantillaRef = useRef();

  const getHTML = () => {
    const currentValues = plantillaRef.current?.getCurrentValues?.();
    const mergedData = { ...formData, ...currentValues };
    const html = ReactDOMServer.renderToStaticMarkup(
      <Plantilla1 formData={mergedData} />
    );
    return html;
  };

  return (
    <>
      <Plantilla1 ref={plantillaRef} formData={formData} />
      <ExportadorHTML getHTML={getHTML} formData={formData} />
    </>
  );
}
