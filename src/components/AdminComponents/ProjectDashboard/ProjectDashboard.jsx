import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Form,
} from "react-bootstrap";
// import { FaSearch, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ViewProjectModal from "./ViewProjectModal";
import { fetchProjects } from "../../redux/projectSlice";
import axios from "axios";
import EditProjectModal from "./EditProjectModal";

const ProjectDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.projects);
  console.log(data);

  const handleShowModal = async (projectId) => {
    try {
      const response = await axios.get(
        `https://contructionbackend.onrender.com/api/projects/${projectId}`
      );
      setSelectedProject(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching single project:", error);
      alert("Failed to load project details");
    }
  };
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };
  // Sample data for the projects
  const [projects] = useState([
    {
      name: "Website Redesign",
      manager: "John Smith",
      startDate: "2025-03-15",
      endDate: "2025-06-30",
      priority: "High",
      description:
        "Complete overhaul of company website with new design system and improved UX.",
      progress: 65,
      status: "Ongoing",
      tasks: [
        {
          name: "Design System Creation",
          status: "Completed",
          assignedTo: "Sarah Johnson",
          dueDate: "2025-04-01",
        },
        {
          name: "Frontend Development",
          status: "In Progress",
          assignedTo: "Mike Chen",
          dueDate: "2025-05-15",
        },
        {
          name: "Content Migration",
          status: "Not Started",
          assignedTo: "John Smith",
          dueDate: "2025-06-01",
        },
      ],
      team: [
        {
          name: "John Smith",
          role: "Project Manager",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s",
        },
        {
          name: "Sarah Johnson",
          role: "UX Designer",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s",
        },
        {
          name: "Mike Chen",
          role: "Developer",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s",
        },
      ],
    },
    {
      name: "Website Redesign",
      manager: "John Smith",
      startDate: "2025-03-15",
      endDate: "2025-06-30",
      priority: "High",
      description:
        "Complete overhaul of company website with new design system and improved UX.",
      progress: 65,
      status: "Ongoing",
      tasks: [
        {
          name: "Design System Creation",
          status: "Completed",
          assignedTo: "Sarah Johnson",
          dueDate: "2025-04-01",
        },
        {
          name: "Frontend Development",
          status: "In Progress",
          assignedTo: "Mike Chen",
          dueDate: "2025-05-15",
        },
        {
          name: "Content Migration",
          status: "Not Started",
          assignedTo: "John Smith",
          dueDate: "2025-06-01",
        },
      ],
      team: [
        {
          name: "John Smith",
          role: "Project Manager",
          avatar: "https://via.placeholder.com/50",
        },
        {
          name: "Sarah Johnson",
          role: "UX Designer",
          avatar: "https://via.placeholder.com/50",
        },
        {
          name: "Mike Chen",
          role: "Developer",
          avatar: "https://via.placeholder.com/50",
        },
      ],
    },
    {
      name: "Website Redesign",
      manager: "John Smith",
      startDate: "2025-03-15",
      endDate: "2025-06-30",
      priority: "High",
      description:
        "Complete overhaul of company website with new design system and improved UX.",
      progress: 65,
      status: "Ongoing",
      tasks: [
        {
          name: "Design System Creation",
          status: "Completed",
          assignedTo: "Sarah Johnson",
          dueDate: "2025-04-01",
        },
        {
          name: "Frontend Development",
          status: "In Progress",
          assignedTo: "Mike Chen",
          dueDate: "2025-05-15",
        },
        {
          name: "Content Migration",
          status: "Not Started",
          assignedTo: "John Smith",
          dueDate: "2025-06-01",
        },
      ],
      team: [
        {
          name: "John Smith",
          role: "Project Manager",
          avatar: "https://via.placeholder.com/50",
        },
        {
          name: "Sarah Johnson",
          role: "UX Designer",
          avatar: "https://via.placeholder.com/50",
        },
        {
          name: "Mike Chen",
          role: "Developer",
          avatar: "https://via.placeholder.com/50",
        },
      ],
    },
  ]);

  const deleteProject = async (projectId) => {
    try {
      console.log(projectId);
      const response = await axios.delete(
        `https://contructionbackend.onrender.com/api/projects/${projectId}`
      );
      console.log("Project deleted:", response.data);
      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert(error?.response?.data?.message || "Failed to delete project!");
    }
  };

  return (
    <Container className="mt-4 ">
      <div className="bg-white p-3 rounded-3">
        <Row className="mb-3">
          <Col>
            <h2>Project Management</h2>
            {loading && <p>Loading projects...</p>}
            {error && <p>Error: {error}</p>}
          </Col>
          <Col className="text-end">
            <Link to="/add-project">
              <Button variant="primary" className="mb-3 p-2">
                <i class="fa-solid fa-plus me-2"></i> Add New Project
              </Button>
            </Link>
          </Col>
        </Row>

        {/* Filters Row */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Control type="text" placeholder="Search projects..." />
          </Col>
          <Col md={2}>
            <Form.Control as="select">
              <option>All Statuses</option>
              <option>Ongoing</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Delayed</option>
            </Form.Control>
          </Col>
          <Col md={2}>
            <Form.Control as="select">
              <option>All Priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </Form.Control>
          </Col>
          <Col md={2}>
            <Form.Control type="date" />
          </Col>
          <Col md={2}>
            <Form.Control type="date" />
          </Col>
        </Row>

        {/* Project Table */}
        <Table bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th className="ps-4">Project Name</th>
              <th>Assigned To</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Progress</th>
              <th className="pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((project, index) => (
              <tr key={index} className="bg-white py-3">
                <td className="ps-4 py-3">{project.name}</td>
                <td className="py-3">{project.assignedTo}</td>
                <td className="py-3">{project.startDate}</td>
                <td className="py-3">{project.endDate}</td>
                <td className="py-3">
                  <span
                    className={`badge ${
                      project.status === "Completed"
                        ? "bg-success"
                        : project.status === "Ongoing"
                        ? "bg-primary"
                        : project.status === "Pending"
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="py-3">
                  <span
                    className={`badge ${
                      project.priority === "High"
                        ? "bg-danger"
                        : project.priority === "Medium"
                        ? "bg-warning"
                        : "bg-success"
                    }`}
                  >
                    {project.priority}
                  </span>
                </td>
                <td className="py-3">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${project.Progress}%` }}
                      aria-valuenow={project.Progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {project.Progress}%
                    </div>
                  </div>
                </td>
                <td className="pe-4 py-3">
                  <button
                    className="me-2 text-info btn p-0"
                    onClick={() => handleShowModal(project._id)}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setShowEditModal(true);
                    }}
                    className="me-2 text-primary btn p-0"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="text-danger btn p-0"
                    onClick={() => deleteProject(`${project._id}`)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {selectedProject && (
          <ViewProjectModal
            show={showModal}
            handleClose={handleCloseModal}
            project={selectedProject}
          />
        )}

        <EditProjectModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          project={selectedProject}
          // refreshData={fetchProjectsAgain} // optional
        />

        <div className="d-flex justify-content-end">
          <Button size="sm" variant="outline-secondary" className="me-2">
            Previous
          </Button>
          <Button size="sm" variant="primary" className="ms-2">
            1
          </Button>
          <Button size="sm" variant="outline-secondary" className="ms-2">
            2
          </Button>
          <Button size="sm" variant="outline-secondary" className="ms-2">
            Next
          </Button>
        </div>
        {/* Pagination */}
      </div>
    </Container>
  );
};

export default ProjectDashboard;
