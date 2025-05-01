import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRFI } from "../../../redux/slices/rfiSlice";
import { fetchUsers } from "../../../redux/slices/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function AddRFIs() {

  const { data:users } = useSelector((state) => state.users);
  console.log(users)
  const dispatch = useDispatch();

  
  const [formData, setFormData] = useState({
    subject: "",
    priority: "",
    due_date: "",
    assignee: "",
    department: "",
    description: "",
    image: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const submitData = new FormData();
    submitData.append("subject", formData.subject);
    submitData.append("priority", formData.priority);
    submitData.append("due_date", formData.due_date);
    submitData.append("assignee", formData.assignee);
    submitData.append("department", formData.department);
    submitData.append("description", formData.description);

    formData.image.forEach((file) => {
      submitData.append("image", file);
    });
    // Dispatch the thunk with your formData object
    dispatch(createRFI( submitData )).unwrap().then(() => {
      toast.success("RFI created successfully!");
    }).catch(() => {
      toast.error("Failed to create RFI");
    });
  };


  const handleAutofill = async () => {
    try {
      const response = await fetch(
        `https://constructionaimicroservice-production.up.railway.app/autofill`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ form_type: "rfis" }),
        }
      );

      const data = await response.json();

      if (data?.suggested_data) {
        const {
          subject,
          priority,
          due_date,
          assignee,
          department,
          description,
        } = data.suggested_data;

        setFormData((prev) => ({
          ...prev,
          subject: subject || "",
          priority: priority || "",
          due_date: due_date ? due_date.substring(0, 10) : "",
          assignee: assignee || "",
          department: department || "",
          description: description || "",
        }));
      }
    } catch (error) {
      console.error("Autofill error:", error);
      alert("Failed to fetch autofill data");
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">New RFI</h5>
        <div className="d-flex gap-2 text-nowrap">
          <button
            className="btn bg-primary text-white"
            onClick={handleAutofill}
          >
            autoFill
          </button>
          <Link to="/rfis">
            <button className="btn set_btn text-white">
              <i class="fa-solid fa-arrow-left me-2"></i>Back
            </button>
          </Link>
        </div>
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
               <option value="" disabled>Select priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              name="due_date"
              value={formData.due_date}
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
                <option value="" disabled>Select assignee</option>
            {
              users?.map((user) => (
                
                <option key={user._id} value={user._id}> {user.firstName} {user.lastName
}</option>
              ))
            }

              
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
              <option value="engineering">Engineering</option>
              <option value="construction">Construction</option>
              <option value="design">Design</option>
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
