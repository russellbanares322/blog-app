import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import AddBlog from "./pages/AddBlog";
import Blogs from "./pages/Blogs";

function App() {
  return (
    <div>
      <Container>
        <Row>
          <Col className="my-5" sm={8}>
            <Blogs />
          </Col>
          <Col className="my-5" sm={4}>
            <AddBlog />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
