import React, { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJWTAuthenticationService } from "../api/AuthenticationApiService";

export const AuthContext = createContext({
  isAuthenticated: false,
  username: "in28minutes",
  setAuthenticated: (value) => {},
  login: async (username, password) => false,
  logout: () => {},
  token: null,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, settoken] = useState(null);

  // function login(username, password) {
  //   if (username === "in28minutes" && password === "dummy") {
  //     setAuthenticated(true);
  //     setUsername(username);
  //     return true;
  //   } else {
  //     setAuthenticated(false);
  //     setUsername(null);
  //     return false;
  //   }
  // }

  // async function login(username, password) {
  //   const baToken = "Basic " + window.btoa(username + ":" + password);

  //   const response = await executeBasicAuthenticationService(baToken);

  //   try {
  //     if (response.status === 200) {
  //       setAuthenticated(true);
  //       setUsername(username);
  //       settoken(baToken);

  //       apiClient.interceptors.request.use((config) => {
  //         config.headers.Authorization = baToken;
  //         return config;
  //       });

  //       return true;
  //     } else {
  //       logout();
  //       return false;
  //     }
  //   } catch {
  //     logout();
  //     return false;
  //   }
  // }

  async function login(username, password) {
    const response = await executeJWTAuthenticationService(username, password);

    try {
      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;
        setAuthenticated(true);
        setUsername(username);
        settoken(jwtToken);

        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch {
      logout();
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    settoken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider
      // @ts-ignore
      value={{
        isAuthenticated,
        setAuthenticated,
        login,
        logout,
        username,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
