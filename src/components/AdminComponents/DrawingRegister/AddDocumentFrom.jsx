import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';


const AddDocumentForm = () => {
  const [formType, setFormType] = useState('');
  const [category, setCategory] = useState('');
  const [projectName, setProjectName] = useState('');
  const [applicationName, setApplicationName] = useState('');
  const [applicationContact, setApplicationContact] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      formType,
      category,
      projectName,
      applicationName,
      applicationContact,
      description,
      file
    });
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Add New Document</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Form Type</Form.Label>
              <Form.Select value={formType} onChange={(e) => setFormType(e.target.value)} required>
                <option value="">Select Type</option>
                <option value="Shop Drawing">Shop Drawing</option>
                <option value="Tender">Tender</option>
                <option value="As-Built">As-Built</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                <option value="Architectural">Architectural</option>
                <option value="Structural">Structural</option>
                <option value="Hydraulic">Hydraulic</option>
                <option value="Stormwater">Stormwater</option>
                <option value="Mechanical">Mechanical</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Application Name</Form.Label>
              <Form.Control
                type="text"
                value={applicationName}
                onChange={(e) => setApplicationName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Application Contact</Form.Label>
              <Form.Control
                type="text"
                value={applicationContact}
                onChange={(e) => setApplicationContact(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formFile" className="mb-4">
          <Form.Label>Upload Document</Form.Label>
          <div className="border rounded p-4 text-center bg-light" style={{ cursor: 'pointer' }}>
            <i className="fas fa-cloud-upload-alt fa-2x mb-2 text-primary"></i>
            <p className="mb-2">Drag & drop or <span className="text-primary">browse</span> to upload</p>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="hiddenFileInput"
            />
            <label htmlFor="hiddenFileInput" className="btn btn-outline-primary btn-sm mt-2">Choose File</label>
            {file && <div className="mt-2 text-success">{file.name}</div>}
          </div>
        </Form.Group>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" type="button">Cancel</Button>
          <Button variant="primary" type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default AddDocumentForm;