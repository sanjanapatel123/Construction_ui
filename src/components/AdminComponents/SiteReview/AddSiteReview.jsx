


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createsitereview,
  fetchsitereviewById,
  updatesitereview,
} from '../../../redux/slices/sitereviewSlice';
import { fetchSiteEntries } from '../../../redux/slices/siteEntrySlice';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUsers } from '../../../redux/slices/userSlice';


function AddSiteReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const reviewId = id;

  const { entries } = useSelector((state) => state.entries);

   const { data: users} = useSelector((state) => state.users);
  console.log(users)
  const { loading, error } = useSelector((state) => state.sitereview);
  

  const [formData, setFormData] = useState({
    siteName: '',
    siteLocation: '',
    reviewerName: '',
    reviewDate: '',
    complianceStatus: 'Compliant',
    checkedItems: {
      safetyEquipment: false,
      workAreaCleanliness: false,
      toolCondition: false,
    },
    image: [],
    recommendations: '',
    assignedTo: '',
  });

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchSiteEntries());

    if (reviewId) {
      dispatch(fetchsitereviewById(reviewId)).then(({ payload }) => {
        console.log(payload.data);
        setFormData({
          siteName: payload.data.siteName,
          siteLocation: payload.data.siteLocation,
          reviewerName: payload.data.reviewerName,
          reviewDate: payload.data.reviewDate.slice(0, 16),
          complianceStatus: payload.data.complianceStatus,
          checkedItems: payload.data.checkedItems,
          image: payload.data.image || [],
          recommendations: payload.data.recommendations,
          assignedTo: payload.data.assignedTo,
        });
      });
    }
  }, [dispatch, reviewId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      checkedItems: {
        ...prev.checkedItems,
        [name]: checked,
      },
    }));
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

    const form = new FormData();
    {console.log("form update",formData);}
    form.append('siteName', formData.siteName);
    form.append('siteLocation', formData.siteLocation);
    form.append('reviewerName', formData.reviewerName);
    form.append('reviewDate', formData.reviewDate);
    form.append('complianceStatus', formData.complianceStatus);
    form.append('checkedItems', JSON.stringify(formData.checkedItems));
    form.append('recommendations', formData.recommendations);
    form.append('assignedTo', formData.assignedTo);

    formData.image.forEach((img) => {
      if (typeof img === 'string') {
        form.append('existingImageUrls', img); // existing Cloudinary URLs
      } else {
        form.append('image', img); // new files
      }
    });

    try {
      if (reviewId) {
        await dispatch(updatesitereview({ id: reviewId, updatedEntry: form })).unwrap()
        .then(() => {
          toast.success("Site Review Updated Successfully!");
          navigate('/siteReview');
        })
        .catch(() => {
          toast.error("Failed to update site entry!");
          navigate('/siteReview');
        });
      } else {
        await dispatch(createsitereview(form)).unwrap()
         .then(() => {
                  toast.success("Site Entry Added Successfully!");
                  navigate('/siteReview');
                })
                .catch(() => {
                  toast.error("Failed to add site entry!");
                });
          
        
      }
      
    } catch (err) {
      console.error('Submission error:', err);
      toast.error("Failed to submit site review");
    }
  };

  return (
    <div className="container py-4">
      <ToastContainer />
      <div className="d-flex justify-content-between">
        <h4 className="mb-4">{reviewId ? 'Edit Site Review' : 'Create New Site Review'}</h4>
        <Link to="/siteReview">
          <button className="btn text-white" style={{ backgroundColor: '#0d6efd' }}>
            <i className="fa-solid fa-arrow-left me-2"></i>Back
          </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Site Name</label>
            <input type="text" className="form-control" name="siteName" value={formData.siteName} onChange={handleInputChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Site Location</label>
            <input type="text" className="form-control" name="siteLocation" value={formData.siteLocation} onChange={handleInputChange} />
          </div>
          <div className="col-md-6 mt-3">
            <label className="form-label">Review Date & Time</label>
            <input type="datetime-local" className="form-control" name="reviewDate" value={formData.reviewDate} onChange={handleInputChange} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Reviewer Name</label>
            <input type="text" className="form-control" name="reviewerName" value={formData.reviewerName} onChange={handleInputChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Compliance Status</label>
            <select className="form-select" name="complianceStatus" value={formData.complianceStatus} onChange={handleInputChange}>
              <option value="Compliant">Compliant</option>
              <option value="Non-Compliant">Non-Compliant</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <h5 className="mb-3">Checked Items</h5>
          {Object.entries(formData.checkedItems).map(([key, value]) => (
            <div className="form-check mb-2" key={key}>
              <input type="checkbox" className="form-check-input" name={key} checked={value} onChange={handleCheckboxChange} />
              <label className="form-check-label text-capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <h5 className="mb-3">Attachments</h5>
          <div className="border rounded p-3 text-center">
            <i className="fas fa-cloud-upload-alt fa-2x mb-2"></i>
            <p className="mb-1">Upload files or drag and drop</p>
            <p className="text-muted small">Images, videos or documents up to 10MB</p>
            <input type="file" name="image" multiple className="d-none" onChange={handleFileUpload} id="fileUpload" />
            <label htmlFor="fileUpload" className="btn btn-outline-primary btn-sm">
              Browse Files
            </label>
            {formData.image.length > 0 && (
              <ul className="mt-3 text-start">
                {formData.image.map((file, i) => (
                  <li key={i}>
                    {typeof file === 'string' ? (
                      <a href={file} target="_blank" rel="noopener noreferrer">Existing File {i + 1}</a>
                    ) : (
                      file.name
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Recommendations & Corrective Actions</label>
          <textarea className="form-control" rows="4" name="recommendations" value={formData.recommendations} onChange={handleInputChange} />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Assigned To</label>
            <select className="form-select" name="assignedTo" value={formData.assignedTo} onChange={handleInputChange}>
              <option value="">Select Staff</option>
              {
                users.map((user) => (
                  <option key={user._id} value={user._id}>{user?.firstName} {user?.lastName}</option>
                ))
              }
              
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Approval Status</label>
            <select className="form-select" disabled>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button type="button" className="btn btn-light" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : reviewId ? 'Update Review' : 'Create Review'}
          </button>
        </div>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default AddSiteReview;



