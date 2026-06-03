export const LEARN_BASE = "/aprender";

export const LEARN_ROUTES = {
  niveles: `${LEARN_BASE}/niveles`,
  temas: (levelId) => `${LEARN_BASE}/niveles/${levelId}/temas`,
  actividades: (levelId, topicId) =>
    `${LEARN_BASE}/niveles/${levelId}/temas/${topicId}/actividades`,
  jugar: (levelId, topicId, activityId) =>
    `${LEARN_BASE}/niveles/${levelId}/temas/${topicId}/jugar/${activityId}`,
};

export const SUBHEADER_PASOS = [
  { id: "niveles", etiqueta: "Niveles" },
  { id: "temas", etiqueta: "Temas" },
  { id: "actividades", etiqueta: "Actividades" },
];
