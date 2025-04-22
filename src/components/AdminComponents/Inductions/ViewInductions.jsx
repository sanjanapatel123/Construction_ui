
import React from 'react';
import { Link } from 'react-router-dom';
const ViewInductions = () => {
  const inductionData = {
    fullName: 'John Doe',
    contactNumber: '1234567890',
    emailAddress: 'john@example.com',
    whiteCardNumber: 'WC123456',
    siteLocation: 'Site 1',
    siteSupervisor: 'Supervisor 1',
    inductionDate: '2025-04-18',
    siteAccessHours: '7:00 AM - 5:00 PM',
    acknowledgements: {
      siteSafetyPlan: true,
      operatingHours: true,
      emergencyProcedures: true,
    },
    uploadedFileUrl: '#',
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Induction Details</h2>
      <Link to="/inductions">  <button className="btn btn-link text-secondary">
          ← Back
        </button></Link>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <div className="row g-4">
          <div className="col-md-6">
            <p><strong>Full Name:</strong> {inductionData.fullName}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Contact Number:</strong> {inductionData.contactNumber}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Email Address:</strong> {inductionData.emailAddress}</p>
          </div>
          <div className="col-md-6">
            <p><strong>White Card Number:</strong> {inductionData.whiteCardNumber}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Site Location:</strong> {inductionData.siteLocation}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Site Supervisor:</strong> {inductionData.siteSupervisor}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Induction Date:</strong> {inductionData.inductionDate}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Site Access Hours:</strong> {inductionData.siteAccessHours}</p>
          </div>
        </div>

        <div className="mt-4">
          <h5 className="mb-3">Acknowledgements</h5>
          <ul className="list-unstyled">
            <li>
              <i className={`fas fa-${inductionData.acknowledgements.siteSafetyPlan ? 'check-circle text-success' : 'times-circle text-danger'}`}></i>
              <span className="ms-2">Reviewed site safety plan</span>
            </li>
            <li>
              <i className={`fas fa-${inductionData.acknowledgements.operatingHours ? 'check-circle text-success' : 'times-circle text-danger'}`}></i>
              <span className="ms-2">Agreed to operating hours</span>
            </li>
            <li>
              <i className={`fas fa-${inductionData.acknowledgements.emergencyProcedures ? 'check-circle text-success' : 'times-circle text-danger'}`}></i>
              <span className="ms-2">Understands emergency procedures</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewInductions;
