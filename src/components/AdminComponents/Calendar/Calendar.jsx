// import React from 'react';
// import { Button, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// function Calendar() {
//     const calendarData = [
//         { day: '31', muted: true },
//         { day: '1', events: [{ text: 'Project Kickoff', color: 'bg-primary bg-opacity-10 text-primary' }] },
//         { day: '2' },
//         { day: '3', events: [{ text: 'Site Survey', color: 'bg-success bg-opacity-25 text-success' }] },
//         { day: '4' },
//         { day: '5' },
//         { day: '6' },
//         { day: '7', events: [{ text: 'Team Meeting', color: 'bg-warning bg-opacity-25 text-warning' }] },
//         { day: '8' },
//         { day: '9', events: [{ text: 'Design Review', color: 'bg-purple text-purple bg-opacity-25' }] },
//         { day: '10' },
//         { day: '11' },
//         { day: '12', events: [{ text: 'Safety Inspection', color: 'bg-danger bg-opacity-10 text-danger' }] },
//         { day: '13', events: [{ text: '& Support', color: 'bg-light border text-dark' }] },
//         { day: '14' },
//         { day: '15', events: [{ text: 'Progress Review', color: 'bg-primary bg-opacity-25 text-primary' }] },
//         { day: '16' },
//         { day: '17' },
//         { day: '18', events: [{ text: 'Quality Check', color: 'bg-success bg-opacity-25 text-success' }] },
//         { day: '19' },
//         { day: '20' },
//         { day: '21', events: [{ text: 'Client Meeting', color: 'bg-warning bg-opacity-25 text-warning' }] },
//         { day: '22' },
//         { day: '23' },
//         { day: '24', events: [{ text: 'Milestone Review', color: 'bg-purple text-purple bg-opacity-25' }] },
//         { day: '25' },
//         { day: '26' },
//         { day: '27' },
//         { day: '28', events: [{ text: 'End of Month Report', color: 'bg-danger bg-opacity-10 text-danger' }] },
//         { day: '29' },
//         { day: '30' },
//         { day: '1' },
//         { day: '2' },
//         { day: '3' },
//         { day: '4', events: [{ text: 'Safety Compliance', color: 'bg-light border text-dark' }] },
//       ];

//       // Group into weeks
//       const weeks = [];
//       for (let i = 0; i < calendarData.length; i += 7) {
//         weeks.push(calendarData.slice(i, i + 7));
//       }

//   return (
//     <div className="container bg-white py-4">
//     {/* Header */}
//     <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
//       <h5 className="fw-semibold mb-0">Calendar / Program</h5>
//       <div className="d-flex gap-2 flex-wrap">
//         <Button variant="outline-secondary" className="rounded px-3 py-1">Month View</Button>
//         <Button variant="outline-secondary" className="rounded px-3 py-1">All Projects</Button>
//         <Button variant="outline-secondary" className="rounded px-3 py-1">All Task Types</Button>
//         <div className="d-flex align-items-center gap-2">
//           <Button variant="light" className="px-2 py-1 border rounded-circle"><i className="bi bi-chevron-left" /></Button>
//           <span className="fw-semibold">September 2023</span>
//           <Button variant="light" className="px-2 py-1 border rounded-circle"><i className="bi bi-chevron-right" /></Button>
//         </div>
//      <Link to={"/Calendar_createnewtask"}>   <Button variant="dark" className="set_btn d-flex align-items-center gap-2 rounded px-3 py-1">
//           <i className="bi bi-plus-lg"></i> New Task
//         </Button></Link>
//       </div>
//     </div>

//     {/* Calendar */}
//     <div className="border rounded p-3 bg-white ">
//       {/* Day Labels */}
//       <Row className="text-center fw-semibold text-muted mb-1 justify-content-center " style={{ fontSize: '13px' }}>
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
//           <Col key={idx} style={{ width: '100px', maxWidth: '100px' }}>{day}</Col>
//         ))}
//       </Row>

//       {/* Weeks */}
//       {weeks.map((week, weekIndex) => (
//         <Row key={weekIndex} className="gx-0 justify-content-center mb-1">
//           {week.map((d, i) => (
//             <Col
//               key={i}
//               className="border rounded bg-white text-start"
//               style={{
//                 height: '130px',
//                 width: '130px',
//                 minWidth: '130px',
//                 maxWidth: '130px',
//                 minHeight: '130px',
//                 maxHeight: '130px',
//                 padding: '6px',
//                 fontSize: '13px',
//                 overflow: 'hidden',
//                 marginLeft:"10px"
//               }}
//             >
//               <div className={`${d.muted ? 'text-muted' : ''}`}>{d.day}</div>
//               {d.events && d.events.map((e, ei) => (
//                 <div
//                   key={ei}
//                   className={`mt-1 px-2 py-1 rounded text-truncate small ${e.color}`}
//                   style={{
//                     fontSize: '12px',
//                     whiteSpace: 'nowrap',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                   }}
//                 >
//                   {e.text}
//                 </div>
//               ))}
//             </Col>
//           ))}
//         </Row>
//       ))}
//     </div>

//     {/* Milestones + Photos */}
//     <Row className="bg-white border rounded p-4 mb-5">
//       <Col md={8}>
//         <h6 className="fw-semibold mb-3">Upcoming Milestones</h6>
//         <div className="d-flex justify-content-between border-bottom py-2 align-items-center">
//           <div>
//             <div className="fw-medium">Foundation Work Completion</div>
//             <small className="text-muted">Project A</small>
//           </div>
//           <div className="text-danger fw-semibold small">Due in 5 days</div>
//         </div>
//         <div className="d-flex justify-content-between border-bottom py-2 align-items-center">
//           <div>
//             <div className="fw-medium">Steel Structure Installation</div>
//             <small className="text-muted">Project B</small>
//           </div>
//           <div className="text-danger fw-semibold small">Due in 2 days</div>
//         </div>
//       </Col>
//       {/* <Col md={4}>
//         <h6 className="fw-semibold mb-3">Photos</h6>
//         <div className="d-flex flex-column gap-2">
//           <a href="#" className="text-decoration-none small">Project Planning</a>
//           <a href="#" className="text-decoration-none small">Documents</a>
//           <a href="#" className="text-decoration-none">
//             <i className="bi bi-chevron-down" />
//           </a>
//         </div>
//       </Col> */}
//     </Row>
//   </div>
//   )
// }

// export default Calendar

import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Card,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import dayjs from "dayjs";

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs("2023-09-01"));
  const [show, setShow] = useState(false);
  const [view, setView] = useState("Month");
  const [tasks, setTasks] = useState([
    {
      date: "2023-09-01",
      title: "Project Kickoff",
      color: "primary",
      project: "Project A",
      type: "Planning",
    },
    {
      date: "2023-09-03",
      title: "Site Survey",
      color: "success",
      project: "Project B",
      type: "Inspection",
    },
    {
      date: "2023-09-09",
      title: "Design Review",
      color: "warning",
      project: "Project A",
      type: "Design",
    },
  ]);
  const [filters, setFilters] = useState({ project: "All", type: "All" });

  const [milestones] = useState([
    { title: "Foundation Work Completion", project: "Project A", dueIn: 5 },
    { title: "Steel Structure Installation", project: "Project B", dueIn: 2 },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    date: "",
    color: "primary",
    project: "Project A",
    type: "Planning",
  });

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setNewTask({
      title: "",
      date: "",
      color: "primary",
      project: "Project A",
      type: "Planning",
    });
  };

  const handleAddTask = () => {
    setTasks([...tasks, newTask]);
    handleClose();
  };

  const getTasksForDate = (date) =>
    tasks.filter(
      (task) =>
        task.date === date.format("YYYY-MM-DD") &&
        (filters.project === "All" || task.project === filters.project) &&
        (filters.type === "All" || task.type === filters.type)
    );

  const generateCalendar = () => {
    const startDate = currentMonth.startOf("month");
    const daysInMonth = view === "Month" ? currentMonth.daysInMonth() : 7;
    const calendar = [];

    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(startDate.date(day));
    }

    return calendar;
  };

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
          <i class="fa-solid fa-plus me-2"></i> New Task
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
            <option>All Projects</option>
            <option>Project A</option>
            <option>Project B</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option>All Task Types</option>
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

      {/* Calendar Grid */}
      <Row className="g-3">
        {generateCalendar().map((dateObj) => (
          <Col xs={6} md={3} lg={2} key={dateObj.format("YYYY-MM-DD")}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title className="fs-6 text-muted">
                  {dateObj.format("D MMM")}
                </Card.Title>
                {getTasksForDate(dateObj).map((task, idx) => (
                  <Card
                    key={idx}
                    bg={task.color}
                    text="white"
                    className="mb-1 px-1 py-1"
                  >
                    <small>{task.title}</small>
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

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
              />
            </Form.Group>

            {/* <Form.Group className="mt-2">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newTask.date}
                onChange={(e) =>
                  setNewTask({ ...newTask, date: e.target.value })
                }
              />
            </Form.Group> */}
            <Row className="mb-3">
              <Col>
                <Form.Label>Project</Form.Label>
                <Form.Select
                  value={newTask.project}
                  onChange={(e) =>
                    setNewTask({ ...newTask, project: e.target.value })
                  }
                >
                  <option>Project A</option>
                  <option>Project B</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Task Type</Form.Label>
                <Form.Select
                  value={newTask.type}
                  onChange={(e) =>
                    setNewTask({ ...newTask, type: e.target.value })
                  }
                >
                  <option>Planning</option>
                  <option>Inspection</option>
                  <option>Design</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" />
              </Col>
              <Col>
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Assign Team Members</Form.Label>
              <Form.Control as="select" multiple>
                <option>John Smith</option>
                <option>Sarah Johnson</option>
                <option>Mike Williams</option>
                <option>Emily Brown</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Attachments</Form.Label>
              <div
                className="border p-4 text-center"
                style={{ borderStyle: "dashed" }}
              >
                <p className="mb-1">📎 Upload files or drag and drop</p>
                <small className="text-muted">PNG, JPG, PDF up to 10MB</small>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reminders</Form.Label>
              <br />
              <Form.Check inline label="Email" type="checkbox" />
              <Form.Check inline label="Push Notification" type="checkbox" />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Color</Form.Label>
              <Form.Select
                value={newTask.color}
                onChange={(e) =>
                  setNewTask({ ...newTask, color: e.target.value })
                }
              >
                <option value="primary">Blue</option>
                <option value="success">Green</option>
                <option value="warning">Yellow</option>
                <option value="danger">Red</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="btn" style={{backgroundColor:"#0d6efd",color:"white"}} onClick={handleAddTask}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;
