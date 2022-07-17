import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";
import { FaUserAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const CNavbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  return (
    <Container fluid className="mb-5">
      <Navbar bg="transparent" expand="lg" className="p-4">
        <Navbar.Brand className="text-dark" onClick={() => navigate("/")}>
          Property Finder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-dark" onClick={() => navigate("/")}>
              Home
            </Nav.Link>
            <Nav.Link className="text-dark" onClick={() => navigate("/")}>
              About
            </Nav.Link>
          </Nav>

          {!user ? (
            <>
              <Nav.Link
                className=" text-dark btn btn-outline-info"
                onClick={() => navigate("/login")}
              >
                Login
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav className="me-auto ">
                <Button
                  className="text-dark"
                  variant="outline-info"
                  onClick={() => navigate("/add")}
                  size="sm"
                >
                  Add Property
                </Button>
              </Nav>
            </>
          )}

          {user && (
            <>
              <div className="d-flex">
                <FaUserAlt className="my-3" size={20} />
                <h6 className="mx-2 mt-3">{user.displayName}</h6>
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
      </Navbar>
    </Container>
  );
};

export default CNavbar;
