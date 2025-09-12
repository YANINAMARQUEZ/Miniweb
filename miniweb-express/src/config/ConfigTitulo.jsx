import InputTexto from '../UI/InputTexto';

export default function ConfigTitulo({ value, onChange }) {
  return (
    <InputTexto
      label="Título institucional"
      name="title"
      value={value}
      onChange={onChange}
    />
  );
}
