import React, { useState, useEffect, useRef } from 'react';
import '../Components/HeroSection.css';
import MapDisplay from './MapDisplay';
import Driver from './Driver/Driver';
import { useAuth0 } from '@auth0/auth0-react';

export default function HeroSection() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('Now');

  const [distanceInfo, setDistanceInfo] = useState(null);
  const [showPrices, setShowPrices] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showDrivers, setShowDrivers] = useState(false);
  const [driverLocations, setDriverLocations] = useState([]);

  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('tripData');
    if (stored) {
      const { pickup, dropoff, date, time } = JSON.parse(stored);
      setPickup(pickup);
      setDropoff(dropoff);
      setDate(date);
      setTime(time);
    } else {
      // Clear state if no stored data (e.g. after logout)
      setPickup(null);
      setDropoff(null);
      setDate('');
      setTime('Now');
    }
  }, []);

  // Save to localStorage on state changes
  useEffect(() => {
    if (pickup || dropoff || date || time) {
      localStorage.setItem('tripData', JSON.stringify({ pickup, dropoff, date, time }));
    }
  }, [pickup, dropoff, date, time]);

  useEffect(() => {
    if (!window.google || !pickupRef.current) return;
    const autocompletePickup = new window.google.maps.places.Autocomplete(pickupRef.current);
    autocompletePickup.addListener('place_changed', () => {
      const place = autocompletePickup.getPlace();
      if (place.geometry) {
        setPickup({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), address: place.formatted_address });
      }
    });
    return () => window.google.maps.event.clearInstanceListeners(autocompletePickup);
  }, []);

  useEffect(() => {
    if (!window.google || !dropoffRef.current) return;
    const autocompleteDropoff = new window.google.maps.places.Autocomplete(dropoffRef.current);
    autocompleteDropoff.addListener('place_changed', () => {
      const place = autocompleteDropoff.getPlace();
      if (place.geometry) {
        setDropoff({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), address: place.formatted_address });
      }
    });
    return () => window.google.maps.event.clearInstanceListeners(autocompleteDropoff);
  }, []);

  const handlePricesClick = () => {
    if (!isAuthenticated) {
      alert('Please log in first to see prices.');
      loginWithRedirect({ appState: { returnTo: window.location.pathname } });
    } else {
      setShowPrices(true);
    }
  };

  const handleMotoClick = () => {
    if (!selectedVehicle) {
      alert('Please select a vehicle option.');
      return;
    }
    setShowDrivers(true);
  };

  const vehicles = [
    { id: 'bike', label: '🛵 Bike', base: 5, perKm: 5, perMin: 5 },
    { id: 'carx', label: '🚗 Car X', base: 15, perKm: 15, perMin: 8 },
    { id: 'premium', label: '🚘 Premium', base: 25, perKm: 20, perMin: 12 },
  ];

  return (
    <div className="hero-map-container">
      <div className="hero-left">
        <h1>Go Anywhere With My_Ride</h1>
        <div className="hero-inputs">
          <input
            ref={pickupRef}
            placeholder="Pickup Location"
            type="text"
            autoComplete="off"
            defaultValue={pickup?.address || ''}
          />
          <input
            ref={dropoffRef}
            placeholder="Dropoff Location"
            type="text"
            autoComplete="off"
            defaultValue={dropoff?.address || ''}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option>Now</option>
            {generateTimeOptions()}
          </select>
        </div>

        {distanceInfo && (
          <div className="distance-summary">
            <p><strong>Distance:</strong> {distanceInfo.distanceKm} km</p>
            <p><strong>Estimated Time:</strong> {distanceInfo.estimatedTimeMinutes} min</p>
          </div>
        )}

        <div className="hero-actions">
          <button onClick={handlePricesClick}>See Prices</button>
        </div>

        {showPrices && distanceInfo && (
          <>
            <div className="vehicle-cards">
              {vehicles.map(vehicle => {
                const price = (
                  vehicle.base +
                  vehicle.perKm * distanceInfo.distanceKm +
                  vehicle.perMin * distanceInfo.estimatedTimeMinutes
                ).toFixed(2);
                return (
                  <div
                    key={vehicle.id}
                    className={`vehicle-card ${selectedVehicle === vehicle.id ? 'selected' : ''}`}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <h4>{vehicle.label}</h4>
                    <p><strong>Price:</strong> {price} ৳</p>
                  </div>
                );
              })}
            </div>
            <div className="moto">
              <button onClick={handleMotoClick}>Choose Moto</button>
            </div>
          </>
        )}
      </div>

      <div className="hero-map">
        <MapDisplay
          pickup={pickup}
          dropoff={dropoff}
          setDistanceInfo={setDistanceInfo}
          selectedVehicle={selectedVehicle}
          showDrivers={showDrivers}
          driverLocations={driverLocations}
        />
        {showDrivers && selectedVehicle && (
          <Driver vehicleType={selectedVehicle} onDriverDataUpdate={setDriverLocations} />
        )}
      </div>
    </div>
  );
}

function generateTimeOptions() {
  const times = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  for (let i = 0; i < 96; i++) {
    const h = start.getHours();
    const m = start.getMinutes();
    const timeStr = `${(h % 12) || 12}:${m.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
    times.push(<option key={i} value={timeStr}>{timeStr}</option>);
    start.setMinutes(start.getMinutes() + 15);
  }
  return times;
}
