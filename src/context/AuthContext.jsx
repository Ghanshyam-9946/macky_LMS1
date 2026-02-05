import { createContext, useContext, useEffect, useState } from "react";
import { admin, students, instructors } from "../data/users";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (username, password) => {
    setError("");

    if (
      admin.username === username &&
      admin.password === password
    ) {
      setUser(admin);
      localStorage.setItem("user", JSON.stringify(admin));
      return true;
    }

    const student = students.find(
      (s) =>
        s.username === username &&
        s.password === password
    );

    if (student) {
      setUser(student);
      localStorage.setItem("user", JSON.stringify(student));
      return true;
    }

    const instructor = instructors.find(
      (i) =>
        i.username === username &&
        i.password === password
    );

    if (instructor) {
      setUser(instructor);
      localStorage.setItem(
        "user",
        JSON.stringify(instructor)
      );
      return true;
    }

    setError("Invalid username or password");
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
