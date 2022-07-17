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
    <Container fluid>
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
              <Col sm={5} className="text-center">
                <h6 className="mt-5 date_text">
                  Posted on {blog.createdAt.toDate().toDateString()}
                </h6>
                <p className="pt-4">{blog.details}</p>
              </Col>
            </Row>
          </Col>
          <hr />
          <Col className="text-center" sm={12}>
            <h1 className=" mb-5">Images</h1>
            <Row>
              <Col sm={3}>Image 1</Col>
              <Col sm={3}>Image 2</Col>
              <Col sm={3}>Image 3</Col>
              <Col sm={3}>Image 4</Col>
            </Row>
          </Col>
          <hr />
          <Col sm={12}>
            <Row>
              <Col sm={9}>
                <Row>
                  <Col sm={4} className="d-flex justify-content-center">
                    <h1>Amenities</h1>
                  </Col>
                  <Col sm={4} className="d-flex justify-content-center">
                    <h1>Near Stores</h1>
                  </Col>
                </Row>
              </Col>

              <Col sm={3} className="d-flex justify-content-center">
                <h1>Contact Info</h1>
              </Col>
            </Row>
          </Col>
          <Container fluid>
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
