import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiUrl } from "../../../utils/config";
import { toast } from "react-toastify";

function AddUserManagement() {
  const navigate = useNavigate();
  const imageRef = useRef();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "", // default password
    passwordConfirm: "",
    role: "",
    department: "",
    viewProjectDetails: false,
    editProjectInformation: false,
    manageTeamMembers: false,
    accessFinancialData: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    if (imageRef.current?.files[0]) {
      form.append("image", imageRef.current.files[0]);
    }

    try {
      const res = await fetch(`${apiUrl}/users`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (data.status === "success") {
        toast.success("User created successfully!");
        navigate("/UserManagement");
      } else {
        console.error(data);
        toast.error("Failed to create user.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating user.");
    }
  };

  return (
    <div>
      <div
        className="p-4 bg-white m-3"
        style={{ borderRadius: "10px", fontFamily: "Poppins, sans-serif" }}
      >
        <div
          className="card shadow-sm border-0 p-2 py-3"
          style={{ width: "100%", maxWidth: "1200px" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-semibold mb-0">Add New User</h4>
            <Link to="/UserManagement">
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#0d6efd", color: "white" }}
              >
                <i className="fa-solid fa-arrow-left me-2"></i> Back
              </button>
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password and Confirm Password */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="passwordConfirm" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Role and Department */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  className="form-select"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Select role</option>
                  <option>Project Manager</option>
                  <option>Site Supervisor</option>
                  <option>Construction Worker</option>
                  <option>Architect</option>
                  <option>Engineer</option>
                  <option>Safety Officer</option>
                  <option>Procurement Officer</option>
                  <option>Quantity Surveyor</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="department" className="form-label">
                  Department
                </label>
                <select
                  className="form-select"
                  id="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select department</option>
                  <option>Planning & Design</option>
                  <option>Procurement</option>
                  <option>Construction</option>
                  <option>Health & Safety</option>
                  <option>Quality Assurance</option>
                  <option>Human Resources</option>
                  <option>Finance & Accounts</option>
                  <option>Legal & Compliance</option>
                  <option>Administration</option>
                </select>
              </div>
            </div>

            {/* Profile Image */}
            <div className="mb-4">
              <label className="form-label">Profile Image</label>
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className="bi bi-person fs-3 text-muted"></i>
                </div>
                <button
                  type="button"
                  className="btn btn-light border ms-3"
                  onClick={() => imageRef.current.click()}
                >
                  Upload Image
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={imageRef}
                  className="d-none"
                />
              </div>
            </div>

            {/* Permissions */}
            <div className="mb-4">
              <label className="form-label">Access Permissions</label>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="viewProjectDetails"
                      checked={formData.viewProjectDetails}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="viewProjectDetails"
                    >
                      View project details
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="editProjectInformation"
                      checked={formData.editProjectInformation}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="editProjectInformation"
                    >
                      Edit project information
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="manageTeamMembers"
                      checked={formData.manageTeamMembers}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="manageTeamMembers"
                    >
                      Manage team members
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="accessFinancialData"
                      checked={formData.accessFinancialData}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="accessFinancialData"
                    >
                      Access financial data
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-light border me-2">
                Cancel
              </button>
              <button type="submit" className="btn set_btn text-white">
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUserManagement;
