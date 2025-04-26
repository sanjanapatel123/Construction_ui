import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const SafetyEquipmentList = () => {
  const [filterEquipment, setFilterEquipment] = useState("");
  const [filterCondition, setFilterCondition] = useState("");
  const [filterAssignedTo, setFilterAssignedTo] = useState("");

  const equipmentData = [
    {
      id: 1,
      equipment: "Hard Hat",
      quantity: 2,
      condition: "New",
      assignedTo: "John Doe",
    },
    {
      id: 2,
      equipment: "Safety Boots",
      quantity: 1,
      condition: "Used",
      assignedTo: "Jane Smith",
    },
    {
      id: 3,
      equipment: "Safety Glasses",
      quantity: 5,
      condition: "New",
      assignedTo: "Alex Johnson",
    },
  ];

  const filteredData = equipmentData.filter((item) => {
    return (
      (filterEquipment === "" ||
        item.equipment.toLowerCase().includes(filterEquipment.toLowerCase())) &&
      (filterCondition === "" || item.condition === filterCondition) &&
      (filterAssignedTo === "" ||
        item.assignedTo.toLowerCase().includes(filterAssignedTo.toLowerCase()))
    );
  });

  return (
    <Container>
      <Row className="align-items-center my-3">
        <Col>
          <h3>Safety Equipment</h3>
        </Col>
        <Col className="text-end">
          <Link to={"/AddSafety"}>
            <Button variant="primary">Add Safety Equipment</Button>
          </Link>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Filter by Equipment"
            value={filterEquipment}
            onChange={(e) => setFilterEquipment(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={filterCondition}
            onChange={(e) => setFilterCondition(e.target.value)}
          >
            <option value="">Filter by Condition</option>
            <option>New</option>
            <option>Used</option>
            <option>Damaged</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Filter by Assigned To"
            value={filterAssignedTo}
            onChange={(e) => setFilterAssignedTo(e.target.value)}
          />
        </Col>
      </Row>

      {/* Table */}
      <div className="table-responsive">
        {" "}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="pe-4 fw-medium fs-6">ID</th>
              <th className="pe-4 fw-medium fs-6">Equipment</th>
              <th className="pe-4 fw-medium fs-6">Quantity</th>
              <th className="pe-4 fw-medium fs-6">Condition</th>
              <th className="pe-4 fw-medium fs-6">Assigned To</th>
              <th className="pe-4 fw-medium fs-6">Actions</th>
            </tr>
          </thead>
          <tbody className="pe-4 fw-medium fs-6">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.equipment}</td>
                  <td>{item.quantity}</td>
                  <td>{item.condition}</td>
                  <td>{item.assignedTo}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn text-primary p-0">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button className="btn text-info p-0">
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button className="btn text-dark p-0">
                        <i className="fas fa-trash text-danger"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No equipment found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default SafetyEquipmentList;
