import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addtool, getalltool, updatetool } from "../../../redux/slices/toolSlice";

function AddToolRegistry() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { tools, loading, error } = useSelector((state) => state.tools);

  const [formData, setFormData] = useState({
    toolID: "",
    name: "",
    manufacturer: "",
    category: "",
    purchaseDate: "",
    condition: "",
    notes: "",
    location: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getalltool());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && tools.length > 0) {
      const existingEntry = tools.find((entry) => entry._id === id);
      if (existingEntry) {
        setFormData({
          toolID: existingEntry.toolID,
          name: existingEntry.name,
          manufacturer: existingEntry.manufacturer,
          category: existingEntry.category,
          purchaseDate: existingEntry.purchaseDate.split("T")[0],
          condition: existingEntry.condition,
          notes: existingEntry.notes,
          location: existingEntry.location,
        });
      }
    }
  }, [id, tools]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      dispatch(updatetool({ id, updatedtool: formData }))
        .unwrap()
        .then(() => {
          toast.success("Tool Updated Successfully!");
          navigate("/plantMachinery");
        })
        .catch(() => {
          toast.error("Failed to update Tool!");
        });
    } else {
      dispatch(addtool(formData))
        .unwrap()
        .then(() => {
          toast.success("Tool Added successfully");
          navigate("/plantMachinery");
        })
        .catch(() => {
          toast.error("Error in creating tool");
        });
    }
  };

  return (
    <div
      className="container d-flex justify-content-center py-4"
      style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
    >
      <div className="bg-white p-4 rounded shadow-sm w-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-semibold">Add New Tool</h4>
          <button
            onClick={() => navigate("/PlantMachinery")}
            className="btn"
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <i className="fa-solid fa-arrow-left me-2"></i> Back to Overview
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Tool ID</label>
              <input
                type="text"
                className="form-control"
                name="toolID"
                value={formData.toolID}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Tool Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
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
                required
              >
                <option value="">Select Category</option>
                <option value="Power Tools">Power Tools</option>
                <option value="Hand Tools">Hand Tools</option>
                <option value="Measuring Tools">Measuring Tools</option>
                <option value="Safety Equipment">Safety Equipment</option>
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
                required
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
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
              required
            >
              <option value="">Select Location</option>
              <option value="Main Construction Site">Main Construction Site</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>

          <div className="mt-4 d-flex gap-2 justify-content-end">
            <Link to="/plantMachinery">
              <button type="button" className="btn btn-light">
                Cancel
              </button>
            </Link>
            <Button
              style={{ backgroundColor: "#0052CC" }}
              type="submit"
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
