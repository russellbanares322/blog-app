import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Stack,
  Badge,
  Form,
} from "react-bootstrap";
import DeleteBlog from "./DeleteBlog";
import { useAuthState } from "react-firebase-hooks/auth";
import LikesBlog from "./LikesBlog";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [user] = useAuthState(auth);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const blogRef = collection(db, "BlogsData");
    const q = query(blogRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogs);
      console.log(blogs);
    });
  }, []);
  return (
    <>
      <Container fluid>
        {user && (
          <>
            <Col sm={12} className="pb-4">
              <Row>
                <Col sm={8}>
                  <Row>
                    <Col sm={4}>
                      <small>Sort by Price</small>
                      <Form.Select aria-label="Default select example">
                        <option>Select price</option>
                        <option value="1">1,000 - 2,500</option>
                        <option value="2">2,500 - 3,000</option>
                        <option value="3">3,500 - 4,000</option>
                      </Form.Select>
                    </Col>
                    <Col sm={4}>
                      <small>Sort by Location</small>
                      <Form.Select aria-label="Default select example">
                        <option>Select location</option>
                        <option value="1">Muntinlupa</option>
                        <option value="2">Alabang</option>
                        <option value="3">Cupang</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Col>
                <Col sm={4}>
                  <Form className="d-flex mt-4">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-info">Search</Button>
                  </Form>
                </Col>
              </Row>
            </Col>
            <hr />
          </>
        )}
        <Row className="d-flex justify-content-center">
          {blogs.length === 0 ? (
            <h1 className="text-center">No property added yet.</h1>
          ) : (
            blogs.map(
              ({
                id,
                title,
                location,
                imageUrl,
                createdAt,
                createdBy,
                userId,
                likes,
                price,
                comments,
              }) => (
                <>
                  <Card
                    border="dark"
                    className="mx-2 p-3 my-5"
                    style={{ width: "20rem" }}
                    key={id}
                  >
                    <Card.Img
                      className="py-2"
                      variant="center"
                      src={imageUrl}
                      fluid
                    />
                    <Card.Body>
                      <Col sm={12}>
                        <Row>
                          <Col sm={8}>
                            <Link to={`/blogs/${id}`}>
                              <Button variant="outline-info" size="sm">
                                View Details
                              </Button>
                            </Link>
                          </Col>
                        </Row>
                      </Col>
                      <Stack className="mt-3" direction="horizontal" gap={3}>
                        <div>
                          <p>{likes?.length} rates</p>
                        </div>
                        <div>
                          {comments && comments.length > 0 && (
                            <p>{comments?.length} comments</p>
                          )}
                        </div>
                        <div className="ms-auto">
                          {user && <LikesBlog id={id} likes={likes} />}
                        </div>
                      </Stack>

                      <hr />
                      <Card.Title className="mb-1 text-center">
                        {title}
                      </Card.Title>
                      <hr />
                      <Stack
                        className="mt-1 d-flex justify-content-center"
                        direction="horizontal"
                        gap={5}
                      >
                        <div>
                          <Card.Text>{location}</Card.Text>
                        </div>
                        <div>
                          <Card.Text>₱{price.toLocaleString()}</Card.Text>
                        </div>
                      </Stack>

                      <hr />
                      {createdBy && (
                        <>
                          <h6 className="mt-1">
                            <Badge pill bg="dark">
                              {createdBy}
                            </Badge>
                          </h6>
                        </>
                      )}

                      {user && user.uid === userId && (
                        <Stack
                          className="d-flex justify-content-center"
                          direction="horizontal"
                          gap={3}
                        >
                          <div>
                            <Button
                              className="mt-5"
                              variant="info"
                              onClick={() => navigate(`/edit/${id}`)}
                            >
                              Update
                            </Button>
                          </div>
                          <div>
                            <DeleteBlog id={id} imageUrl={imageUrl} />
                          </div>
                        </Stack>
                      )}
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      <small>{createdAt.toDate().toDateString()}</small>
                    </Card.Footer>
                  </Card>
                </>
              )
            )
          )}
        </Row>
      </Container>
    </>
  );
};

export default Blogs;
