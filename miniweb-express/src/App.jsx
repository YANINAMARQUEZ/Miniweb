// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import Mainlayout from './Componentes/Layout/MainLayout';
import PlantillaSelector from './Componentes/Plantillas/PlantillaSelector';
import FormularioEditable from './Componentes/Formulario/formularioEditable';
import LandingPreview from './Componentes/LandingPreview';

import Plantilla1 from './Componentes/Generador/Plantilla1';
import './App.css';

// 🏠 Página principal con generador institucional
function Home() {
  const [plantilla, setPlantilla] = useState('plantilla1');

  const [formData, setFormData] = useState({
    title: 'Título institucional',
    description: 'Descripción de la organización',
    whatsapp: '',
    message: 'Hola, quiero más información sobre su landing',
    imagen: '',
  });

  // Renderiza la plantilla seleccionada
  const renderPlantilla = () => {
    switch (plantilla) {
      case 'plantilla1':
        return <Plantilla1 {...formData} />;
      default:
        return <div>Plantilla no encontrada</div>;
    }
  };

  // Genera HTML estático para exportación
  const plantillaHTML = renderToStaticMarkup(renderPlantilla());

  return (
    <main className="app-container">
      <h1>MiniWeb Express · Generador institucional</h1>

      {/* Selector de plantilla */}
      <PlantillaSelector value={plantilla} onChange={setPlantilla} />

      {/* Formulario editable */}
      <FormularioEditable formData={{ ...formData, plantilla }} onUpdate={setFormData} />

      {/* Vista previa institucional */}
      <LandingPreview formData={{ ...formData, plantilla }} />

      {/* Botón de exportación HTML */}
      
    </main>
  );
}

// 📦 App con layout y rutas
function App() {
  return (
    <Router>
      <Mainlayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Rutas futuras */}
          {/* <Route path="/plantillas" element={<Plantillas />} /> */}
          {/* <Route path="/documentacion" element={<Documentacion />} /> */}
        </Routes>
      </Mainlayout>
    </Router>
  );
}

export default App;
