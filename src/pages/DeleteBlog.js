import React, { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const DeleteBlog = ({ id, imageUrl }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "BlogsData", id));
      toast.info("Successfully deleted blog!");
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    } catch (error) {
      toast.error("Fail to delete blog, please try again.");
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeleteBlog;
