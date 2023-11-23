import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Realiza las validaciones aquí
    if (username.trim() === '' || password.trim() === '') {
      setError('Por favor ingrese usuario y contraseña.');
      return;
    }

    // Lógica de autenticación
    if (username === 'juan' && password === '1234') {
        onLogin(username);
      } else {
        setError('Usuario o contraseña incorrectos.');
      }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
