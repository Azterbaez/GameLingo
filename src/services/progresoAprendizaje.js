import { supabase } from "../assets/database/supabaseconfig";

const STORAGE_PREFIX = "gamelingo-progreso";

export function claveEjercicio(levelId, topicId, exerciseId) {
  return `${levelId}/${topicId}/${exerciseId}`;
}

function storageKey(userId) {
  return userId ? `${STORAGE_PREFIX}-${userId}` : STORAGE_PREFIX;
}

export function leerProgresoLocal(userId) {
  try {
    const clave = storageKey(userId);
    let raw = localStorage.getItem(clave);

    if (!raw && userId) {
      const legacy = localStorage.getItem(STORAGE_PREFIX);
      if (legacy) {
        raw = legacy;
        localStorage.setItem(clave, legacy);
        localStorage.removeItem(STORAGE_PREFIX);
      }
    }

    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function guardarProgresoLocal(userId, progreso) {
  localStorage.setItem(storageKey(userId), JSON.stringify(progreso));
}

export async function cargarProgresoRemoto(userId) {
  const { data, error } = await supabase
    .from("learning_progress")
    .select("level_id, topic_id, exercise_id")
    .eq("user_id", userId);

  if (error) throw error;

  const mapa = {};
  for (const fila of data ?? []) {
    mapa[claveEjercicio(fila.level_id, fila.topic_id, fila.exercise_id)] = true;
  }
  return mapa;
}

export async function guardarEjercicioRemoto(userId, levelId, topicId, exerciseId) {
  const { error } = await supabase.from("learning_progress").upsert(
    {
      user_id: userId,
      level_id: levelId,
      topic_id: topicId,
      exercise_id: exerciseId,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,level_id,topic_id,exercise_id" }
  );

  if (error) throw error;
}

export async function subirProgresoLocal(userId, progresoLocal, progresoRemoto) {
  const pendientes = Object.keys(progresoLocal).filter(
    (k) => progresoLocal[k] && !progresoRemoto[k]
  );

  if (pendientes.length === 0) return;

  const filas = pendientes.map((key) => {
    const [level_id, topic_id, exercise_id] = key.split("/");
    return {
      user_id: userId,
      level_id,
      topic_id,
      exercise_id,
      completed_at: new Date().toISOString(),
    };
  });

  const { error } = await supabase
    .from("learning_progress")
    .upsert(filas, { onConflict: "user_id,level_id,topic_id,exercise_id" });

  if (error) throw error;
}

export function fusionarProgreso(...mapas) {
  return mapas.reduce((acc, mapa) => ({ ...acc, ...mapa }), {});
}
