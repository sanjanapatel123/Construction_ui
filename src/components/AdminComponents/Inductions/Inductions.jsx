import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ProgressBar,
} from "react-bootstrap";
import "./Inductions.css";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import {
  deleteInduction,
  fetchInductions,
} from "../../../redux/slices/inductionSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Inductions() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [searchQuery, setSearchQuery] = useState("");
  const { inductions } = useSelector((state) => state.inductions);
  console.log(inductions);

  useEffect(() => {
    dispatch(fetchInductions());
  }, [dispatch]);

  // Filtered Inductions
  const filteredInductions = inductions?.filter((induction) =>
    induction?.fullName?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );
  // delete Inductions
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
        dispatch(deleteInduction(id));
        Swal.fire("Deleted!", "Induction has been deleted.", "success");
      }
    });
  };

  const pieChartData = {
    labels: ["Completed", "Pending", "In Progress"],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: ["#4dabf7", "#dc3545", "#ffc107"],
        borderWidth: 0,
      },
    ],
  };

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Pending Reviews",
        data: [12, 19, 15, 8, 10],
        backgroundColor: "#4dabf7",
      },
    ],
  };

  const horizontalBarData = {
    labels: ["Safety", "Quality", "Process", "Equipment", "Environment"],
    datasets: [
      {
        label: "Compliance Score",
        data: [95, 88, 92, 85, 90],
        backgroundColor: "#4dabf7",
      },
    ],
  };

  const totalPages = Math.ceil(filteredInductions.length / itemsPerPage);

  const paginatedInductions = filteredInductions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container fluid className="py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="fw-bold">Live Induction Tracker</h3>
        <Link to="/AddnewInduction">
          <Button
            style={{ backgroundColor: "#0d6efd", border: "none" }}
            className="d-flex align-items-center shadow p-2"
            onClick={() =>
              document
                .querySelector(".chart-card")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <i className="fas fa-edit me-2 text-white"></i>
            <span className="text-white">Add Induction</span>
          </Button>
        </Link>
      </div>

      {/* User Details Cards */}
      <Row className="mb-5 g-4">
        <Col md={4}>
          <Card className="border-0 shadow h-100">
            <Card.Body>
              <h6 className="fw-semibold mb-2">John Smith</h6>
              <div className="text-muted">
                <small>Role: Electrician</small>
                <br />
                <small>Entered: 09:00 AM</small>
                <br />
                <small>Induction Valid Till: 12/12/2023</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow h-100">
            <Card.Body>
              <h6 className="fw-semibold mb-2">Emily Johnson</h6>
              <div className="text-muted">
                <small>Role: Welder</small>
                <br />
                <small>Entered: 10:15 AM</small>
                <br />
                <small>Induction Valid Till: 10/11/2023</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow h-100">
            <Card.Body>
              <h6 className="fw-semibold mb-2">Michael Brown</h6>
              <div className="text-muted">
                <small>Role: Site Manager</small>
                <br />
                <small>Entered: 08:45 AM</small>
                <br />
                <small>Induction Valid Till: 01/10/2023</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <h5 className="mb-3">Quick Actions</h5>
      <Row className="mb-4 g-4">
        <Col md={6} className="text-center">
          <Link to="/AddnewInduction">
            <Button variant="light" className="w-100 border-0 shadow py-3">
              <i className="fas fa-plus-circle me-2"></i>
              Add New Induction
            </Button>
          </Link>
        </Col>
        <Col md={6} className="text-center">
          <Button variant="light" className="w-100 border-0 shadow py-3">
            <i className="fas fa-robot me-2"></i>
            Generate AI Assisted Report
          </Button>
        </Col>
      </Row>

      {/* Inductions Overview List */}
      <Card className="mb-5 border-0 shadow-sm">
        <Card.Header className="bg-white py-3 border-0">
          <div className="row g-3 align-items-center">
            {/* Heading */}
            <div className="col-12 col-md-4">
              <h5 className="mb-0 fw-semibold text-center text-md-start">
                Inductions Overview
              </h5>
            </div>
            {/* Search + Button Group */}
            <div className="col-12 col-md-8">
              <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-end align-items-stretch gap-2">
                <Form.Control
                  type="text"
                  placeholder="Search inductions..."
                  className="form-control-sm p-3"
                  style={{ backgroundColor: "#f4f5f7", maxWidth: "240px" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <Link to="/AddnewInduction">
                  <Button
                    variant="primary"
                    size="sm"
                    className="d-flex align-items-center gap-2 px-3"
                    style={{ backgroundColor: "#0d6efd" }}
                  >
                    <i className="fas fa-plus text-white"></i>
                    <span className="text-white">Add Induction</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card.Header>

        <Card.Body className="p-2">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Name</th>
                  <th>Contact Number</th>
                  <th>Induction Date</th>
                  <th>siteLocation</th>
                  <th>Access Time</th>
                  <th className="pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInductions && filteredInductions?.length > 0 ? (
                  paginatedInductions?.map((induction, index) => (
                    <tr key={index}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                            style={{ width: "36px", height: "36px" }}
                          >
                            {induction.fullName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-medium">
                              {induction?.fullName}
                            </div>
                            <small className="text-muted">
                              {induction?.emailAddress}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>{induction?.contactNumber}</td>
                      <td>
                        {new Date(induction.inductionDate).toLocaleDateString()}
                      </td>
                      <td>{induction?.siteLocation}</td>
                      <td>
                        {induction.accessStartTime} - {induction.accessEndTime}
                      </td>
                      <td className="pe-4">
                        <div className="d-flex gap-3">
                          <Link to={`/View-Inductions/${induction._id}`}>
                            <Button variant="link" className="text-primary p-0">
                              <i className="fa-solid fa-eye"></i>
                            </Button>
                          </Link>
                          <a
                            href={induction?.image[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="link" className="text-primary p-0">
                              <i className="fa-solid fa-download"></i>
                            </Button>
                          </a>
                          <Button
                            variant="link"
                            className="text-primary p-0"
                            onClick={() => HandleDelete(induction._id)}
                          >
                            <i className="fas fa-trash  text-danger"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No inductions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-end mb-2 mt-2">
            <Button
              size="sm"
              variant="outline-secondary"
              className="me-2"
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
                className="mx-1"
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}

            <Button
              size="sm"
              variant="outline-secondary"
              className="ms-2"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Safety Compliance Overview */}
      <h4 className="mb-4 fw-semibold">Safety Compliance Overview</h4>
      <Row className="g-4">
        <Col md={4}>
          <Card className="border-0 shadow h-100 chart-card">
            <Card.Body>
              <h6 className="mb-3 fw-semibold">Status Distribution</h6>
              <div>
                <Pie
                  data={pieChartData}
                  options={{ maintainAspectRatio: false }}
                  height={200}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow h-100 chart-card">
            <Card.Body>
              <h6 className="mb-3 fw-semibold">Pending Reviews</h6>
              <div>
                <Bar
                  data={barChartData}
                  options={{ maintainAspectRatio: false }}
                  height={200}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow h-100 chart-card">
            <Card.Body>
              <h6 className="mb-3 fw-semibold">Compliance Scores</h6>
              <div>
                <Bar
                  data={horizontalBarData}
                  options={{
                    indexAxis: "y",
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        beginAtZero: true,
                        max: 100,
                      },
                    },
                  }}
                  height={200}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Inductions;
