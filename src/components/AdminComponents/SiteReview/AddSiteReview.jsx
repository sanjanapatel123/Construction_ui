
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createsitereview } from '../../../redux/slices/sitereviewSlice';
import { fetchSiteEntries } from '../../../redux/slices/siteEntrySlice';

function AddSiteReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { entries } = useSelector((state) => state.entries);
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
    image: [] ,
    recommendations: '',
    assignedTo: '',
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
    const files = Array.from(e.target.files);
    setFormData(prev => ({
        ...prev,
        image: [...prev.image, ...files]
    }));
  };

  useEffect(() => {
    dispatch(fetchSiteEntries());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('siteName', formData.siteName);
    form.append('siteLocation', formData.siteLocation);
    form.append('reviewerName', formData.reviewerName);
    form.append('reviewDate', formData.reviewDate);
    form.append('complianceStatus', formData.complianceStatus);
    form.append('checkedItems', JSON.stringify(formData.checkedItems));
    form.append('recommendations', formData.recommendations);
    form.append('assignedTo', formData.assignedTo);

    if (formData.image.length > 0) {
      formData.image.forEach((file) => {
        form.append("image", file);
      });
    }

    try {
      await dispatch(createsitereview(form)).unwrap();
      alert('Site review submitted successfully!');
      navigate('/siteReview');
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to submit site review');
    }
  };

  return (
    <div className="container py-4">
      <div className='d-flex justify-content-between'>      
        <h4 className="mb-4">Create New Site Review</h4>
        <Link to="/siteReview">
          <button className='btn text-white' style={{ backgroundColor: "#0d6efd" }}>
            <i className="fa-solid fa-arrow-left me-2"></i>Back
          </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Site Name</label>
            <select className="form-select" name="siteName" value={formData.siteName} onChange={handleInputChange}>
              <option value="">Select Site</option>
              {entries.map(entry => (
                <option key={entry._id} value={entry._id}>{entry.siteName}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Site Location</label>
            <select className="form-select" name="siteLocation" value={formData.siteLocation} onChange={handleInputChange}>
              <option value="">Select Location</option>
              {entries.map(entry => (
                <option key={entry._id} value={entry._id}>{entry.siteLocation}</option>
              ))}
            </select>
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
            <input type="file"  name='image' multiple className="d-none" onChange={handleFileUpload} id="fileUpload" />
            <label htmlFor="fileUpload" className="btn btn-outline-primary btn-sm">Browse Files</label>
            {formData.image.length > 0 && (
              <ul className="mt-3 text-start">
                {formData.image.map((file, i) => (
                  <li key={i}>{file.name}</li>
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
              <option value="60b74f3c8c9c510018f9f03d">Staff 1</option>
              <option value="60b74f3c8c9c510018f9f03d">Staff 2</option>
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
          <button type="button" className="btn btn-light" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Create Review'}
          </button>
        </div>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default AddSiteReview;

// Code for udate

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   createsitereview,
//   fetchsitereview,
//   updatesitereview,
//   fetchsitereviewbyId
// } from '../../../redux/slices/sitereviewSlice';
// import { fetchSiteEntries } from '../../../redux/slices/siteEntrySlice';

// function AddSiteReview() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { reviewId } = useParams(); // to determine if it's edit mode

//   const { entries } = useSelector((state) => state.entries);
//   const { loading, error } = useSelector((state) => state.sitereview);

//   const [formData, setFormData] = useState({
//     siteName: '',
//     siteLocation: '',
//     reviewerName: '',
//     reviewDate: '',
//     complianceStatus: 'Compliant',
//     checkedItems: {
//       safetyEquipment: false,
//       workAreaCleanliness: false,
//       toolCondition: false,
//     },
//     image: [],
//     recommendations: '',
//     assignedTo: '',
//   });

//   // Fetch site entries and review (if editing)
//   useEffect(() => {
//     dispatch(fetchSiteEntries());

//     if (reviewId) {
//       dispatch(fetchsitereviewbyId(reviewId)).then(({ payload }) => {
//         setFormData({
//           siteName: payload.siteName,
//           siteLocation: payload.siteLocation,
//           reviewerName: payload.reviewerName,
//           reviewDate: payload.reviewDate.slice(0, 16),
//           complianceStatus: payload.complianceStatus,
//           checkedItems: payload.checkedItems,
//           image: payload.image || [],
//           recommendations: payload.recommendations,
//           assignedTo: payload.assignedTo,
//         });
//       });
//     }
//   }, [dispatch, reviewId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       checkedItems: {
//         ...prev.checkedItems,
//         [name]: checked,
//       },
//     }));
//   };

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData((prev) => ({
//       ...prev,
//       image: [...prev.image, ...files],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();
//     form.append('siteName', formData.siteName);
//     form.append('siteLocation', formData.siteLocation);
//     form.append('reviewerName', formData.reviewerName);
//     form.append('reviewDate', formData.reviewDate);
//     form.append('complianceStatus', formData.complianceStatus);
//     form.append('checkedItems', JSON.stringify(formData.checkedItems));
//     form.append('recommendations', formData.recommendations);
//     form.append('assignedTo', formData.assignedTo);

//     formData.image.forEach((img) => {
//       if (typeof img === 'string') {
//         form.append('existingImageUrls', img); // existing Cloudinary URLs
//       } else {
//         form.append('image', img); // new files
//       }
//     });

//     try {
//       if (reviewId) {
//         await dispatch(updatesitereview({ id: reviewId, formData: form })).unwrap();
//         alert('Site review updated successfully!');
//       } else {
//         await dispatch(createsitereview(form)).unwrap();
//         alert('Site review created successfully!');
//       }
//       navigate('/siteReview');
//     } catch (err) {
//       console.error('Submission error:', err);
//       alert('Failed to submit site review');
//     }
//   };

//   return (
//     <div className="container py-4">
//       <div className="d-flex justify-content-between">
//         <h4 className="mb-4">{reviewId ? 'Edit Site Review' : 'Create New Site Review'}</h4>
//         <Link to="/siteReview">
//           <button className="btn text-white" style={{ backgroundColor: '#0d6efd' }}>
//             <i className="fa-solid fa-arrow-left me-2"></i>Back
//           </button>
//         </Link>
//       </div>

//       <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Site Name</label>
//             <select className="form-select" name="siteName" value={formData.siteName} onChange={handleInputChange}>
//               <option value="">Select Site</option>
//               {entries.map((entry) => (
//                 <option key={entry._id} value={entry._id}>
//                   {entry.siteName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Site Location</label>
//             <select className="form-select" name="siteLocation" value={formData.siteLocation} onChange={handleInputChange}>
//               <option value="">Select Location</option>
//               {entries.map((entry) => (
//                 <option key={entry._id} value={entry._id}>
//                   {entry.siteLocation}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-md-6 mt-3">
//             <label className="form-label">Review Date & Time</label>
//             <input type="datetime-local" className="form-control" name="reviewDate" value={formData.reviewDate} onChange={handleInputChange} />
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Reviewer Name</label>
//             <input type="text" className="form-control" name="reviewerName" value={formData.reviewerName} onChange={handleInputChange} />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Compliance Status</label>
//             <select className="form-select" name="complianceStatus" value={formData.complianceStatus} onChange={handleInputChange}>
//               <option value="Compliant">Compliant</option>
//               <option value="Non-Compliant">Non-Compliant</option>
//               <option value="Pending">Pending</option>
//             </select>
//           </div>
//         </div>

//         <div className="mb-3">
//           <h5 className="mb-3">Checked Items</h5>
//           {Object.entries(formData.checkedItems).map(([key, value]) => (
//             <div className="form-check mb-2" key={key}>
//               <input type="checkbox" className="form-check-input" name={key} checked={value} onChange={handleCheckboxChange} />
//               <label className="form-check-label text-capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
//             </div>
//           ))}
//         </div>

//         <div className="mb-3">
//           <h5 className="mb-3">Attachments</h5>
//           <div className="border rounded p-3 text-center">
//             <i className="fas fa-cloud-upload-alt fa-2x mb-2"></i>
//             <p className="mb-1">Upload files or drag and drop</p>
//             <p className="text-muted small">Images, videos or documents up to 10MB</p>
//             <input type="file" name="image" multiple className="d-none" onChange={handleFileUpload} id="fileUpload" />
//             <label htmlFor="fileUpload" className="btn btn-outline-primary btn-sm">
//               Browse Files
//             </label>
//             {formData.image.length > 0 && (
//               <ul className="mt-3 text-start">
//                 {formData.image.map((file, i) => (
//                   <li key={i}>
//                     {typeof file === 'string' ? (
//                       <a href={file} target="_blank" rel="noopener noreferrer">Existing File {i + 1}</a>
//                     ) : (
//                       file.name
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Recommendations & Corrective Actions</label>
//           <textarea className="form-control" rows="4" name="recommendations" value={formData.recommendations} onChange={handleInputChange} />
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Assigned To</label>
//             <select className="form-select" name="assignedTo" value={formData.assignedTo} onChange={handleInputChange}>
//               <option value="">Select Staff</option>
//               <option value="60b74f3c8c9c510018f9f03d">Staff 1</option>
//               <option value="60b74f3c8c9c510018f9f03d">Staff 2</option>
//             </select>
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Approval Status</label>
//             <select className="form-select" disabled>
//               <option value="Pending">Pending</option>
//             </select>
//           </div>
//         </div>

//         <div className="d-flex justify-content-end gap-2 mt-4">
//           <button type="button" className="btn btn-light" onClick={() => navigate(-1)}>
//             Cancel
//           </button>
//           <button type="submit" className="btn btn-primary" disabled={loading}>
//             {loading ? 'Submitting...' : reviewId ? 'Update Review' : 'Create Review'}
//           </button>
//         </div>
//         {error && <p className="text-danger mt-2">{error}</p>}
//       </form>
//     </div>
//   );
// }

// export default AddSiteReview;


