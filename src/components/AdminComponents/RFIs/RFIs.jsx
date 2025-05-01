import React, { useEffect, useState } from "react";
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
import { deleteRFI, fetchRFI } from "../../../redux/slices/rfiSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/axiosInstance";
import { Modal } from "react-bootstrap";

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
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { rfi } = useSelector((state) => state.rfi);

  useEffect(() => {
  
    dispatch(fetchRFI());
  }, [dispatch]);

  const HandleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteRFI(id));
        Swal.fire("Deleted!", "Your RFI has been deleted.", "success");
      }
    });
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

  const handleSubmit = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "https://constructionaimicroservice-production.up.railway.app/rfi_suggestions",
        {
          question: question,
        }
      );
      setSuggestion(response.data.rfi_suggestion || "No suggestion returned.");
    } catch (error) {
      console.error("Error fetching suggestion:", error);
      setSuggestion("Error fetching suggestion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
        <div className="d-flex justify-content-between align-items-center mt-4">
          <h4 className="fw-semibold">RFI</h4>

          <div className="d-flex gap-2">
            <button
              className="btn px-3"
              onClick={() => setIsOpen(true)}
              style={{ backgroundColor: "#0d6efd", color: "white" }}
            >
              {" "}
              Ask RFI Question
            </button>
            <Link to={"/AddRFIs"}>
              <button
                className="btn px-3"
                style={{ backgroundColor: "#0d6efd", color: "white" }}
              >
                <i className="fa-solid fa-plus me-2"></i> New RFI
              </button>
            </Link>
          </div>
        </div>

        <Modal
          show={isOpen}
          onHide={() => setIsOpen(false)}
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Ask a Question</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., What are the specs for fire-resistant cables?"
              className="form-control mb-3"
            />

            <button
              onClick={handleSubmit}
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>

            {suggestion && (
              <div
                className="mt-3 bg-light p-3 rounded text-muted"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {suggestion}
              </div>
            )}
          </Modal.Body>
        </Modal>
        <div className="table-responsive mt-5 mb-4 bg-white p-3 rounded-2">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th className="ps-4">ID</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Assignee</th>
                <th className="pe-4">Due Date</th>
                <th className="pe-4">Priority</th>
                <th className="pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {rfi && rfi.length > 0 ? (
                rfi.map((item, index) => (
                  <tr key={item._id} className="py-3">
                    <td className="fw-semibold ps-4 py-3">{index + 1}</td>
                    <td className="py-3">{item.subject}</td>
                    <td className="py-3">
                      <span
                        className={`badge ${
                          item.status === "pending"
                            ? "bg-warning text-dark"
                            : item.status === "approved"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3">{item.assignee}</td>
                    <td className="pe-4 py-3">
                      {new Date(item.due_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="pe-4 py-3">
                      <span
                        className={`badge ${
                          item.priority === "High"
                            ? "bg-danger"
                            : item.priority === "Medium"
                            ? "bg-warning"
                            : "bg-success"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td>
                      <div>
                        <Button variant="light" size="sm" className="me-2">
                          {" "}
                          <i className="fas fa-edit text-primary"></i>{" "}
                        </Button>
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => HandleDelete(item._id)}
                        >
                          <i className="fas fa-trash text-danger"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-3">
                    No RFIs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination (static for now, dynamic karni ho toh boliyo) */}
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
    </div>
  );
}

export default RFIs;
