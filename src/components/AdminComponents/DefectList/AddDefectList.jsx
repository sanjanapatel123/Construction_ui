import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import { apiUrl } from "../../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../redux/slices/projectSlice"; // Adjust the import path as necessary
import { Modal } from "react-bootstrap";
import { fetchUsers } from "../../../redux/slices/userSlice"; // Adjust the import path as necessary
import { fetchDefectDetails, updateDefectList } from "../../../redux/slices/defectSlice";

function AddDefectList() {
  const { id } = useParams();
  console.log(id, "id");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    project: "",
    location: "",
    category: "",
    assigned: "",
    priority: "Low",
    description: "",
    status: "New",
    comments: "",
    date: "",
  });

  const dispatch = useDispatch();
  const { data: projects, loading } = useSelector((state) => state.projects);
  const [categories, setCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const users = useSelector((state) => state.users.data);

  const [image, setImage] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/category`);
      // console.log("Categories:", response.data);
      const categoryList = response.data?.data || [];
      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    dispatch(fetchProjects()); // Fetch projects when component mounts
    fetchCategories(); // Fetch categories when component mounts
    dispatch(fetchUsers());
    
    if(id) {
      dispatch(fetchDefectDetails(id)).then(({ payload }) => {
        console.log(payload);
        console.log(payload.title, "title");
        setFormData({
          title: payload?.title,
          project: payload?.project?._id,
          location: payload.location,          
          category: payload.category?._id,
          assigned: payload.assigned?._id,
          priority: payload.priority,
          description: payload.description,
          status: payload.status,
          comments: payload.comments,
          date: new Date(payload.date).toISOString().split("T")[0],
          image: payload.image || [],
        });
      });
    }

  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = async () => {
    const trimmed = newCategory.trim();
    if (!trimmed || categories.includes(trimmed)) {
      toast.warn("Category is either empty or already exists.");
      return;
    }

    try {
      const response = await axiosInstance.post(`${apiUrl}/category`, {
        category: trimmed,
      });

      setCategories((prev) => [...prev, trimmed]);
      setFormData((prev) => ({ ...prev, category: trimmed }));
      toast.success("Category added successfully!");
    } catch (error) {
      console.error("Category add error:", error);
      toast.error(error.response?.data?.message || "Failed to add category.");
    } finally {
      setNewCategory("");
      setShowCategoryModal(false);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("date", formData.date);
    payload.append("project", formData.project);
    payload.append("location", formData.location);
    payload.append("category", formData.category);
    payload.append("assigned", formData.assigned);
    payload.append("priority", formData.priority);
    payload.append("description", formData.description);
    payload.append("status", formData.status);
    payload.append("comments", formData.comments);
    if (image) payload.append("image", image);

    try {
      if (id) {
        const result = await dispatch(updateDefectList({ 
          id, 
          updatedDefect: payload 
        })).unwrap();
        
        toast.success("Defect updated successfully!");
        navigate('/defects');
      }
       else {
        try {
          const response = await axiosInstance.post(
            `${apiUrl}/defectlists`,
            payload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          toast.success("Defect created successfully!");
          navigate(-1);
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Failed to create defect."
          );
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error?.message || "Failed to process defect.");
    }
  };

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
            className="btn"
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <i className="fa-solid fa-arrow-left me-2"></i> Back to Overview
          </button>
        </div>

        {/* Form Inputs */}
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Defect Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter defect title"
              onChange={handleChange}
              value={formData.title}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Project Name{" "}
              <Link to={"/add-project"}>
                <i
                  className="fa fa-plus ms-2"
                  style={{ cursor: "pointer", color: "#0d6efd" }}
                ></i>
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

        <div className="row g-3 mt-2">
          <div className="col-md-6">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              placeholder="Enter location"
              onChange={handleChange}
              value={formData.location}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label d-flex justify-content-between align-items-center">
              <span>Category</span>
              <i
                className="fa fa-plus"
                style={{ cursor: "pointer", color: "#0d6efd" }}
                onClick={() => setShowCategoryModal(true)}
              ></i>
            </label>

            <select
              name="category"
              className="form-select"
              onChange={handleChange}
              value={formData.category}
              // onClick={fetchCategories}
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={cat._id} value={cat._id}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Modal
          show={showCategoryModal}
          onHide={() => setShowCategoryModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              className="form-control"
              placeholder="Enter new category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowCategoryModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddCategory}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="row g-3 mt-2">
          <div className="col-md-6">
           <label className="form-label">Assigned To</label>
            <select
              name="assigned"
              className="form-select"
              value={formData.assigned}
              onChange={handleChange}
              required
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name || `${user.firstName} ${user.lastName}`}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Priority</label>
            <select
              name="priority"
              className="form-select"
              onChange={handleChange}
              value={formData.priority}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Describe the defect in detail"
            rows={4}
            onChange={handleChange}
            value={formData.description}
          />
        </div>

        <div className="row g-3 mt-3">
          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
              onChange={handleChange}
              value={formData.status}
            >
              <option>New</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
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
          <label className="form-label">Attachments</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        {formData.image?.length > 0 && (
  <div className="mt-2">
    <label className="form-label">Uploaded Files:</label>
    <ul>
      {formData.image.map((url, idx) => (
        <li key={idx}>
          <a href={url} target="_blank" rel="noopener noreferrer">{url.split('/').pop()}</a>
        </li>
      ))}
    </ul>
  </div>
)}

        <div className="mt-3">
          <label className="form-label">Comments & Notes</label>
          <textarea
            name="comments"
            className="form-control"
            placeholder="Add any additional comments or notes"
            rows={3}
            onChange={handleChange}
            value={formData.comments}
          />
        </div>

        <div className="mt-4 d-flex gap-2">
          <button className="btn btn-outline-secondary">Save as Draft</button>
          <Button style={{ backgroundColor: "#0052CC" }} onClick={handleSubmit}>
            { id ? "Update Defect" : "Create Defect"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddDefectList;
