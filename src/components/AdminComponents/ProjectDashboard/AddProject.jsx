import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Adjust the import path as necessary
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../redux/slices/projectSlice";
import {  fetchUsers  } from "../../../redux/slices/userSlice"; // Adjust the import path as necessary
import axiosInstance from "../../../utils/axiosInstance";
import { apiUrl } from "../../../utils/config";

const AddProject = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: "",
    assignedTo: "",
    startDate: "",
    endDate: "",
    status: "",
    priority: "",
    description: "",
    Progress: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.data);

  useEffect(() => {
    dispatch( fetchUsers ());
  }, [dispatch]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle progress slider change
  const handleProgressChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      Progress: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(`${apiUrl}/projects`, formData);
      console.log("Project Created:", response.data);
      toast.success("Project created successfully!");
      dispatch(fetchProjects()); // Fetch updated projects list
      navigate("/ProjectDashboard"); // Redirect to the projects overview page
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project!");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Add New Project</h3>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          <i class="fa-solid fa-arrow-left me-2"></i> Back to Overview
        </button>
      </div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Assigned To</Form.Label>
          <Form.Select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Delayed</option>
            </Form.Control>
          </Col>
          <Col md={6}>
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option>Medium</option>
              <option>High</option>
              <option>Low</option>
            </Form.Control>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Progress</Form.Label>
          <Form.Control
            type="range"
            min="0"
            max="100"
            step="1"
            name="Progress"
            value={formData.Progress}
            onChange={handleProgressChange}
          />
          <Form.Text>{formData.Progress}%</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter project description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit}>
          Add Project
        </Button>
        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default AddProject;
