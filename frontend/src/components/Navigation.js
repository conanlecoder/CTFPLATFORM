import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";

const Navigation = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token') ? true : false);
  const [isActive, setActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true'); // Load dark mode preference

  const logOut = () => {
    localStorage.removeItem('token');
    window.location.reload(false);
  };

  const showBurger = () => {
    setActive(!isActive);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode); // Save preference
    document.body.classList.toggle('dark-mode', newDarkMode); // Apply dark mode class
  };

  // Apply dark mode on component mount
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const renderLogout = (
      <Link exact="true" className="text" to="/">
        <div className="button is-danger is-rounded" onClick={() => logOut()}>
          <strong className="has-text-dark">Log out</strong>
        </div>
      </Link>
  );

  const renderPanelAdmin = (
      <div className="mr-3">
        <Link exact="true" to="/admin" >
        <span className="button is-dark is-rounded">
          Panel Admin
        </span>
        </Link>
      </div>
  );

  useEffect(() => {
    axios({
      method: "get",
      url: "http://68.183.75.21:3000/api/user/profile",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    })
        .then((response) => {
          if (response.data.data.role === 2) {
            console.log(response.data.data.role)
            setIsAdmin(true);
          }
        })
        .catch((err) => {
          localStorage.removeItem('token');
          setIsAuth(false);
        })
  }, []);

  return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            < Logo />
          </div>
          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="true" onClick={showBurger}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={isActive ? "navbar-menu is-active" : "navbar-menu"}>
          <div className="navbar-start">
            <div className="navbar-item centered">
              <NavLink exact="true" activeclassname="active" to="/">
                Home
              </NavLink>
            </div>

            <div className="navbar-item centered">
              <NavLink exact="true" activeclassname="active" to="/challenges">
                Challenges
              </NavLink>
            </div>

            {isAdmin && (
                <div className="navbar-item centered">
                  <NavLink exact="true" activeclassname="active" to="/users">
                    Users
                  </NavLink>
                </div>
            )}

            <div className="navbar-item has-dropdown is-hoverable centered">
              <div className="navbar-link">
                More
              </div>

              <div className="navbar-dropdown">
                <div className="navbar-item">
                  <NavLink exact="true" activeclassname="active" to="/about">
                    About
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink exact="true" activeclassname="active" to="/contact">
                    Contact
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {/* Dark Mode Toggle */}
                <button className="button is-rounded" onClick={toggleDarkMode}>
                  {darkMode ? "🌙" : "☀️"}
                </button>

                {isAdmin && renderPanelAdmin}
                {!isAuth ? <Link to="/signin">
                  <div className="button is-primary is-rounded">
                    <strong className="has-text-dark">Log in</strong>
                  </div>
                </Link> : renderLogout}
              </div>
            </div>
          </div>
        </div>
      </nav >
  );
};

export default Navigation;