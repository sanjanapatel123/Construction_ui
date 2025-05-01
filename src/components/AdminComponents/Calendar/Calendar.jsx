

import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Card,
  ButtonGroup,
  Image,
} from "react-bootstrap";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../redux/slices/projectSlice";
import { fetchTasks, addTask } from "../../../redux/slices/calendarSlice";
// import { fetchUsers } from "../../../redux/slices/usersSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUsers } from "../../../redux/slices/userSlice";

dayjs.extend(isoWeek);

const App = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState("Month");
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [currentWeekStart, setCurrentWeekStart] = useState(dayjs().startOf("isoWeek")); // Monday if ISO Week preferred
  const [show, setShow] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const today = dayjs().format("YYYY-MM-DD");

  // Get projects from Redux store
  const { data: projects, loading: projectsLoading } = useSelector((state) => state.projects);
  console.log("projects" ,projects)
  
  // Get calendar tasks from Redux store with better error handling
  const { calendartask, loading: tasksLoading, error: tasksError } = useSelector((state) => state.calendar || {});

  const calendars = calendartask?.calendars || [];

  console.log("calendars" ,calendars)

   const { data: users, loading: usersLoading, error } = useSelector((state) => state.users);


  console.log("users" ,users)
  const userslist = users || [];
  
  useEffect(() => {
    
    dispatch(fetchTasks())
  }, [dispatch]);

 
  
  
  useEffect(() => {
  {
     dispatch(fetchProjects());
      dispatch(fetchUsers());
    }
  }, []);

  const [filters, setFilters] = useState({ project: "All", type: "All" });

  const [milestones] = useState([
    { title: "Foundation Work Completion", project: "Project A", dueIn: 5 },
    { title: "Steel Structure Installation", project: "Project B", dueIn: 2 },
  ]);

  const [newTask, setNewTask] = useState({
    taskTitle: "",
    description: "",
    startDate: "",
    endDate: "",
    assignTeamMembers: [],
    reminders: today, // Initialize reminder as today's date
    image: [],
    color: "#0d6efd", // Changed from "primary" to hex color
    project: "",
    taskType: "Task", // Changed from 'type' to match API response
  });

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setNewTask({
      taskTitle: "",
      description: "",
      startDate: "",
      endDate: "",
      assignTeamMembers: [],
      reminders: today, 
      image: [],
      color: "#0d6efd",
      project: "",
      taskType: "Task",
    });
  };

  const handleShowTaskDetails = (task) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  const handleCloseTaskDetails = () => {
    setShowTaskDetails(false);
    setSelectedTask(null);
  };

  const handleAddTask = async () => {
    try {
      // Create FormData object
      const formData = new FormData();
      
      // Add basic text fields
      formData.append('taskTitle', newTask.taskTitle);
      formData.append('description', newTask.description);
      formData.append('startDate', newTask.startDate);
      formData.append('endDate', newTask.endDate);
      formData.append('color', newTask.color);
      
      // Convert the project field to a string if it's not already
      formData.append('project', String(newTask.project));
      
      formData.append('taskType', newTask.taskType);
  
      // Handle arrays properly by converting to JSON strings
      // formData.append('assignTeamMembers[]', String(newTask.assignTeamMembers));
      newTask.assignTeamMembers.forEach(member => {
        formData.append('assignTeamMembers[]', member);
      });
      
      
      // Handle reminders as date
      formData.append('reminders', newTask.reminders);
  
      // Handle file uploads
      if (newTask.image && newTask.image.length > 0) {
        newTask.image.forEach((file) => {
          formData.append('image', file);
        });
      }
  
  
      console.log("Sending task data:", {
        taskTitle: newTask.taskTitle,
        description: newTask.description,
        startDate: newTask.startDate,
        endDate: newTask.endDate,
        project: String(newTask.project),
        taskType: newTask.taskType,
        assignTeamMembers: newTask.assignTeamMembers,
        reminders: newTask.reminders
      });
  
      // Dispatch the action with FormData
      await dispatch(addTask(formData)).unwrap()
      .then(() => {
        toast.success("Task Added Successfully!");
     
      })
      .catch(() => {
        toast.error( error.message || "Failed to add task!");
      
      })
      
      // Refresh tasks and close modal on success
     
      
    } catch (error) {
      console.error('Failed to add task:', error);
      // Show error message to user
      dispatch(fetchTasks());
      handleClose();
      toast.error( error.message || "Failed to add task!");
    }
  };

  const getTasksForDate = (date) => {
    if (!Array.isArray(calendars)) {
      console.error("calendars is not an array:", calendars);
      return [];
    }
    
    // Format the current date in YYYY-MM-DD
    const formattedDate = date.format("YYYY-MM-DD");
    
    return calendars.filter((task) => {
      // Extract the date part from startDate (which is in ISO format)
      const taskDate = task.startDate ? task.startDate.split('T')[0] : null;
      
      const projectMatch = filters.project === "All" || filters.project === task.project;
      const typeMatch = filters.type === "All" || filters.type === task.taskType;
      
      return taskDate === formattedDate && projectMatch && typeMatch;
    });
  };

  const generateCalendar = () => {
    const calendar = [];

    if (view === "Month") {
      const daysInMonth = currentMonth.daysInMonth();
      const startOfMonth = currentMonth.startOf("month");

      for (let day = 0; day < daysInMonth; day++) {
        calendar.push(startOfMonth.add(day, "day"));
      }
    } else if (view === "Week") {
      for (let i = 0; i < 7; i++) {
        calendar.push(currentWeekStart.add(i, "day"));
      }
    }

    return calendar;
  };

  const goToPrevious = () => {
    if (view === "Month") {
      setCurrentMonth(currentMonth.subtract(1, "month"));
    } else {
      setCurrentWeekStart(currentWeekStart.subtract(1, "week"));
    }
  };

  const goToNext = () => {
    if (view === "Month") {
      setCurrentMonth(currentMonth.add(1, "month"));
    } else {
      setCurrentWeekStart(currentWeekStart.add(1, "week"));
    }
  };

  // Get color class based on hex color
  const getColorClass = (hexColor) => {
    if (!hexColor) return "primary";
    
    // Map common hex colors to Bootstrap classes
    const colorMap = {
      "#0d6efd": "primary",
      "#198754": "success", 
      "#ffc107": "warning",
      "#dc3545": "danger",
      "#ff5733": "danger"
    };
    
    return colorMap[hexColor.toLowerCase()] || "primary";
  };

  // Show loading state
  if (tasksLoading) {
    return <div className="text-center p-5">Loading calendar data...</div>;
  }

  // Show error state
  if (tasksError) {
    return (
      <div className="text-center p-5 text-danger">
        Error loading calendar data: {tasksError}
      </div>
    );
  }


  if (!Array.isArray(calendars)) {
    return <div className="text-danger p-5">Something went wrong loading calendar tasks.</div>;
  }
  else {
  

  return (
    <Container className="mt-4">
      {/* Top Bar */}
      <Row className="align-items-center mb-3">
        <Col>
          <h4>Calendar / Program</h4>
        </Col>
        <Col md="auto">
          <Button
            variant="light"
            onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
          >
            ⬅
          </Button>
          <span className="mx-2 fw-bold">
            {currentMonth.format("MMMM YYYY")}
          </span>
          <Button
            variant="light"
            onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
          >
            ➡
          </Button>
        </Col>

        <Col className="text-end">
          <Button style={{ backgroundColor: "#0052CC" }} onClick={handleShow}>
            <i className="fa-solid fa-plus me-2"></i> New Task
          </Button>
        </Col>
      </Row>



      

      {/* Filter + View Controls */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Select
            value={filters.project}
            onChange={(e) =>
              setFilters({ ...filters, project: e.target.value })
            }
          >
            <option value="All">All Projects</option>
            {projects && projects.length > 0 && 
              projects.map(project => (
                <option key={project._id} value={project.name}>{project.name}</option>
              ))
            }
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={filters.type}
            onChange={(e) =>
              setFilters({ ...filters, type: e.target.value })
            }
          >
            <option value="All">All Task Types</option>
            <option>Task</option>
            <option>Planning</option>
            <option>Inspection</option>
            <option>Design</option>
          </Form.Select>
        </Col>
        <Col md={4} className="text-end">
          <ButtonGroup>
            <Button
              variant={view === "Month" ? "primary" : "outline-primary"}
              onClick={() => setView("Month")}
            >
              Month View
            </Button>
            <Button
              variant={view === "Week" ? "primary" : "outline-primary"}
              onClick={() => setView("Week")}
            >
              Week View
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      {/* Debug info */}
      {tasksError && (
        <div className="alert alert-danger">
          Error: {tasksError}
        </div>
      )}
      
      {/* Calendar Grid */}
      <Row className="g-3">
        {generateCalendar().map((dateObj) => (
          <Col xs={6} md={3} lg={2} key={dateObj.format("YYYY-MM-DD")}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title className="fs-6 text-muted">
                  {dateObj.format("D MMM")}
                </Card.Title>
                {getTasksForDate(dateObj).map((task) => (
                  <Card
                    key={task._id}
                    bg={getColorClass(task.color)}
                    text="white"
                    className="mb-1 px-1 py-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleShowTaskDetails(task)}
                  >
                    <small>{task.taskTitle}</small>
                  </Card>
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Milestones */}
      <Row className="mt-5">
        <h5>Upcoming Milestones</h5>
        {milestones.map((m, idx) => (
          <Col md={6} key={idx}>
            <Card className="mb-2 shadow-sm">
              <Card.Body>
                <Card.Title>{m.title}</Card.Title>
                <Card.Text className="text-muted">{m.project}</Card.Text>
                <span className="text-danger">Due in {m.dueIn} days</span>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Task Modal */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                value={newTask.taskTitle}
                onChange={(e) =>
                  setNewTask({ ...newTask, taskTitle: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Form.Label>Project</Form.Label>
                <Form.Select
                  value={newTask.project}
                  onChange={(e) =>
                    setNewTask({ ...newTask, project: e.target.value })
                  }
                >
                  <option value="">Select Project</option>
                  {projectsLoading ? (
                    <option>Loading projects...</option>
                  ) : (
                    projects && projects.length > 0 ? (
                      projects.map((project) => (
                        <option key={project._id} value={project.name}>{project.name}</option>
                      ))
                    ) : (
                      <>
                       
                      </>
                    )
                  )}
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Task Type</Form.Label>
                <Form.Select
                  value={newTask.taskType}
                  onChange={(e) =>
                    setNewTask({ ...newTask, taskType: e.target.value })
                  }
                >
                  <option>Task</option>
                  <option>Planning</option>
                  <option>Inspection</option>
                  <option>Design</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Start Date</Form.Label>
                <Form.Control 
                  type="date" 
                  value={newTask.startDate} 
                  onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })} 
                />
              </Col>
              <Col>
                <Form.Label>End Date</Form.Label>
                <Form.Control 
                  type="date" 
                  value={newTask.endDate} 
                  onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })}
                />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Assign Team Members</Form.Label>
              <Form.Select 
                multiple
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                  setNewTask({ ...newTask, assignTeamMembers: selectedOptions });
                }}
              >
                {usersLoading ? (
                  <option>Loading users...</option>
                ) : (
                  userslist && userslist.length > 0 ? (
                    userslist.map((user) => (
                      <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>
                    ))
                  ) : (
                    <option value="">No users available</option>
                  )
                )}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Attachments</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) =>
                  setNewTask({ ...newTask, image: Array.from(e.target.files) })
                }
              />
              {/* <div
                className="border p-4 text-center"
                style={{ borderStyle: "dashed" }}
              >
                <p className="mb-1">📎 Upload files or drag and drop</p>
                <small className="text-muted">PNG, JPG, PDF up to 10MB</small>
              </div> */}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reminder Date</Form.Label>
              <Form.Control
                type="date"
                value={newTask.reminders}
                onChange={(e) => setNewTask({ ...newTask, reminders: e.target.value })}
              />
              <Form.Text className="text-muted">
                Select a date for when you want to be reminded about this task.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Color</Form.Label>
              <Form.Select
                value={newTask.color}
                onChange={(e) =>
                  setNewTask({ ...newTask, color: e.target.value })
                }
              >
                <option value="#0d6efd">Blue</option>
                <option value="#198754">Green</option>
                <option value="#ffc107">Yellow</option>
                <option value="#ff5733">Red</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="btn"
            style={{ backgroundColor: "#0052CC", color: "white" }}
            onClick={handleAddTask}
          >
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Task Details Modal */}
      <Modal show={showTaskDetails} onHide={handleCloseTaskDetails}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTask?.taskTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTask && (
            <>
              <p><strong>Description:</strong> {selectedTask.description}</p>
              
              <p>
                <strong>Date:</strong> {dayjs(selectedTask.startDate).format("MMM D, YYYY")}
                {selectedTask.endDate && selectedTask.endDate !== selectedTask.startDate && 
                  ` - ${dayjs(selectedTask.endDate).format("MMM D, YYYY")}`}
              </p>
              
              <p><strong>Task Type:</strong> {selectedTask.taskType}</p>

              {selectedTask.reminders && (
                <p><strong>Reminder Date:</strong> {dayjs(selectedTask.reminders).format("MMM D, YYYY")}</p>
              )}
              
              {selectedTask.assignTeamMembers && selectedTask.assignTeamMembers.length > 0 && (
                <div>
                  <strong>Assigned To:</strong>
                  <ul>
                    {selectedTask.assignTeamMembers.map(member => (
                      <li key={member._id || member}>
                        {member.firstName ? `${member.firstName} ${member.lastName}` : member}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedTask.image && selectedTask.image.length > 0 && (
                <div className="mt-3">
                  <strong>Attachments:</strong>
                  <div className="d-flex mt-2 flex-wrap">
                    {selectedTask.image.map((img, idx) => (
                      <div key={idx} className="me-2 mb-2">
                        <Image 
                          src={img} 
                          alt={`Attachment ${idx + 1}`} 
                          thumbnail 
                          style={{ maxHeight: "100px" }} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTaskDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
}

export default App;
