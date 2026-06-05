import { useEffect, useState } from "react";

/**
 * Detecta vista móvil con matchMedia (React, sin librerías extra).
 * @param {number} maxAncho - ancho máximo en px para considerar "móvil"
 */
export function useEsMovil(maxAncho = 576) {
  const consulta = `(max-width: ${maxAncho - 1}px)`;

  const [esMovil, setEsMovil] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(consulta).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(consulta);
    const actualizar = (evento) => setEsMovil(evento.matches);
    setEsMovil(media.matches);
    media.addEventListener("change", actualizar);
    return () => media.removeEventListener("change", actualizar);
  }, [consulta]);

  return esMovil;
}
