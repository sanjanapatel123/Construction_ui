import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../../utils/config";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

function AddToolboxTalks() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    presenter: "",
    participants: [],
    description: "",
    status: "", // default status
    image: null,
  });

    const Navigate = useNavigate();
  const [workersList, setWorkersList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(
        `${apiUrl}/users` 
        );
        setWorkersList(response.data.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);
  console.log(workersList);

  // Handle change for normal inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle participants (multiple select)
  const handleParticipantsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prevData) => ({
      ...prevData,
      participants: selectedOptions,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("date", formData.date);
      payload.append("time", formData.time);
      payload.append("presenter", formData.presenter);
      payload.append("participants", formData.participants.join(", "));
      payload.append("description", formData.description);
      payload.append("status", formData.status);
      if (formData.image) {
        payload.append("image", formData.image);
      }
      console.log(payload);
      const response = await axiosInstance.post(`${apiUrl}/toolbox`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Toolbox Talk Created Successfully:", response.data);
      toast.success("Toolbox Talk Created Successfully!");
      Navigate("/toolbox"); // Redirect to the toolbox page after successful creation
    } catch (error) {
      console.error("Error creating Toolbox Talk:", error.response || error);
      toast.error("Failed to create Toolbox Talk.");
    }
  };

  return (
    <div className="container mt-2">
      <div className="mx-auto">
        <Form
          className="p-4 border rounded bg-white shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="d-flex justify-content-between">
            <h4 className="mb-4 fw-semibold">Create New Toolbox Talk</h4>
            <Link to="/toolbox">
              <button
                className="btn"
                style={{ backgroundColor: "#0d6efd", color: "white" }}
              >
                <i className="fa-solid fa-arrow-left me-2"></i>Back
              </button>
            </Link>
          </div>
          <Row className="mb-3">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="E.g., Safe Lifting Techniques"
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  aria-label="Select status"
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label className="fw-semibold">Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="fw-semibold">Time</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label className="fw-semibold">Presenter</Form.Label>
                <Form.Select
                  name="presenter"
                  value={formData.presenter}
                  onChange={handleChange}
                >
                  <option value="">Select Presenter</option>
                  {workersList.map((worker) => (
                    <option
                      key={worker._id}
                      value={worker._id}
                    >
                      {worker.firstName} {worker.lastName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="fw-semibold">Participants</Form.Label>
                <Form.Select
                  multiple
                  style={{ height: "122px" }}
                  value={formData.participants}
                  onChange={handleParticipantsChange}
                >
                  {workersList.map((worker) => (
                    <option
                      key={worker._id}
                     value={worker._id}
                    >
                      {worker.firstName} {worker.lastName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              Description & Objectives
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add objectives & key discussion points"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Attachments</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </Form.Group>

          {/* Optional: Checkbox for Mandatory Attendance */}
          {/* <Form.Group className="form-check mb-4">
            <Form.Check
              type="checkbox"
              label="Mark as Mandatory Attendance"
              className="fw-semibold"
            />
          </Form.Group> */}

          <div className="d-flex justify-content-end">
            <Button variant="light" className="me-2 px-4" type="button">
              Cancel
            </Button>
            <Button variant="primary" className="px-4" type="submit">
              Save & Schedule
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddToolboxTalks;
