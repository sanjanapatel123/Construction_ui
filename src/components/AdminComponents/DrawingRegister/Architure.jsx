import React, { useState } from "react";
import { Table, Pagination, Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const Architure = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("Architectural");

  const documents = [
    { id: "DOC-2024-001", date: "Jan 15, 2024", type: "Shop Drawing", subcontractor: "ABC Construction", status: "Approved" },
    { id: "DOC-2024-002", date: "Jan 18, 2024", type: "Tender", subcontractor: "XYZ Contractors", status: "Pending" },
    { id: "DOC-2024-003", date: "Jan 20, 2024", type: "Shop Drawing", subcontractor: "DEF Engineering", status: "Rejected" },
  ];

  return (
    <div className="container py-4">
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <h3 className="mb-0">Drawing Register</h3>
     
      </div>

      <Row>
        {/* Sidebar */}
        <Col md={3} className="mb-4">
          <div className="p-3 border rounded bg-light">
            <h5 className="mb-3">Categories</h5>
            <ul className="list-unstyled mb-0">
              {["Architectural", "Structural", "Hydraulic", "Stormwater", "Mechanical"].map((cat) => (
                <li key={cat} className="mb-2">
                  <Button
                    variant="light"
                    className={`w-100 text-start shadow-sm ${cat === category ? "fw-bold text-primary border" : ""}`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </Col>

        {/* Main Content */}
        <Col md={9}>
          {/* Search */}
          <Form.Control
            type="search"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-3 shadow-sm"
          />

          {/* Table */}
          <div className="table-responsive">
            <Table bordered hover className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Document ID</th>
                  <th>Submission Date</th>
                  <th>Type</th>
                  <th>Subcontractor</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <tr key={index}>
                    <td>{doc.id}</td>
                    <td>{doc.date}</td>
                    <td>{doc.type}</td>
                    <td>{doc.subcontractor}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 ${doc.status === "Approved"
                          ? "bg-success"
                          : doc.status === "Pending"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                          }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td>
                      <Button variant="link" className="text-decoration-none text-primary me-2 p-0">
                        <i className="fas fa-download me-1"></i>
                      </Button>
                      <Button variant="link" className="text-decoration-none text-danger p-0">
                        <i className="fas fa-undo me-1"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-end mt-3">
            <Pagination className="mb-0">
              <Pagination.Prev>
                <i className="fas fa-chevron-left"></i>
              </Pagination.Prev>
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Next>
                <i className="fas fa-chevron-right"></i>
              </Pagination.Next>
            </Pagination>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Architure;