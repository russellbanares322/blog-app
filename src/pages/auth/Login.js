import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("Successfully logged in!");
    } catch (error) {
      toast.error("Failed to login");
    }
  };

  return (
    <Container className="mx-auto text-center d-flex justify-content-center">
      <Col sm={6}>
        <Form className="border p-5 bg-dark text-white">
          <h3 className="text-center">User Login</h3>

          <Form.Group className="mb-3 mt-4">
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
          <Button className="mt-2 mb-2" variant="info" onClick={handleLogIn}>
            Login
          </Button>
          <br />
          <small
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            <i>Don't have an account ? Create one.</i>
          </small>
        </Form>
      </Col>
    </Container>
  );
};

export default Login;
