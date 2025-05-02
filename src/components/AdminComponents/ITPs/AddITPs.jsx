import { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import {
  FaTrash,
  FaEdit,
  FaSave,
  FaCloudUploadAlt,
  FaCopy,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../../utils/config";
import axiosInstance from "../../../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../redux/slices/projectSlice";
import { fetchUsers } from "../../../redux/slices/userSlice"; // Adjust the import path as necessary
import { fetchITPs } from "../../../redux/slices/itpSlice";
import { toast } from "react-toastify";

const AddITPs = () => {
  const dispatch = useDispatch();
  const { data: projects, loading: projectLoading } = useSelector(
    (state) => state.projects
  );

  const users = useSelector((state) => state.users.data);

  const [items, setItems] = useState([
    { description: "", status: "Pass", comments: "" },
  ]);
  const [formData, setFormData] = useState({
    projectName: "",
    inspectionType: "",
    inspector: "",
    activity: "",
    criteria: "",
    status: "",
    inspectionDate: "",
    additionalNotes: "",
    image: [], // To store uploaded files
  });

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUsers()); // Fetch users for the inspector dropdown
  }, [dispatch]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addItem = () => {
    setItems([...items, { description: "", status: "Pass", comments: "" }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    setItems(updatedItems);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      ...formData,
      inspectionItems: items,
    };

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("projectName", formData.projectName);
    formDataToSubmit.append("InspectionType", formData.inspectionType); // Note casing
    formDataToSubmit.append("Inspector", formData.inspector); // Note casing
    formDataToSubmit.append("Date", formData.inspectionDate);
    formDataToSubmit.append("activity", formData.activity);
    formDataToSubmit.append("criteria", formData.criteria);
    formDataToSubmit.append("status", formData.status);
    formDataToSubmit.append("additionalNotes", formData.additionalNotes);

    // Append inspection items as JSON string
    formDataToSubmit.append("inspectionItems", JSON.stringify(items));

    // Append files
    formData.image.forEach((file) => {
      formDataToSubmit.append("images", file);
    });

    try {
      const response = await axiosInstance.post(
        `${apiUrl}/itps`,
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("ITP Created:", response.data);
      toast.success("ITP submitted successfully!");
      dispatch(fetchITPs()); // Fetch updated projects list
      navigate("/itps"); // Redirect to the ITPS overview page
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to submit ITP.");
    }
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
          body: JSON.stringify({ form_type: "itps" }),
        }
      );

      const result = await response.json();
      const suggested_data = result?.suggested_data;

      if (!suggested_data) {
        toast.error("No autofill data found.");
        return;
      }

      setFormData({
        projectName: suggested_data.projectName || "",
        inspectionType: suggested_data.InspectionType || "",
        inspector: suggested_data.Inspector || "",
        activity: suggested_data.activity || "",
        criteria: suggested_data.criteria || "",
        status: suggested_data.status || "",
        inspectionDate: suggested_data.Date
          ? new Date(suggested_data.Date).toISOString().split("T")[0]
          : "",
        additionalNotes: suggested_data.additionalNotes || "",
        image: [], // Leave empty; do not autofill images
      });

      const mappedItems = (suggested_data.InspectionItems || []).map(
        (item) => ({
          description: item.itemDescription || "",
          status: item.status ? "Pass" : "Fail",
          comments: item.comments || "",
        })
      );

      setItems(
        mappedItems.length > 0
          ? mappedItems
          : [{ description: "", status: "Pass", comments: "" }]
      );

      toast.success("Form autofilled successfully.");
    } catch (error) {
      console.error("Autofill failed:", error);
      toast.error("Failed to fetch autofill data.");
    }
  };

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Inspection Test Plans</h3>
        <div className="d-flex gap-2 text-nowrap">
          <button
            className="btn bg-primary text-white"
            onClick={handleAutofill}
          >
            autoFill
          </button>
          <button
            onClick={() => navigate(-1)}
            className="btn bg-primary text-white"
          >
            <i className="fa-solid fa-arrow-left me-2"></i> Back to Overview
          </button>
        </div>
      </div>
      <div className="card p-4 shadow-sm">
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <Form.Group controlId="activity">
              <Form.Label className="fw-semibold small">Activity</Form.Label>
              <Form.Control
                type="text"
                name="activity"
                value={formData.activity}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="criteria">
              <Form.Label className="fw-semibold small">Criteria</Form.Label>
              <Form.Control
                type="text"
                name="criteria"
                value={formData.criteria}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </div>
        </div>

        {/* Header Fields */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <Form.Group controlId="projectName">
              <Form.Label className="fw-semibold small">
                Project Name{" "}
                <Link to={"/add-project"}>
                  <i
                    className="fa fa-plus ms-2"
                    style={{ cursor: "pointer", color: "#0d6efd" }}
                  ></i>
                </Link>
              </Form.Label>
              <Form.Select
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
              >
                <option value="">Select Project</option>
                {projectLoading ? (
                  <option disabled>Loading...</option>
                ) : (
                  projects.map((project) => (
                    <option key={project._id} value={project.projectName}>
                      {project.name}
                    </option>
                  ))
                )}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="inspectionType">
              <Form.Label className="fw-semibold small">
                Inspection Type
              </Form.Label>
              <Form.Select
                name="inspectionType"
                value={formData.inspectionType}
                onChange={handleInputChange}
              >
                <option value="">Select assignee</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Alex Johnson">Alex Johnson</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <Form.Group controlId="inspector">
              <Form.Label>Assigned By</Form.Label>
              <Form.Select
                name="inspector"
                value={formData.inspector}
                onChange={handleInputChange}
                required
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name || `${user.firstName} ${user.lastName}`}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="inspectionDate">
              <Form.Label className="fw-semibold small">
                Inspection Date
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="date"
                  name="inspectionDate"
                  value={formData.inspectionDate}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Form.Group>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <Form.Group controlId="inspectionDate">
              <Form.Label className="fw-semibold small">Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>

        {/* Inspection Items */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold small">
            Inspection Items
          </Form.Label>
          {items.map((item, index) => (
            <InputGroup className="mb-2" key={index}>
              <Form.Control
                placeholder="Item Description"
                value={item.description}
                name="description"
                onChange={(e) => handleItemChange(index, e)}
              />
              <Form.Select
                name="status"
                value={item.status}
                onChange={(e) => handleItemChange(index, e)}
              >
                <option>Pass</option>
                <option>Fail</option>
              </Form.Select>
              <Form.Control
                placeholder="Comments"
                value={item.comments}
                name="comments"
                onChange={(e) => handleItemChange(index, e)}
              />
              <Button
                variant="outline-danger"
                onClick={() => removeItem(index)}
              >
                <FaTrash />
              </Button>
              <Button variant="outline-secondary">
                <FaEdit />
              </Button>
              <Button variant="outline-dark">
                <FaCopy />
              </Button>
            </InputGroup>
          ))}
          <Button
            variant="link"
            className="text-dark fw-semibold mt-2"
            onClick={addItem}
          >
            + Add Item
          </Button>
        </Form.Group>

        {/* Attachments */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold small">Attachments</Form.Label>
          <div
            className="border border-secondary-subtle text-center p-4 rounded"
            style={{ borderStyle: "dashed", background: "#fafafa" }}
          >
            <FaCloudUploadAlt size={30} className="text-secondary mb-2" />
            <p className="text-muted mb-0">
              Drag and drop files here or click to upload
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              style={{ display: "none" }}
              id="fileUpload"
            />
            <label htmlFor="fileUpload" className="text-muted small mb-0">
              Choose Files
            </label>
          </div>
        </Form.Group>

        {/* Additional Notes */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold small">
            Additional Notes
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleInputChange}
            placeholder="Enter any additional notes or observations..."
          />
        </Form.Group>

        {/* Footer Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#0052CC" }}
            type="submit"
            onClick={handleSubmit}
          >
            <FaSave className="me-2" /> Save ITP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddITPs;
