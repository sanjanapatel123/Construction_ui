import React, { useEffect, useState } from "react";
import { Table, Button, Form, InputGroup, Badge } from "react-bootstrap";
import {
  FaSearch,
  FaFilter,
  FaPaperclip,
  FaUserPlus,
  FaFileExport,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  deleteIncidentReport,
  getIncidentReports,
} from "../../../redux/slices/incidentReportSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const safetyProtocols = [
  { id: 1, text: "Initial containment measures implemented", completed: true },
  { id: 2, text: "Safety team notified", completed: true },
  { id: 3, text: "Model behavior analysis completed", completed: false },
  { id: 4, text: "Mitigation strategy implemented", completed: false },
];
const timelineEvents = [
  {
    id: 1,
    title: "Incident Detected",
    time: "14:30 UTC",
    description: "Automated monitoring system flagged anomalous behavior",
  },
  {
    id: 2,
    title: "Safety Protocols Initiated",
    time: "14:35 UTC",
    description: "Emergency response team activated",
  },
  {
    id: 3,
    title: "Analysis In Progress",
    time: "14:40 UTC",
    description: "Technical team investigating root cause",
  },
];

function IncidentReports() {
  const { reports } = useSelector((state) => state.reports);
  // console.log(reports)
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getIncidentReports());
  }, [dispatch]);

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "low":
        return <span className="badge bg-success">Low</span>;
      case "medium":
        return <span className="badge bg-warning text-dark">Medium</span>;
      case "high":
        return <span className="badge bg-danger">High</span>;
      case "critical":
        return <span className="badge bg-dark">Critical</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteIncidentReport(id))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "Incident has been deleted.", "success");
          })
          .catch((err) => {
            Swal.fire("Error!", err, "error");
          });
      }
    });
  };

  const filteredReports = reports.filter((report) => {
    const incidentType = report?.incidentType?.toLowerCase().trim() || "";
    const location = report?.location?.toLowerCase().trim() || "";
    const search = searchQuery.toLowerCase().trim();
    const selected = selectedType.toLowerCase().trim();

    const matchesSearch =
      incidentType.includes(search) || location.includes(search);
    const matchesType = selected === "all" || incidentType === selected;

    return matchesSearch && matchesType;
  });

  const incidentTypes = [
    ...new Set(reports.map((r) => r.incidentType?.trim())),
  ].filter(Boolean);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-semibold">Incident Reports</h3>

      {/* Search + Filters + New Button */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3 px-2">
        <div className="d-flex flex-wrap gap-3 align-items-center">
          <InputGroup
            style={{ width: "300px" }}
            className="shadow-sm rounded-2"
          >
            <InputGroup.Text className="bg-white border-0 shadow-sm rounded-start">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search incidents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 shadow-sm rounded-end"
            />
          </InputGroup>

          <Form.Select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1);
            }}
            style={{ width: "150px" }}
            className="border-0 shadow-sm rounded"
          >
            <option value="All">All Types</option>
            {incidentTypes.map((type, idx) => (
              <option key={idx} value={type?.trim()}>
                {type}
              </option>
            ))}
          </Form.Select>
          
        </div>

        <Link to="/AddIncidentReports">
          <Button variant="primary" className="shadow-sm px-3 py-2 rounded">
            + New Incident Report
          </Button>
        </Link>
      </div>

      {/* Top Action Buttons */}
      {/* <div className="d-flex flex-wrap gap-2 mb-4 px-2">
        <Button
          variant="outline-secondary"
          size="sm"
          className="border-0 shadow-sm px-3 py-2 rounded"
        >
          <FaPaperclip className="me-1" /> Attach Evidence
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          className="border-0 shadow-sm px-3 py-2 rounded"
        >
          <FaUserPlus className="me-1" /> Assign Investigation
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          className="border-0 shadow-sm px-3 py-2 rounded"
        >
          <FaFileExport className="me-1" /> Export Report
        </Button>
      </div> */}

      {/* Incident Table */}
      <div className="bg-white rounded-3 shadow-sm mb-3 p-2">
        <div className="table-responsive">
          <Table hover className="shadow-sm bg-white mb-0 rounded mt-2">
            <thead className="table-light p-2">
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="p-2">
              {paginatedReports.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Reports Found
                  </td>
                </tr>
              ) : (
                paginatedReports?.map((incident, index) => (
                  <tr key={incident._id}>
                    <td>{index + 1}</td>
                    <td>{incident?.incidentType}</td>
                    <td>{incident?.location}</td>
                    <td>{getSeverityBadge(incident.severityLevel)}</td>
                    <td>{new Date(incident.dateTime).toLocaleString()}</td>
                    <td>
                      {" "}
                      <Button
                        variant="link"
                        className="text-primary p-0"
                        onClick={() => handleDelete(incident._id)}
                      >
                        <i className="fas fa-trash  text-danger"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-end mb-2 mt-3">
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {[...Array(totalPages)].map((_, idx) => (
            <Button
              key={idx}
              size="sm"
              variant={
                currentPage === idx + 1 ? "primary" : "outline-secondary"
              }
              onClick={() => setCurrentPage(idx + 1)}
              className="mx-1"
            >
              {idx + 1}
            </Button>
          ))}

          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      {/* Overview & Checklist */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="bg-white p-4 rounded shadow-sm h-100">
            <h5 className="mb-4 fw-semibold">Incident Overview</h5>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Severity Level:</span>
                <Badge bg="danger" className="rounded-pill">
                  Critical
                </Badge>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Status:</span>
                <Badge bg="warning" text="dark" className="rounded-pill">
                  In Progress
                </Badge>
              </div>
              <div className="mt-3">
                <span className="text-muted">Description:</span>
                <p className="mt-1">
                  Unexpected behavior detected in GPT-4 Large model responses,
                  potentially affecting user safety protocols.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="bg-white p-4 rounded shadow-sm h-100">
            <h5 className="mb-4 fw-semibold">Safety Protocol Checklist</h5>
            <Form>
              {safetyProtocols.map((protocol) => (
                <Form.Check
                  key={protocol.id}
                  type="checkbox"
                  id={`protocol-${protocol.id}`}
                  label={protocol.text}
                  checked={protocol.completed}
                  className="mb-2"
                  disabled
                />
              ))}
            </Form>
          </div>
        </div>
      </div>

      {/* Timeline & Required Actions */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="bg-white p-4 rounded shadow-sm h-100">
            <h5 className="mb-4 fw-semibold">Response Timeline</h5>
            <div className="timeline">
              {timelineEvents.map((event) => (
                <div key={event.id} className="timeline-item mb-3">
                  <div className="d-flex">
                    <div className="timeline-marker me-3">
                      <div className="marker"></div>
                    </div>
                    <div className="timeline-content">
                      <h6 className="mb-1">{event.title}</h6>
                      <small className="text-muted">{event.time}</small>
                      <p className="mb-0 mt-1">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="bg-white p-4 rounded shadow-sm h-100">
            <h5 className="mb-4 fw-semibold">Required Actions</h5>
            {[
              {
                title: "Complete system diagnostic",
                priority: "danger",
                label: "High Priority",
              },
              {
                title: "Update safety parameters",
                priority: "warning",
                label: "Medium Priority",
              },
              {
                title: "Document incident findings",
                priority: "info",
                label: "Low Priority",
              },
            ].map((action, idx) => (
              <div
                key={idx}
                className="action-item mb-3 d-flex justify-content-between align-items-center"
              >
                <h6 className="mb-0">{action.title}</h6>
                <Badge bg={action.priority} className="me-2">
                  {action.label}
                </Badge>
              </div>
            ))}
          </div>

          {/* Compliance Section */}
          <div className="bg-white p-4 rounded shadow-sm mt-4">
            <h5 className="mb-4 fw-semibold">Compliance Status</h5>
            {[
              { label: "Safety Protocols", value: 50 },
              { label: "Documentation", value: 75 },
              { label: "Team Response", value: 90 },
            ].map((item, idx) => (
              <div className="mb-3" key={idx}>
                <div className="d-flex justify-content-between mb-2">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${item.value}%` }}
                    aria-valuenow={item.value}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncidentReports;
