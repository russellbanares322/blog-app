import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Container, Form, Button, Col, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { toast } from "react-toastify";

import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("Successfully logged in!");
    } catch (error) {
      toast.error("Invalid username or password");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <InputGroup.Text
                onClick={handleShowPassword}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </InputGroup.Text>
            </InputGroup>
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
