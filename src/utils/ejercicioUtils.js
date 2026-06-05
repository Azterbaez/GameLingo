export const TIPOS_EJERCICIO = {
  opcion_multiple: { etiqueta: "Opción múltiple", icono: "bi-ui-checks" },
  emparejar: { etiqueta: "Emparejar", icono: "bi-shuffle" },
  completar: { etiqueta: "Completar", icono: "bi-pencil-square" },
  ordenar: { etiqueta: "Ordenar frase", icono: "bi-sort-alpha-down" },
  traduccion: { etiqueta: "Traducir", icono: "bi-translate" },
  lectura: { etiqueta: "Comprensión", icono: "bi-journal-text" },
};

export const DIFICULTAD = {
  basico: { etiqueta: "Básico", clase: "learn-badge--basico" },
  intermedio: { etiqueta: "Intermedio", clase: "learn-badge--intermedio" },
  avanzado: { etiqueta: "Avanzado", clase: "learn-badge--avanzado" },
};

export function etiquetaTipoEjercicio(tipo) {
  return TIPOS_EJERCICIO[tipo]?.etiqueta ?? tipo;
}

export function iconoTipoEjercicio(tipo) {
  return TIPOS_EJERCICIO[tipo]?.icono ?? "bi-lightning";
}

export function infoDificultad(dificultad) {
  return DIFICULTAD[dificultad] ?? DIFICULTAD.basico;
}

export function normalizarTexto(texto) {
  return texto
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s']/g, "")
    .replace(/\s+/g, " ");
}

export function normalizarFrase(frase) {
  return normalizarTexto(frase)
    .replace(/\s+\./g, ".")
    .replace(/\s+/g, " ")
    .trim();
}

export function respuestaTraduccionValida(respuesta, ejercicio) {
  const norm = normalizarFrase(respuesta);
  const validas = [
    ejercicio.respuesta,
    ...(ejercicio.respuestasAlternativas ?? []),
  ].map(normalizarFrase);
  return validas.includes(norm);
}

export function fraseOrdenadaValida(construida, ejercicio) {
  const norm = normalizarFrase(construida);
  const opciones = [
    ejercicio.fraseCorrecta,
    ...(ejercicio.fraseCorrectaAlternativa ?? []),
  ].map(normalizarFrase);
  return opciones.includes(norm);
}

export function mezclarArray(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}
