import React from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

const ErrorPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  return (
    <Container className="text-center">
      <Alert variant="danger">
        <div className="p-5">
          <h1>
            {user
              ? "You are accessing a non existing page!"
              : "You need to login to access this page!"}
          </h1>
          <Button className="mt-5" variant="dark" onClick={() => navigate("/")}>
            Return to home
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default ErrorPage;
