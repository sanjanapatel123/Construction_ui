import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

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

const pieChartData = [
  { name: "< 24 hrs", value: 40, color: "#3366CC" },
  { name: "1-3 days", value: 30, color: "#109618" },
  { name: "3-7 days", value: 20, color: "#FF9900" },
  { name: "> 7 days", value: 10, color: "#DC3912" },
];
function ITPs() {
  const analytics = {
    totalITPs: {
      current: 42,
      lastMonth: 38,
      percentageChange: 10,
    },
    approvalRate: {
      current: 68,
      lastMonth: 62,
      percentageChange: 6,
    },
    pendingITPs: {
      current: 15,
      lastMonth: 18,
      percentageChange: -3,
    },
    submissionMetrics: {
      averageTime: {
        current: 4.2,
        previous: 4.5,
      },
      lateSubmissions: {
        current: 7,
        previous: 9,
      },
      onTimeRate: 93,
    },
  };

  const itemsPerPage = 6;
  const [itpData] = useState([
    {
      id: 1,
      documentName: "Concrete Strength Test",
      status: "Approved",
      assignedTo: { name: "John Smith", initials: "JS" },
      submissionDate: "Apr 10, 2025",
      dueDate: "Apr 25, 2025",
      comments: "All test parameters are within acceptable ranges.",
    },
    {
      id: 2,
      documentName: "Structural Steel Inspection",
      status: "Pending",
      assignedTo: { name: "Emily Johnson", initials: "EJ" },
      submissionDate: "Apr 12, 2025",
      dueDate: "Apr 27, 2025",
      comments: "Waiting for additional documentation from contractor.",
    },
    {
      id: 3,
      documentName: "Electrical Systems Test",
      status: "Under Review",
      assignedTo: { name: "Michael Chen", initials: "MC" },
      submissionDate: "Apr 15, 2025",
      dueDate: "Apr 22, 2025",
      comments: "Some inconsistencies found in the test results.",
    },
    {
      id: 4,
      documentName: "HVAC Performance Test",
      status: "Approved",
      assignedTo: { name: "Sarah Williams", initials: "SW" },
      submissionDate: "Apr 8, 2025",
      dueDate: "Apr 20, 2025",
      comments: "All systems functioning as per specifications.",
    },
    {
      id: 5,
      documentName: "Plumbing Pressure Test",
      status: "Pending",
      assignedTo: { name: "Robert Davis", initials: "RD" },
      submissionDate: "Apr 14, 2025",
      dueDate: "Apr 28, 2025",
      comments: "Awaiting final pressure test results.",
    },
    {
      id: 6,
      documentName: "Fire Safety Inspection",
      status: "Under Review",
      assignedTo: { name: "Jennifer Lee", initials: "JL" },
      submissionDate: "Apr 16, 2025",
      dueDate: "Apr 23, 2025",
      comments: "Some fire extinguishers need replacement.",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedAssignee, setSelectedAssignee] = useState("All Assignees");

  const filteredData = useMemo(() => {
    return itpData.filter((item) => {
      const matchesSearch =
        item.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.comments.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        selectedStatus === "All Statuses" || item.status === selectedStatus;
      const matchesAssignee =
        selectedAssignee === "All Assignees" ||
        item.assignedTo.name === selectedAssignee;
      return matchesSearch && matchesStatus && matchesAssignee;
    });
  }, [itpData, searchQuery, selectedStatus, selectedAssignee]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-success";
      case "Pending":
        return "bg-warning text-dark";
      case "Under Review":
        return "bg-primary";
      default:
        return "bg-secondary";
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      items.push(
        <li key="first" className="page-item">
          <button className="page-link" onClick={() => handlePageChange(1)}>
            1
          </button>
        </li>
      );
      if (startPage > 2) {
        items.push(
          <li key="dots-1" className="page-item disabled">
            <button className="page-link">...</button>
          </li>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <li key="dots-2" className="page-item disabled">
            <button className="page-link">...</button>
          </li>
        );
      }
      items.push(
        <li key="last" className="page-item">
          <button
            className="page-link"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return items;
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between">
        <h4 className="fw-semibold mb-4">ITP Analytics Overview</h4>

        <Link to={"/AddITPs"} className="ms-auto">
          <button
            className="btn  px-3"
            onClick={() => {
              console.log("Redirect to create checklist page");
            }}
            id=""
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <i class="fa-solid fa-plus me-2"></i> New ITPs
          </button>
        </Link>
      </div>
      <div className="row g-4">
        {/* Total ITPs */}
        <div className="col-md-4">
          <div className="card border-0 h-100 bg-primary bg-opacity-10">
            <div className="card-body p-4 ">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="mb-2 text-muted fw-normal">Total ITPs</h6>
                  <h2 className="mb-0 fw-bold text-primary fs-1">
                    {analytics.totalITPs.current}
                  </h2>
                </div>
                <div className="rounded-circle p-3 bg-primary bg-opacity-25">
                  <i className="fas fa-file-alt text-primary fs-4"></i>
                </div>
              </div>
              <div className="text-muted small">
                vs last month: {analytics.totalITPs.lastMonth}
                <span className="ms-2">
                  <i
                    className={`fas fa-arrow-${
                      analytics.totalITPs.percentageChange >= 0
                        ? "up text-success"
                        : "down text-danger"
                    }`}
                  ></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Approval Rate */}
        <div className="col-md-4">
          <div className="card border-0 h-100 bg-success bg-opacity-10">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="mb-2 text-muted fw-normal">Approval Rate</h6>
                  <h2 className="mb-0 fw-bold text-primary fs-1">
                    {analytics.approvalRate.current}%
                  </h2>
                </div>
                <div className="rounded-circle p-3 bg-primary bg-opacity-25">
                  <i className="fas fa-check-circle text-primary fs-4"></i>
                </div>
              </div>
              <div className="text-muted small">
                vs last month: {analytics.approvalRate.lastMonth}%
                <span className="ms-2">
                  <i
                    className={`fas fa-arrow-${
                      analytics.approvalRate.percentageChange >= 0
                        ? "up text-success"
                        : "down text-danger"
                    }`}
                  ></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pending ITPs */}
        <div className="col-md-4">
          <div className="card border-0 h-100 bg-warning bg-opacity-10">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="mb-2 text-muted fw-normal">Pending ITPs</h6>
                  <h2 className="mb-0 fw-bold text-warning fs-1">
                    {analytics.pendingITPs.current}
                  </h2>
                </div>
                <div className="rounded-circle p-3 bg-warning bg-opacity-25">
                  <i className="fas fa-clock text-warning fs-4"></i>
                </div>
              </div>
              <div className="text-muted small">
                vs last month: {analytics.pendingITPs.lastMonth}
                <span className="ms-2">
                  <i
                    className={`fas fa-arrow-${
                      analytics.pendingITPs.percentageChange >= 0
                        ? "up text-success"
                        : "down text-danger"
                    }`}
                  ></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="mt-4 shadow-sm p-3 bg-white rounded-3">
  {/* Filters */}
  <div className="filters-section mb-3">
    <div className="row g-2">
      <div className="col-md-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="col-md-4">
        <select
          className="form-select"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option>All Statuses</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Under Review</option>
        </select>
      </div>
      <div className="col-md-4">
        <select
          className="form-select"
          value={selectedAssignee}
          onChange={(e) => setSelectedAssignee(e.target.value)}
        >
          <option>All Assignees</option>
          <option>John Smith</option>
          <option>Emily Johnson</option>
          <option>Michael Chen</option>
          <option>Sarah Williams</option>
          <option>Robert Davis</option>
          <option>Jennifer Lee</option>
        </select>
      </div>
    </div>
  </div>

  {/* Table */}
  <div className="table-responsive shadow-sm bg-white rounded">
    <table className="table table-bordered table-striped align-middle mb-0">
      <thead className="table-light p-2">
        <tr>
          <th className="ps-4">Document Name</th>
         
          <th>Assigned To</th>
          <th>Submission Date</th>
          <th>Due Date</th>
          <th>Comments</th>
          <th>Status</th>
          <th className="pe-4">Actions</th>
        </tr>
      </thead>
      <tbody className="p-2">
        {paginatedData.map((item) => (
          <tr key={item.id}>
            <td className="ps-4">{item.documentName}</td>
          
            <td>
              <div className="d-flex align-items-center gap-2">
                <div
                  className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "32px", height: "32px" }}
                >
                  {item.assignedTo.initials}
                </div>
                <span>{item.assignedTo.name}</span>
              </div>
            </td>
            <td>{item.submissionDate}</td>
            <td className={item.dueDate.includes("20") ? "text-warning" : ""}>
              {item.dueDate}
            </td>
            <td className="text-muted">{item.comments}</td>
            <td>
              <span className={`badge ${getStatusBadgeClass(item.status)}`}>
                {item.status}
              </span>
            </td>
            <td className="pe-4">
              <div className="d-flex gap-2">
                <button className="btn btn-sm text-primary p-0">
                  <i className="fas fa-eye text-info " style={{fontSize:"15px"}}></i>
                </button>
                <button className="btn btn-sm text-primary p-0">
                  <i className="fas fa-edit text-primary"style={{fontSize:"15px"}}></i>
                </button>
                <button className="btn btn-sm  p-0">
                  <i className="fas fa-trash text-danger" style={{fontSize:"15px"}}></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination */}
  <div className="d-flex justify-content-between align-items-center mt-3">
    <div className="results-counter">
      Showing {startIndex + 1} to{" "}
      {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
      {filteredData.length} results
    </div>
    <nav>
      <ul className="pagination mb-0">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &laquo;
          </button>
        </li>
        {renderPaginationItems()}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  </div>
</div>

      {/* Approval Rate and Submission Metrics */}
      <div className="row mt-4 g-4">
        <div className="col-md-6">
     
            <div className="card p-3 shadow-sm" >
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

        <div className="col-md-6">
          <div className="card border-0 h-100">
            <div className="card-body p-4">
              <h6 className="mb-4 fw-normal">Submission Metrics</h6>
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Average Submission Time</span>
                  <span className="text-success">
                    <i className="fas fa-arrow-up me-1"></i>
                    Previous: {
                      analytics.submissionMetrics.averageTime.previous
                    }{" "}
                    days
                  </span>
                </div>
                <h3 className="mb-0 fw-bold">
                  {analytics.submissionMetrics.averageTime.current} days
                </h3>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Late Submissions</span>
                  <span className="text-success">
                    <i className="fas fa-arrow-up me-1"></i>
                    Previous:{" "}
                    {analytics.submissionMetrics.lateSubmissions.previous}
                  </span>
                </div>
                <h3 className="mb-0 fw-bold">
                  {analytics.submissionMetrics.lateSubmissions.current}
                </h3>
              </div>

              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">On-time Submission Rate</span>
                  <span className="fw-bold">
                    {analytics.submissionMetrics.onTimeRate}%
                  </span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{
                      width: `${analytics.submissionMetrics.onTimeRate}%`,
                    }}
                    aria-valuenow={analytics.submissionMetrics.onTimeRate}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ITP Records Table */}
     

    </div>
  );
}

export default ITPs;
