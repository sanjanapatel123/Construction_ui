import React, {  use, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Badge,
} from "react-bootstrap";
import { FaEdit, FaEye, FaTrash, FaDownload, FaShare } from "react-icons/fa";
import { getallSwms } from "../../../redux/slices/swmsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function SWMS() {

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const { swms , loading ,error } = useSelector((state) => state.swms )

  console.log("sWMS" ,swms)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getallSwms());
  }, [dispatch]);
  

  const SwmsList = Array.isArray(swms) ? swms : [];

  const handleSearchChange = (e) => setSearch(e.target.value)


  const filteredSwms = SwmsList.filter((swms) =>
    swms.title.toLowerCase().includes(search.toLowerCase()) 
  );

  const templates = [
    {
      id: 1,
      title: "Working at Heights",
      description:
        "Standard procedures for tasks involving ladders, scaffolding, or elevated platforms.",
    },
    {
      id: 2,
      title: "Electrical Work",
      description:
        "Precautions and procedures for safe handling of electrical systems and components.",
    },
    {
      id: 3,
      title: "Heavy Machinery Operation",
      description:
        "Guidelines for operating excavators, bulldozers, and other heavy equipment safely.",
    },
    {
      id: 4,
      title: "Confined Space Entry",
      description:
        "Safety protocol for entering and working in confined or enclosed spaces.",
    },
    {
      id: 5,
      title: "Excavation and Trenching",
      description:
        "Hazard management and safe digging practices near services and in deep trenches.",
    },
    {
      id: 6,
      title: "Manual Handling",
      description:
        "Safe lifting techniques and risk mitigation for physically demanding tasks.",
    },
    {
      id: 7,
      title: "Scaffolding Erection",
      description:
        "Procedures for erecting, modifying, and working on scaffolding systems.",
    },
    {
      id: 8,
      title: "Hot Work (Welding & Cutting)",
      description:
        "Fire safety and precautions for tasks involving open flames or heat sources.",
    },
    {
      id: 9,
      title: "Demolition Work",
      description:
        "Risk assessment and control for structural demolition and removal work.",
    },
  ];


 



  const handleUseTemplate = (title) => {
    navigate(`/template`, { state: { title } });
  };

  const handleUseEquipment = (title) => {
    navigate(`/equipment`, { state: { title } });
  };
  return (
    <Container
      fluid
      className="p-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      {/* Templates Section */}
      <div className="dashboard-header">
        <h3>Safe Work Method Statements (SWMS)</h3>
        <p>Manage and monitor your safety documentation</p>
      </div>
      <Row className="mb-4 align-items-center g-3">
        {/* <h3>SMS Induction </h3> */}
        <Col sm={12} md={3}>
          <Form.Control
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search SWMS..."
            style={{ borderRadius: "4px", border: "1px solid #dee2e6" }}
          />
        </Col>

        <Col sm={12} md={2}>
          <Form.Select
            style={{ borderRadius: "4px", border: "1px solid #dee2e6" }}
          >
            <option>All Status</option>
            <option>Draft</option>
            <option>Pending Approval</option>
            <option>Approved</option>
          </Form.Select>
        </Col>
        <Col sm={12} md="auto" className="ms-md-auto">
          <Link to={"/AddnewSms"}>
            <Button
              variant="primary"
              style={{
                backgroundColor: "#0d6efd",
                border: "none",
                borderRadius: "6px",
                padding: "10px 20px",
                boxShadow: "0 2px 4px rgba(13,110,253,0.2)",
                fontWeight: "500",
              }}
            >
              {" "}
              + Create New SWMS{" "}
            </Button>
          </Link>
        </Col>
      </Row>

      <Card className="mb-5 border-0 shadow-sm">
      <Card.Header className="bg-white py-3 border-0">
  <div className="row align-items-center g-3">
    {/* Title */}
    <div className="col-12 col-md-6">
      <h5 className="mb-0 fw-semibold text-center text-md-start">SWMS Overview</h5>
    </div>

    {/* Search Input */}
    <div className="col-12 col-md-6">
      <div className="d-flex justify-content-center justify-content-md-end">
        <Form.Control
          type="text"
          placeholder="Search SWMS..."
          className="form-control-sm ps-4"
          style={{ width: "100%", maxWidth: "240px", backgroundColor: "#f4f5f7" }}
        />
      </div>
    </div>
  </div>
</Card.Header>


        <Card.Body className="p-2">
  <div className="table-responsive">
    <table className="table table-hover align-middle mb-0">
      <thead className="bg-light">


         {/* Earliear recievde in ui  , Changed according to form. */}

        {/* <tr>
          <th className="ps-4">SWMS Name</th>
          <th>Company Name</th>
          <th>Principal Contractor</th>
          <th>Date Created</th>
          <th className="pe-4">Actions</th>
        </tr> */}

        <tr>
        <th className="ps-4">SWMS Name</th>
        <th>Project</th>
        <th>Work Area </th>
        <th>Date Created</th>
        <th className="pe-4">Actions</th>
        </tr>
      </thead>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
      <tbody>

        {

        (filteredSwms && filteredSwms.map((item,index) => (
          <tr key={index}>
          <td className="ps-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: "36px", height: "36px" }}
              >
                EL
              </div>
              <div>
                <div className="fw-medium">{item?.title}</div>
                {/* <small className="text-muted">
                  Created by: mike.j@example.com
                </small> */}
              </div>
            </div>
          </td>
          <td>{item?.project}</td>
          <td>{item?.workArea}</td>
          <td> {new Date(item?.createdAt).toLocaleString()}</td>
          <td className="pe-4">
            <div className="d-flex gap-3">
              <Link to={`/view-swms/${item?._id}`}>
                <Button variant="link" className="text-primary p-0">
                  <i className="fa-solid fa-eye"></i>
                </Button>
              </Link>
              <Button variant="link" className="text-primary p-0">
                <i className="fa-solid fa-download"></i>
              </Button>
            </div>
          </td>
        </tr>
        )
        ))
      }
        {/* <tr>
          <td className="ps-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: "36px", height: "36px" }}
              >
                EL
              </div>
              <div>
                <div className="fw-medium">Electrical Work SWMS</div>
                <small className="text-muted">
                  Created by: mike.j@example.com
                </small>
              </div>
            </div>
          </td>
          <td>ABC Electrical Services</td>
          <td>Johnson Builders Pty Ltd</td>
          <td>2024-02-15</td>
          <td className="pe-4">
            <div className="d-flex gap-3">
              <Link to="/view-swms">
                <Button variant="link" className="text-primary p-0">
                  <i className="fa-solid fa-eye"></i>
                </Button>
              </Link>
              <Button variant="link" className="text-primary p-0">
                <i className="fa-solid fa-download"></i>
              </Button>
            </div>
          </td>
        </tr> */}

        {/* <tr>
          <td className="ps-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="bg-warning text-white rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: "36px", height: "36px" }}
              >
                EX
              </div>
              <div>
                <div className="fw-medium">Excavation SWMS</div>
                <small className="text-muted">
                  Created by: sarah.w@example.com
                </small>
              </div>
            </div>
          </td>
          <td>GroundForce Pty Ltd</td>
          <td>Urban Constructions</td>
          <td>2024-02-14</td>
          <td className="pe-4">
            <div className="d-flex gap-3">
              <Link to="/view-swms">
                <Button variant="link" className="text-primary p-0">
                  <i className="fa-solid fa-eye"></i>
                </Button>
              </Link>
              <Button variant="link" className="text-primary p-0">
                <i className="fa-solid fa-download"></i>
              </Button>
            </div>
          </td>
        </tr> */}
      </tbody>
      )}
    </table>
  </div>

  {/* Pagination */}
  <div className="d-flex justify-content-end my-3">
    <Button size="sm" variant="outline-secondary" className="me-2">
      Previous
    </Button>
    <Button size="sm" variant="primary" className="ms-2">
      1
    </Button>
    <Button size="sm" variant="outline-secondary" className="ms-2">
      2
    </Button>
    <Button size="sm" variant="outline-secondary" className="ms-2">
      Next
    </Button>
  </div>
</Card.Body>

      </Card>
      <h5 className="mb-3 mt-3" style={{ fontSize: "1rem", fontWeight: "500" }}>
        Pre-Populated Templates
      </h5>
      <Row className="mb-4 g-3">
        {templates.map((template) => (
          <Col sm={12} md={4} key={template.id}>
            <Card className="h-100 border border-secondary rounded-3">
              <Card.Body>
                <Card.Title className="fs-6 fw-medium">
                  {template.title}
                </Card.Title>
                <Card.Text className="text-muted fs-7">
                  {template.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    variant="link"
                    className="p-0 text-primary text-decoration-none fs-7"
                    onClick={() => handleUseTemplate(template.title)}
                  >
                    Use Template
                  </Button>
                  <Button
                    variant="link"
                    className="p-0 text-primary text-decoration-none fs-7"
                    onClick={() => handleUseEquipment(template.title)}
                  >
                    Equipment{" "}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Inductions Overview List */}
    </Container>
  );
}

export default SWMS;
