import React from "react";
import { Modal, Button, Card, Row, Col, ProgressBar } from "react-bootstrap";
import { FaDownload, FaShare } from "react-icons/fa";
// import "./drawingRegister.css";

const ViewDocumentModal = ({ show, handleClose, document }) => {
  const modalStyle = {
    backgroundColor: "#f8f9fa", // Light gray background for the modal content
    color: "#333", // Darker text for contrast
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered style={modalStyle}>
      <Modal.Header closeButton>
        <Modal.Title>{document.name} - Document Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Document Details</Card.Title>
                <Card.Text>
                  <strong>Category:</strong> {document.category}
                </Card.Text>
                <Card.Text>
                  <strong>File Type:</strong> {document.type}
                </Card.Text>
                <Card.Text>
                  <strong>Last Modified:</strong> {document.lastModified}
                </Card.Text>
                <Card.Text>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      document.status === "Approved"
                        ? "bg-success"
                        : "bg-warning"
                    }`}
                  >
                    {document.status}
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Document Activity</Card.Title>
                {/* Replace the below chart with the real data */}
                <ProgressBar
                  now={document.activityProgress}
                  label={`${document.activityProgress}%`}
                />
                <div className="mt-3">
                  <strong>Document Activity Over Time</strong>
                  <img
                    src={document.activityGraph}
                    alt="Activity Graph"
                    className="img-fluid"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Version History */}
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Version History</Card.Title>
            {document.versionHistory.map((version, index) => (
              <div key={index} className="mb-2">
                <strong>{version.version}</strong> - {version.date} by{" "}
                {version.author}
              </div>
            ))}
          </Card.Body>
        </Card>

        {/* Access Permissions */}
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Access Permissions</Card.Title>
            {document.permissions.map((permission, index) => (
              <div key={index} className="mb-2">
                <strong>{permission.role}:</strong> {permission.accessLevel}
              </div>
            ))}
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-primary"
          onClick={() => alert("Download Document")}
        >
          <FaDownload className="me-2" />
          Download
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => alert("Share Document")}
        >
          <FaShare className="me-2" />
          Share
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewDocumentModal;
