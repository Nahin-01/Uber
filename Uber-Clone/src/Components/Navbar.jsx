// Navbar.jsx
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

export default function Navbar({ showFull = true }) {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('tripData');
    logout({ returnTo: window.location.origin });
    window.location.reload();
  };

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="left">
          <Link to="/" className="logo">Home</Link>
          <div className="hamburger" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          {showFull && (
            <div className={`menu ${menuOpen ? 'open' : ''}`}>
              <Link to="/">Ride</Link>
              <Link to="/">Drive</Link>
              <Link to="/">Business</Link>
              <Link to="/">Uber Eats</Link>

              <div className="dropdown">
                <span className="dropdown-toggle">About</span>
                <div className="dropdown-content">
                  <Link to="#">About Us</Link>
                  <Link to="#">Our Offerings</Link>
                  <Link to="#">Blog</Link>
                  <div className="nested-dropdown">
                    <span className="nested-toggle">Explore ▸</span>
                    <div className="nested-content">
                      <Link to="#">Explore around Dhaka</Link>
                      <Link to="#">Explore around Rajshahi</Link>
                      <Link to="#">Explore around Khulna</Link>
                      <Link to="#">Explore around Chittagong</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {showFull && (
          <div className="right">
            {!isAuthenticated ? (
              <>
                <button className="login-btn" onClick={() => loginWithRedirect()}>
                  Log In
                </button>

                <div className="signup-dropdown">
                  <button className="signup-btn" onClick={() => loginWithRedirect()}>
                    Sign Up
                  </button>
                  <div className="signup-content">
                    <button onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>Ride</button>
                    <button onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>Drive & Drivers</button>
                    <button onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>Business</button>
                    <button onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>Uber Eats</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className="user-info">Welcome, {user.name || user.email}</span>
                <button className="logout-btn" onClick={handleLogout}>Log Out</button>
              </>
            )}
            <button>EN</button>
            <button>Help</button>
          </div>
        )}
      </nav>

      {/* Overlay */}
      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </>
  );
}
