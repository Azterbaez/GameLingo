import { useCallback, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import * as progressService from "../services/progressService";

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
  const { user } = useAuth();
  const [progreso, setProgreso] = useState(leerProgreso);

  // Si el usuario está autenticado, sincronizar desde el servidor
  useEffect(() => {
    let mounted = true;

    async function sync() {
      const local = leerProgreso();
      if (!user) {
        // sin usuario, mantener local
        setProgreso(local);
        return;
      }

      const server = await progressService.getProgress(user.id);

      // combinar: servidor tiene prioridad, pero unir claves
      const combinado = { ...local, ...server };

      if (mounted) {
        setProgreso(combinado);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(combinado));
        } catch {}
      }
    }

    sync();

    return () => {
      mounted = false;
    };
  }, [user]);

  const guardar = useCallback((nuevo) => {
    setProgreso(nuevo);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevo));
    } catch {}
  }, []);

  const estaCompletado = useCallback(
    (levelId, topicId, exerciseId) =>
      Boolean(progreso[claveEjercicio(levelId, topicId, exerciseId)]),
    [progreso]
  );

  const marcarCompletado = useCallback(
    async (levelId, topicId, exerciseId) => {
      const key = claveEjercicio(levelId, topicId, exerciseId);
      if (progreso[key]) return;
      const nuevo = { ...progreso, [key]: true };
      guardar(nuevo);

      // si hay usuario, persistir en servidor (no bloquear UI)
      try {
        if (user) {
          await progressService.saveProgress(user.id, nuevo);
        }
      } catch (e) {
        console.error("Error guardando progreso en servidor:", e);
      }
    },
    [progreso, guardar, user]
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
