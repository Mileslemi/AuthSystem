import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";

const NavigationBar = ({ logout, isAuthenticated }) => {
  const guestLinks = () => (
    <>
      <Link to={"/login"} className="nav-link">
        Login
      </Link>
      <Link to={"/signup"} className="nav-link">
        Sign Up
      </Link>
    </>
  );

  const authenticatedLink = () => (
    <>
      <Link to={"/"} onClick={logout} className="nav-link">
        Logout
      </Link>
    </>
  );

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Authentication</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
            {isAuthenticated ? authenticatedLink() : guestLinks()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(NavigationBar);
