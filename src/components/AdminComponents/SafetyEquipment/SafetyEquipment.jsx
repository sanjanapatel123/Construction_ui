import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SafetyEquipment = () => {
  const [formData, setFormData] = useState({
    assignmentID: "",
    assignmentDate: "",
    assignedBy: "",
    assignedTo: "",
    submissionDeadline: "",
    expectedReturnDate: "",
    specialInstructions: "",
    equipmentConditionRemarks: "",
    equipmentChecklist: [
      { equipment: "Hard Hat", quantity: 0, condition: "" },
      { equipment: "Safety Boots", quantity: 0, condition: "" },
      { equipment: "Safety Glasses", quantity: 0, condition: "" },
      { equipment: "High-Visibility Vest", quantity: 0, condition: "" },
      { equipment: "Work Gloves", quantity: 0, condition: "" },
      { equipment: "Face Mask", quantity: 0, condition: "" },
      { equipment: "Safety Harness", quantity: 0, condition: "" },
      { equipment: "Ear Protection", quantity: 0, condition: "" },
    ],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is part of the equipmentChecklist
    if (name.includes("-")) {
      const [field, index] = name.split("-");
      const updatedChecklist = [...formData.equipmentChecklist];
      updatedChecklist[index][field] = value;
      setFormData({ ...formData, equipmentChecklist: updatedChecklist });
    } else {
      // Handle fields outside of the checklist like specialInstructions and equipmentConditionRemarks
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedChecklist = [...formData.equipmentChecklist];
    updatedChecklist[index].selected = !updatedChecklist[index].selected;
    setFormData({ ...formData, equipmentChecklist: updatedChecklist });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = formData.equipmentChecklist.every((item) => item.condition);
    if (!isValid) {
      toast.error("Please select a condition for all equipment items.");
      return;
    }

    if (!formData.specialInstructions || !formData.equipmentConditionRemarks) {
      toast.error("Please provide all the required additional details.");
      return;
    }

    const payload = {
      assignmentId: formData.assignmentID,
      assignmentDate: formData.assignmentDate,
      assignedBy: formData.assignedBy,
      assignedTo: formData.assignedTo,
      submissionDeadline: formData.submissionDeadline,
      expectedReturnDate: formData.expectedReturnDate,
      equipmentChecklist: formData.equipmentChecklist.map((item) => ({
        equipment: item.equipment,
        quantity: item.quantity,
        condition: item.condition,
      })),
      additionalDetails: formData.specialInstructions,
      specialInstructions: formData.specialInstructions,
      equipmentConditionRemarks: formData.equipmentConditionRemarks,
      confirmation: true, // assuming confirmation is always true
      employeeSignature: "signature_url_5", // Replace with actual signature URL
      supervisorSignature: "signature_url_6", // Replace with actual signature URL
    };
    console.log("Submitting payload", payload);

    try {
      const response = await axios.post(
        "https://hrb5wx2v-8000.inc1.devtunnels.ms/api/safety",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success:", response.data);
      toast.success("Assignment submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit assignment. Please try again.");
      console.error("Error submitting assignment:", error);
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <h2>Safety Equipment</h2>
        <button
          onClick={() => navigate(-1)}
          className="btn "
          style={{ backgroundColor: "#0d6efd", color: "white" }}
        >
          <i class="fa-solid fa-arrow-left me-2"></i> Back to Overview
        </button>
      </div>

      <hr />
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Label>Assignment ID</Form.Label>
            <Form.Control
              type="text"
              name="assignmentID"
              value={formData.assignmentID}
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>Assignment Date</Form.Label>
            <Form.Control
              type="date"
              name="assignmentDate"
              value={formData.assignmentDate}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Assigned By</Form.Label>
            <Form.Control
              type="text"
              name="assignedBy"
              value={formData.assignedBy}
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type="text"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Submission Deadline</Form.Label>
            <Form.Control
              type="date"
              name="submissionDeadline"
              value={formData.submissionDeadline}
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>Expected Return Date</Form.Label>
            <Form.Control
              type="date"
              name="expectedReturnDate"
              value={formData.expectedReturnDate}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <h4>Safety Equipment Checklist</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Select</th>
              <th>Equipment</th>
              <th>Quantity</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {formData.equipmentChecklist.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>
                  <Form.Check
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td>{item.equipment}</td>
                <td>
                  <Form.Control
                    type="number"
                    name={`quantity-${index}`}
                    value={item.quantity}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <Form.Control
                    as="select"
                    name={`condition-${index}`}
                    value={item.condition}
                    onChange={handleChange}
                  >
                    <option value="">Select Condition</option>
                    <option>New</option>
                    <option>Used</option>
                    <option>Damaged</option>
                  </Form.Control>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h4>Additional Details</h4>
        <Row className="mb-3">
          <Col>
            <Form.Label>Special Instructions</Form.Label>
            <Form.Control
              as="textarea"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Equipment Condition Remarks</Form.Label>
            <Form.Control
              as="textarea"
              name="equipmentConditionRemarks"
              value={formData.equipmentConditionRemarks}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <h4>Confirmation</h4>
        <Row className="mb-3">
          <Col>
            <Form.Label>Employee Signature</Form.Label>
            <Form.Control type="text" placeholder="Click to sign" />
          </Col>
          <Col>
            <Form.Label>Supervisor Signature</Form.Label>
            <Form.Control type="text" placeholder="Click to sign" />
          </Col>
        </Row>

        <div className=" justify-content-between">
          <Button variant="secondary" className="ms-2" type="button">
            Clear Form
          </Button>
          <Button variant="warning" className="ms-2" type="button">
            Save Draft
          </Button>
          <Button variant="primary" className="ms-2" type="submit">
            Submit Assignment
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default SafetyEquipment;
