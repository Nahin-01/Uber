// Example inside DriverPanel.jsx
useEffect(() => {
  const sendLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetch('https://your-api.com/api/update-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driverId: 1, // dynamic per driver
          lat: latitude,
          lng: longitude
        })
      });
    });
  };

  sendLocation(); // initial
  const interval = setInterval(sendLocation, 15000); // every 15 seconds
  return () => clearInterval(interval);
}, []);
