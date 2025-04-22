import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function AddChecklists() {
  const navigate = useNavigate();
  return (
    <div className="container d-flex justify-content-center py-4">
      <div className="bg-white p-4 rounded shadow-sm w-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-semibold">Create New Checklist</h4>
          <button
            onClick={() => navigate(-1)}
            className="btn" style={{backgroundColor:"#0d6efd",color:"white"}}
          >
            <i class="fa-solid fa-arrow-left me-2"></i> Back to Overview
          </button>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Checklist Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter checklist name"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Project</label>
            <select className="form-select">
              <option>Select Project</option>
            </select>
          </div>
        </div>

        <div className="row g-3 mt-3">
          <div className="col-md-6">
            <label className="form-label">Assign To</label>
            <select className="form-select">
              <option>Select Team Member</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Due Date</label>
            <input type="date" className="form-control" />
          </div>
        </div>

        <div className="mt-4">
          <h5>Checklist Items</h5>
          <div className="d-flex gap-2 align-items-center mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter checklist item"
            />
            <select className="form-select w-auto">
              <option>Required</option>
            </select>
            <i className="fas fa-trash text-danger" />
          </div>
          <button className="btn btn-outline-secondary">
            <i className="fas fa-plus" /> Add Another Item
          </button>
        </div>

        <div className="mt-4">
          <h5>Additional Notes</h5>
          <textarea
            className="form-control"
            placeholder="Enter any additional notes or instructions"
            rows={3}
          />
        </div>

        <div className="mt-4 d-flex gap-2">
          <button className="btn btn-outline-secondary">Save as Draft</button>
          <Button
            style={{ backgroundColor: "#0052CC" }}
            // className="btn btn-dark"
          >
            Create Checklist
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddChecklists;
