export const generarHTML = (valores) => {
  const escape = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escape(valores.title)}</title>
  <style>
    body { font-family: sans-serif; margin: 0; padding: 0; }
    section { padding: 2rem; background-image: url('${escape(valores.fondo)}'); background-size: cover; }
    header { background-color: ${escape(valores.colorPrimario)}; color: #fff; padding: 1rem; }
    footer { background-color: ${escape(valores.colorSecundario)}; color: #fff; padding: 1rem; }
    a.boton { background: ${escape(valores.colorPrimario)}; color: #fff; padding: 0.5rem 1rem; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 1rem; }
  </style>
</head>
<body>
  <section>
    <header><h1>${escape(valores.headerTexto)}</h1></header>
    <main>
      <h2>${escape(valores.title)}</h2>
      <p>${escape(valores.description)}</p>
      ${valores.imagen ? `<img src="${escape(valores.imagen)}" style="max-width:100%;" />` : ''}
      <h3>Servicios</h3>
      <ul>${valores.servicios.map(s => `<li>${escape(s)}</li>`).join('')}</ul>
      <h3>Contacto</h3>
      <p>${escape(valores.message)}</p>
      ${valores.whatsapp ? `<a class="boton" href="https://wa.me/${escape(valores.whatsapp)}">Contactar por WhatsApp</a>` : ''}
    </main>
    <footer>${escape(valores.footerTexto)}</footer>
  </section>
</body>
</html>
  `;
};
