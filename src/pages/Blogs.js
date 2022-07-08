import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase-config";
import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
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
    <div>
      {blogs.length === 0 ? (
        <h1>No blogs added.</h1>
      ) : (
        blogs.map(({ id, title, details, imageUrl, createdAt }) => (
          <Container key={id}>
            <Card
              className="shadow border"
              style={{ width: "20rem", height: "20px" }}
            >
              <Card.Img variant="top" src={imageUrl} />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{details}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
              <Card.Footer className="text-muted">
                {createdAt.toDate().toDateString()}
              </Card.Footer>
            </Card>
          </Container>
        ))
      )}
    </div>
  );
};

export default Blogs;
