import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function AddDefectList() {
  const navigate = useNavigate();
  return (
    <div
      className="container d-flex justify-content-center py-4"
      style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
    >
      <div className="bg-white p-4 rounded shadow-sm w-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-semibold m-0">Log New Defect</h4>
          <button
            onClick={() => navigate(-1)}
            className="btn " style={{backgroundColor:"#0d6efd",color:"white"}}
          >
            <i class="fa-solid fa-arrow-left me-2"></i> Back to Overview
          </button>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Defect Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter defect title"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Project Name</label>
            <select className="form-select">
              <option>Select Project</option>
            </select>
          </div>
        </div>

        <div className="row g-3 mt-2">
          <div className="col-md-6">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter location"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select className="form-select">
              <option>Select Category</option>
            </select>
          </div>
        </div>

        <div className="row g-3 mt-2">
          <div className="col-md-6">
            <label className="form-label">Assigned To</label>
            <select className="form-select">
              <option>Select Team Member</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Priority</label>
            <select className="form-select">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="Describe the defect in detail"
            rows={4}
          />
        </div>

        <div className="mt-3">
          <label className="form-label">Status</label>
          <select className="form-select">
            <option>New</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
        </div>

        <div className="mt-3">
          <label className="form-label">Attachments</label>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-outline-secondary">
              <i className="fas fa-upload me-2"></i>Upload Files
            </button>
          </div>
        </div>

        <div className="mt-3">
          <label className="form-label">Comments & Notes</label>
          <textarea
            className="form-control"
            placeholder="Add any additional comments or notes"
            rows={3}
          />
        </div>

        <div className="mt-4 d-flex gap-2">
          <button className="btn btn-outline-secondary">Save as Draft</button>
          <Button
            style={{ backgroundColor: "#0052CC" }}
            // className="btn btn-dark"
          >
            Create defect
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddDefectList;
