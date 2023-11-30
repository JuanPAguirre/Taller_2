// ParkingContext.jsx
import React, { createContext, useContext, useReducer, useState } from 'react';

const ParkingContext = createContext();

const getAvailableCellIndex = (vehicleArray) => {
  if (!vehicleArray) {
    console.error('Array de vehículos no definido.');
    return -1;
  }

  const firstAvailableCellIndex = vehicleArray.findIndex((cell) => cell === null);

  if (firstAvailableCellIndex !== -1) {
    return firstAvailableCellIndex;
  } else {
    return vehicleArray.length;
  }
};

const ParkingProvider = ({ children }) => {
  const initialParkingLot = {
    cars: Array(5).fill(null),
    motorcycles: Array(5).fill(null),
  };

  const parkingReducer = (state, action) => {
    switch (action.type) {
      case 'PARK_VEHICLE':
        const vehicleType = action.vehicleType;
        const vehicleArray = state[vehicleType] || [];
        const cellIndex = getAvailableCellIndex(vehicleArray);

        if (cellIndex !== -1) {
          const updatedState = {
            ...state,
            [vehicleType]: [
              ...(state[vehicleType]?.slice(0, cellIndex) || []),
              action.vehicle,
              ...(state[vehicleType]?.slice(cellIndex + 1) || []),
            ],
          };
          return updatedState;
        } else {
          console.error(`No hay celdas disponibles para ${vehicleType}.`);
          return state;
        }
      case 'REMOVE_VEHICLE':
        if (state[action.vehicleType]) {
          return {
            ...state,
            [action.vehicleType]: [
              ...(state[action.vehicleType]?.slice(0, action.cellIndex) || []),
              null,
              ...(state[action.vehicleType]?.slice(action.cellIndex + 1) || []),
            ],
          };
        } else {
          console.error(`Tipo de vehículo desconocido: ${action.vehicleType}.`);
          return state;
        }
      default:
        return state;
    }
  };
  const { dispatch } = useReducer(parkingReducer, initialParkingLot);

  const removeVehicle = (type, cellIndex) => {
    dispatch({
      type: 'REMOVE_VEHICLE',
      vehicleType: type,
      cellIndex: cellIndex,
    });
  };

  const [parkingLot, setParkingLot] = useState(initialParkingLot);
  const [registeredVehicles, setRegisteredVehicles] = useState([]);

  const parkVehicle = ({ type, plate, brand, model, cylinder }) => {
    const vehicle = { type, plate, brand, model, cylinder };
    const vehicleType = type + 's';
    const vehicleArray = parkingLot[vehicleType] || [];
    const cellIndex = getAvailableCellIndex(vehicleArray);

    if (cellIndex < vehicleArray.length) {
      const updatedParkingLot = {
        ...parkingLot,
        [vehicleType]: [
          ...(parkingLot[vehicleType]?.slice(0, cellIndex) || []),
          vehicle,
          ...(parkingLot[vehicleType]?.slice(cellIndex + 1) || []),
        ],
      };

      setParkingLot(updatedParkingLot);

      setRegisteredVehicles((prevVehicles) => [
        ...prevVehicles,
        {
          vehicle,
        },
      ]);
    } else {
      console.error(`No hay celdas disponibles para ${vehicleType}.`);
    }
  };

  const initialEmployees = [];

  const employeeReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_EMPLOYEE':
        const existingEmployee = state.find((employee) => employee.cedula === action.employee.cedula);

        if (existingEmployee) {
          console.error('La cédula del empleado ya existe.');
          return state;
        }

        return [...state, action.employee];

      default:
        return state;
    }
  };

  const initialPlates = [];

  const plateReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_PLATE':
        const existingPlate = state.find((plate) => plate === action.plate);

        if (existingPlate) {
          console.error('La placa ya existe.');
          return state;
        }

        return [...state, action.plate];

      case 'REMOVE_PLATE':
        return state.filter((plate) => plate !== action.plate);

      default:
        return state;
    }
  };

  const [plates, setPlates] = useReducer(plateReducer, initialPlates);
  const [employees, setEmployees] = useReducer(employeeReducer, initialEmployees);

  const addEmployee = (employee) => {
    setEmployees({ type: 'ADD_EMPLOYEE', employee });
  };

  const addPlate = (plate) => {
    setPlates({ type: 'ADD_PLATE', plate });
  };

  const removePlate = (plate) => {
    setPlates({
      type: 'REMOVE_PLATE',
      plate,
    });
  };

  return (
    <ParkingContext.Provider
      value={{ parkingLot,setParkingLot, parkVehicle, addPlate, removePlate, registeredVehicles, setRegisteredVehicles,getAvailableCellIndex,removeVehicle }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

const useParking = () => {
  const context = useContext(ParkingContext);
  if (!context) {
    throw new Error('useParking debe ser utilizado dentro de un ParkingProvider');
  }
  return context;
};

export { ParkingProvider, useParking };

//--------------------------------------

