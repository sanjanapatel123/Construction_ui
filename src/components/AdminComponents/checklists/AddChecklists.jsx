import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { apiUrl } from "../../../utils/config";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../redux/slices/projectSlice";
import { fetchChecklists, fetchChecklistDetails, updateChecklist } from "../../../redux/slices/checklistSlice";
import { fetchUsers } from "../../../redux/slices/userSlice";

function AddChecklists() {

  const { id } = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users.data);
  const { data: projects, loading } = useSelector((state) => state.projects);

  const [formData, setFormData] = useState({
    checklistName: "",
    project: "",
    AssignTo: "",
    date: "",
    checklistItems: [{ checklistItem: "", checked: false }],
    additionalNotes: "",
    status: "Pending",
  });

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProjects());

    if (id) {
      dispatch(fetchChecklistDetails(id)).then((action) => {
        if (action.payload) {
          setFormData({
            checklistName: action.payload.checklistName,
            project: action.payload.project?._id,
            AssignTo: action.payload.AssignTo?._id,
            date: new Date(action.payload.date).toISOString().split("T")[0],
            checklistItems: action.payload.checklistItems,
            additionalNotes: action.payload.additionalNotes,
            status: action.payload.status,
          });
        }
      });
    }
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChecklistItemChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newItems = [...formData.checklistItems];
    newItems[index] = {
      ...newItems[index],
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData((prevData) => ({ ...prevData, checklistItems: newItems }));
  };

  const addChecklistItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      checklistItems: [...prevData.checklistItems, { checklistItem: "", checked: false }],
    }));
  };

  const removeChecklistItem = (index) => {
    const newItems = formData.checklistItems.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, checklistItems: newItems }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("checklistName", formData.checklistName);
    payload.append("project", formData.project);
    payload.append("AssignTo", formData.AssignTo);
    payload.append("date", formData.date);
    payload.append("additionalNotes", formData.additionalNotes);
    payload.append("status", formData.status);
    payload.append("checklistItems", JSON.stringify(formData.checklistItems));

    try {
      if (id) {
        // Update
        await dispatch(updateChecklist({ id, checklistData: payload })).unwrap();
        toast.success("Checklist updated successfully!");
      } else {
        // Create
        await axiosInstance.post(`${apiUrl}/checklists`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Checklist created successfully!");
      }
      navigate("/checklists");
    } catch (error) {
      toast.error(error?.message || "Failed to process checklist.");
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
                name="checklistName"
                value={formData.checklistName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                Project
                <Link to="/add-project">
                  <i className="fa fa-plus ms-2" style={{ color: "#0d6efd", cursor: "pointer" }}></i>
                </Link>
              </label>
              {loading ? (
                <div>Loading projects...</div>
              ) : (
                <select
                  className="form-select"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Project</option>
                  {projects?.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="row g-3 mt-3">
            <div className="col-md-6">
              <label className="form-label">Assign To</label>
              <select
                className="form-select"
                name="AssignTo"
                value={formData.AssignTo}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name || `${user.firstName} ${user.lastName}`}
                  </option>
                ))}
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

          <div className="mt-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="mt-4">
            <h5>Checklist Items</h5>
            {formData.checklistItems.map((item, index) => (
              <div key={index} className="d-flex gap-2 align-items-center mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="checklistItem"
                  value={item.checklistItem}
                  placeholder="Enter checklist item"
                  onChange={(e) => handleChecklistItemChange(index, e)}
                  required
                />
                <div className="form-check ms-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="checked"
                    checked={item.checked}
                    onChange={(e) => handleChecklistItemChange(index, e)}
                    id={`checked-${index}`}
                  />
                  <label className="form-check-label" htmlFor={`checked-${index}`}>
                    Completed
                  </label>
                </div>
                <i
                  className="fas fa-trash text-danger ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeChecklistItem(index)}
                />
              </div>
            ))}
            <button type="button" className="btn btn-outline-secondary" onClick={addChecklistItem}>
              <i className="fas fa-plus" /> Add Another Item
            </button>
          </div>

          <div className="mt-4">
            <h5>Additional Notes</h5>
            <textarea
              className="form-control"
              name="additionalNotes"
              rows={3}
              placeholder="Enter any additional notes or instructions"
              value={formData.additionalNotes}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4 d-flex gap-2">
            <button className="btn btn-outline-secondary" type="button">
              Save as Draft
            </button>
            <Button style={{ backgroundColor: "#0052CC" }} type="submit">
            {id ? "Update Checklist" : "Create Checklist"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddChecklists;

