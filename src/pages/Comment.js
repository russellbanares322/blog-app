import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuid } from "uuid";
import { MdDelete } from "react-icons/md";

const Comment = ({ id }) => {
  const [loggedUser] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const commentRef = doc(db, "BlogsData", id);

  useEffect(() => {
    const docRef = doc(db, "BlogsData", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, []);

  const handleDeleteComment = (comment) => {
    updateDoc(commentRef, {
      comments: arrayRemove(comment),
    })
      .then((e) => {
        console.log(e);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeComment = (e) => {
    if (e.key === "Enter") {
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: loggedUser.uid,
          userName: loggedUser.displayName,
          comment: comment,
          createdAt: new Date(),
          commentId: uuid(),
        }),
      }).then(() => {
        setComment("");
      });
    }
  };

  return (
    <Container>
      {loggedUser && (
        <>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Write a comment..."
            className="mb-3 text-muted"
          >
            <Form.Control
              placeholder="Leave a comment here"
              as="textarea"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              onKeyUp={(e) => {
                handleChangeComment(e);
              }}
            />
          </FloatingLabel>
        </>
      )}

      {comments !== null &&
        comments.map(({ comment, commentId, user, userName, createdAt }) => (
          <div key={commentId}>
            <Row>
              <Col sm={11}>
                <Alert variant="secondary">
                  <Badge
                    variant={`${user === loggedUser.uid ? "info" : "dark"}`}
                  >
                    {userName}
                  </Badge>
                  <hr />
                  <p className="text-dark">{comment}</p>
                </Alert>
              </Col>
              <Col className="my-2" sm={1}>
                {user === loggedUser.uid && (
                  <MdDelete
                    className="delete_icon"
                    size={30}
                    onClick={() =>
                      handleDeleteComment({
                        comment,
                        commentId,
                        user,
                        userName,
                        createdAt,
                      })
                    }
                  />
                )}
              </Col>
            </Row>
          </div>
        ))}
    </Container>
  );
};

export default Comment;
