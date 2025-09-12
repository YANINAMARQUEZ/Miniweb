import InputTexto from '../UI/InputTexto';

export default function ConfigDescripcion({ value, onChange }) {
  return (
    <InputTexto
      label="Descripción institucional"
      name="description"
      value={value}
      onChange={onChange}
    />
  );
}
