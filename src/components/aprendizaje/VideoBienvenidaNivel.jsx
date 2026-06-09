import gifwelcome1 from "../../assets/image/gifwelcome1.mp4";
import gifwelcome2 from "../../assets/image/gifwelcome2.mp4";

const VIDEOS_POR_SUBNIVEL = {
  1: gifwelcome1,
  2: gifwelcome2,
};

export function obtenerVideoBienvenida(subnivel) {
  return VIDEOS_POR_SUBNIVEL[Number(subnivel)] ?? null;
}

const VideoBienvenidaNivel = ({ subnivel, className = "" }) => {
  const src = obtenerVideoBienvenida(subnivel);

  if (!src) return null;

  return (
    <video
      src={src}
      className={`welcome-gif theme-image visible ${className}`.trim()}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`Video de bienvenida del nivel ${subnivel}`}
    />
  );
};

export default VideoBienvenidaNivel;
