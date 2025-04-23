import React from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
function AddAnnouncements() {
  return (
<div className="container " >
      <div className="border rounded shadow-sm p-4 m-4" style={{backgroundColor:"white"}}>
      <div className="d-flex justify-content-between align-items-center mb-4">
  <h4 className="fw-bold mb-0">Create New Announcement</h4>
  <Link to="/announcements">
    <button className="btn set_btn text-white"><i class="fa-solid fa-arrow-left me-2"></i>Back</button>
  </Link>
</div>

        {/* Title Input */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter announcement title"
          />
        </div>

        {/* Priority Dropdown */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Priority Level</label>
          <select className="form-select">
            <option>Important</option>
            <option>Update</option>
            <option>Notice</option>
          </select>
        </div>

        {/* Message Textarea */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Message</label>
          <textarea
            className="form-control"
            rows={5}
            placeholder="Enter announcement message"
          ></textarea>
        </div>

        {/* Attachment Upload */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Attachments</label>
          <div
            className="border rounded d-flex flex-column justify-content-center align-items-center text-center p-4"
            style={{
              borderStyle: "dashed",
              cursor: "pointer",
              color: "#6c757d",
            }}
          >
            <FaCloudUploadAlt size={40} className="mb-2" />
            <span className="text-muted">Drop files here or click to upload</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-3">
          <button className="btn btn-outline-secondary">Cancel</button>
          <button className="btn set_btn text-white">Publish Announcement</button>
        </div>
      </div>
    </div>
      )
}

export default AddAnnouncements
