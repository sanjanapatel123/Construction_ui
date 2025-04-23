import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import {
  FaTrash,
  FaEdit,
  FaSave,
  FaCloudUploadAlt,
  FaCopy,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddITPs = () => {
  const [items, setItems] = useState([
    { description: "", status: "Pass", comments: "" },
  ]);

  const addItem = () => {
    setItems([...items, { description: "", status: "Pass", comments: "" }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const navigate = useNavigate();
  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Inspection Test Plans</h3>
        <button
          onClick={() => navigate(-1)}
          className="btn bg-primary text-white" 
        >
          <i class="fa-solid fa-arrow-left me-2"></i> Back to Overview
        </button>
      </div>
      <div className="card p-4 shadow-sm">
        {/* Header Fields */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <Form.Group controlId="projectName">
              <Form.Label className="fw-semibold small">
                Project Name
              </Form.Label>
              <Form.Select>
                <option>Select Project</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="inspectionType">
              <Form.Label className="fw-semibold small">
                Inspection Type
              </Form.Label>
              <Form.Select>
                <option>Select Type</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <Form.Group controlId="inspector">
              <Form.Label className="fw-semibold small">Inspector</Form.Label>
              <Form.Select>
                <option>Select Inspector</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="inspectionDate">
              <Form.Label className="fw-semibold small">
                Inspection Date
              </Form.Label>
              <InputGroup>
                <Form.Control type="date" />
              </InputGroup>
            </Form.Group>
          </div>
        </div>

        {/* Inspection Items */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold small">
            Inspection Items
          </Form.Label>
          {items.map((item, index) => (
            <InputGroup className="mb-2" key={index}>
              <Form.Control placeholder="Item Description" />
              <Form.Select defaultValue="Pass">
                <option>Pass</option>
                <option>Fail</option>
              </Form.Select>
              <Form.Control placeholder="Comments" />
              <Button
                variant="outline-danger"
                onClick={() => removeItem(index)}
              >
                <FaTrash />
              </Button>
              <Button variant="outline-secondary">
                <FaEdit />
              </Button>
              <Button variant="outline-dark">
                <FaCopy />
              </Button>
            </InputGroup>
          ))}
          <Button
            variant="link"
            className="text-dark fw-semibold mt-2"
            onClick={addItem}
          >
            + Add Item
          </Button>
        </Form.Group>

        {/* Attachments */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold small">Attachments</Form.Label>
          <div
            className="border border-secondary-subtle text-center p-4 rounded"
            style={{ borderStyle: "dashed", background: "#fafafa" }}
          >
            <FaCloudUploadAlt size={30} className="text-secondary mb-2" />
            <p className="text-muted mb-0">
              Drag and drop files here or click to upload
            </p>
          </div>
        </Form.Group>

        {/* Additional Notes */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold small">
            Additional Notes
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter any additional notes or observations..."
          />
        </Form.Group>

        {/* Footer Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="outline-secondary">Cancel</Button>
          <Button style={{ backgroundColor: "#0052CC" }}>
            <FaSave className="me-2" /> Save ITP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddITPs;
