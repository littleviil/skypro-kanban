import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    if (token) {
      setIsAuth(true);
      setUser({ token, name, email });
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setIsAuth(false);
    setUser(null);

    window.dispatchEvent(new CustomEvent("tokenChanged", { detail: { token: null } }));
  }, []);

  const login = useCallback((token, name, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    setIsAuth(true);
    setUser({ token, name, email });

    window.dispatchEvent(new CustomEvent("tokenChanged", { detail: { token } }));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        user,
        setUser,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}