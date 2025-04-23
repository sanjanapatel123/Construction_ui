import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const UploadDocumentModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    documentName: "",
    category: "",
    documentType: "",
    status: "Draft",
    permissions: {
      projectManagers: false,
      siteEngineers: false,
      contractors: false,
    },
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle checkbox change for permissions
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      permissions: {
        ...prevState.permissions,
        [name]: checked,
      },
    }));
  };

  // Handle form submission (Upload Document)
  const handleSubmit = () => {
    console.log("Document Uploaded:", formData);
    handleClose(); // Close the modal after uploading
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload Documents</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Document Name */}
          <Form.Group className="mb-3">
            <Form.Label>Document Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter document name"
              name="documentName"
              value={formData.documentName}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Category */}
          <Form.Group className="mb-3">
            <Form.Label>Category *</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option>Select category</option>
              <option>Contracts</option>
              <option>Blueprints</option>
              <option>Reports</option>
              <option>Safety Documents</option>
              <option>Legal Documents</option>
            </Form.Control>
          </Form.Group>

          {/* Document Type */}
          <Form.Group className="mb-3">
            <Form.Label>Document Type *</Form.Label>
            <Form.Control
              as="select"
              name="documentType"
              value={formData.documentType}
              onChange={handleInputChange}
            >
              <option>Select type</option>
              <option>PDF</option>
              <option>DOCX</option>
              <option>PPTX</option>
              <option>DWG</option>
            </Form.Control>
          </Form.Group>

          {/* Status */}
          <Form.Group className="mb-3">
            <Form.Label>Status *</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option>Draft</option>
              <option>Under Review</option>
              <option>Approved</option>
            </Form.Control>
          </Form.Group>

          {/* Access Permissions */}
          <Form.Group className="mb-3">
            <Form.Label>Access Permissions</Form.Label>
            <Row>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Project Managers"
                  name="projectManagers"
                  checked={formData.permissions.projectManagers}
                  onChange={handleCheckboxChange}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Site Engineers"
                  name="siteEngineers"
                  checked={formData.permissions.siteEngineers}
                  onChange={handleCheckboxChange}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Contractors"
                  name="contractors"
                  checked={formData.permissions.contractors}
                  onChange={handleCheckboxChange}
                />
              </Col>
            </Row>
          </Form.Group>

          {/* File Upload */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Document</Form.Label>
            <InputGroup>
              <Form.Control type="file" />
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadDocumentModal;
