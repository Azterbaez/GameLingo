import { useEffect, useState } from "react";
import { supabase } from "../assets/database/supabaseconfig";

export const useUserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 CARGAR PERFIL
  const loadProfile = async () => {
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    let { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    // si no existe perfil
    if (error && error.code === "PGRST116") {
      const { data: newProfile } = await supabase
        .from("profiles")
        .insert([
          {
            id: user.id,
            username: user.email.split("@")[0],
            bio: "",
            avatar_url: null,
            level: 1,
            xp: 0,
          },
        ])
        .select()
        .single();

      data = newProfile;
    } else if (error) {
      console.error("Error cargando perfil:", error);
      setLoading(false);
      return;
    }

    // 🔥 NORMALIZAR
    setProfile({
      ...data,
      avatar: data.avatar_url,
    });

    setLoading(false);
  };

  // 🔥 ACTUALIZAR PERFIL
  const updateProfile = async (updates) => {
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

    // 🔥 SINCRONIZACIÓN GLOBAL INMEDIATA
    setProfile({
      ...data,
      avatar: data.avatar_url,
    });
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profile,
    setProfile,
    loading,
    loadProfile,
    updateProfile,
  };
};