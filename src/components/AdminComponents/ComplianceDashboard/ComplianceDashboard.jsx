import React from "react";
import { Row, Col, Card, Button, Table } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { BsPlusCircle, BsUpload, BsPersonPlus } from "react-icons/bs"; // Added missing imports
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

const ComplianceDashboard = () => {
  // Sample Data for Workforce Compliance
  const workers = [
    {
      name: "John Smith",
      id: "WD 2015-1234",
      hours: "120 hours",
      supervisor: "Mike Johnson",
      status: "Complete",
    },
    {
      name: "Sarah Smith",
      id: "WD 2021-2324",
      hours: "65 hours",
      supervisor: "Mike Chen",
      status: "Not Complete",
    },
    {
      name: "David Brown",
      id: "WD 2012-6543",
      hours: "80 hours",
      supervisor: "Luke Chen",
      status: "Complete",
    },
    {
      name: "Emily Davis",
      id: "WD 2012-8467",
      hours: "160 hours",
      supervisor: "Lisa Chen",
      status: "Complete",
    },
    {
      name: "Michael Wilson",
      id: "WD 2015-9876",
      hours: "43 hours",
      supervisor: "Robert Taylor",
      status: "Not Complete",
    },
  ];

  const stats = [
    {
      number: "85%",
      title: "Equipment Inspections",
      subtitle: "3 Inspections Needed",
      color: "primary",
    },
    {
      number: "92%",
      title: "Worker Certification",
      subtitle: "1 Certification Expiring Soon",
      color: "info",
    },
    {
      number: "78%",
      title: "Safety Compliance",
      subtitle: "2 Safety Improvements Needed",
      color: "danger",
    },
    {
      number: "95%",
      title: "Safe Access Hours",
      subtitle: "1,345 Hours Logged",
      color: "success",
    },
  ];

  const activityData = [
    { date: "Apr 12", count: 3 },
    { date: "Apr 13", count: 5 },
    { date: "Apr 14", count: 6 },
    { date: "Apr 15", count: 8 },
    { date: "Apr 16", count: 7 },
    { date: "Apr 17", count: 6 },
    { date: "Apr 18", count: 4 },
  ];

  const certificationData = { current: 60, expiringSoon: 25, missing: 15 };

  return (
    <div className="container mt-4">
      {/* Top Stats Section */}
      <h3 className="mb-4">Quality Compliance</h3>
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



      <Row>
  <Col>
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title>Workforce Compliance</Card.Title>
          <Link to={"/AddNewWorker"}>
            <Button
              size="sm"
              style={{ backgroundColor: "#0d6efd", color: "white", padding: "10px" }}
            >
              + Add Worker
            </Button>
          </Link>
        </div>

        <div className="table-responsive shadow-sm bg-white rounded">
          <Table className="mb-0 table-bordered table-striped align-middle">
            <thead className="table-light p-2">
              <tr>
                <th className="ps-4">Worker Name</th>
                <th>With Card Number</th>
                <th>Safe Access Hours</th>
                <th>Supervisor</th>
                <th>Status</th>
                <th className="pe-4">Actions</th>
              </tr>
            </thead>
            <tbody className="p-2">
              {workers.map((worker, index) => (
                <tr key={index}>
                  <td className="ps-4">{worker.name}</td>
                  <td>{worker.id}</td>
                  <td>{worker.hours}</td>
                  <td>{worker.supervisor}</td>
                  <td>
                    <span
                      className={`badge ${
                        worker.status === "Complete"
                          ? "bg-success"
                          : "bg-warning"
                      }`}
                    >
                      {worker.status}
                    </span>
                  </td>
                  <td className="pe-4">
                    <div className="d-flex gap-2">
                      <button className="btn text-primary p-0">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button className="btn text-danger p-0">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  </Col>
</Row>

      {/* Certification Distribution Chart */}
      <div className="stats-card p-3 mb-4 shadow rounded-3 bg-white mt-3">
        <h6 className="mb-3">Quick Actions</h6>
        <div className="d-flex flex-column gap-3">
          <Link to="/AddITPs">
            <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm p-3 w-100 rounded-3">
              <BsPlusCircle className="text-white" />
              <span>Add New ITPs</span>
            </button>
          </Link>
          <Link to="/AddChecklists">
            <button className="btn w-100 btn-warning text-white d-flex align-items-center gap-2 shadow-sm p-3 rounded-3">
              <BsUpload className="text-white" />
              <span>Upload Incident Checklists</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Document Activity Graph */}
      <Row className="mb-4">
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">Document Activity</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">
                Certification Distribution
              </Card.Title>
              <div className="d-flex justify-content-center">
                <div style={{ width: "300px", height: "300px" }}>
                  <CircularProgressbar
                    value={certificationData.current}
                    text={`${certificationData.current}%`}
                    styles={buildStyles({
                      pathColor: "#4CAF50",
                      textColor: "#4CAF50",
                      trailColor: "#e0e0e0",
                    })}
                  />
                  <div className="mt-3 text-center">
                    <span>Current</span>
                  </div>
                </div>
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                    marginLeft: "20px",
                  }}
                >
                  <CircularProgressbar
                    value={certificationData.expiringSoon}
                    text={`${certificationData.expiringSoon}%`}
                    styles={buildStyles({
                      pathColor: "#FFC107",
                      textColor: "#FFC107",
                      trailColor: "#e0e0e0",
                    })}
                  />
                  <div className="mt-3 text-center">
                    <span>Expiring Soon</span>
                  </div>
                </div>
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                    marginLeft: "20px",
                  }}
                >
                  <CircularProgressbar
                    value={certificationData.missing}
                    text={`${certificationData.missing}%`}
                    styles={buildStyles({
                      pathColor: "#F44336",
                      textColor: "#F44336",
                      trailColor: "#e0e0e0",
                    })}
                  />
                  <div className="mt-3 text-center">
                    <span>Missing</span>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Workforce Compliance Table */}
     
    </div>
  );
};

export default ComplianceDashboard;
