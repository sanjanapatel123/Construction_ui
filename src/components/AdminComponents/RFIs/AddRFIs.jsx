import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { apiUrl } from "../../../utils/config";

function AddRFIs() {
  const [formData, setFormData] = useState({
    projectName: "",
    InspectionType: "",
    Inspector: "",
    Date: "",
    InspectionItems: [{ itemDescription: "", status: false, comments: "" }],
    additionalNotes: "",
    image: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInspectionItemChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedItems = [...formData.InspectionItems];
    updatedItems[index][name] = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, InspectionItems: updatedItems }));
  };

  const addInspectionItem = () => {
    setFormData((prev) => ({
      ...prev,
      InspectionItems: [
        ...prev.InspectionItems,
        { itemDescription: "", status: false, comments: "" },
      ],
    }));
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    const uploadedUrls = [];

    for (const file of files) {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Cloudinary preset
      form.append("folder", "itp_uploads");

      const res = await axiosInstance.post(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
        form
      );
      uploadedUrls.push(res.data.secure_url);
    }

    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, ...uploadedUrls],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`${apiUrl}/itps`, formData);
      console.log("ITP Created:", response.data);
      alert("ITP submitted successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit ITP.");
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">New RFI</h5>
        <Link to="/rfis">
          {" "}
          <button className="btn set_btn text-white">
            <i class="fa-solid fa-arrow-left me-2"></i>Back
          </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Assignee</label>
            <select
              className="form-select"
              name="assignee"
              value={formData.assignee}
              onChange={handleInputChange}
            >
              <option>Sarah Johnson</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
            >
              <option>Engineering</option>
              <option>Construction</option>
              <option>Design</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="form-label">Attachments</label>
          <div
            className="border rounded p-3 text-center"
            style={{ cursor: "pointer" }}
          >
            <input
              type="file"
              className="d-none"
              id="fileUpload"
              multiple
              onChange={handleFileUpload}
            />
            <label
              htmlFor="fileUpload"
              className="mb-0"
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-cloud-upload fs-3 text-muted"></i>
              <p className="text-muted small mb-0 mt-2">
                Upload files or drag and drop
              </p>
              <p className="text-muted small mb-0">PNG, JPG, PDF up to 10MB</p>
            </label>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit RFI
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRFIs;
