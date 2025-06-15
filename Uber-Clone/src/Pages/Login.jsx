import React, { useState } from 'react';


export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleLogin = () => {
    if (!emailOrPhone) return alert('Enter your email or phone');
    console.log('Logging in with:', emailOrPhone);
    // Integrate with Auth0 here
  };

  return (
    <div className="login-container">
      <h2>Login to your account</h2>
      <input
        type="text"
        placeholder="Email or phone"
        value={emailOrPhone}
        onChange={(e) => setEmailOrPhone(e.target.value)}
      />
      <button className="login-btn" onClick={handleLogin}>Continue</button>

      <div className="divider">or</div>

      <button className="google-btn">Continue with Google</button>
      <div className="divider">or</div>
      <button className="apple-btn">Continue with Apple</button>

      <div className="qr-code-login">Login with QR Code</div>
    </div>
  );
}
