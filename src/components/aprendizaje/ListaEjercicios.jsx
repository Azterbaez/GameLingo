import { BadgeDificultad, BadgeTipo } from "./BadgeMeta";
import { iconoTipoEjercicio } from "../../utils/ejercicioUtils";

const ListaEjercicios = ({ ejercicios, levelId, topicId, estaCompletado, onElegir }) => {
  return (
    <ul className="learn-exercise-list">
      {ejercicios.map((ej, indice) => {
        const hecho = estaCompletado(levelId, topicId, ej.id);
        return (
          <li key={ej.id}>
            <button
              type="button"
              className={`learn-exercise-list__item ${hecho ? "learn-exercise-list__item--done" : ""}`}
              onClick={() => onElegir(ej.id)}
            >
              <span className={`learn-exercise-list__index ${hecho ? "is-done" : ""}`}>
                {hecho ? <i className="bi bi-check-lg" /> : indice + 1}
              </span>
              <span className="learn-exercise-list__body">
                <span className="learn-exercise-list__title">{ej.titulo}</span>
                <span className="learn-exercise-list__tags">
                  <BadgeTipo tipo={ej.tipo} />
                  <BadgeDificultad dificultad={ej.dificultad} />
                </span>
              </span>
              <span className="learn-exercise-list__action" aria-hidden>
                <i className={`bi ${hecho ? "bi-arrow-repeat" : "bi-play-fill"}`} />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ListaEjercicios;
