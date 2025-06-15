import React, { useState } from 'react';
import '../Pages/Signup';

export default function Signup() {
  const [input, setInput] = useState('');

  const handleContinue = () => {
    if (!input) return alert('Please enter your phone number or email');
    console.log('Continue with:', input);
    // Redirect to next signup step or call API
  };

  return (
    <div className="signup-container">
      <h2>What's your phone number or email?</h2>
      <input
        type="text"
        placeholder="Phone number or email"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="continue-btn" onClick={handleContinue}>Continue</button>

      <div className="divider">or</div>

      <button className="google-btn">Continue with Google</button>

      <div className="divider">or</div>

      <button className="apple-btn">Continue with Apple</button>

      <div className="qr-code-login">Login with QR Code</div>
    </div>
  );
}
