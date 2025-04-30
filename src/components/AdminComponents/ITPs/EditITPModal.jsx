import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { apiUrl } from "../../../utils/config";

const EditITPModal = ({ show, handleClose, itpData, refreshData }) => {
  const [formData, setFormData] = useState(itpData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/itps/${itpData.id}`,
        formData
      );
      console.log("Updated:", response.data);
      refreshData(); // refresh main list
      handleClose(); // close modal
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit ITP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Inspection Type</Form.Label>
            <Form.Control
              name="inspectionType"
              value={formData.inspectionType}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Inspector</Form.Label>
            <Form.Control
              name="inspector"
              value={formData.inspector}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Activity</Form.Label>
            <Form.Control
              name="activity"
              value={formData.activity}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Criteria</Form.Label>
            <Form.Control
              name="criteria"
              value={formData.criteria}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              name="status"
              value={formData.status}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Additional Notes</Form.Label>
            <Form.Control
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditITPModal;
