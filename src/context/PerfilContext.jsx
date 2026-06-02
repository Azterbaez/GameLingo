import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../assets/database/supabaseconfig";

const PerfilContext = createContext();

export const usePerfil = () => useContext(PerfilContext);

export const PerfilProvider = ({ children }) => {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // CARGAR O CREAR PERFIL
  // ==========================================
  const fetchPerfil = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setPerfil(null);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      // PERFIL EXISTE
      if (data) {
        setPerfil({
          ...data,
          avatar: data.avatar_url,
        });

        return;
      }

      // ERROR DISTINTO A "NO ENCONTRADO"
      if (error && error.code !== "PGRST116") {
        console.error("Error buscando perfil:", error);
        return;
      }

      // ==========================================
      // CREAR PERFIL NUEVO
      // ==========================================

      const nuevoPerfil = {
        id: user.id,
        username:
          user.user_metadata?.username ||
          user.email?.split("@")[0] ||
          "Jugador",

        bio: "",
        avatar_url: null,
        level: 1,
        xp: 0,
        streak_days: 0,
      };

      const {
        data: perfilCreado,
        error: insertError,
      } = await supabase
        .from("profiles")
        .insert([nuevoPerfil])
        .select()
        .single();

      if (insertError) {
        console.error("Error creando perfil:", insertError);
        return;
      }

      setPerfil({
        ...perfilCreado,
        avatar: perfilCreado.avatar_url,
      });

    } catch (err) {
      console.error("Error fetchPerfil:", err);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LISTENER AUTH
  // ==========================================
  useEffect(() => {
    fetchPerfil();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === "SIGNED_IN") {
          await fetchPerfil();
        }

        if (event === "SIGNED_OUT") {
          setPerfil(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ==========================================
  // ACTUALIZAR PERFIL
  // ==========================================
  const updatePerfil = async (updates) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return false;

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
        return false;
      }

      setPerfil({
        ...data,
        avatar: data.avatar_url,
      });

      return true;
    } catch (err) {
      console.error("Error updatePerfil:", err);
      return false;
    }
  };

  return (
    <PerfilContext.Provider
      value={{
        perfil,
        setPerfil,
        loading,
        fetchPerfil,
        updatePerfil,
      }}
    >
      {children}
    </PerfilContext.Provider>
  );
};

export default PerfilContext;