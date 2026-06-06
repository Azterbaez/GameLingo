import { useState } from "react";
import { alternarSonidos, desbloquearAudio, sonidosActivos } from "../../utils/sonidos";

const ToggleSonidos = ({ className = "" }) => {
  const [activo, setActivo] = useState(sonidosActivos);

  const cambiar = async () => {
    await desbloquearAudio();
    const nuevo = !activo;
    alternarSonidos(nuevo);
    setActivo(nuevo);
  };

  return (
    <button
      type="button"
      className={`learn-sound-toggle ${className}`.trim()}
      onClick={cambiar}
      aria-pressed={activo}
      title={activo ? "Silenciar sonidos" : "Activar sonidos"}
    >
      <i className={`bi ${activo ? "bi-volume-up-fill" : "bi-volume-mute-fill"}`} />
      <span className="d-none d-sm-inline">{activo ? "Sonido" : "Silenciado"}</span>
    </button>
  );
};

export default ToggleSonidos;
