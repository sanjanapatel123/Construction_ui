import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

function AddDiaries_timesheets() {
  const [formData, setFormData] = useState({
    date: "",
    projectName: "",
    supervisorName: "",
    weather: "",
    workPerformed: "",
    issuesDelays: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://contructionbackend.onrender.com/api/diaries",
        formData
      );
      alert("Diary submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Failed to submit diary:", error);
      alert("Failed to submit diary entry.");
    }
  };

  return (
    <Container fluid className="py-4 bg-white shadow">
      {/* Page Heading + Filters */}
      <Row className="align-items-center mb-3">
        <Col>
          <h5 className="fw-bold mb-0">Diaries & Timesheets</h5>
        </Col>
        <Col className="d-flex gap-2 justify-content-end">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Search entries..."
            style={{ maxWidth: "200px" }}
          />
          <Form.Select size="sm" style={{ maxWidth: "150px" }}>
            <option>All Projects</option>
          </Form.Select>
          <Form.Control type="date" size="sm" style={{ maxWidth: "120px" }} />
          <Form.Select size="sm" style={{ maxWidth: "150px" }}>
            <option>All Workers</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Tabs */}
      <div className="d-flex gap-4 border-bottom mb-4">
        <Button variant="link" className="text-muted text-decoration-none px-0">
          Daily Diaries
        </Button>
        <Button variant="link" className="text-muted text-decoration-none px-0">
          Timesheets
        </Button>
        <Button
          variant="link"
          className="text-primary text-decoration-none px-0 border-bottom "
        >
          Create New Entry
        </Button>
      </div>

      {/* Centered and Narrow Form */}
      <Row className="justify-content-center">
        <Col md={12} lg={12} xl={12}>
          <Form className="bg-white p-4 rounded border">
            {/* Entry Type */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold small">Entry Type</Form.Label>
              <Form.Select>
                <option>Daily Diary</option>
              </Form.Select>
            </Form.Group>

            {/* Project + Worker */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold small">Project</Form.Label>
                  <Form.Select>
                    <option>Central Tower</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold small">
                    Worker Name
                  </Form.Label>
                  <Form.Select>
                    <option>John Smith</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Date + Hours Worked */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold small">Date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold small">
                    Hours Worked
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
            </Row>

            {/* Work Description */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold small">
                Work Description
              </Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

            {/* Issues Faced */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold small">
                Issues Faced
              </Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

            {/* Attachments */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold small">Attachments</Form.Label>
              <div
                className="border border-dashed text-center rounded p-5"
                style={{ borderStyle: "dashed" }}
              >
                <i className="bi bi-upload fs-3 text-muted" />
                <p className="mb-0 mt-2 text-muted small">
                  <strong className="text-primary">Upload files</strong> or drag
                  and drop
                  <br />
                  PNG, JPG, PDF up to 10MB
                </p>
              </div>
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex justify-content-end gap-2">
              <Button variant="light" className="border">
                Cancel
              </Button>
              <Button variant="dark">Save & Submit</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddDiaries_timesheets;
