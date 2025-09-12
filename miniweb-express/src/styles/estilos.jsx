// src/Componentes/Styles/estilos.jsx
import colores from './colores';

const estilos = {
  contenedor: {
    padding: '2rem',
    backgroundColor: colores.fondoClaro,
    color: colores.textoPrincipal,
    fontFamily: 'Segoe UI, sans-serif',
  },
  titulo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: colores.dorado,
    marginBottom: '1rem',
  },
  descripcion: {
    fontSize: '1.1rem',
    color: colores.textoSecundario,
    marginBottom: '1.5rem',
  },
  boton: {
    backgroundColor: colores.amarillo,
    color: colores.textoPrincipal,
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    border: `2px solid ${colores.dorado}`,
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  botonHover: {
    backgroundColor: colores.dorado,
    color: '#fff',
  },
  tarjeta: {
    border: `1px solid ${colores.plateado}`,
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: '#ffffff',
    boxShadow: `0 2px 4px ${colores.gris}`,
  },
};

export default estilos;
