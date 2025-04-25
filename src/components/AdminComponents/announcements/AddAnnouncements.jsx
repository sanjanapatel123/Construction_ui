import React from "react";
import { Form, Button, Tab, Tabs,} from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // 👈 Add at top

const CreateAnnouncement = () => {
  const navigate = useNavigate(); // 👈 Hook for navigation

  return (
    <div className="container py-5">
      <div
        className="mx-auto bg-white rounded p-4"
        style={{ maxWidth: "1200px" }}
      >
        <h5 className="fw-semibold mb-4">Create New Announcement</h5>

        {/* Title */}
        <Form.Group className="mb-3">
          <Form.Label>
            Title<span className="text-danger"> *</span>
          </Form.Label>
          <Form.Control type="text" placeholder="Enter announcement title" />
        </Form.Group>

        {/* Content */}
        <Form.Group className="mb-3">
          <Form.Label>
            Content<span className="text-danger"> *</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter announcement content"
          />
        </Form.Group>

        {/* Priority */}
        <Form.Group className="mb-3">
          <Form.Label>Priority</Form.Label>
          <div className="d-flex gap-2">
            <Button variant="outline-danger" active>
              🔴 High
            </Button>
            <Button variant="outline-warning">🟡 Medium</Button>
            <Button variant="outline-success">🟢 Low</Button>
          </div>
        </Form.Group>

        {/* Target Audience */}
        <Form.Group className="mb-3">
          <Form.Label>
            Target Audience<span className="text-danger"> *</span>
          </Form.Label>
          <Tabs defaultActiveKey="groups" id="audience-tabs" className="mb-3">
            <Tab eventKey="groups" title="Groups">
              <Form.Control
                type="text"
                placeholder="Search groups..."
                className="mb-2"
              />
              <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                {[
                  "All Employees",
                  "Engineering Team",
                  "Marketing Team",
                  "Product Team",
                ].map((team, idx) => (
                  <Form.Check key={idx} type="checkbox" label={team} />
                ))}
              </div>
            </Tab>
            <Tab eventKey="individuals" title="Individuals">
              <Form.Control type="text" placeholder="Search individuals..." />
              <div className="text-muted mt-2">
                [Search results will appear here]
              </div>
            </Tab>
          </Tabs>
        </Form.Group>

        {/* Date Fields */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <Form.Group>
              <Form.Label>Creation Date</Form.Label>
              <Form.Control type="text" defaultValue="19-04-2025" />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group>
              <Form.Label>Expiration Date (Optional)</Form.Label>
              <Form.Control type="text" placeholder="dd-mm-yyyy" />
            </Form.Group>
          </div>
        </div>

        {/* Attachment Checkbox */}
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Add Attachments" />
          <Form.Text className="text-muted">
            Upload files related to this announcement
          </Form.Text>
        </Form.Group>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-2">
          {/* <Button variant="secondary">Cancel</Button> */}
          <Button
            variant="secondary"
            onClick={() => navigate("/Announcements")}
          >
            Cancel
          </Button>
          <Button variant="primary">Publish Now</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncement;