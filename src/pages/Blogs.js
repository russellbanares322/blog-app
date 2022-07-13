import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import DeleteBlog from "./DeleteBlog";
import { useAuthState } from "react-firebase-hooks/auth";
import LikesBlog from "./LikesBlog";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [user] = useAuthState(auth);
  const [blogs, setBlogs] = useState([]);
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
      <Container>
        <Row>
          {blogs.length === 0 ? (
            <h1>No blogs added.</h1>
          ) : (
            blogs.map(
              ({
                id,
                title,
                details,
                imageUrl,
                createdAt,
                createdBy,
                userId,
                likes,
                comment,
              }) => (
                <Card
                  border="dark"
                  className="mx-3 p-3 my-3"
                  style={{ width: "20rem" }}
                  key={id}
                >
                  <Card.Img className="py-2" variant="top" src={imageUrl} />
                  <Card.Body>
                    <Col sm={12}>
                      <Row>
                        <Col sm={6}>
                          <Link to={`/blogs/${id}`}>
                            <Button variant="outline-info" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </Col>
                        <Col sm={6}>
                          {user && <LikesBlog id={id} likes={likes} />}
                        </Col>
                      </Row>
                    </Col>

                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{details}</Card.Text>
                    {createdBy && (
                      <>
                        <h6>{createdBy}</h6>
                      </>
                    )}
                    {user && user.uid === userId && (
                      <DeleteBlog id={id} imageUrl={imageUrl} />
                    )}
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <small>{createdAt.toDate().toDateString()}</small>
                  </Card.Footer>
                </Card>
              )
            )
          )}
        </Row>
      </Container>
    </>
  );
};

export default Blogs;
