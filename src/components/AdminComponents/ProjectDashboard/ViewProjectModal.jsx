import React, { useState } from "react";
import { Modal, Button, Tab, Row, Col, Nav, Card } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

const ViewProjectModal = ({ show, handleClose, project }) => {
  const [key, setKey] = useState("overview");

  // console.log(project);
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {project.name} ({project.status})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Tabs */}
        <Tab.Container
          id="view-project-tabs"
          defaultActiveKey="overview"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="overview">Overview</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tasks">Tasks</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="team">Team</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {/* Overview Tab */}
                <Tab.Pane eventKey="overview">
                  <Card>
                    <Card.Body>
                      <Card.Title>Project Details</Card.Title>
                      <p>
                        <strong>Project Manager:</strong>
                        {project?.assignedTo?.firstName}
                      </p>
                      <p>
                        <strong>Timeline:</strong> {project.startDate} to{" "}
                        {project.endDate}
                      </p>
                      <p>
                        <strong>Priority:</strong> {project.priority}
                      </p>
                      <p>
                        <strong>Description:</strong> {project.description}
                      </p>
                    </Card.Body>
                  </Card>
                  <Card className="mt-4">
                    <Card.Body>
                      <Card.Title>Project Progress</Card.Title>
                      <div className="d-flex justify-content-between">
                        <div>
                          <strong>Overall Completion: </strong>
                          <span>{project.Progress}%</span>
                        </div>
                        <div
                          className="progress"
                          style={{ height: "20px", width: "60%" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${project.Progress}%` }}
                          />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                {/* Tasks Tab */}
                {/* <Tab.Pane eventKey="tasks">
                  <Card>
                    <Card.Body>
                      <Card.Title>Tasks</Card.Title>
                      <ul>
                        {project.tasks.map((task, index) => (
                          <li key={index}>
                            <span>
                              <strong>{task.name}</strong> ({task.status})
                            </span>
                            <br />
                            <span>Assigned To: {task.assignedTo}</span>
                            <br />
                            <span>Due Date: {task.dueDate}</span>
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </Tab.Pane> */}

                {/* Team Tab */}
                {/* <Tab.Pane eventKey="team">
                  <Card>
                    <Card.Body>
                      <Card.Title>Team Members</Card.Title>
                      <div className="d-flex flex-wrap">
                        {project.team.map((member, index) => (
                          <div key={index} className="p-2">
                            <Card
                              className="text-center"
                              style={{ width: "150px" }}
                            >
                              <Card.Body>
                                <img
                                  src={member.avatar}
                                  alt={member.name}
                                  className="rounded-circle"
                                  width="50"
                                />
                                <Card.Text>{member.name}</Card.Text>
                                <Card.Text>{member.role}</Card.Text>
                              </Card.Body>
                            </Card>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline-success"
                        className="mt-2"
                        onClick={() => alert("Add new member logic")}
                      >
                        <FaPlusCircle /> Add Member
                      </Button>
                    </Card.Body>
                  </Card>
                </Tab.Pane> */}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          className="p-2 d-flex"
          onClick={() => alert("Edit Project")}
        >
          <FaEdit className="" /> Edit Project
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewProjectModal;
