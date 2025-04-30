import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const RescheduleModal = ({
  show,
  handleClose,
  serviceData,
  handleReschedule,
}) => {
  const [newServiceDate, setNewServiceDate] = useState("");
  const [comments, setComments] = useState("");

  const handleSave = () => {
    handleReschedule(serviceData.id, newServiceDate, comments);
    handleClose(); // Close the modal after saving
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Reschedule Service for {serviceData?.serviceName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNewServiceDate">
            <Form.Label>New Service Date</Form.Label>
            <Form.Control
              type="date"
              value={newServiceDate || ""}
              onChange={(e) => setNewServiceDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formComments">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comments || " "}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter any comments for rescheduling"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Reschedule Service
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RescheduleModal;
