import React from "react";
import { Modal, Button } from "react-bootstrap"; // Bootstrap Modal
import { useSelector } from "react-redux";

const DefectDetailsModal = ({ show, handleClose }) => {
  const { defectDetails, loading } = useSelector((state) => state.defects);

  if (loading || !defectDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Defect Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Title:</strong> {defectDetails.title}</p>
        <p><strong>Project:</strong> {defectDetails.project}</p>
        <p><strong>Location:</strong> {defectDetails.location}</p>
        <p><strong>Category:</strong> {defectDetails.category}</p>
        <p><strong>Assigned:</strong> {defectDetails.assigned}</p>
        <p><strong>Priority:</strong> {defectDetails.priority}</p>
        <p><strong>Status:</strong> {defectDetails.status}</p>
        <p><strong>Description:</strong> {defectDetails.description}</p>
        <p><strong>Comments:</strong> {defectDetails.comments}</p>
        <p><strong>Date:</strong> {defectDetails.date}</p>

        {defectDetails.image && (
          <div className="text-center">
            <img
              src={defectDetails.image}
              alt="Defect Image"
              className="img-fluid"
              style={{ maxHeight: "300px" }}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DefectDetailsModal;
