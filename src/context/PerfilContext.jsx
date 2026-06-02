import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../assets/database/supabaseconfig";

const PerfilContext = createContext();

export const usePerfil = () => useContext(PerfilContext);

export const PerfilProvider = ({ children }) => {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 CARGAR PERFIL
  const fetchPerfil = async () => {
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      setPerfil(null);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error cargando perfil:", error);
      setLoading(false);
      return;
    }

    // 🔥 NORMALIZACIÓN IMPORTANTE
    setPerfil({
      ...data,
      avatar: data.avatar_url, // 👈 SIEMPRE frontend usa "avatar"
    });

    setLoading(false);
  };

  useEffect(() => {
    fetchPerfil();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "SIGNED_IN") fetchPerfil();

        if (event === "SIGNED_OUT") {
          setPerfil(null); // 🔥 LIMPIAR TODO
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // 🔥 ACTUALIZAR PERFIL
  const updatePerfil = async (updates) => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .update({
        username: updates.username,
        bio: updates.bio,
        avatar_url: updates.avatar,
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error actualizando perfil:", error);
      return;
    }

    // 🔥 actualización inmediata UI
    setPerfil({
      ...data,
      avatar: data.avatar_url,
    });
  };

  return (
    <PerfilContext.Provider
      value={{
        perfil,
        setPerfil,
        updatePerfil,
        fetchPerfil,
        loading,
      }}
    >
      {children}
    </PerfilContext.Provider>
  );
};