import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AddSiteReview() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    siteLocation: '',
    reviewerName: '',
    complianceStatus: 'Compliant',
    checkedItems: {
      safetyEquipment: false,
      workAreaCleanliness: false,
      toolCondition: false
    },
    attachments: null,
    recommendations: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      checkedItems: {
        ...prev.checkedItems,
        [name]: checked
      }
    }));
  };

  const handleFileUpload = (e) => {
    setFormData(prev => ({
      ...prev,
      attachments: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.siteLocation || !formData.reviewerName) {
      alert('Please fill in all required fields');
      return;
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container py-4">
      <div className='d-flex justify-content-between'>      
        <h4 className="mb-4">Create New Site Review</h4>
        <Link to="/siteReview">
        <button className='btn text-white'style={{backgroundColor:"#0d6efd" ,}}><i class="fa-solid fa-arrow-left me-2"></i>Back</button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} style={{backgroundColor:"white", padding:"20px", borderRadius:"8px"}}>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Site Name/Location</label>
              <select
                className="form-select"
                name="siteLocation"
                value={formData.siteLocation}
                onChange={handleInputChange}
              >
                <option value="">Select Site</option>
                <option value="site1">Site 1</option>
                <option value="site2">Site 2</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Review Date & Time</label>
              <input
                type="datetime-local"
                className="form-control"
                name="reviewDate"
                value={formData.reviewDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Reviewer Name</label>
              <input
                type="text"
                className="form-control"
                name="reviewerName"
                placeholder="John Smith"
                value={formData.reviewerName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Compliance Status</label>
              <select
                className="form-select"
                name="complianceStatus"
                value={formData.complianceStatus}
                onChange={handleInputChange}
              >
                <option value="Compliant">Compliant</option>
                <option value="Non-Compliant">Non-Compliant</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <h5 className="mb-3">Checked Items</h5>
          <div className="form-check mb-2">
            <input
              type="checkbox"
              className="form-check-input"
              name="safetyEquipment"
              checked={formData.checkedItems.safetyEquipment}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label">Safety equipment and PPE in use</label>
          </div>
          <div className="form-check mb-2">
            <input
              type="checkbox"
              className="form-check-input"
              name="workAreaCleanliness"
              checked={formData.checkedItems.workAreaCleanliness}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label">Work area cleanliness</label>
          </div>
          <div className="form-check mb-2">
            <input
              type="checkbox"
              className="form-check-input"
              name="toolCondition"
              checked={formData.checkedItems.toolCondition}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label">Tool and equipment condition</label>
          </div>
          <button type="button" className="btn btn-link text-primary p-0">+ Add Custom Item</button>
        </div>

        <div className="mb-3">
          <h5 className="mb-3">Attachments</h5>
          <div className="border rounded p-3 text-center">
            <i className="fas fa-cloud-upload-alt fa-2x mb-2"></i>
            <p className="mb-1">Upload files or drag and drop</p>
            <p className="text-muted small">Images, videos or documents up to 10MB</p>
            <input
              type="file"
              className="d-none"
              onChange={handleFileUpload}
              id="fileUpload"
            />
            <label htmlFor="fileUpload" className="btn btn-outline-primary btn-sm">
              Browse Files
            </label>
          </div>
        </div>

        <div className="mb-3">
          <h5 className="mb-3">Recommendations & Corrective Actions</h5>
          <textarea
            className="form-control"
            rows="4"
            name="recommendations"
            value={formData.recommendations}
            onChange={handleInputChange}
            placeholder="Enter your recommendations here..."
          ></textarea>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Assigned To</label>
              <select className="form-select">
                <option value="">Select Staff</option>
                <option value="staff1">Staff 1</option>
                <option value="staff2">Staff 2</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Approval Status</label>
              <select className="form-select" disabled>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button type="button" className="btn btn-light" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="btn btn-primary">Create Review</button>
        </div>
      </form>
    </div>
  );
}

export default AddSiteReview
