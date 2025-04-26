import { Button, Card, Form, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { deleteAnnouncement, fetchAnnouncements } from "../../../redux/slices/announcementSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const AnnouncementBoard = () => {
  const dispatch = useDispatch();
  const { announcements } = useSelector((state) => state.announcements);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  const HandleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAnnouncement(id)).then(() => {
          Swal.fire("Deleted!", "Announcement has been deleted.", "success");
        });
      }
    });
  };

  // Filter announcements by priority and search query
  const filteredAnnouncements = announcements?.filter((announcement) => {
    const matchesPriority =
      priorityFilter === "All" || announcement.priorityLevel === priorityFilter;
    const matchesSearch =
      announcement?.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      announcement?.message?.toLowerCase()?.includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Announcements</h4>
        <Link to={"/AddAnnouncements"}>
          <button
            className="btn px-3"
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <i className="fa-solid fa-plus me-2"></i> New Announcement
          </button>
        </Link>
      </div>

      {/* Filter and Search Section */}
      <Row className="mb-4">
        <Col md={3}>
          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Announcement Cards */}
      <Row>
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement, index) => (
            <Col md={6} lg={4} key={index} className="mb-3">
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex align-items-center mb-2">
                    <span className={`badge me-2 ${ announcement.priorityLevel === "High"
                          ? "bg-danger"
                          : announcement.priorityLevel === "Medium"
                          ? "bg-warning text-dark"
                          : "bg-success" }`}>
                      {announcement.priorityLevel}
                    </span>
                    <Card.Title className="mb-0">{announcement.title}</Card.Title>
                  </div>

                  <Card.Text className="mb-2">
                    <strong>Start Date:</strong> {announcement.startDate}
                    <br />
                    <strong>End Date:</strong> {announcement.EndDate}
                  </Card.Text>

                  <Card.Text>{announcement.message}</Card.Text>

                  <div className="d-flex justify-content-between mt-3">
                    <Button variant="link" size="sm">
                      Mark as read
                    </Button>
                    <div>
                    <Link to={`/EditAnnouncements/${announcement._id}`}>  <Button variant="light" size="sm" className="me-2"> <i className="fas fa-edit text-primary"></i> </Button></Link>
                      <Button  variant="light"  size="sm" onClick={() => HandleDelete(announcement._id)}>
                        <i className="fas fa-trash text-danger"></i>
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <div className="text-center py-5 text-muted">
              <i className="fas fa-info-circle fa-2x mb-3"></i>
              <p>No announcements found.</p>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default AnnouncementBoard;
