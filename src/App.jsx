/*import React, { useState } from 'react';
import Login from './components/Login';
import ParkingEntry from './components/ParkingEntry';
import ParkingExit from './components/ParkingExit';
import ParkingStatus from './components/ParkingStatus';
import VehicleRegistration from './components/VehicelRegistration';
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {
    // Lógica de autenticación (puedes implementarla más adelante)
    setLoggedInUser(username);
  };

  return (
    <div>
      <h1>Parqueadero App</h1>
      {loggedInUser ? (
        <>
          <VehicleRegistration />
          <ParkingEntry />
          <ParkingExit />
          <ParkingStatus />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;*/

// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ParkingProvider } from './context/ParkingContext';
import Home from './pages/Home';
import Login from './components/Login';
import Parking from './pages/Parking';
import NotFound from './pages/NotFound';
import ParkingLot from './components/ParkingLot';
import VehicleForm from './components/VehicleForm';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ParkingProvider>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/parking" element={<Parking/>} />
            <Route path="/registration" element={<VehicleForm/>} />
            <Route path="/parking_lot" element={<ParkingLot/>} />
            <Route element={NotFound} />
          </Routes>
        </ParkingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

