export const APP_NAME = "GameLingo";
export const APP_SHORT_NAME = "GameLingo";
export const APP_DESCRIPTION = "Aprende inglés jugando con cursos y ejercicios interactivos.";

export function tituloPagina(seccion) {
  return seccion ? `${seccion} · ${APP_NAME}` : APP_NAME;
}
