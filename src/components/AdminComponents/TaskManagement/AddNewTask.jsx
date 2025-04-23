import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddNewTask = () => {
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    priority: "High",
    category: "Safety",
    status: "Pending",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  // Handle form submission (Save Task)
  const handleSaveTask = () => {
    console.log("Task Saved:", taskDetails);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <h2>Create New Task</h2>
        <button
          onClick={() => navigate(-1)}
          className="btn "style={{backgroundColor:"#0d6efd",color:"white"}}
        >
         <i class="fa-solid fa-arrow-left me-2"></i> Back to Overview
        </button>
      </div>
      <Form>
        {/* Task Title */}
        <Form.Group className="mb-3">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            name="title"
            value={taskDetails.title}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Task Description */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter task description"
            name="description"
            value={taskDetails.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Assigned To */}
        <Form.Group className="mb-3">
  <Form.Label>Assigned To</Form.Label>
  <Form.Select
    name="assignedTo"
   
  >
    <option value="">Select assignee</option>
    <option value="John Doe">John Doe</option>
    <option value="Jane Smith">Jane Smith</option>
    <option value="Alex Johnson">Alex Johnson</option>
    {/* Add more options as needed */}
  </Form.Select>
</Form.Group>


        {/* Due Date */}
        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={taskDetails.dueDate}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Priority */}
        <Form.Group className="mb-3">
          <Form.Label>Priority</Form.Label>
          <Row>
            <Col>
              <Form.Check
                type="radio"
                label="High"
                name="priority"
                value="High"
                checked={taskDetails.priority === "High"}
                onChange={handleInputChange}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Medium"
                name="priority"
                value="Medium"
                checked={taskDetails.priority === "Medium"}
                onChange={handleInputChange}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Low"
                name="priority"
                value="Low"
                checked={taskDetails.priority === "Low"}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
        </Form.Group>

        {/* Category */}
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={taskDetails.category}
            onChange={handleInputChange}
          >
            <option>Safety</option>
            <option>Documentation</option>
            <option>Equipment</option>
            <option>Quality</option>
            <option>Training</option>
          </Form.Control>
        </Form.Group>

        {/* Status */}
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={taskDetails.status}
            onChange={handleInputChange}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </Form.Control>
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" onClick={handleSaveTask}>
          Save Task
        </Button>
      </Form>
    </div>
  );
};

export default AddNewTask;
