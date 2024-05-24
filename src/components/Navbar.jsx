import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Cart3 } from "react-bootstrap-icons";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { XCircle } from "react-bootstrap-icons";
import { useCart } from "../Hooks/CartContext";
import Badge from "react-bootstrap/Badge";
import { useAuth } from "../Hooks/authContext"; 
import '../styles/Navbar.css';

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { cart, addToCart , resetCart } = useCart();
  const { isLoggedIn, logout } = useAuth();

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const closeSignup = () => {
    setShowSignup(false);
  };

  const getTotal = (order) => {
    return (order || []).reduce((total, item) => {
      const { mealQuantity, addOns } = item || {};
      const { gulabJamoon = 0 } = addOns || {};
      const subtotal = gulabJamoon + mealQuantity;
      return total + subtotal;
    }, 0);
  };

  const handleLogout = () => {
    resetCart();
    logout();
  };

  const redirectPage = () => {
    window.location.href = "/";
  };

  const openSignupFromLogin = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const openLoginFromSignup = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <Link className="navbar-logo" to="/" onMouseEnter={(e) => (e.target.style.color = "red")} onMouseLeave={(e) => (e.target.style.color = "white")}>
            CaterOrange
          </Link>
          <Link className="navbar-home-link" to="/" onMouseEnter={(e) => (e.target.style.color = "red")} onMouseLeave={(e) => (e.target.style.color = "white")}>
            HOME
          </Link>
        </div>
        <div className="navbar-right">
          <div className="navbar-cart">
            <Link to="/cart" style={{textDecoration: "none", position: "relative"}}>
              <Cart3 className="navbar-cart-icon" />
              {
                <Badge pill bg="danger" className="navbar-cart-badge">
                  {getTotal(cart)}
                </Badge>
              }
            </Link>
          </div>
          {isLoggedIn ? (
            <Link onClick={handleLogout} className="navbar-logout" onMouseEnter={(e) => (e.target.style.color = "red")} onMouseLeave={(e) => (e.target.style.color = "white")}>
              Logout
            </Link>
          ) : (
            <div className="navbar-auth">
              <Link onClick={toggleLogin} className="navbar-login" onMouseEnter={(e) => (e.target.style.color = "red")} onMouseLeave={(e) => (e.target.style.color = "white")}>
                Login
              </Link>
              &nbsp;/&nbsp;
              <Link onClick={toggleSignup} className="navbar-register" onMouseEnter={(e) => (e.target.style.color = "red")} onMouseLeave={(e) => (e.target.style.color = "white")}>
                Register
              </Link>
            </div>
          )}
          <button onClick={redirectPage} className="navbar-order-button">
            Order Now
          </button>
        </div>
      </div>
      {showLogin && (
        <div className="login-overlay">
          <div>
            <XCircle onClick={closeLogin} className="login-overlay-close" />
          </div>
          <div className="login-overlay-content">
            <LoginScreen openSignup={openSignupFromLogin} />
          </div>
        </div>
      )}
      {showSignup && (
        <div className="login-overlay">
          <div>
            <XCircle onClick={closeSignup} className="login-overlay-close" />
          </div>
          <div className="login-overlay-content">
            <SignupScreen openLogin={openLoginFromSignup} />
          </div>
        </div>
      )}
    </>
  );
}
