import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NEW() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    project: '',
    description: '',
    hazards: '',
    controls: '',
    ppe: '',
    responsible: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    navigate('/swms'); // Navigate back to SWMS list
  };

  return (
    <Container fluid className="p-4">
      <h3 className="mb-4">Create New SWMS</h3>
      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Project</Form.Label>
                  <Form.Control
                    type="text"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hazards Identified</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="hazards"
                value={formData.hazards}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Control Measures</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="controls"
                value={formData.controls}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>PPE Requirements</Form.Label>
              <Form.Control
                type="text"
                name="ppe"
                value={formData.ppe}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Responsible Person</Form.Label>
              <Form.Control
                type="text"
                name="responsible"
                value={formData.responsible}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                Save SWMS
              </Button>
              <Button variant="secondary" onClick={() => navigate('/swms')}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NEW;