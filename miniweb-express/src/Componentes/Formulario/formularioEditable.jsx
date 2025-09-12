const FormularioEditable = ({ formData, onUpdate }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ ...formData, [name]: value });
  };

  return (
    <form>
      {/* campos del formulario */}
    </form>
  );
};

export default FormularioEditable;




