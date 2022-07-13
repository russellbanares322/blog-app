import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AddBlog from "./pages/AddBlog";
import Blogs from "./pages/Blogs";
import CNavbar from "./pages/CNavbar";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <Container>
      <CNavbar />

      <Routes>
        <Route path="/add" element={<AddBlog />} />
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Container>
  );
}

export default App;
