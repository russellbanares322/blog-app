import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase-config";
import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row } from "react-bootstrap";
import DeleteBlog from "./DeleteBlog";
const Blogs = () => {
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
            blogs.map(({ id, title, details, imageUrl, createdAt }) => (
              <Card
                border="dark"
                className="mx-3 p-3 my-3"
                style={{ width: "20rem" }}
                key={id}
              >
                <Card.Img className="py-2" variant="center" src={imageUrl} />
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>{details}</Card.Text>
                  <DeleteBlog id={id} imageUrl={imageUrl} />
                </Card.Body>
                <Card.Footer className="text-muted">
                  {createdAt.toDate().toDateString()}
                </Card.Footer>
              </Card>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default Blogs;
