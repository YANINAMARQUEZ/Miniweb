// src/Componentes/Util/helpers.jsx

/**
 * Genera un link de WhatsApp con mensaje predefinido
 */
export function generarLinkWhatsApp(numero, mensaje) {
  const limpio = numero.replace(/\D/g, ''); // elimina espacios y símbolos
  const texto = encodeURIComponent(mensaje);
  return `https://wa.me/${limpio}?text=${texto}`;
}

/**
 * Capitaliza la primera letra de una cadena
 */
export function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/**
 * Valida si un campo está vacío
 */
export function campoVacio(valor) {
  return !valor || valor.trim() === '';
}
