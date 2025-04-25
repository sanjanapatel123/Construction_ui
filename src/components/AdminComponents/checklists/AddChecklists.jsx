import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { apiUrl } from "../../../utils/config"; // Define your API base URL here
import axiosInstance from "../../../utils/axiosInstance"; // Create axios instance with base URL
import { toast } from "react-toastify";

function AddChecklists() {
  const [formData, setFormData] = useState({
    checklistName: "",
    project: "",
    assignTo: "",
    date: "",
    checklistItems: [{ checklistItem: "" }],
    additionalNotes: "",
  });

  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checklist item changes
  const handleChecklistItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.checklistItems];
    newItems[index] = { [name]: value };
    setFormData((prevData) => ({
      ...prevData,
      checklistItems: newItems,
    }));
  };

  // Add another checklist item
  const addChecklistItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      checklistItems: [...prevData.checklistItems, { checklistItem: "" }],
    }));
  };

  // Remove a checklist item
  const removeChecklistItem = (index) => {
    const newItems = formData.checklistItems.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      checklistItems: newItems,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `${apiUrl}/checklists`,
        formData
      );
      toast.success("Checklist created successfully!");
      navigate("/checklists"); // Redirect after success
    } catch (error) {
      toast.error("Failed to create checklist. Please try again.", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center py-4">
      <div className="bg-white p-4 rounded shadow-sm w-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-semibold">Create New Checklist</h4>
          <button
            onClick={() => navigate(-1)}
            className="btn"
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <i className="fa-solid fa-arrow-left me-2"></i> Back to Overview
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Checklist Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter checklist name"
                name="checklistName"
                value={formData.checklistName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Project</label>
              <select
                className="form-select"
                name="project"
                value={formData.project}
                onChange={handleChange}
                required
              >
                <option value="">Select Project</option>
                <option value="Project 1">Project 1</option>
                <option value="Project 2">Project 2</option>
                {/* Add more projects here */}
              </select>
            </div>
          </div>

          <div className="row g-3 mt-3">
            <div className="col-md-6">
              <label className="form-label">Assign To</label>
              <select
                className="form-select"
                name="assignTo"
                value={formData.assignTo}
                onChange={handleChange}
                required
              >
                <option value="">Select Team Member</option>
                <option value="User1">User 1</option>
                <option value="User2">User 2</option>
                {/* Add more users here */}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <h5>Checklist Items</h5>
            {formData.checklistItems.map((item, index) => (
              <div key={index} className="d-flex gap-2 align-items-center mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter checklist item"
                  name="checklistItem"
                  value={item.checklistItem}
                  onChange={(e) => handleChecklistItemChange(index, e)}
                  required
                />
                <select className="form-select w-auto" defaultValue="Required">
                  <option>Required</option>
                </select>
                <i
                  className="fas fa-trash text-danger"
                  onClick={() => removeChecklistItem(index)}
                />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={addChecklistItem}
            >
              <i className="fas fa-plus" /> Add Another Item
            </button>
          </div>

          <div className="mt-4">
            <h5>Additional Notes</h5>
            <textarea
              className="form-control"
              placeholder="Enter any additional notes or instructions"
              rows={3}
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4 d-flex gap-2">
            <button className="btn btn-outline-secondary" type="button">
              Save as Draft
            </button>
            <Button style={{ backgroundColor: "#0052CC" }} type="submit">
              Create Checklist
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddChecklists;
