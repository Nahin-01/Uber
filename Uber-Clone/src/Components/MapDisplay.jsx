import React, { useEffect, useRef } from 'react';
import "./MapDisplay.css"; // Assuming you have a CSS file for styling
const MapDisplay = ({ pickup, dropoff, setDistanceInfo, showDrivers, driverLocations }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const pickupMarker = useRef(null);
  const dropoffMarker = useRef(null);
  const directionsService = useRef(null);
  const directionsRenderer = useRef(null);
  const driverMarkersRef = useRef([]);

  useEffect(() => {
    if (!window.google) return;

    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 23.8103, lng: 90.4125 },
      zoom: 13,
    });

    directionsService.current = new window.google.maps.DirectionsService();
    directionsRenderer.current = new window.google.maps.DirectionsRenderer({ suppressMarkers: true });
    directionsRenderer.current.setMap(mapInstance.current);
  }, []);

  useEffect(() => {
    if (!pickup || !dropoff || !window.google) return;

    const origin = new window.google.maps.LatLng(pickup.lat, pickup.lng);
    const destination = new window.google.maps.LatLng(dropoff.lat, dropoff.lng);

    if (pickupMarker.current) pickupMarker.current.setMap(null);
    pickupMarker.current = new window.google.maps.Marker({
      position: origin,
      map: mapInstance.current,
      label: 'A',
    });

    if (dropoffMarker.current) dropoffMarker.current.setMap(null);
    dropoffMarker.current = new window.google.maps.Marker({
      position: destination,
      map: mapInstance.current,
      label: 'B',
    });

    directionsService.current.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          directionsRenderer.current.setDirections(result);
          const leg = result.routes[0].legs[0];
          const distanceKm = (leg.distance.value / 1000).toFixed(2);
          const estimatedTimeMinutes = Math.ceil(leg.duration.value / 60);
          setDistanceInfo({
            distanceKm: parseFloat(distanceKm),
            estimatedTimeMinutes,
          });
        } else {
          console.error('Directions request failed:', status);
          setDistanceInfo(null);
        }
      }
    );
  }, [pickup, dropoff]);

  useEffect(() => {
    if (!showDrivers || !window.google || !mapInstance.current) return;

    // Clear old driver markers
    driverMarkersRef.current.forEach(marker => marker.setMap(null));
    driverMarkersRef.current = [];

    // Add new driver markers
    driverLocations.forEach(driver => {
      const marker = new window.google.maps.Marker({
        position: { lat: driver.lat, lng: driver.lng },
        map: mapInstance.current,
        icon: {
          url:
            driver.vehicleType === 'bike'
              ? 'https://img.icons8.com/emoji/48/motorcycle-emoji.png'
              : driver.vehicleType === 'carx'
              ? 'https://img.icons8.com/emoji/48/automobile-emoji.png'
              : 'https://img.icons8.com/emoji/48/sport-utility-vehicle-emoji.png',
          scaledSize: new window.google.maps.Size(35, 35),
        },
        title: driver.name,
      });

      driverMarkersRef.current.push(marker);
    });
  }, [driverLocations, showDrivers]);

  return <div ref={mapRef} className="map-container" />;

};

export default MapDisplay;
