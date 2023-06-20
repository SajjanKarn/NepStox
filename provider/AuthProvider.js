import { createContext, useEffect, useState } from "react";

// supabase ⚡
import { supabase } from "../config/supabase";

const AuthProvider = createContext();

export const AuthContext = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
  }, []);

  return (
    <AuthProvider.Provider
      value={{
        session,
        user,
        loading,
        error,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthProvider;
