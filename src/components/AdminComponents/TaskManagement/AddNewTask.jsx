import React, { useState, useEffect, use } from "react";
import { Form, Button, Row, Col ,Modal} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTasks, updateTask, addTask } from "../../../redux/slices/taskManagement";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUsers } from "../../../redux/slices/userSlice";

const AddNewTask = () => {
  const dispatch = useDispatch();
  const { tasks, loading ,error} = useSelector((state) => state.task);

   const { data: users } = useSelector((state) => state.users);
   console.log(users)

  const { id } = useParams();
  console.log(id)
  const [taskDetails, setTaskDetails] = useState({
    taskTitle: "",
    description: "",
    assignTo: "",
    dueDate: "",
    priority: "High",
    category: "Safety",
    status: "Pending",
  });

  const [categories, setCategories] = useState([
    "Safety",
    "Documentation",
    "Equipment",
    "Quality",
    "Training",
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

useEffect(() => {
  dispatch(fetchUsers());
},[])

  useEffect(() => {
      if (id) {
        dispatch(fetchTasks());
      }
    }, [id, dispatch]);
    
    useEffect(() => {
      if (id && tasks.length > 0) {
        const existingEntry = tasks.find((task) => task._id === id);
        console.log("existing ",existingEntry)
        console.log("assgn", existingEntry.assignTo)
        if (existingEntry) {
          setTaskDetails({
            taskTitle: existingEntry?.taskTitle,
            description: existingEntry?.description,
            assignTo: existingEntry?.assignTo?._id,
            dueDate: existingEntry?.dueDate,
            priority: existingEntry?.priority,
            category: existingEntry?.category,
            status: existingEntry?.status,
          });
        }
      }
    }, [id, tasks]);
  // Handle form submission (Save Task)
  const handleSubmit = (e) => {

    e.preventDefault();

    if( id ) {
      dispatch(updateTask({ id,updatedForm: taskDetails})).unwrap().then(() => {
        toast.success("Task Updated Successfully!");
      })
      .catch(() => {
        toast.error("Failed to update task!");
      });
    }
    else{
      dispatch(addTask(taskDetails)).unwrap().then(() => {
        toast.success("Task Added Successfully!");
        dispatch(fetchTasks()); // Refresh the task list after adding a new task
      })
      .catch(() => {
        toast.error("Failed to add task!");
      });
    }

    console.log("Task Saved:", taskDetails);
    navigate("/TaskDashboard");
  };

  const handleSaveCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory.trim()]);
      setTaskDetails((prev) => ({ ...prev, category: newCategory.trim() }));
      setNewCategory("");
      setShowModal(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <h2> { id ? "Update Task" : "Create New Task"}</h2>
        <button
          onClick={() => navigate(-1)}
          className="btn "
          style={{ backgroundColor: "#0d6efd", color: "white" }}
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
            name="taskTitle"
            value={taskDetails.taskTitle}
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
          <Form.Select name="assignTo" value={taskDetails.assignTo} onChange={handleInputChange}>
            <option value="">Select assignee</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
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
          <div className="d-flex align-items-center">
            <Form.Control
              as="select"
              name="category"
              value={taskDetails.category}
              onChange={handleInputChange}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Control>
            <Button
              variant="success"
              className="ms-2"
              onClick={() => setShowModal(true)}
            >
              <i className="fa fa-plus"></i>
            </Button>
          </div>
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
        <Button variant="primary" onClick={handleSubmit}>
          Save Task
        </Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveCategory}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddNewTask;
