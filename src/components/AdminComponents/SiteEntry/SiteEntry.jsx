import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addSiteEntry, fetchSiteEntries, updateSiteEntry } from "../../../redux/slices/siteEntrySlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUsers } from "../../../redux/slices/userSlice";
function SiteEntry() {
  const dispatch= useDispatch()
  const navigate = useNavigate();
  const {id}= useParams()
  console.log(id)
  const {entries}= useSelector((state)=>state.entries)
  console.log(entries)

      const users = useSelector((state) => state.users.data);

      

  useEffect(() => {
    if (id) {
      dispatch(fetchSiteEntries());
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    if (id && entries.length > 0) {
      const existingEntry = entries.find((entry) => entry._id === id);
      if (existingEntry) {
        setFormData({
          fullName: existingEntry.fullName,
          workerId: existingEntry.workerId,
          phoneNumber: existingEntry.phoneNumber,
          emailAddress: existingEntry.emailAddress,
          safetyEquipment: existingEntry.safetyEquipment,
          siteName: existingEntry.siteName,
          siteSupervisor: existingEntry.siteSupervisor,
          inductionDate: existingEntry.inductionDate.split("T")[0],
          siteLocation: existingEntry.siteLocation,
        });
      }
    }
  }, [id, entries]);

  const [formData, setFormData] = useState({
    fullName: "",
    workerId: "",
    phoneNumber: "",
    emailAddress: "",
    safetyEquipment: {
      helmet: false,
      safetyBoots: false,
      hiVisVest: false,
      safetyGlasses: false,
      gloves: false,
    },
    siteName: "",
    siteSupervisor: "",
    inductionDate: "",
    siteLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSafetyChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      safetyEquipment: {
        ...formData.safetyEquipment,
        [name]: checked,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      dispatch(updateSiteEntry({ id, updatedEntry: formData }))
        .unwrap()
        .then(() => {
          toast.success("Site Entry Updated Successfully!");
          navigate("/siteEntryTable");
        })
        .catch(() => {
          toast.error("Failed to update site entry!");
        });
    } else {
      dispatch(addSiteEntry(formData))
        .unwrap()
        .then(() => {
          toast.success("Site Entry Added Successfully!");
          navigate("/siteEntryTable");
        })
        .catch(() => {
          toast.error("Failed to add site entry!");
        });
    }
  };

  const isSafetyEquipmentSelected = Object.values(
    formData.safetyEquipment
  ).every((item) => item);

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-between">
          <div>
          <h4>{id ? "Edit Site Entry" : "Add Site Entry"}</h4>
            <p>Please complete all fields to gain access to the site</p>
          </div>
          <div>
            <Link to="/siteEntryTable">
              <button  className="btn"
                style={{ backgroundColor: "#0d6efd", color: "white" }}>
                <i class="fa-solid fa-arrow-left me-2"></i>Back
              </button>
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Personal Details */}
          <div className="bg-white shadow-sm rounded p-3">
          <div className="mb-3 ">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input type="text" className="form-control"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required/>
          </div>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label htmlFor="workerId" className="form-label">
                Worker ID
              </label>
              <input
                type="text"
                className="form-control"
                id="workerId"
                name="workerId"
                value={formData.workerId}
                onChange={handleChange}
                placeholder="WRK-12345"
                required
              />
            </div>
            <div className="mb-3 col-md-6">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="emailAddress" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              required
            />
          </div>
          </div>
          {/* Mandatory Safety Equipment */}
          <div className="mb-3 bg-white shadow-sm rounded p-3 mt-3">
            <div className="d-flex justify-content-between">
            <h5>Mandatory Safety Equipment</h5>
            {!isSafetyEquipmentSelected && (
            <div className="text-warning">All items must be selected</div>
          )}
</div>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="form-check border p-3 rounded-3 h-100">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="helmet"
                    name="helmet"
                    checked={formData.safetyEquipment.helmet}
                    onChange={handleSafetyChange}
                    style={{ marginLeft: "10px" }}
                  />
                  <label className="form-check-label ms-2" htmlFor="helmet">
                    Helmet
                  </label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-check border p-3 rounded-3 h-100">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="safetyBoots"
                    name="safetyBoots"
                    checked={formData.safetyEquipment.safetyBoots}
                    onChange={handleSafetyChange}
                    style={{ marginLeft: "10px" }}
                  />
                  <label
                    className="form-check-label ms-2"
                    htmlFor="safetyBoots"
                  >
                    Safety Boots
                  </label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-check border p-3 rounded-3 h-100 ">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="hiVisVest"
                    name="hiVisVest"
                    checked={formData.safetyEquipment.hiVisVest}
                    onChange={handleSafetyChange}
                    style={{ marginLeft: "10px" }}
                  />
                  <label className="form-check-label ms-2" htmlFor="hiVisVest">
                    Hi-Vis Vest
                  </label>
                </div>
              </div>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-md-4">
                <div className="form-check border p-3 rounded-3 h-100">
                  <input
                    type="checkbox"
                    className="form-check-input "
                    id="safetyGlasses"
                    name="safetyGlasses"
                    checked={formData.safetyEquipment.safetyGlasses}
                    onChange={handleSafetyChange}
                    style={{ marginLeft: "10px" }}
                  />
                  <label
                    className="form-check-label ms-2"
                    htmlFor="safetyGlasses"
                  >
                    Safety Glasses
                  </label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-check border p-3 rounded-3 h-100">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="gloves"
                    name="gloves"
                    checked={formData.safetyEquipment.gloves}
                    onChange={handleSafetyChange}
                    style={{ marginLeft: "10px" }}
                  />
                  <label className="form-check-label ms-2" htmlFor="gloves">
                    Gloves
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Site Information */}
<div className="bg-white shadow-sm rounded p-3 mt-3">
          <div className="row ">
            <h4>Site Information</h4>
          <div className="mb-3 col-md-6">
            <label htmlFor="siteName" className="form-label">
              Site Name
            </label>
            <input
              type="text"
              className="form-control"
              id="siteName"
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              placeholder="Main Construction Site"
              required
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="siteSupervisor" className="form-label">
              Site Supervisor
            </label>
            <select
            
              className="form-control"
              id="siteSupervisor"
              name="siteSupervisor"
              value={formData.siteSupervisor}
              onChange={handleChange}
              placeholder="Jane Smith"
              required
            >
              <option value="" disabled>Select Site Supervisor</option>
             {users
    .filter((user) => user.role?.toLowerCase() === "supervisor")
    .map((user) => (
      <option key={user._id} value={user._id}>
        {user.name || `${user.firstName} ${user.lastName}`}
      </option>
    ))}
              </select>
          </div>
          </div>
          <div className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="inductionDate" className="form-label">
              Induction Date
            </label>
            <input
              type="date"
              className="form-control"
              id="inductionDate"
              name="inductionDate"
              value={formData.inductionDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="siteLocation" className="form-label">
              Site Location
            </label>
            <input
              type="text"
              className="form-control"
              id="siteLocation"
              name="siteLocation"
              value={formData.siteLocation}
              onChange={handleChange}
              placeholder="123 Construction Ave, Building B"
              required
            />
          </div>
          </div>
          </div>
          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">
  {id ? "Update Entry" : "Add Entry"}
</button>
        </form>
      </div>
    </>
  );
}

export default SiteEntry;

