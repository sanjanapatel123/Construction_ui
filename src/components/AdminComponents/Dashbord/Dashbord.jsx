import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import {
  BsPlusCircle,
  BsUpload,
  BsPersonPlus,
  BsExclamationCircle,
  BsExclamationTriangle,
  BsCheckCircle,
} from "react-icons/bs";
import { Link, Links } from "react-router-dom";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

import {
  Tab,
  Nav,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Modal,
  Form,
} from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

function Dashboard() {
  const [key, setKey] = useState("projectInfo");
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "Safety Incident Reported",
      description: "Site A: Equipment malfunction",
      type: "danger",
      time: "15m ago",
    },
    {
      id: 2,
      title: "Project Deadline Approaching",
      description: "Downtown Project - Due in 3 days",
      type: "warning",
      time: "25m ago",
    },
    {
      id: 3,
      title: "Document Approved",
      description: "Site Safety Protocol v2.1",
      type: "success",
      time: "45m ago",
    },
  ]);

  const stats = [
    {
      number: "12",
      title: "Active Projects",
      subtitle: "4 this week",
      color: "primary",
    },
    {
      number: "28",
      title: "Open Tasks",
      subtitle: "8 high priority",
      color: "info",
    },
    {
      number: "3",
      title: "Safety Incidents",
      subtitle: "1 needs immediate action",
      color: "danger",
    },
    {
      number: "15",
      title: "Monthly Reports",
      subtitle: "2 pending review",
      color: "success",
    },
  ];

  const safetyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Incidents",
        data: [5, 4, 3, 2, 1],
        borderColor: "#4361ee",
        backgroundColor: "rgba(67, 97, 238, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#4361ee",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Near Misses",
        data: [6, 5, 4, 3, 2],
        borderColor: "#3a0ca3",
        backgroundColor: "rgba(58, 12, 163, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#3a0ca3",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const defectData = {
    labels: ["Critical", "High", "In Progress", "Resolved", "Closed"],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          "#ef233c",
          "#fb8500",
          "#4361ee",
          "#2a9d8f",
          "#6c757d",
        ],
        hoverBackgroundColor: [
          "#d90429",
          "#e76f51",
          "#3a0ca3",
          "#264653",
          "#495057",
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 8,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          drawBorder: false,
          borderDash: [5, 5],
        },
        ticks: {
          stepSize: 2,
          font: {
            size: 12,
          },
          color: "#666",
        },
        title: {
          display: true,
          text: "Number of Incidents",
          color: "#666",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#666",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "start",
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        mode: "index",
        intersect: false,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.formattedValue;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  const handleAddTask = () => {
    console.log("Adding new task");
  };

  const handleUploadDocument = () => {
    console.log("Uploading document");
  };

  const handleAssignUser = () => {
    console.log("Assigning user");
  };

  return (
    <div className="container-fluid p-4 bg-gray-100">
      <h3 className="text-gray-800 font-bold mb-4">Dashboard</h3>
      <div className="row g-3 mb-4">
        {stats.map((stat, index) => (
          <div className="col-md-3" key={index}>
            <div
              className={`stats-card p-4 shadow-lg border-start border-4 border-${stat.color} rounded-3 bg-white h-100 transition-all hover:shadow-xl`}
            >
              <div className="d-flex align-items-start gap-3">
                <div
                  className={`stats-number h2 mb-0 fw-bold text-${stat.color}`}
                >
                  {stat.number}
                </div>
                <div>
                  <div className="stats-title h6 mb-1 text-gray-800">
                    {stat.title}
                  </div>
                  <div className="stats-subtitle small text-gray-600">
                    {stat.subtitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="projectInfo">Project Information</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="contactPersonnel">Contact Personnel</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="siteDetails">Site Details</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {/* -------- Project Information -------- */}
            <Tab.Pane eventKey="projectInfo">
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>Project Information</h5>
                    <Button variant="link">✏️ Edit</Button>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <strong>Project Name:</strong> Downtown Commercial Tower
                      </p>
                      <p>
                        <strong>Project Code:</strong> DCT-2025-042
                      </p>
                      <p>
                        <strong>Location:</strong> 123 Main Street, Downtown
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Start Date:</strong> January 15, 2025
                      </p>
                      <p>
                        <strong>End Date:</strong> December 30, 2025
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span className="badge bg-success">In Progress</span>
                      </p>
                    </div>
                  </div>
                  <p>
                    <strong>Project Completion</strong>
                  </p>
                  <ProgressBar now={65} label="65%" variant="primary" />
                </Card.Body>
              </Card>
            </Tab.Pane>

            {/* -------- Contact Personnel -------- */}
            <Tab.Pane eventKey="contactPersonnel">
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5>Contact Personnel</h5>
                    <Button variant="primary" onClick={handleShow}>
                      + Add Personnel
                    </Button>
                  </div>
                  <div className="row">
                    {[
                      {
                        name: "John Smith",
                        role: "Project Manager",
                        email: "john.smith@buildpro.com",
                        phone: "(555) 123-4567",
                        img: "https://i.pravatar.cc/150?img=1",
                      },
                      {
                        name: "Sarah Johnson",
                        role: "Site Engineer",
                        email: "sarah.johnson@buildpro.com",
                        phone: "(555) 789-0123",
                        img: "https://i.pravatar.cc/150?img=2",
                      },
                      {
                        name: "Michael Chen",
                        role: "Safety Officer",
                        email: "michael.chen@buildpro.com",
                        phone: "(555) 456-7890",
                        img: "https://i.pravatar.cc/150?img=3",
                      },
                    ].map((person, idx) => (
                      <div className="col-md-4 mb-3" key={idx}>
                        <Card className="h-100 text-center">
                          <Card.Body>
                            <img
                              src={person.img}
                              className="rounded-circle mb-2"
                              width="80"
                              height="80"
                              alt=""
                            />
                            <h6>{person.name}</h6>
                            <p className="text-primary">{person.role}</p>
                            <p className="mb-1">
                              <i className="bi bi-envelope"></i> {person.email}
                            </p>
                            <p>
                              <i className="bi bi-telephone"></i> {person.phone}
                            </p>
                          </Card.Body>
                        </Card>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Tab.Pane>

            {/* -------- Site Details -------- */}
            <Tab.Pane eventKey="siteDetails">
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>Site Details</h5>
                    <Button variant="link">✏️ Edit</Button>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <strong>Site Address:</strong>
                        <br />
                        123 Main Street
                        <br />
                        Downtown District
                        <br />
                        Metro City, MC 12345
                      </p>
                      <p>
                        <strong>Site Supervisor:</strong>
                        <br />
                        <img
                          src="https://i.pravatar.cc/150?img=4"
                          className="rounded-circle me-2"
                          width="40"
                          height="40"
                          alt=""
                        />
                        Robert Wilson
                        <br />
                        📞 (555) 111-2222
                      </p>
                      <p>
                        <strong>Active Safety Equipment:</strong>
                      </p>
                      <div className="d-flex flex-wrap gap-2">
                        {[
                          "Hard Hats",
                          "Safety Glasses",
                          "Safety Boots",
                          "Hi-Vis Vests",
                          "Gloves",
                          "Ear Protection",
                        ].map((item, i) => (
                          <span key={i} className="badge bg-success">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <img
                        src="https://readdy.ai/api/search-image?query=3D%20rendering%20of%20building%20MEP%20systems%2C%20HVAC%20ducts%2C%20electrical%20conduits%2C%20plumbing%20pipes%2C%20all%20color%20coded%2C%20BIM%20model%20visualization%2C%20detailed%20mechanical%20electrical%20plumbing%20systems%2C%20professional%20engineering%20visualization%2C%20construction%20technical%20drawing%2C%20neutral%20background&width=800&height=600&seq=2&orientation=landscape"
                        alt="Site Map"
                        className="img-fluid mb-2"
                      />
                      <Link to={'/FullSiteMap'}>
                        <Button variant="primary" className="w-100">
                          📍 View Full Site Map
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Personnel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="text-center mb-3">
                <div
                  className="rounded-circle bg-light d-inline-flex justify-content-center align-items-center"
                  style={{ width: 80, height: 80 }}
                >
                  <i className="bi bi-person-circle fs-1 text-muted"></i>
                </div>
                <div>
                  <Form.Label className="text-primary cursor-pointer">
                    Upload Image
                  </Form.Label>
                  <Form.Control type="file" className="d-none" />
                </div>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Job Title</Form.Label>
                <Form.Control type="text" placeholder="Enter job title" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter phone number" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="stats-card p-3 mb-4 shadow-sm rounded-3 bg-white">
        <h6 className="mb-3">Recent Alerts</h6>
        <div className="d-flex flex-column gap-3">
          {alerts.map((alert, index) => (
            <div className="col-12" key={alert.id}>
              <div
                className={`alert alert-${alert.type} d-flex align-items-center gap-3 shadow-sm border-0 mb-0`}
              >
                <div className="alert-icon rounded-circle bg-white p-2">
                  {alert.type === "danger" && (
                    <BsExclamationCircle className="text-danger" />
                  )}
                  {alert.type === "warning" && (
                    <BsExclamationTriangle className="text-warning" />
                  )}
                  {alert.type === "success" && (
                    <BsCheckCircle className="text-success" />
                  )}
                </div>
                <div className="flex-grow-1">
                  <h6 className="alert-heading mb-1">{alert.title}</h6>
                  <p className="mb-0 small">{alert.description}</p>
                </div>
                <small className="text-muted">{alert.time}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="chart-container p-4 shadow-sm rounded-3 bg-white">
            <h6 className="mb-4">Safety Performance</h6>
            <div style={{ height: "250px" }}>
              <Line data={safetyData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="chart-container p-4 shadow-sm rounded-3 bg-white">
            <h6 className="mb-4">Defect Status</h6>
            <div style={{ height: "250px" }}>
              <Doughnut data={defectData} options={doughnutOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
