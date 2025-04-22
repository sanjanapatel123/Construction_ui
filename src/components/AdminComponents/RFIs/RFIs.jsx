import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import {
  FaClipboard,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const lineChartData = [
  { month: "Jan", Submitted: 20, Resolved: 18 },
  { month: "Feb", Submitted: 30, Resolved: 25 },
  { month: "Mar", Submitted: 40, Resolved: 38 },
  { month: "Apr", Submitted: 50, Resolved: 48 },
  { month: "May", Submitted: 45, Resolved: 42 },
  { month: "Jun", Submitted: 30, Resolved: 28 },
];

const pieChartData = [
  { name: "< 24 hrs", value: 40, color: "#3366CC" },
  { name: "1-3 days", value: 30, color: "#109618" },
  { name: "3-7 days", value: 20, color: "#FF9900" },
  { name: "> 7 days", value: 10, color: "#DC3912" },
];

function RFIs() {
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const stats = [
    {
      number: <FaClipboard size={24} />,
      title: "Total RFIs",
      subtitle: "247",
      color: "primary",
    },
    {
      number: <FaClock size={24} />,
      title: "Pending",
      subtitle: "32",
      color: "warning",
    },
    {
      number: <FaCheckCircle size={24} />,
      title: "Resolve",
      subtitle: "189",
      color: "success",
    },
    {
      number: <FaExclamationCircle size={24} />,
      title: "Overdue",
      subtitle: "26",
      color: "danger",
    },
  ];

  return (
    <div className="">
      {/* Dashboard Section */}
      <div className="container py-4">
        <h2 className="mb-4">RFI </h2>

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
        {/* Top Stats Cards */}

        <div className="table-responsive mt-5 mb-4 bg-white p-3 rounded-2">
  <table className="table table-hover align-middle">
    <thead className="mt-4 ">
      <tr>
        <th className="ps-4">ID</th>
        <th>Subject</th>
        <th>Status</th>
        <th>Assignee</th>
        <th className="pe-4">Due Date</th>
      </tr>
    </thead>
    <tbody>
      <tr className="py-3">
        <td className="fw-semibold ps-4 py-3">RFI-2024-001</td>
        <td className="py-3">Structural Support Details</td>
        <td className="py-3">
          <span className="badge bg-warning text-dark">Pending</span>
        </td>
        <td className="py-3">Sarah Johnson</td>
        <td className="pe-4 py-3">Mar 15, 2024</td>
      </tr>
      <tr className="py-3">
        <td className="fw-semibold ps-4 py-3">RFI-2024-002</td>
        <td className="py-3">HVAC System Specifications</td>
        <td className="py-3">
          <span className="badge bg-success">Approved</span>
        </td>
        <td className="py-3">Mike Chen</td>
        <td className="pe-4 py-3">Mar 18, 2024</td>
      </tr>
      <tr className="py-3">
        <td className="fw-semibold ps-4 py-3">RFI-2024-003</td>
        <td className="py-3">Material Substitution Request</td>
        <td className="py-3">
          <span className="badge bg-danger">Rejected</span>
        </td>
        <td className="py-3">David Wilson</td>
        <td className="pe-4 py-3">Mar 20, 2024</td>
      </tr>
    </tbody>
  </table>

  {/* Pagination */}
  <div className="d-flex justify-content-end">
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
</div>

        {/* Charts Section */}
        <div className="row mb-4 g-4">
          <div className="col-md-8">
            <div className="card p-3 shadow-sm">
              <h5 className="mb-4">RFI Trends</h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Submitted"
                    stroke="#3366CC"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Resolved"
                    stroke="#109618"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5 className="mb-4">Resolution Time</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={50}
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* RFI Reports Section */}
      <section className="bg-white rounded shadow-sm p-4">
  <div className="row align-items-center mb-4 g-3">
    {/* Heading */}
    <div className="col-12 col-md-4">
      <h2 className="h5 fw-semibold mb-0 text-center text-md-start">RFIs Reports</h2>
    </div>

    {/* Filters + Button */}
    <div className="col-12 col-md-8">
      <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search defects..."
          style={{ minWidth: "180px" }}
        />
        <select className="form-select" style={{ minWidth: "140px" }}>
          <option>All Subject</option>
          <option>Structural</option>
          <option>HVAC</option>
          <option>Material</option>
        </select>
        <input
          type="date"
          className="form-control"
          style={{ minWidth: "150px" }}
        />
        <select
          className="form-select filter-select"
          value={selectedStatus}
          onChange={handleStatusChange}
          style={{ minWidth: "140px" }}
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
        <Link to="/AddRFIs">
          <button className="btn btn-primary text-nowrap" style={{ minWidth: "120px" }}>
            <i className="fa-solid fa-plus me-2"></i> New RFI
          </button>
        </Link>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}

export default RFIs;
