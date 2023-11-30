// pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido al parqueadero del PJIC</h1>
      <Link to="/login">Iniciar sesión</Link>
    </div>
  );
};

export default Home;
