import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { fetchUsers } from "../../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../redux/slices/projectSlice"; // Adjust the import path as necessary
import { apiUrl } from "../../../utils/config";

const EditProjectModal = ({ show, handleClose, project }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);

  console.log(formData);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.data);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/projects/${project._id}`,
        formData
      );
      console.log(response);
      toast.success("Project updated successfully!");
      dispatch(fetchProjects()); // Fetch updated projects list
      handleClose();
      //   refreshData && refreshData(); // optional: refresh project list after update
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update project!");
    }
  };
  console.log(users);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="projectName" className="mb-2">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="assignedTo" className="mb-2">
            <Form.Label>Assigned To</Form.Label>
            <Form.Select
              name="assignedTo"
              value={formData.assignedTo} // should be the user ID
              onChange={handleChange}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="startDate" className="mb-2">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate?.substring(0, 10) || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="endDate" className="mb-2">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate?.substring(0, 10) || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="priority" className="mb-2">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={formData.priority || ""}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="status" className="mb-2">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="description" className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={formData.description || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProjectModal;
