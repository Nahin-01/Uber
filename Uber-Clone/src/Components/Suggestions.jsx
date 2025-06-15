import React from 'react';
import './Suggestions.css';

const suggestionData = [
  {
    title: 'Courier',
    desc: 'Uber makes same-day item delivery easier than ever.',
    img: 'pics/Courier.jpg'
  },
  {
    title: 'Intercity',
    desc: 'Get convenient, affordable outstation cabs anytime at your door.',
    img: 'pics/intercity.jpg'
  },
  {
    title: 'Moto',
    desc: 'Get affordable motorbike rides in minutes at your doorstep.',
    img: 'pics/Uber_Moto_India1.jpg'
  },
  {
    title: 'Rentals',
    desc: 'Request a trip for a block of time and make multiple stops.',
    img: 'pics/Hourly2021.jpg'
  },
  {
    title: 'Reserve',
    desc: 'Reserve your ride in advance so you can relax on the day of your trip.',
    img: 'pics/reserve_clock.jpg'
  },
  {
    title: 'Ride',
    desc: 'Go anywhere with Uber. Request a ride, hop in, and go.',
    img: 'pics/Ride.jpg'
  }
];

function Suggestions() {
  return (
    <div className="suggestions">
      <h1>Suggestions</h1>
      <div className="suggestion-grid">
        {suggestionData.map((item, index) => (
          <div className="suggestion-card" key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <button>Details</button>
            </div>
            <img src={item.img} alt={item.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;