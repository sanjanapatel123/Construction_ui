import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchInductions } from '../../../redux/slices/inductionSlice';
import { useDispatch, useSelector } from 'react-redux';

const ViewInductions = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { inductions } = useSelector((state) => state.inductions);

  useEffect(() => {
    dispatch(fetchInductions());
  }, [dispatch]);

  const inductionData = inductions.find((item) => item._id === id);

  if (!inductionData) {
    return (
      <div className="container py-4">
        <h4>Loading induction details...</h4>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Induction Details</h2>
        <Link to="/inductions">
          <button className="btn btn-link text-secondary">← Back</button>
        </Link>
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
            <p><strong>Induction Date:</strong> {new Date(inductionData.inductionDate).toLocaleDateString()}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Site Access Hours:</strong> {inductionData.accessStartTime} - {inductionData.accessEndTime}</p>
          </div>
        </div>

        {inductionData.image && inductionData.image.length > 0 && (
          <div className="mt-4">
            <h5 className="mb-3">Uploaded Files</h5>
            {inductionData.image.map((img, index) => (
              <div key={index}>
                <a href={img} target="_blank" rel="noopener noreferrer">View File {index + 1}</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewInductions;
