export const LEARN_BASE = "/curso";

export const LEARN_ROUTES = {
  curso: `${LEARN_BASE}`,
  cursos: `${LEARN_BASE}`,
  niveles: `${LEARN_BASE}`,
  nivel: (levelId) => `${LEARN_BASE}/${levelId}`,
  subnivel: (levelId, subnivel) => `${LEARN_BASE}/${levelId}/${subnivel}`,
  temas: (levelId, subnivel = 1) =>
    `${LEARN_BASE}/${levelId}/${subnivel}`,
  actividades: (levelId, subnivel, topicId) =>
    `${LEARN_BASE}/${levelId}/${subnivel}/temas/${topicId}/actividades`,
  jugar: (levelId, subnivel, topicId, activityId) =>
    `${LEARN_BASE}/${levelId}/${subnivel}/temas/${topicId}/jugar/${activityId}`,
};

export const SUBHEADER_PASOS = [
  { id: "curso", etiqueta: "Curso" },
  { id: "niveles", etiqueta: "Niveles" },
  { id: "temas", etiqueta: "Temas" },
  { id: "actividades", etiqueta: "Actividades" },
];
