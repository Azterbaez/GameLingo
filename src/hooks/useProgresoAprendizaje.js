import { useCallback, useState } from "react";

const STORAGE_KEY = "gamelingo-progreso";

function leerProgreso() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function claveEjercicio(levelId, topicId, exerciseId) {
  return `${levelId}/${topicId}/${exerciseId}`;
}

export function useProgresoAprendizaje() {
  const [progreso, setProgreso] = useState(leerProgreso);

  const guardar = useCallback((nuevo) => {
    setProgreso(nuevo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevo));
  }, []);

  const estaCompletado = useCallback(
    (levelId, topicId, exerciseId) =>
      Boolean(progreso[claveEjercicio(levelId, topicId, exerciseId)]),
    [progreso]
  );

  const marcarCompletado = useCallback(
    (levelId, topicId, exerciseId) => {
      const key = claveEjercicio(levelId, topicId, exerciseId);
      if (progreso[key]) return;
      guardar({ ...progreso, [key]: true });
    },
    [progreso, guardar]
  );

  const progresoTema = useCallback(
    (levelId, topicId, totalEjercicios) => {
      if (!totalEjercicios) return 0;
      const prefijo = `${levelId}/${topicId}/`;
      const hechos = Object.keys(progreso).filter(
        (k) => k.startsWith(prefijo) && progreso[k]
      ).length;
      return Math.round((hechos / totalEjercicios) * 100);
    },
    [progreso]
  );

  const ejerciciosCompletadosEnTema = useCallback(
    (levelId, topicId, ejercicioIds) =>
      ejercicioIds.filter((id) => estaCompletado(levelId, topicId, id)).length,
    [estaCompletado]
  );

  return {
    estaCompletado,
    marcarCompletado,
    progresoTema,
    ejerciciosCompletadosEnTema,
  };
}
