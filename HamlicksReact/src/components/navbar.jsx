import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import title from "../images/Hamlicks_TITLE.png";

const NavBar = ({ user }) => {
  return (
    <Navbar bg="dark" expand="lg">
      <Link className="navbar-brand" to="/">
        <img src={title} alt="Hamlicks" height="100" width="350" />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavLink className="nav-link" to="/flavours">
            Flavours
          </NavLink>
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
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
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
