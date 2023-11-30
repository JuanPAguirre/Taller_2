// parkingLot
import React from 'react';
import { useParking } from '../context/ParkingContext';
import { NavLink } from 'react-router-dom';
import styles from './ParkingLot.module.css';

const ParkingLot = () => {
  const { parkingLot, getAvailableCellIndex, removePlate, setRegisteredVehicles } = useParking();

  const handleRemoveVehicle = (type, index) => {
    // Llamar a la función para eliminar el vehículo
    const plateToRemove = parkingLot[type][index].plate;

    removePlate(plateToRemove);

    setRegisteredVehicles((prevVehicles) =>
      prevVehicles.filter((vehicle) => vehicle.vehicle.plate !== plateToRemove)
    );
  };

  const getCellState = (type, index) => {
    if (!parkingLot) {
      return 'unknown';
    }

    const cell = parkingLot[type][index];
    return cell ? 'occupied' : 'empty';
  };

  return (
    <div>
      <h1>Parqueadero</h1>
      <div className={styles.parkingLotContainer}>
        <div className={styles.row}>
          <h2>Carros</h2>
          {parkingLot.cars.map((cell, index) => (
            <div key={index} className={styles.cell + ' ' + styles[getCellState('cars', index)]}>
              {cell && (
                <div>
                  <p>Placa: {cell.plate}</p>
                  {cell.cylinder && <p>Cylinder: {cell.cylinder}</p>}
                  <button onClick={() => handleRemoveVehicle('cars', index)}>Retirar Vehículo</button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.row}>
          <h2>Motos</h2>
          {parkingLot.motorcycles.map((cell, index) => (
            <div key={index} className={styles.cell + ' ' + styles[getCellState('motorcycles', index)]}>
              {cell && (
                <div>
                  <p>Placa: {cell.plate}</p>
                  <button onClick={() => handleRemoveVehicle('motorcycles', index)}>Retirar Vehículo</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <li>
        <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to="/registration">
          Registro de vehículo
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to="/parking">
          Menú
        </NavLink>
      </li>
    </div>
  );
};

export default ParkingLot;
