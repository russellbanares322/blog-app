import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Badge, Col, Container, Image, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase-config";
import Comment from "./Comment";
import LikesBlog from "./LikesBlog";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, "BlogsData", id);
    onSnapshot(docRef, (snapshot) => {
      setBlog({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);
  return (
    <Container>
      {blog && (
        <>
          <Col sm={12}>
            <h1 className="text-center">{blog.title}</h1>
          </Col>

          <Col className="mt-5" sm={12}>
            <Row>
              <Col sm={5}>
                <Image src={blog.imageUrl} fluid />
              </Col>

              <Col sm={7}>
                <h6 className="d-flex justify-content-center mb-3">
                  {blog.createdAt.toDate().toDateString()}
                </h6>
                <p>{blog.details}</p>
                <small>
                  <i>~{blog.createdBy}</i>
                </small>
              </Col>
            </Row>
          </Col>
          <hr />
          <Container>
            {user && (
              <>
                <Col sm={12}>
                  <Row>
                    <Col className="d-flex" sm={2}>
                      <p className="pt-2 ml-5">{blog.likes.length}</p>

                      <LikesBlog id={id} likes={blog.likes} />
                    </Col>
                    <Col sm={10} className="border p-5">
                      <Comment id={blog.id} />
                    </Col>
                  </Row>
                </Col>
              </>
            )}
          </Container>
        </>
      )}
    </Container>
  );
};

export default BlogDetails;
