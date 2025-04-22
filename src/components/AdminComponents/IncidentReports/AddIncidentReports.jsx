import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddIncidentReports() {
  const [formData, setFormData] = useState({
    incidentType: "",
    dateTime: "",
    location: "",
    description: "",
    severity: "",
    witnesses: "",
    immediateActions: "",
    evidence: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      evidence: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add API call here to submit the form data
  };
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>New Incident Report</h3>
        <button
          onClick={() => navigate(-1)}
          className="btn " style={{backgroundColor:"#0d6efd",color:"white"}}
        >
          <i class="fa-solid fa-arrow-left"></i> Back to Overview
        </button>
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Incident Type</Form.Label>
                <Form.Select
                  name="incidentType"
                  value={formData.incidentType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="injury">Injury</option>
                  <option value="property-damage">Property Damage</option>
                  <option value="near-miss">Near Miss</option>
                  <option value="environmental">Environmental</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Date & Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              placeholder="Enter incident location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              placeholder="Describe what happened..."
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Severity Level</Form.Label>
                <Form.Select
                  name="severity"
                  value={formData.severity}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Severity</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Witnesses</Form.Label>
                <Form.Control
                  type="text"
                  name="witnesses"
                  placeholder="Enter witness names"
                  value={formData.witnesses}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Immediate Actions Taken</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="immediateActions"
              placeholder="Describe immediate actions taken..."
              value={formData.immediateActions}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Upload Evidence</Form.Label>
            <div className="border rounded p-3 text-center">
              <i className="fas fa-cloud-upload-alt fa-2x mb-2"></i>
              <p className="mb-2">Upload files or drag and drop</p>
              <small className="text-muted">(PNG, JPG, PDF up to 10MB)</small>
              <Form.Control
                type="file"
                name="evidence"
                onChange={handleFileChange}
                className="mt-2"
              />
            </div>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary" type="submit">
              Submit Report
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default AddIncidentReports;
