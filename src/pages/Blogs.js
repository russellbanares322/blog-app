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
} from "react-bootstrap";
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
                comments,
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
                    <Card.Title className="text-center mb-2">
                      {title}
                    </Card.Title>
                    <hr />
                    <Card.Text className="details_text pt-3">
                      {details}
                    </Card.Text>
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
