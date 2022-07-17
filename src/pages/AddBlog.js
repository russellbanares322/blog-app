import {
  collection,
  Timestamp,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Modal,
  ProgressBar,
  Col,
  Row,
} from "react-bootstrap";
import { storage, db, auth } from "../firebase-config";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    image: "",
    price: "",
    createdAt: Timestamp.now().toDate(),
  });

  const { id } = useParams();

  useEffect(() => {
    id && getSingleUser();
  }, [id]);

  const getSingleUser = async () => {
    const blogRef = doc(db, "BlogsData", id);
    const snapshot = await getDoc(blogRef);
    if (snapshot.exists()) {
      setFormData({ ...snapshot.data() });
    }
  };

  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeImage = async (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmitBlog = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.details ||
      !formData.image ||
      !formData.price ||
      !formData.location
    ) {
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
          price: "",
          location: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const blogRef = collection(db, "BlogsData");

          if (!id) {
            addDoc(blogRef, {
              title: formData.title,
              details: formData.details,
              price: formData.price,
              location: formData.location,
              imageUrl: url,
              createdAt: Timestamp.now().toDate(),
              createdBy: user.displayName,
              userId: user.uid,
              likes: [],
              comments: [],
            })
              .then(() => {
                toast.info("Successfully Posted Property!");
                setProgress(0);
                navigate("/");
              })
              .catch((err) => {
                toast.error("Failed to add blog, please try again.");
              });
          } else {
            updateDoc(doc(db, "BlogsData", id), {
              title: formData.title,
              details: formData.details,
              price: formData.price,
              location: formData.location,
              imageUrl: url,
              createdAt: Timestamp.now().toDate(),
              createdBy: user.displayName,
              userId: user.uid,
              likes: [],
              comments: [],
            })
              .then(() => {
                toast.info("Successfully Updated Property!");
                setProgress(0);
                navigate("/");
              })
              .catch((err) => {
                toast.error("Failed to update blog, please try again.");
              });
          }
        });
      }
    );
  };

  return (
    <Container fluid>
      <Modal.Dialog size="lg">
        <Modal.Header className="bg-dark text-white">
          <Modal.Title className="mx-auto">
            {id ? "Update Property" : "Post Property"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form className="my-4 text-white">
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
            <Col sm={12}>
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      placeholder="Enter price..."
                      value={formData.price}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      placeholder="Enter location..."
                      value={formData.location}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>

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
                animated
                label={`${progress}% `}
                now={`${progress}% `}
              />
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer className="bg-dark text-white">
          <Button variant="light" onClick={() => navigate("/")}>
            Return
          </Button>
          <Button variant="primary" onClick={handleSubmitBlog}>
            {id ? "Save" : "Post"}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Container>
  );
};

export default AddBlog;
