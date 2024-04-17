import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setAuthenticated: (value) => {},
  login: (username, password) => {
    return false;
  },
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  function login(username, password) {
    if (username === "in28minutes" && password === "dummy") {
      setAuthenticated(true);
      return true;
    } else {
      setAuthenticated(false);
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      // @ts-ignore
      value={{ isAuthenticated, setAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
