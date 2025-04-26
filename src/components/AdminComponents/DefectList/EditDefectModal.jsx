// EditDefectModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { apiUrl } from "../../../utils/config";
import axiosInstance from "../../../utils/axiosInstance";

function EditDefectModal({ show, handleClose, defect, onUpdate }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (defect) {
      setFormData(defect);
    }
  }, [defect]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log("Form Data:", formData); // Debugging line

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.put(
        `${apiUrl}/defectlists/${defect._id}`,
        formData
      );
      onUpdate(); // refetch list
      handleClose();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Defect</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Defect Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Project</Form.Label>
            <Form.Control
              type="text"
              name="project"
              value={formData.project || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="project"
              value={formData.location || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>priority</Form.Label>
            <Form.Control
              type="text"
              name="project"
              value={formData.priority || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>assigned To</Form.Label>
            <Form.Control
              type="text"
              name="project"
              value={formData.assigned || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="project"
              value={formData.category || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="project"
              value={formData.status || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditDefectModal;
