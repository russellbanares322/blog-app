import React, { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container className="mx-auto text-center d-flex justify-content-center">
      <Col sm={6}>
        <Form className="border p-5 bg-dark text-white">
          <h3 className="text-center">Create an Account</h3>
          <Form.Group className="mb-3 mt-4">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-2 mb-2" variant="info">
            Signup
          </Button>
          <br />
          <small
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            <i>Already have an account? Login.</i>
          </small>
        </Form>
      </Col>
    </Container>
  );
};

export default SignUp;
