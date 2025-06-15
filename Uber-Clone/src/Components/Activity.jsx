import React from 'react';
import './Activity.css';

function Activity() {
  return (
    <div className="activity">
      <div className="activity-content">
        <h1>Log in to see your recent activity</h1>
        <p>View past trips, tailored suggestions, support resources, and more.</p>
        <button>Log in to your account</button>
        <p className="signup">Don’t have an Uber account? <a href="#">Sign up</a></p>
      </div>
    <div className="activity-image">
      <img src="pics/Airport-Fall.jpg" alt="Activity" />
    </div>
    </div>
  );
}

export default Activity;
