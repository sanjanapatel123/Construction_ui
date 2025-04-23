import React from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';

export default function Calendar_createnewtask() {
    return (
        <div className="container py-4">
        {/* Header */}
        <h5 className="fw-semibold mb-4">Calendar / Program</h5>
      
        {/* Filters + New Task */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <Button variant="outline-secondary" className="rounded px-3 py-1">Month View</Button>
            <Button variant="outline-secondary" className="rounded px-3 py-1">All Projects</Button>
            <Button variant="outline-secondary" className="rounded px-3 py-1">All Task Types</Button>
            <div className="d-flex align-items-center gap-2 px-2">
              <Button variant="light" className="px-2 py-1 border rounded-circle">
                <i className="bi bi-chevron-left"></i>
              </Button>
              <span className="fw-semibold">September 2023</span>
              <Button variant="light" className="px-2 py-1 border rounded-circle">
                <i className="bi bi-chevron-right"></i>
              </Button>
            </div>
          </div>
          <Button variant="dark" className="d-flex align-items-center gap-2 rounded px-3 py-1 set_btn">
            <i className="bi bi-plus-lg"></i> New Task
          </Button>
        </div>
      
        {/* Create Task Form */}
        <div className="mx-auto w-100">
          <h5 className="fw-semibold mb-3">Create New Task</h5>
          <Form className="p-4 border rounded bg-white shadow-sm">
            {/* Task Title */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Task Title</Form.Label>
              <Form.Control type="text" placeholder="Enter task title" className="rounded" style={{ height: '40px' }} />
            </Form.Group>
      
            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter task description" className="rounded" />
            </Form.Group>
      
            {/* Project + Task Type */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Project</Form.Label>
                  <Form.Select className="rounded" style={{ height: '40px' }}>
                    <option>Select Project</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Task Type</Form.Label>
                  <Form.Select className="rounded" style={{ height: '40px' }}>
                    <option>Regular Task</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
      
            {/* Start Date + End Date */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Start Date</Form.Label>
                  <Form.Control type="date" className="rounded" style={{ height: '40px' }} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">End Date</Form.Label>
                  <Form.Control type="date" className="rounded" style={{ height: '40px' }} />
                </Form.Group>
              </Col>
            </Row>
      
            {/* Assign Team */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Assign Team Members</Form.Label>
              <Form.Select multiple className="rounded" style={{ height: '100px' }}>
                <option>John Smith</option>
                <option>Sarah Johnson</option>
                <option>Mike Williams</option>
                <option>Emily Brown</option>
              </Form.Select>
            </Form.Group>
      
            {/* Attachments */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Attachments</Form.Label>
              <div className="border rounded p-4 text-center bg-light" style={{ borderStyle: 'dashed', minHeight: '120px' }}>
                <div className="mb-2">
                  <i className="bi bi-cloud-upload text-muted" style={{ fontSize: '2rem' }}></i>
                </div>
                <p className="text-muted mb-0">
                  <strong>Upload files</strong> or drag and drop<br />
                  PNG, JPG, PDF up to 10MB
                </p>
              </div>
            </Form.Group>
      
            {/* Reminders */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Reminders</Form.Label>
              <div className="d-flex gap-3 flex-wrap">
                <Form.Check type="checkbox" label="Email" />
                <Form.Check type="checkbox" label="Push Notification" />
              </div>
            </Form.Group>
      
            {/* Buttons */}
            <div className="d-flex justify-content-end">
              <Button variant="light" className="me-2 px-4 rounded border">Cancel</Button>
              <Button variant="primary" className="px-4 rounded">Create Task</Button>
            </div>
          </Form>
        </div>
      </div>
      
    );
}
