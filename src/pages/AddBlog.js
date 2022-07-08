import { collection, Timestamp, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { Container, Form, Button, ProgressBar, Alert } from "react-bootstrap";
import { storage, db } from "../firebase-config";
import { toast } from "react-toastify";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeImage = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmitBlog = () => {
    if (!formData.title || !formData.details || !formData.image) {
      <Alert variant="danger">Fields cannot be empty!</Alert>;
      return;
    }
    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercentage);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          details: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const blogRef = collection(db, "BlogsData");
          addDoc(blogRef, {
            title: formData.title,
            details: formData.details,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
          })
            .then(() => {
              toast.info("Successfully added blog!");
              setProgress(0);
            })
            .catch((err) => {
              toast.error("Failed adding blog, please try again.");
            });
        });
      }
    );
  };

  return (
    <Container className="border p-5">
      <h3>Create Blog</h3>
      <Form className="my-4">
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter title..."
            value={formData.title}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Details</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter details..."
            style={{ height: "100px" }}
            value={formData.details}
            name="details"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleChangeImage(e)}
          />
        </Form.Group>
        {progress === 0 ? null : (
          <ProgressBar
            className="mb-5"
            style={{ width: `${progress}%` }}
            label={`${progress}%`}
          />
        )}

        <Button variant="primary" type="submit" onClick={handleSubmitBlog}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddBlog;
