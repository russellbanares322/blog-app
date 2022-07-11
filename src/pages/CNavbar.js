import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CNavbar = () => {
  const navigate = useNavigate();

  return (
    <Container className="mb-5 mt-2">
      <Navbar bg="dark" expand="lg" className="p-4">
        <Container>
          <Navbar.Brand className="text-white" onClick={() => navigate("/")}>
            Blog App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="text-white" onClick={() => navigate("/")}>
                Home
              </Nav.Link>
            </Nav>
            <Button
              className="mx-2"
              variant="outline-info"
              onClick={() => navigate("/login")}
            >
              Login/Signup
            </Button>
            <Button variant="info" onClick={() => navigate("/add")}>
              Add Blog
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default CNavbar;
