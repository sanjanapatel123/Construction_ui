// import React from 'react'
// import { Link } from 'react-router-dom';

// function Announcements() {
//     const announcements = [
//         {
//           title: "Site Safety Protocol Update",
//           author: "John Smith",
//           time: "2 hours ago",
//           text: "New safety protocols will be implemented starting next week. All workers must attend the briefing session on Monday at 8 AM.",
//           likes: 12,
//           comments: 8,
//           tag: "Important",
//           tagColor: "danger",
//         },
//         {
//           title: "Project Timeline Update",
//           author: "Sarah Johnson",
//           time: "1 day ago",
//           text: "Phase 2 completion date has been adjusted due to weather conditions. New completion date is set for July 15th.",
//           likes: 8,
//           comments: 5,
//           tag: "Update",
//           tagColor: "primary",
//         },
//         {
//           title: "Equipment Maintenance Schedule",
//           author: "Mike Wilson",
//           time: "2 days ago",
//           text: "Monthly equipment maintenance is scheduled for this weekend. Please ensure all machinery is properly stored.",
//           likes: 15,
//           comments: 3,
//           tag: "Notice",
//           tagColor: "success",
//         },
//       ];

//     return (
//     <div className="container py-4" style={{ fontFamily: "Inter, sans-serif" }}>
//     <div className="d-flex justify-content-between align-items-center mb-3">
//       <h4 className="fw-bold mb-0">Recent Announcements</h4>
//      <Link to={"/AddAnnouncements"} ><button id='btn_itp' className="btn btn-dark px-4 py-2"><i class="fa-solid fa-plus me-2"></i> New Announcement</button></Link>
//     </div>

//     <div className="alert alert-secondary text-truncate mb-4" role="alert" style={{ maxWidth: "100%", whiteSpace: "nowrap", backgroundColor: "#f8f9fa", border: "1px solid #e9ecef" }}>
//       New safety protocols will be implemented starting next week. All workers must attend the briefing session on Monday at 8 A.M...
//     </div>

//     {announcements.map((item, index) => (
//       <div className="card mb-3 border-0 shadow-sm" key={index} style={{ borderRadius: "8px", transition: "all 0.2s ease-in-out", ':hover': { transform: "translateY(-2px)", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" } }}>
//         <div className="card-body d-flex justify-content-between flex-column flex-md-row gap-3" style={{ padding: "1.5rem" }}>
//           <div>
//             <h5 className="card-title fw-semibold">{item.title}</h5>
//             <p className="text-muted small mb-1">Posted by {item.author} • {item.time}</p>
//             <p className="card-text">{item.text}</p>
//             <div className="d-flex gap-3 mt-2 text-muted" style={{ fontSize: "0.875rem" }}>
//               <span><i className="far fa-thumbs-up me-1"></i>{item.likes}</span>
//               <span><i className="far fa-comment me-1"></i>{item.comments}</span>
//             </div>
//           </div>
//           <div className="text-md-end">
//             <span className={`badge mb-2`} style={{ fontSize: "0.75rem", fontWeight: "500", backgroundColor: item.tagColor === 'danger' ? '#ffebee' : item.tagColor === 'primary' ? '#e3f2fd' : '#e8f5e9', color: item.tagColor === 'danger' ? '#f44336' : item.tagColor === 'primary' ? '#2196f3' : '#4caf50' }}>{item.tag}</span>
//             <br />
//             <button className="btn btn-link text-decoration-none p-0 text-primary" style={{ fontSize: "0.875rem" }}>Read More</button>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
//   )
// }

// export default Announcements

import { useState } from "react";
import { Button, Card, Form, Col, Row, Container } from "react-bootstrap";
import { FaMoon, FaBell, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal, ListGroup } from "react-bootstrap"; // Import React Bootstrap components
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

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
        {/* Notification Bell Icon */}

        {/* Modal for Notifications */}

        {/* <div className="relative">
          <FaBell
            size={22}
            onClick={() => setNotifOpen(!notifOpen)}
            className="text-gray-600 cursor-pointer"
          />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg rounded-md z-50">
              <div className="p-4 font-medium border-b dark:border-gray-600">
                Notifications
              </div>
              <ul className="max-h-60 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
                <li className="px-4 py-2 text-black hover:text-gray-100 dark:hover:bg-teal-700">
                  📢 New course added!
                </li>
                <li className="px-4 py-2 text-black hover:text-gray-100 dark:hover:bg-teal-700">
                  🎉 You got a badge!
                </li>
                <li className="px-4 py-2 text-black hover:text-gray-100 dark:hover:bg-teal-700">
                  🔔 Reminder: Complete your profile
                </li>
              </ul>
            </div>
          )}
        </div> */}

        <div className="d-flex justify-content-between">
          <h4 className="fw-semibold mb-4">Announcement</h4>

          <Link to={"/AddAnnouncements"} className="ms-auto">
            <button
              className="btn  px-3"
              onClick={() => {
                console.log("Redirect to create checklist page");
              }}
              id=""
              style={{ backgroundColor: "#0d6efd", color: "white" }}
            >
              <i class="fa-solid fa-plus me-2"></i> New Announcement
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
                    <Button
                      variant=""
                      size="sm"
                      className="me-2"
                    >
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
