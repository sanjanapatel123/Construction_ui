import { useState } from "react";
import { Button, Card, Form, Col, Row, Container } from "react-bootstrap";
import { FaMoon, FaBell, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal, ListGroup } from "react-bootstrap"; // Import React Bootstrap components
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS;


const AnnouncementBoard = () => {
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [notifOpen, setNotifOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      title: "Urgent: System Maintenance",
      description:
        "The system will be down for maintenance on April 21st from 10 PM to 2 AM. Please save your work...",
      date: "2025-04-18",
      read: false,
    },
    {
      title: "New Project Kickoff Meeting",
      description:
        "We will be having a kickoff meeting for Project Phoenix on April 25th at 2 PM in Conference Room A.",
      date: "2025-04-17",
      read: false,
    },
  ]);

  // Functions to handle opening and closing of the modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Handle marking all notifications as read
  const handleMarkAllRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };
  const announcements = [
    {
      title: "Company Picnic Next Month",
      date: "2025-04-15 to 2025-05-16",
      description:
        "We are organizing a company picnic on May 15th at Central Park. All employees are invited to join with their families.",
      target: "All Employees",
      priority: "Low",
    },
    {
      title: "Urgent: System Maintenance",
      date: "2025-04-18 to 2025-04-22",
      description:
        "The system will be down for maintenance on April 21st from 10 PM to 2 AM. Please save your work before this time.",
      target: "Engineering Team, Product Team",
      priority: "High",
    },
    {
      title: "New Project Kickoff Meeting",
      date: "2025-04-17 to 2025-04-26",
      description:
        "We will be having a kickoff meeting for Project Phoenix on April 25th at 2 PM in Conference Room A.",
      target: "Project Phoenix Team",
      priority: "Medium",
    },
    // More announcements...
  ];

  return (
    <Container fluid className="p-4">
      <Col className="text-end">
        <div className="d-flex justify-content-end align-items-center gap-3 position-relative">
          {/* Notification Bell */}
          <div className="position-relative">
            <FaBell
              size={22}
              onClick={() => setNotifOpen(!notifOpen)}
              className="text-dark cursor-pointer"
            />
            <span
              className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle"
              style={{ width: "8px", height: "8px" }}
            />

            {/* Notification Dropdown */}
            {notifOpen && (
              <div
                className="position-absolute end-0 mt-2 bg-white border shadow rounded"
                style={{
                  width: "260px",
                  zIndex: 1050,
                }}
              >
                <div className="p-3 border-bottom fw-semibold text-center">
                  Notifications
                </div>
                <ul
                  className="list-unstyled m-0 overflow-auto text-start"
                  style={{ maxHeight: "240px", direction: "ltr" }}
                >
                  <li className="px-3 py-3 border-bottom bg-light rounded mb-2 position-relative">
                    <div className="d-flex align-items-start">
                      <i className="fa-solid fa-bullhorn text-primary me-2 mt-1"></i>
                      <div>
                        <div className="fw-semibold text-dark">
                          Urgent: System Maintenance
                        </div>
                        <div className="small text-muted">
                          The system will be down for maintenance on April 21st
                          from 10 PM to 2 AM. Please save your...
                        </div>
                        <div className="text-muted small mt-1">2025-04-18</div>
                      </div>
                    </div>
                    <span
                      className="position-absolute top-0 end-0 translate-middle p-1 bg-primary rounded-circle"
                      style={{ width: "8px", height: "8px" }}
                    ></span>
                  </li>

                  <li className="px-3 py-3 border-bottom bg-light rounded mb-2 position-relative">
                    <div className="d-flex align-items-start">
                      <i className="fa-solid fa-bullhorn text-primary me-2 mt-1"></i>
                      <div>
                        <div className="fw-semibold text-dark">
                          New Project Kickoff Meeting
                        </div>
                        <div className="small text-muted">
                          We will be having a kickoff meeting for Project
                          Phoenix on April 25th at 2 PM in Conference...
                        </div>
                        <div className="text-muted small mt-1">2025-04-17</div>
                      </div>
                    </div>
                    <span
                      className="position-absolute top-0 end-0 translate-middle p-1 bg-primary rounded-circle"
                      style={{ width: "8px", height: "8px" }}
                    ></span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* New Announcement Button */}
          <Link to="/AddAnnouncements">
            <button
              className="btn px-3"
              style={{ backgroundColor: "#0d6efd", color: "white" }}
            >
              <i className="fa-solid fa-plus me-2"></i> New Announcement
            </button>
          </Link>
        </div>
        {/* Create New Announcement Button */}
      </Col>

      {/* Filter Section */}
      <Row className="mb-4">
        <Col md={3}>
          <Form.Group controlId="priorityFilter">
            <Form.Label>Priority</Form.Label>
            <Form.Control as="select" defaultValue="All">
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="statusFilter">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" defaultValue="All">
              <option>All</option>
              <option>Active</option>
              <option>Scheduled</option>
              <option>Expired</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {/* Announcement Cards */}

      <Row>
        {announcements.slice(0, 6).map((announcement, index) => (
          <Col md={6} lg={4} key={index} className="mb-3">
            <Card className="shadow-sm custom-card h-100">
              <Card.Body>
                <Card.Title>
                  <span
                    className={`badge ${
                      announcement.priority === "High"
                        ? "bg-danger"
                        : announcement.priority === "Medium"
                        ? "bg-warning"
                        : "bg-success"
                    }`}
                  >
                    {announcement.priority}
                  </span>{" "}
                  {announcement.title}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {announcement.date}
                </Card.Subtitle>
                <Card.Text>{announcement.description}</Card.Text>
                <Card.Footer className="text-muted">
                  To: {announcement.target}
                </Card.Footer>
                <div className="d-flex justify-content-between">
                  <Button variant="link" size="sm">
                    Mark as read
                  </Button>
                  <div>
                    <Button variant="" size="sm" className="me-2">
                      <i className="fas fa-edit  text-primary"></i>
                    </Button>
                    <Button variant="" size="sm">
                      <i className="fas fa-trash  text-danger"></i>
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AnnouncementBoard;