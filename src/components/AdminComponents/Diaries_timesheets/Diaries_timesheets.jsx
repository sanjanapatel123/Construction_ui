import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Tabs,
  Tab,
  FormControl,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../redux/projectSlice";
import { fetchDiaries } from "../../redux/diarySlice";
import { fetchTimesheets } from "../../redux/timesheetSlice";
import { Line } from "react-chartjs-2";
import EditDiaryModal from "./EditDiaryModal";
import DiaryDetailsModal from "./DiaryDetailsModal";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function DiariesTimesheets() {
  const [activeTab, setActiveTab] = useState("daily");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDiaryId, setSelectedDiaryId] = useState(null);
  const [selectedDiary, setSelectedDiary] = useState(null);

  const [showTimesheetModal, setShowTimesheetModal] = useState(false);
  const handleCloseTimesheet = () => setShowTimesheetModal(false);
  const handleShowTimesheet = () => setShowTimesheetModal(true);

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.data);
  const { data, loading, error } = useSelector((state) => state.diaries);
  const { data: timesheets, loadingstate, errorstate } = useSelector(
    (state) => state.timesheets
  );
  const [diaryForm, setDiaryForm] = useState({
    date: "",
    projectName: "",
    supervisorName: "",
    weather: "",
    workPerformed: "",
    issuesDelays: "",
  });

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchDiaries());
    dispatch(fetchTimesheets());
  }, [dispatch]);

  const handleEditClick = (diary) => {
    setSelectedDiary(diary);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedDiary(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiaryForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmitDiary = async () => {
    // const selectedProject = projects.find((p) => p._id === selectedProjectId);
    try {
      await axios.post(
        "https://contructionbackend.onrender.com/api/diaries",
        diaryForm
      );
      alert("Diary entry saved successfully!");
      handleClose(); // close the modal
      setDiaryForm({
        // reset form
        date: "",
        // projectId: selectedProjectId,
        projectName: "",
        supervisorName: "",
        weather: "",
        workPerformed: "",
        issuesDelays: "",
      });
    } catch (err) {
      console.error("Error submitting diary:", err);
      alert("Failed to submit diary. Please try again.");
    }
  };

  const [timesheetData, setTimesheetData] = useState({
    date: "",
    worker: "",
    project: "",
    hoursWorked: "",
    Overtime: "",
    status: "Pending",
  });

  const handleTimeSheetChange = (e) => {
    const { name, value } = e.target;
    setTimesheetData({ ...timesheetData, [name]: value });
  };

  const handleSubmitTimeSheet = async () => {
    try {
      await axios.post(
        "https://contructionbackend.onrender.com/api/timesheet",
        timesheetData
      );
      toast.success("Timesheet entry added successfully!");
      handleCloseTimesheet(); // Close modal
      setTimesheetData({
        // Reset form
        date: "",
        worker: "",
        project: "",
        hoursWorked: "",
        Overtime: "",
        status: "Pending",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit timesheet.");
    }
  };

  const timesheetsData = [
    {
      date: "2024-02-20",
      worker: "John Smith",
      project: "Central Tower",
      hours: 8.5,
      overtime: 1.5,
      status: "Pending",
    },
    {
      date: "2024-02-19",
      worker: "Sarah Johnson",
      project: "Riverside Complex",
      hours: 7.5,
      overtime: 0.0,
      status: "Approved",
    },
  ];
  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        data: [7.5, 7, 6.5, 7.2, 7],
        borderColor: "#4e73df",
        backgroundColor: "rgba(78, 115, 223, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const lineOptions = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 2 } },
      x: { grid: { display: false } },
    },
  };

  if (loading) return <p>Loading diaries...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Container fluid className="p-4 bg-light">
      <h4 className="mb-4">Diaries & Timesheets</h4>
      {/* Top Section */}
      <Row className="mb-4 gx-4">
        {/* Today’s Overview */}
        <Col md={4}>
          <div className="bg-white p-4 rounded shadow-sm h-100 border">
            <h6 className="fw-semibold mb-4">Today's Overview</h6>
            <Row className="mb-4">
              <Col>
                <div className="text-muted small">Hours Logged</div>
                <div className="fs-4 fw-bold">7.5 hrs</div>
              </Col>
              <Col>
                <div className="text-muted small">Tasks Completed</div>
                <div className="fs-4 fw-bold">12</div>
              </Col>
            </Row>
            <div style={{ height: "220px" }}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </Col>

        {/* Quick Time Entry */}
        <Col md={4}>
          <div className="bg-white p-4 rounded shadow-sm h-100 text-center border">
            <h6 className="fw-semibold mb-4">Quick Time Entry</h6>
            <div className="fs-3 fw-bold mb-1">09:45:23</div>
            <div className="text-muted small mb-4">Current Time</div>
            <Form.Control
              type="text"
              placeholder="Task Description"
              className="mb-3"
            />
            <Button variant="dark" className="w-100 mb-2 set_btn">
              <i className="bi bi-play me-2"></i>Start Timer
            </Button>
            <Button variant="light" className="w-100 border">
              <i className="bi bi-mic me-2"></i>Voice Note
            </Button>
          </div>
        </Col>

        {/* Pending Approvals */}
        <Col md={4}>
          <div className="bg-white p-4 rounded shadow-sm h-100 border">
            <h6 className="fw-semibold mb-4">Pending Approvals</h6>
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <div className="fw-semibold">Site Inspection Report</div>
                <div className="small text-muted">
                  Submitted by Mike Johnson
                </div>
              </div>
              <Button size="sm" variant="success">
                Approve
              </Button>
            </div>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="fw-semibold">Safety Compliance Check</div>
                <div className="small text-muted">
                  Submitted by Sarah Wilson
                </div>
              </div>
              <Button size="sm" variant="success">
                Approve
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="daily" title="Daily Diaries">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>Daily Diaries</h3>
            <button
              style={{ backgroundColor: "#0052CC", color: "white" }}
              className="btn"
              onClick={handleShow}
            >
              <i class="fa-solid fa-plus me-2"></i> Add Event
            </button>
          </div>

          <Form className="mb-3 d-flex gap-2">
            <FormControl placeholder="Search entries..." />
            <Form.Select>
              <option>All Projects</option>
              <option>Central Tower</option>
              <option>Riverside Complex</option>
            </Form.Select>
            <Form.Control type="date" />
            <Form.Select>
              <option>All Workers</option>
              <option>John Smith</option>
              <option>Sarah Johnson</option>
            </Form.Select>
          </Form>
          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <Table striped bordered hover>
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Date</th>
                  <th>Project</th>
                  <th>Supervisor</th>
                  <th>Weather</th>
                  <th>Work Performed</th>
                  <th>Issues/Delays</th>
                  <th className="pe-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, idx) => (
                  <tr key={idx} className="py-3">
                    <td className="ps-4 py-3">{entry.date}</td>
                    <td className="py-3">{entry.projectName}</td>
                    <td className="py-3">{entry.supervisorName}</td>
                    <td className="py-3">{entry.weather}</td>
                    <td className="py-3">{entry.workPerformed}</td>
                    <td className="py-3">{entry.issuesDelays}</td>
                    <td className="pe-4 py-3">
                      <div className="d-flex align-items-center gap-2">
                        <i
                          className="fas fa-eye text-info"
                          title="Details"
                          style={{ cursor: "pointer", fontSize: "15px" }}
                          onClick={() => {
                            setSelectedDiaryId(entry._id);
                            setShowDetailsModal(true);
                          }}
                        ></i>

                        <i
                          className="fas fa-edit text-primary"
                          title="Edit"
                          style={{ cursor: "pointer", fontSize: "15px" }}
                          onClick={() => handleEditClick(entry)}
                        ></i>
                        <i
                          className="fa-solid fa-circle-check text-success"
                          title="Resolve"
                          style={{ cursor: "pointer", fontSize: "15px" }}
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <EditDiaryModal
              show={showEditModal}
              handleClose={handleCloseModal}
              selectedDiary={selectedDiary}
              onUpdate={() => dispatch(fetchDiaries())}
            />

            <DiaryDetailsModal
              show={showDetailsModal}
              handleClose={() => setShowDetailsModal(false)}
              diaryId={selectedDiaryId}
            />
          </div>
        </Tab>

        <Tab eventKey="timesheet" title="Timesheets">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>TimeSheet</h3>
            <button
              style={{ backgroundColor: "#0052CC", color: "white" }}
              className="btn"
              onClick={handleShowTimesheet}
            >
              ← Add TimeSheet
            </button>
          </div>
          <Form className="mb-3 d-flex gap-2">
            <FormControl placeholder="Search entries..." />
            <Form.Select>
              <option>All Projects</option>
              <option>Central Tower</option>
              <option>Riverside Complex</option>
            </Form.Select>
            <Form.Control type="date" />
            <Form.Select>
              <option>All Workers</option>
              <option>John Smith</option>
              <option>Sarah Johnson</option>
            </Form.Select>
          </Form>
          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <Table bordered hover>
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Date</th>
                  <th>Worker</th>
                  <th>Project</th>
                  <th>Hours Worked</th>
                  <th>Overtime</th>
                  <th>Status</th>
                  <th className="pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingstate ? (
                  <p>Loading..</p>
                ) : errorstate ? (
                  <p>Error:{error}</p>
                ) : (
                  timesheets.map((entry, idx) => (
                    <tr key={idx} className="bg-white py-3">
                      <td className="ps-4 py-3">{entry.date}</td>
                      <td className="py-3">{entry.worker}</td>
                      <td className="py-3">{entry.project}</td>
                      <td className="py-3">{entry.hoursWorked}</td>
                      <td className="py-3">{entry.Overtime}</td>
                      <td className="py-3">
                        <span
                          className={`badge ${
                            entry.status === "Approved"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {entry.status}
                        </span>
                      </td>
                      <td className="pe-4 py-3">
                        <div className="d-flex align-items-center gap-2">
                          <i
                            className="fas fa-eye text-info"
                            title="Assign"
                            style={{ cursor: "pointer", fontSize: "15px" }}
                          ></i>
                          <i
                            className="fas fa-edit text-primary"
                            title="Edit"
                            style={{ cursor: "pointer", fontSize: "15px" }}
                          ></i>
                          <i
                            className="fa-solid fa-circle-check text-success"
                            title="Resolve"
                            style={{ cursor: "pointer", fontSize: "15px" }}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Tab>
      </Tabs>

      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Daily Diary Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={diaryForm.date}
                onChange={(e) =>
                  setDiaryForm({ ...diaryForm, date: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Select
                name="projectName"
                value={diaryForm.projectName}
                onChange={handleChange}
                required
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Supervisor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Supervisor Name"
                value={diaryForm.supervisorName}
                onChange={(e) =>
                  setDiaryForm({ ...diaryForm, supervisorName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Weather</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Sunny 🌞"
                value={diaryForm.weather}
                onChange={(e) =>
                  setDiaryForm({ ...diaryForm, weather: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Work Performed</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={diaryForm.workPerformed}
                onChange={(e) =>
                  setDiaryForm({ ...diaryForm, workPerformed: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Issues / Delays</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={diaryForm.issuesDelays}
                onChange={(e) =>
                  setDiaryForm({ ...diaryForm, issuesDelays: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitDiary}>
            Save Entry
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showTimesheetModal}
        onHide={handleCloseTimesheet}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Timesheet Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={timesheetData.date}
                onChange={handleTimeSheetChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Worker</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter worker name"
                value={timesheetData.worker}
                onChange={handleTimeSheetChange}
                name="worker"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Select
                name="project"
                value={timesheetData.project}
                onChange={handleTimeSheetChange}
                required
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hours Worked</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.1"
                name="hoursWorked"
                value={timesheetData.hoursWorked}
                onChange={handleTimeSheetChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Overtime</Form.Label>
              <Form.Control
                type="number"
                name="Overtime"
                min="0"
                step="0.1"
                value={timesheetData.Overtime}
                onChange={handleTimeSheetChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={timesheetData.status}
                onChange={handleTimeSheetChange}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTimesheet}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitTimeSheet}>
            Save Entry
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
