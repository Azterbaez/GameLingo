import { createContext, useContext, useMemo, useState } from "react";

const LearningContext = createContext(null);

export function LearningProvider({ children }) {
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [temaSeleccionado, setTemaSeleccionado] = useState(null);

  const valor = useMemo(
    () => ({
      nivelSeleccionado,
      temaSeleccionado,
      setNivelSeleccionado,
      setTemaSeleccionado,
      limpiarTema: () => setTemaSeleccionado(null),
      limpiarAprendizaje: () => {
        setNivelSeleccionado(null);
        setTemaSeleccionado(null);
      },
    }),
    [nivelSeleccionado, temaSeleccionado]
  );

  return (
    <LearningContext.Provider value={valor}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const ctx = useContext(LearningContext);
  if (!ctx) {
    throw new Error("useLearning debe usarse dentro de LearningProvider");
  }
  return ctx;
}
