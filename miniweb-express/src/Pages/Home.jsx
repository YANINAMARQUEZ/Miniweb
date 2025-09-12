import React, { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import PlantillaSelector from '../Componentes/Plantillas/PlantillaSelector';
import FormularioEditable from '../Componentes/Formulario/FormularioEditable';
import LandingPreview from '../Componentes/LandingPreview';
import ExportadorHTML from '../Componentes/ExportadorHTML';
import Plantilla1 from '../Componentes/Generador/Plantilla1';
import './Home.css'; // Opcional para estilos específicos
import Plantilla1Estatica from './Componentes/Generador/Plantilla1Estatica';

const ExportadorHTML = useMemo(() => {
  return renderToStaticMarkup(<Plantilla1Estatica {...formData} />);
}, [formData]);

const Home = () => {
  const [plantilla, setPlantilla] = useState('plantilla1');

  const [formData, setFormData] = useState({
    title: 'Título institucional',
    description: 'Descripción de la organización',
    whatsapp: '',
    message: 'Hola, quiero más información sobre su landing',
    imagen: '',
  });

  const renderPlantilla = () => {
    switch (plantilla) {
      case 'plantilla1':
        return <Plantilla1 {...formData} />;
      default:
        return <div>Plantilla no encontrada</div>;
    }
  };

  const plantillaHTML = renderToStaticMarkup(renderPlantilla());

  return (
    <div className="home-container">
      <h2>Generador institucional</h2>

      <PlantillaSelector value={plantilla} onChange={setPlantilla} />

      <FormularioEditable
        formData={{ ...formData, plantilla }}
        onUpdate={setFormData}
      />

      <LandingPreview formData={{ ...formData, plantilla }} />

      <ExportadorHTML formData={formData} plantillaHTML={plantillaHTML} />
    </div>
  );
};

export default Home;
