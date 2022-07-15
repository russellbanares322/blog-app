import React, { useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";
import { FaUserAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const CNavbar = ({ handleModal }) => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

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

            {!user ? (
              <>
                <Nav.Link
                  className="text-white btn btn-outline-info"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav className="me-auto">
                  <Button variant="info" onClick={handleModal} size="sm">
                    Add Blog
                  </Button>
                </Nav>
              </>
            )}

            {user && (
              <>
                <div className="d-flex">
                  <FaUserAlt className="my-3" color="white" size={20} />
                  <h6 className="text-white mx-2 mt-3">{user.displayName}</h6>
                </div>
                <Button
                  className="me-3"
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    signOut(auth);
                    toast.success("Successfully logged out!");
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default CNavbar;
