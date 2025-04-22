import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AddToolboxTalks() {
  return (
    <div>
        <div className="container mt-2">
            <div className="mx-auto" >
                <Form className="p-4 border rounded bg-white shadow-sm">
                    <div className='d-flex justify-content-between'>
                <h4 className="mb-4 fw-semibold">Create New Toolbox Talk</h4>
                <Link to="/toolbox"><button className='btn ' style={{backgroundColor:"#0d6efd",color:"white"}}><i class="fa-solid fa-arrow-left me-2"></i>Back</button></Link>
                </div>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Title</Form.Label>
                        <Form.Control type="text" placeholder="E.g., Safe Lifting Techniques" />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Label className="fw-semibold">Date</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className="fw-semibold">Time</Form.Label>
                                <Form.Control type="time" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Label className="fw-semibold">Presenter</Form.Label>
                                <Form.Select>
                                    <option>Select Presenter</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className="fw-semibold">Participants</Form.Label>
                                <Form.Select multiple style={{ height: '122px' }}>
                                    <option>Team A</option>
                                    <option>Team B</option>
                                    <option>Team C</option>
                                    <option>John Smith</option>
                                    <option>Sarah Johnson</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Description & Objectives</Form.Label>
                        <Form.Control as="textarea" placeholder="Add objectives & key discussion points" rows={4} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Attachments</Form.Label>
                        <div className="border p-3 rounded d-flex align-items-center justify-content-center" style={{ height: '70px', cursor: 'pointer' }}>
                            <i className="bi bi-upload fs-4 me-2"></i>
                            <span className="text-muted">Upload file</span>
                        </div>
                    </Form.Group>

                    <Form.Group className="form-check mb-4">
                        <Form.Check
                            type="checkbox"
                            label="Mark as Mandatory Attendance"
                            className="fw-semibold"
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="light" className="me-2 px-4">
                            Cancel
                        </Button>
                        <Button variant="primary" className="px-4">
                            Save & Schedule
                        </Button>
                    </div>
                </Form>
            </div>
        </div>

    </div>
  )
}

export default AddToolboxTalks
