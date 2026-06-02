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
  // OBTENER SESIÓN ACTUAL
  // =========================

  useEffect(() => {
    getCurrentSession();

    // ESCUCHAR CAMBIOS DE AUTH
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // LIMPIAR
    return () => subscription.unsubscribe();
  }, []);

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
  // REGISTRO
  // =========================

  const signUp = async (email, password, username) => {
    try {
      // REGISTRO AUTH
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // CREAR PROFILE
      if (data.user) {
  const { error: profileError } = await supabase
    .from("profiles")
    .insert([
      {
        id: data.user.id,
        username,
        level: 1,
        xp: 0,
        streak_days: 0,
        avatar_url: null,
        bio: "",
      },
    ]);

  if (profileError) throw profileError;
}

      

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
  // LOGIN
  // =========================

  const signIn = async (email, password) => {
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
        message: error.message,
      };
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const signOut = async () => {
    await supabase.auth.signOut();
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