import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("loggedin")
  );

  const [role, setRole] = useState(
    localStorage.getItem("role")
  );

  const [user, setUser] = useState(null);

  const login = (userData, userToken) => {
    localStorage.setItem("loggedin", userToken);
    localStorage.setItem("role", userData.role);

    setToken(userToken);
    setRole(userData.role);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("role");

    setToken(null);
    setRole(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}