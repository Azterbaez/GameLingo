import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  cargarProgresoRemoto,
  claveEjercicio,
  fusionarProgreso,
  guardarEjercicioRemoto,
  guardarProgresoLocal,
  leerProgresoLocal,
  subirProgresoLocal,
} from "../services/progresoAprendizaje";

const ProgresoContext = createContext(null);

export function ProgresoProvider({ children }) {
  const { user } = useAuth();
  const [progreso, setProgreso] = useState({});
  const [cargando, setCargando] = useState(true);
  const [sincronizado, setSincronizado] = useState(false);

  const userId = user?.id ?? null;

  useEffect(() => {
    let activo = true;

    async function cargar() {
      setCargando(true);
      setSincronizado(false);

      const local = leerProgresoLocal(userId);

      if (!userId) {
        if (activo) {
          setProgreso(local);
          setCargando(false);
        }
        return;
      }

      try {
        const remoto = await cargarProgresoRemoto(userId);
        await subirProgresoLocal(userId, local, remoto);
        const fusionado = fusionarProgreso(local, remoto);
        guardarProgresoLocal(userId, fusionado);
        if (activo) {
          setProgreso(fusionado);
          setSincronizado(true);
        }
      } catch (err) {
        console.warn("Progreso en modo local (Supabase no disponible):", err.message);
        if (activo) {
          setProgreso(local);
        }
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargar();
    return () => {
      activo = false;
    };
  }, [userId]);

  const persistir = useCallback(
    (nuevo) => {
      setProgreso(nuevo);
      guardarProgresoLocal(userId, nuevo);
    },
    [userId]
  );

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
      persistir(nuevo);

      if (userId) {
        try {
          await guardarEjercicioRemoto(userId, levelId, topicId, exerciseId);
          setSincronizado(true);
        } catch (err) {
          console.warn("No se pudo guardar en la nube:", err.message);
          setSincronizado(false);
        }
      }
    },
    [progreso, persistir, userId]
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

  const valor = useMemo(
    () => ({
      progreso,
      cargando,
      sincronizado,
      estaCompletado,
      marcarCompletado,
      progresoTema,
      ejerciciosCompletadosEnTema,
    }),
    [
      progreso,
      cargando,
      sincronizado,
      estaCompletado,
      marcarCompletado,
      progresoTema,
      ejerciciosCompletadosEnTema,
    ]
  );

  return (
    <ProgresoContext.Provider value={valor}>{children}</ProgresoContext.Provider>
  );
}

export function useProgresoAprendizaje() {
  const ctx = useContext(ProgresoContext);
  if (!ctx) {
    throw new Error("useProgresoAprendizaje debe usarse dentro de ProgresoProvider");
  }
  return ctx;
}
