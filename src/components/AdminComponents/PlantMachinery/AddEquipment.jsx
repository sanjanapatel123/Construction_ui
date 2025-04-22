import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function AddEquipment() {
  const [formData, setFormData] = useState({
    equipmentId: "",
    equipmentName: "",
    type: "",
    location: "",
    purchaseDate: "",
    purchaseCost: "",
    description: "",
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
      style={{ fontSize: "14px" }}
    >
      <div className="bg-white p-4 rounded shadow-sm w-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-semibold m-0">Add New Equipment</h4>
          {/* <button className="btn btn-link text-dark p-0">Cancel</button> */}
          <button
            onClick={() => navigate(-1)}
            className="btn " style={{backgroundColor:"#0d6efd",color:"white"}}
          >
            <i class="fa-solid fa-arrow-left me-2"></i>Back to Overview
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Equipment ID</label>
              <input
                type="text"
                className="form-control"
                name="equipmentId"
                value={formData.equipmentId}
                onChange={handleInputChange}
                placeholder="Enter Equipment ID"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Equipment Name</label>
              <input
                type="text"
                className="form-control"
                name="equipmentName"
                value={formData.equipmentName}
                onChange={handleInputChange}
                placeholder="Enter Equipment Name"
              />
            </div>
          </div>

          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="">Select Type</option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Location</label>
              <select
                className="form-select"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              >
                <option value="">Select Location</option>
                <option value="location1">Location 1</option>
                <option value="location2">Location 2</option>
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
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Purchase Cost</label>
              <input
                type="number"
                className="form-control"
                name="purchaseCost"
                value={formData.purchaseCost}
                onChange={handleInputChange}
                placeholder="Enter Cost"
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter equipment description"
              rows={4}
            />
          </div>

          <div className="mt-3">
            <label className="form-label">Upload Equipment Images</label>
            <div className="border rounded p-3 text-center">
              <div className="mb-2">
                <i className="fas fa-cloud-upload-alt fa-2x text-secondary"></i>
              </div>
              <div className="text-muted">
                Upload files or drag and drop
                <br />
                PNG, JPG, GIF up to 10MB
              </div>
            </div>
          </div>

          <div className="mt-4 d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-light">
              Cancel
            </button>
            <Button
              style={{ backgroundColor: "#0052CC" }}
              type="submit"
              // className="btn btn-dark"
            >
              Save Equipment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEquipment;
