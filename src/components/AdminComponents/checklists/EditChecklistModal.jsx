// src/components/modals/EditChecklistModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

const EditChecklistModal = ({
  show,
  handleClose,
  checklistDetails,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    checklistName: "",
    AssignTo: "",
    project: "",
    date: "",
    status: "",
  });

  useEffect(() => {
    if (checklistDetails) {
      setFormData({
        checklistName: checklistDetails.checklistName || "",
        AssignTo: checklistDetails.AssignTo || "",
        project: checklistDetails.project || "",
        date: checklistDetails.date?.substring(0, 10) || "",
        status: checklistDetails.status || "",
      });
    }
  }, [checklistDetails]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    onUpdate({ ...formData, _id: checklistDetails._id }); // Trigger the parent function with updated data
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Checklist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!checklistDetails ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Checklist Name</label>
                <input
                  type="text"
                  name="checklistName"
                  value={formData.checklistName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Assign To</label>
                <input
                  type="text"
                  name="AssignTo"
                  value={formData.AssignTo}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Project</label>
                <input
                  type="text"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                </select>
              </div>
            </div>
          </form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditChecklistModal;
