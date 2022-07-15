import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AddBlog from "./pages/AddBlog";
import Blogs from "./pages/Blogs";
import CNavbar from "./pages/CNavbar";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import BlogDetails from "./pages/BlogDetails";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Container>
      <CNavbar handleModal={handleModal} />

      <AddBlog
        showModal={showModal}
        setShowModal={setShowModal}
        handleModal={handleModal}
      />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Container>
  );
}

export default App;
