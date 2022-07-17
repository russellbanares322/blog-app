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
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase-config";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <CNavbar />

      <Routes>
        {user && (
          <>
            <Route path="/add" element={<AddBlog />} />
            <Route path="/edit/:id" element={<AddBlog />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
          </>
        )}

        <Route path="/" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
