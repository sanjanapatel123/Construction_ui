
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddnewInduction() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        contactNumber: '',
        emailAddress: '',
        whiteCardNumber: '',
        siteLocation: '',
        siteSupervisor: '',
        inductionDate: '',
        siteAccessHours: '',
        acknowledgements: {
            siteSafetyPlan: false,
            operatingHours: false,
            emergencyProcedures: false
        },
        documents: null
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
            acknowledgements: {
                ...prev.acknowledgements,
                [name]: checked
            }
        }));
    };

    const handleFileUpload = (e) => {
        setFormData(prev => ({
            ...prev,
            documents: e.target.files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form
        if (!formData.fullName || !formData.emailAddress || !formData.contactNumber) {
            alert('Please fill in all required fields');
            return;
        }
        // Log form data
        console.log('Form submitted:', formData);
        // You can add your API call here
    };

    // ... rest of your component remains the same ...
    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Add New Induction</h2>
                <button onClick={() => navigate(-1)} className="btn text-white" style={{backgroundColor:"#0d6efd"}}>
                <i class="fa-solid fa-arrow-left me-2"></i> Back to Overview
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{backgroundColor:"white",padding:"20px",borderRadius:"8px"}}>
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="fullName"
                                placeholder="Enter full name"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Contact Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="contactNumber"
                                placeholder="Enter contact number"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                name="emailAddress"
                                placeholder="Enter email address"
                                value={formData.emailAddress}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">White Card Number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="whiteCardNumber"
                                placeholder="Enter white card number"
                                value={formData.whiteCardNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Site Location</label>
                            <select
                                className="form-select"
                                name="siteLocation"
                                value={formData.siteLocation}
                                onChange={handleInputChange}
                            >
                                <option value="">Select site location</option>
                                <option value="site1">Site 1</option>
                                <option value="site2">Site 2</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Site Supervisor</label>
                            <select
                                className="form-select"
                                name="siteSupervisor"
                                value={formData.siteSupervisor}
                                onChange={handleInputChange}
                            >
                                <option value="">Select site supervisor</option>
                                <option value="sup1">Supervisor 1</option>
                                <option value="sup2">Supervisor 2</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Induction Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="inductionDate"
                                value={formData.inductionDate}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Site Access Hours</label>
                            <input
                                type="text"
                                className="form-control"
                                name="siteAccessHours"
                                placeholder="e.g. 7:00 AM - 5:00 PM"
                                value={formData.siteAccessHours}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="h5 mb-3">Acknowledgements</h3>
                    <div className="form-check mb-2">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="siteSafetyPlan"
                            checked={formData.acknowledgements.siteSafetyPlan}
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                            I have reviewed and understand the site safety plan
                        </label>
                    </div>
                    <div className="form-check mb-2">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="operatingHours"
                            checked={formData.acknowledgements.operatingHours}
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                            I agree to comply with site operating hours
                        </label>
                    </div>
                    <div className="form-check mb-2">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="emergencyProcedures"
                            checked={formData.acknowledgements.emergencyProcedures}
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                            I understand emergency procedures and contact protocols
                        </label>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="h5 mb-3">Upload Documents</h3>
                    <div className="upload-box border rounded p-4 text-center">
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            accept=".pdf,.png,.jpg,.jpeg"
                            className="form-control"
                            style={{ opacity: 0, position: 'absolute' }}
                        />
                        <div className="py-3">
                            <i className="fas fa-cloud-upload-alt fa-2x mb-2"></i>
                            <p className="mb-1">Upload a file (drag and drop)</p>
                            <p className="text-muted small">PDF, PNG, JPG up to 10MB</p>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                    <button 
                        type="button" 
                        className="btn btn-light" 
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-dark">
                        Create Induction
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddnewInduction;