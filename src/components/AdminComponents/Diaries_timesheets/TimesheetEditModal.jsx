// components/Modals/TimesheetEditModal.jsx
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const TimesheetEditModal = ({
  show,
  onClose,
  editData,
  onChange,
  onSubmit,
}) => {
  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Timesheet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={editData.date?.slice(0, 10)}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Worker</Form.Label>
            <Form.Control
              type="text"
              name="worker"
              value={editData.worker}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project</Form.Label>
            <Form.Control
              type="text"
              name="project"
              value={editData.project}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hours Worked</Form.Label>
            <Form.Control
              type="number"
              name="hoursWorked"
              value={editData.hoursWorked}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Overtime</Form.Label>
            <Form.Control
              type="number"
              name="Overtime"
              value={editData.Overtime}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={editData.status}
              onChange={onChange}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TimesheetEditModal;
