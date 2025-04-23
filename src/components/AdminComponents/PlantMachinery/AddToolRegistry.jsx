import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function AddToolRegistry() {
  const [formData, setFormData] = useState({
    toolId: "",
    toolName: "",
    manufacturer: "",
    category: "Power Tools",
    purchaseDate: "",
    condition: "New",
    notes: "",
    location: "Main Construction Site",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const navigate = useNavigate();

  return (
    <div
      className="container d-flex justify-content-center py-4"
      style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
    >
      <div className="bg-white p-4 rounded shadow-sm w-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-semibold">Add New Tool</h4>
          <button
            onClick={() => navigate(-1)}
            className="btn " style={{backgroundColor:"#0d6efd",color:"white"}}
          >
            <i class="fa-solid fa-arrow-left me-2"></i> Back to Overview
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Tool ID</label>
              <input
                type="text"
                className="form-control"
                name="toolId"
                value={formData.toolId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Tool Name</label>
              <input
                type="text"
                className="form-control"
                name="toolName"
                value={formData.toolName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <label className="form-label">Manufacturer</label>
              <input
                type="text"
                className="form-control"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option>Power Tools</option>
                <option>Hand Tools</option>
                <option>Measuring Tools</option>
                <option>Safety Equipment</option>
              </select>
            </div>
          </div>

          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <label className="form-label">Purchase Date</label>
              <input
                type="date"
                className="form-control"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Condition</label>
              <select
                className="form-select"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
              >
                <option>New</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Poor</option>
              </select>
            </div>
          </div>

          <div className="mt-3">
            <label className="form-label">Notes</label>
            <textarea
              className="form-control"
              rows="4"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-3">
            <label className="form-label">Location</label>
            <select
              className="form-select"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            >
              <option>Main Construction Site</option>
              <option>Warehouse</option>
              <option>Workshop</option>
            </select>
          </div>

          <div className="mt-4 d-flex gap-2 justify-content-end">
            <button type="button" className="btn btn-light">
              Cancel
            </button>
            <Button
              style={{ backgroundColor: "#0052CC" }}
              type="submit"
              // className="btn btn-dark"
            >
              Save Tool
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddToolRegistry;
