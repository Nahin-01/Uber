import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Pages/SignupType.css'; // Assuming you have a CSS file for styling

export default function SignupType() {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    navigate(`/signup?type=${type}`);
  };

  return (
    <div className="signup-type-container">
      <h2>Sign Up As</h2>
      <div className="signup-options">
        <button onClick={() => handleSelect('ride')}>Ride</button>
        <button onClick={() => handleSelect('drive')}>Drive & Drivers</button>
        <button onClick={() => handleSelect('business')}>Business</button>
        <button onClick={() => handleSelect('ubereats')}>Uber Eats</button>
      </div>
    </div>
  );
}
