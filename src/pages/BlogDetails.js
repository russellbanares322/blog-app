import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Badge, Col, Container, Image, Row, Stack } from "react-bootstrap";
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

          <Col className="mt-5 mb-5" sm={12}>
            <Row>
              <Col sm={7}>
                <Image className="image_details" src={blog.imageUrl} fluid />
              </Col>
              <Col sm={5}>
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
                    <Col sm={1}>
                      <h6>Rates</h6>
                      <Stack direction="horizontal">
                        <div>
                          <p>{blog.likes.length}</p>
                        </div>
                        <div>
                          <LikesBlog id={id} likes={blog.likes} />
                        </div>
                      </Stack>
                    </Col>
                    <Col sm={11}>
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
