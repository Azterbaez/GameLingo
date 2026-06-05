import EjercicioOpcionMultiple from "./EjercicioOpcionMultiple";

const EjercicioLectura = ({ ejercicio, onCorrecto }) => (
  <div className="learn-exercise-block">
    <div className="learn-reading-box">
      <span className="learn-reading-box__label">
        <i className="bi bi-journal-text me-1" aria-hidden />
        Texto
      </span>
      {ejercicio.contexto.split("\n").map((linea, i) => (
        <p key={i} className="learn-reading-box__line">
          {linea}
        </p>
      ))}
    </div>
    <EjercicioOpcionMultiple ejercicio={ejercicio} onCorrecto={onCorrecto} />
  </div>
);

export default EjercicioLectura;
