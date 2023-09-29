import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/authStore";
import { deleteFromLocalStorage } from "../../helpers/helperFunctions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(
      authAction.setAuthStatus({
        userName: "",
        loggedIn: false,
        accessToken: null,
        refreshToken: null,
        userId: null,
        user_type: null,
        timeOfLogin: null,
        logInOperation: -1,
      })
    );
    deleteFromLocalStorage("loginInfo");
    navigate(`/login`);
  };

  return (
    <Navbar bg="white" className="navbarMain" expand="lg">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
          <img
            alt="Tube Master Logo"
            className="navLogo"
            src="http://tubemastercrm.com/static/img/tm_logo.png"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navRight">
            <Nav.Link to="">Users</Nav.Link>
            <Nav.Link to="">Clients</Nav.Link>
            <Nav.Link as={NavLink} to="/warehouse">
              Warehouse
            </Nav.Link>
            <Nav.Link to="">Projects</Nav.Link>
            <Nav.Link to="">Home</Nav.Link>
            <NavDropdown title="Projects" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/project/create">
                Create Project
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/projects">
                All Projects
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/change-password">
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>LogOut</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
