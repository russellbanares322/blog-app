import { collection, Timestamp, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { Container, Form, Button, Modal, ProgressBar } from "react-bootstrap";
import { storage, db, auth } from "../firebase-config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const AddBlog = ({ showModal, handleModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeImage = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmitBlog = () => {
    if (!formData.title || !formData.details || !formData.image) {
      toast.error("Fields cannot be empty.");
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
            createdBy: user.displayName,
            userId: user.uid,
            likes: [],
            comments: [],
          })
            .then(() => {
              toast.info("Successfully added blog!");
              setProgress(0);
              navigate("/");
              handleModal();
            })
            .catch((err) => {
              toast.error("Failed adding blog, please try again.");
            });
        });
      }
    );
  };

  return (
    <Container>
      <Modal
        className="border shadow"
        show={showModal}
        onHide={handleModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              <Form.Label>Thumbnail Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => handleChangeImage(e)}
              />
            </Form.Group>

            {progress === 0 ? null : (
              <ProgressBar
                className="progress-bar mt-2"
                label={`${progress}% `}
                now={`${progress}% `}
              />
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="dark" onClick={handleModal}>
            Return
          </Button>
          <Button variant="primary" onClick={handleSubmitBlog}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddBlog;
