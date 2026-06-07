// src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../assets/database/supabaseconfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // =========================
  // STATES
  // =========================

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // SESIÓN ACTUAL
  // =========================

  const getCurrentSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setUser(session?.user ?? null);
    setLoading(false);
  };

  // =========================
  // LISTENER AUTH
  // =========================

  useEffect(() => {
    getCurrentSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // =========================
  // REGISTRO
  // =========================

  const signUp = async (
    email,
    password,
    username
  ) => {
    try {
      const { data, error } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
            },
          },
        });

      if (error) throw error;

      // Intentar crear perfil inmediatamente
      if (data?.user) {
        const { error: profileError } =
          await supabase
            .from("profiles")
            .upsert([
              {
                id: data.user.id,
                username,
                bio: "",
                avatar_url: null,
                level: 1,
                xp: 0,
                streak_days: 0,
              },
            ]);

        if (profileError) {
          console.error(
            "Error creando perfil:",
            profileError
          );
        }
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        message:
          error.message ||
          "Error al crear la cuenta",
      };
    }
  };

  // =========================
  // LOGIN
  // =========================

  const signIn = async (
    email,
    password
  ) => {
    try {
      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) throw error;

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.message ||
          "Error al iniciar sesión",
      };
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const signOut = async () => {
    try {
      await supabase.auth.signOut();

      setUser(null);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  // =========================
  // RESET PASSWORD - SEND EMAIL
  // =========================

  const resetPasswordForEmail = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      return {
        success: true,
        message: "Se ha enviado un correo con instrucciones de recuperación",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Error al enviar correo de recuperación",
      };
    }
  };

  // =========================
  // UPDATE PASSWORD
  // =========================

  const updatePassword = async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      return {
        success: true,
        message: "Contraseña actualizada correctamente",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Error al actualizar contraseña",
      };
    }
  };

  // =========================
  // CONTEXT VALUE
  // =========================

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPasswordForEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// =========================
// CUSTOM HOOK
// =========================

export const useAuth = () => {
  return useContext(AuthContext);
};