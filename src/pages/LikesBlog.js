import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { auth, db } from "../firebase-config";

const LikesBlog = ({ id, likes }) => {
  const [user] = useAuthState(auth);

  const likesRef = doc(db, "BlogsData", id);
  const handleLike = () => {
    if (likes?.includes(user.uid)) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log("remove like");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      updateDoc(likesRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {
          console.log("liked");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container className="text-right mb-4">
      {!likes?.includes(user.uid) ? (
        <AiOutlineLike
          size={30}
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
      ) : (
        <AiFillLike
          size={30}
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
      )}
    </Container>
  );
};

export default LikesBlog;
