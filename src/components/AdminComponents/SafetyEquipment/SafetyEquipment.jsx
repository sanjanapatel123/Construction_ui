import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("equipment")) {
      const index = name.split("-")[1];
      const newChecklist = [...formData.equipmentChecklist];
      newChecklist[index][name.split("-")[0]] = value;
      setFormData({ ...formData, equipmentChecklist: newChecklist });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Container>
      <h3 className="my-2">Safety Equipment </h3>
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
                    name={`equipment-${index}`}
                    onChange={() => {}}
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
                    <option>Select Condition</option>
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
