// VehicleForm.jsx

import React, { useState } from 'react';
import { useParking } from '../context/ParkingContext';
import { NavLink } from 'react-router-dom';

const VehicleForm = () => {
  const { parkingLot,setParkingLot, addPlate, removePlate, registeredVehicles, setRegisteredVehicles, getAvailableCellIndex } = useParking();
  const [vehicleType, setVehicleType] = useState('car');
  const [plate, setPlate] = useState('');
  const [brand, setBrand] = useState('Seleccionar');
  const [model, setModel] = useState('Seleccionar');
  const [cylinder, setCylinder] = useState('Seleccionar');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeCedula, setEmployeeCedula] = useState('');

  const carBrandsOptions = ['Seleccionar', 'HYUNDAI', 'CHEVROLET', 'HONDA', 'FORD', 'SUBARU', 'NISSAN', 'MAZDA', 'TOYOTA'];
  const motorcycleBrandsOptions = ['Seleccionar', 'HONDA', 'YAMAHA', 'AKT', 'SUZUKI', 'BAJAJ', 'DUCATI'];
  const modelsOptions = ['Seleccionar', 'SUVs', 'Sedanes', 'Pickups', 'Electrico', 'Hibridos'];
  const cylinderOptions = ['Seleccionar', '50 CC', '125 CC', '250 CC', '300 CC', '500 CC'];

  const handleParkVehicle = () => {
    if (
      plate &&
      brand !== 'Seleccionar' &&
      (vehicleType === 'motorcycle' || (vehicleType === 'car' && model !== 'Seleccionar')) &&
      (vehicleType === 'car' || (vehicleType === 'motorcycle' && cylinder !== 'Seleccionar')) &&
      employeeName &&
      employeeCedula
    ) {
      const existingPlate = registeredVehicles.find((vehicle) => vehicle.vehicle.plate === plate);

      if (existingPlate) {
        console.error('La placa ya existe.');
        return;
      }

      addPlate(plate);

      const vehicleTypeArray = parkingLot[vehicleType + 's'] || [];
      const cellIndex = getAvailableCellIndex(vehicleTypeArray);

      if (cellIndex < vehicleTypeArray.length) {
        // Actualiza el estado del array de parkingLot directamente
        setParkingLot((prevParkingLot) => ({
          ...prevParkingLot,
          [vehicleType + 's']: [
            ...(prevParkingLot[vehicleType + 's'].slice(0, cellIndex) || []),
            {
              plate,
              brand,
              model: vehicleType === 'motorcycle' ? null : model,
              cylinder: vehicleType === 'car' ? null : cylinder,
              type: vehicleType,
            },
            ...(prevParkingLot[vehicleType + 's'].slice(cellIndex + 1) || []),
          ],
        }));

        setRegisteredVehicles((prevVehicles) => [
          ...prevVehicles,
          {
            vehicle: {
              plate,
              brand,
              model: vehicleType === 'motorcycle' ? null : model,
              cylinder: vehicleType === 'car' ? null : cylinder,
              type: vehicleType,
            },
            employee: {
              name: employeeName,
              cedula: employeeCedula,
            },
          },
        ]);
        
      } else {
        console.error(`No hay celdas disponibles para ${vehicleType}.`);
      }
      setPlate('');
      setBrand('Seleccionar');
      setModel('Seleccionar');
      setCylinder('Seleccionar');
      setEmployeeName('');
      setEmployeeCedula('');
    } else {
      console.error('Faltan datos o datos incorrectos...');
    }
  };

  

  const handleRemoveVehicle = (plate) => {
    removePlate(plate);

    setRegisteredVehicles((prevVehicles) =>
      prevVehicles.filter((vehicle) => vehicle.vehicle.plate !== plate)
    );
  };

  return (
    <div>
      <h1>Registro de vehículo</h1>
      <br />
      <input type="text" placeholder="Nombre del Empleado" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
      <input type="text" placeholder="Cédula del Empleado" value={employeeCedula} onChange={(e) => setEmployeeCedula(e.target.value)} />
      <br />
      <label>
        Tipo de Vehículo:
        <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
          <option value="car">Carro</option>
          <option value="motorcycle">Moto</option>
        </select>
      </label>
      <br />
      <input type="text" placeholder="Placa" value={plate} onChange={(e) => setPlate(e.target.value)} />
      <label>
        Marca:
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {vehicleType === 'car'
            ? carBrandsOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))
            : motorcycleBrandsOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
        </select>
      </label>
      {vehicleType === 'car' && (
        <label>
          Modelo:
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            {modelsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      )}
      {vehicleType === 'motorcycle' && (
        <label>
          Cilindraje:
          <select value={cylinder} onChange={(e) => setCylinder(e.target.value)}>
            {cylinderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      )}
      <br />
      <h1></h1>
      <button onClick={handleParkVehicle}>Registrar Vehículo</button>
      <h1></h1>
      <h2>Vehículos Registrados:</h2>
      <ul>
        {registeredVehicles.map((registration, index) => (
          <li key={index}>
            <strong>Empleado:</strong> {registration.employee.name}, <strong>Cédula:</strong> {registration.employee.cedula},{' '}
            <strong>Vehículo:</strong> <strong>Tipo:</strong> {registration.vehicle.type}, <strong>Placa:</strong> {registration.vehicle.plate}, 
            <strong>Marca:</strong> {registration.vehicle.brand}, <strong>Modelo:</strong> {registration.vehicle.model}, 
            <strong>Cilindraje:</strong> {registration.vehicle.cylinder}
            <br></br>
            
          </li>
        ))}
      </ul>
      <h1></h1>
      <li>
        <NavLink to="/parking_lot">Parqueadero</NavLink>
      </li>
      <li>
        <NavLink to="/parking">Menú</NavLink>
      </li>
    </div>
  );
};

export default VehicleForm;
