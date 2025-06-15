import React from 'react';
import './Drive.css';

function Drive() {
  return (
    <div className="drive-image">
    <div className="drive">
        <img src="pics/earner-illustra.jpg" alt="Drive" />
        <div className="drive-content">
        <h1>Drive when you want, make what you need</h1>
        <p>Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Uber.</p>
        <button>Get started</button>
        <p className="signin">Already have an account? <a href="#">Sign in</a></p>
      </div>
    </div>
    </div>
  );
}

export default Drive;