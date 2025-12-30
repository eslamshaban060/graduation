// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // تحميل اليوزر من localStorage أول ما الموقع يفتح
//   useEffect(() => {
//     const storedUser = localStorage.getItem("admin");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (adminData) => {
//     localStorage.setItem("admin", JSON.stringify(adminData));
//     setUser(adminData);
//     navigate("/dashboard");
//   };

//   const logout = () => {
//     localStorage.removeItem("admin");
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // تحميل اليوزر من localStorage أول ما الموقع يفتح
  useEffect(() => {
    const storedUser = localStorage.getItem("admin");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (adminData) => {
    localStorage.setItem("admin", JSON.stringify(adminData));
    setUser(adminData);
  };

  const logout = () => {
    localStorage.removeItem("admin");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
