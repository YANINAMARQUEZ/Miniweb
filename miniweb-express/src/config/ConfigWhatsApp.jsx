import InputTexto from '../UI/InputTexto';

export default function ConfigWhatsApp({ value, onChange }) {
  return (
    <InputTexto
      label="Número de WhatsApp"
      name="whatsapp"
      value={value}
      onChange={onChange}
    />
  );
}
