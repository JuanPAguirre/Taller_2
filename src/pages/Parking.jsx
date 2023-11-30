// pages/Parking.js
import React from 'react';
import { NavLink } from "react-router-dom";

const Parking = () => {
  return (
    <div>
      <h1>Menú</h1>
      <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to="/registration"
          >
            Registro de vehículo
          </NavLink>
        </li>
      <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to="/parking_lot"
          >
            Parqueadero
          </NavLink>
      </li>
      <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to="/"
          >
            Desconectarse
          </NavLink>
        </li>
    </div>
  );
};

export default Parking;
