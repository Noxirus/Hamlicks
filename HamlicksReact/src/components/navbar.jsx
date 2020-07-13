import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../Images/Hamlicks_LOGO.png";
import title from "../Images/Hamlicks_TITLE.png";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="Hamlicks" height="120" width="220" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav navCenter">
          <li className="nav-item">
            <NavLink className="nav-link" to="/flavours">
              Flavours
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          {/* This is to check if the user is logged in */}
          {!user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {user && user.isAdmin && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to={`/users`}>
                  Users
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to={`/users/${user._id}`}>
                  {user.name}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </React.Fragment>
          )}
          <li>
            <Link className="nav-link center" to="/">
              <img src={title} alt="Hamlicks" height="130" width="400" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
