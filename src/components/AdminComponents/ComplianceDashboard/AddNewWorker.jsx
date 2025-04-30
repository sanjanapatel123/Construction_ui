import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import { Link } from "react-router-dom";

const AddNewWorker = () => {
  const [workerData, setWorkerData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    whiteCardNumber: "",
    whiteCardExpiry: "",
    inductionDate: "",
    complianceStatus: "Compliant",
    sideAccessHours: 0,
    supervisor: "",
    workArea: "",
    accessLevel: "Standard",
    profilePhoto: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkerData({
      ...workerData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setWorkerData({
      ...workerData,
      profilePhoto: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Worker Data:", workerData);
    // Add logic to save worker data
  };

  return (
    <div className="container">
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <h4>Add New Worker</h4>
            <Link to="/ComplianceDashboard">
              <Button
                variant=""
                className=""
                style={{ backgroundColor: "#0d6efd", color: "white" }}
              >
                <i class="fa-solid fa-arrow-left me-2"></i>Back to Dashboard
              </Button>
            </Link>
          </div>
          <Form onSubmit={handleSubmit}>
            <h5>Personal Information</h5>
            <Row>
              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label>Profile Photo</Form.Label>

                  {/* Hidden File Input */}
                  <Form.Control
                    type="file"
                    id="profilePhotoInput"
                    name="profilePhoto"
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: "none" }}
                    required
                  />

                  {/* Clickable Image Label */}
                  <div className="mt-2 text-center">
                    <label
                      htmlFor="profilePhotoInput"
                      style={{ cursor: "pointer" }}
                    >
                      {workerData.profilePhoto ? (
                        <img
                          src={URL.createObjectURL(workerData.profilePhoto)}
                          alt="Profile"
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            border: "1px dashed #ccc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#aaa",
                            fontSize: "12px",
                          }}
                        >
                          Click to upload
                        </div>
                      )}
                    </label>
                  </div>
                </Form.Group>
              </Col>

              <Col md={9}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={workerData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Number *</Form.Label>
                  <Form.Control
                    type="text"
                    name="contactNumber"
                    value={workerData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={workerData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <h5>Compliance Information</h5>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>White Card Number *</Form.Label>
                  <Form.Control
                    type="text"
                    name="whiteCardNumber"
                    value={workerData.whiteCardNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>White Card Expiry Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="whiteCardExpiry"
                    value={workerData.whiteCardExpiry}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Induction Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="inductionDate"
                    value={workerData.inductionDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Compliance Status *</Form.Label>
                  <Form.Control
                    as="select"
                    name="complianceStatus"
                    value={workerData.complianceStatus}
                    onChange={handleChange}
                    required
                  >
                    <option>Compliant</option>
                    <option>Non-Compliant</option>
                    <option>Expired</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Side Access Hours</Form.Label>
                  <Form.Control
                    type="number"
                    name="sideAccessHours"
                    value={workerData.sideAccessHours}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <h5>Assignment Details</h5>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Supervisor Assignment *</Form.Label>
                  <Form.Control
                    as="select"
                    name="supervisor"
                    value={workerData.supervisor}
                    onChange={handleChange}
                    required
                  >
                    <option>Select a supervisor</option>
                    <option>Mike Johnson</option>
                    <option>Luke Chen</option>
                    <option>Lisa Chen</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Work Area/Zone *</Form.Label>
                  <Form.Control
                    as="select"
                    name="workArea"
                    value={workerData.workArea}
                    onChange={handleChange}
                    required
                  >
                    <option>Select a work area</option>
                    <option>Construction Zone 1</option>
                    <option>Electrical Zone</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Access Level *</Form.Label>
                  <Form.Control
                    as="select"
                    name="accessLevel"
                    value={workerData.accessLevel}
                    onChange={handleChange}
                    required
                  >
                    <option>Standard</option>
                    <option>Admin</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-between">
              <Button
                variant="outline-secondary"
                className="me-2"
                type="button"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Worker
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddNewWorker;
