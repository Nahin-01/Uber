// === Driver.jsx ===
import React, { useEffect, useState } from 'react';
import './Driver.css';

const getIconForVehicle = (type) => {
  switch (type) {
    case 'bike': return '🛵';
    case 'carx': return '🚗';
    case 'premium': return '🚘';
    default: return '🚗';
  }
};

export default function Driver({ vehicleType, onDriverDataUpdate }) {
  const [drivers, setDrivers] = useState([]);

  // Dummy fetch simulating API call
  const fetchDrivers = async () => {
    // You can replace this with real API call in production
    const allDrivers = [
      { id: 1, name: "Rafi", vehicleType: "bike", lat: 23.780573, lng: 90.416534 },
      { id: 2, name: "Nayeem", vehicleType: "carx", lat: 23.783221, lng: 90.405123 },
      { id: 3, name: "Nirob", vehicleType: "premium", lat: 23.775412, lng: 90.421789 }
    ];
    const filtered = allDrivers.filter(driver => driver.vehicleType === vehicleType);
    setDrivers(filtered);
    if (onDriverDataUpdate) onDriverDataUpdate(filtered);
  };

  useEffect(() => {
    fetchDrivers(); // initial load
    const interval = setInterval(fetchDrivers, 15000); // update every 15s
    return () => clearInterval(interval);
  }, [vehicleType]);

  return (
    <div className="driver-card-container">
      {drivers.map(driver => (
        <div key={driver.id} className="driver-card">
          <h4>{getIconForVehicle(driver.vehicleType)} {driver.name}</h4>
          <p>Lat: {driver.lat.toFixed(5)}</p>
          <p>Lng: {driver.lng.toFixed(5)}</p>
        </div>
      ))}
    </div>
  );
}
