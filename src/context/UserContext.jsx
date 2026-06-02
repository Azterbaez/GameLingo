import { createContext, useContext, useMemo } from "react";
import { useUserProfile } from "../hooks/useUserProfile";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const {
    profile,
    loading,
    updateProfile,
    loadProfile,
  } = useUserProfile();

  // 🔥 MEMO para evitar renders innecesarios (IMPORTANTE PARA HEADER)
  const value = useMemo(() => {
    return {
      profile,
      loading,
      updateProfile,
      loadProfile,
    };
  }, [profile, loading]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser debe usarse dentro de UserProvider");
  }

  return context;
};