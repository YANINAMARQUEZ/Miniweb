import SelectorPlantilla from '../UI/SelectorPlantilla';

export default function ConfigPlantilla({ value, onChange }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
        Selección de plantilla
      </label>
      <SelectorPlantilla seleccionada={value} onSelect={onChange} />
    </div>
  );
}
