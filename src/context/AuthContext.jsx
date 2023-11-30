// context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = (username, password) => {
    // Realizar la lógica de autenticación (puede ser un usuario fijo para este ejemplo)
    // Lógica de autenticación
    if (username === 'juan' && password === '1234') {
        setUser({username});
        setError(''); // Limpiar el mensaje de error en caso de éxito
        navigate('/parking'); // Redirigir a la ruta deseada después del login
      } else {
        setError('Usuario o contraseña equivocados.');
      }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
