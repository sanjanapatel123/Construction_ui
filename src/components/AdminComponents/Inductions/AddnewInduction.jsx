// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { createInduction } from '../../../redux/slices/inductionSlice';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function AddnewInduction() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [formData, setFormData] = useState({
//         fullName: '',
//         contactNumber: '',
//         emailAddress: '',
//         whiteCardNumber: '',
//         siteLocation: '',
//         siteSupervisor: '',
//         inductionDate: '',
//         accessStartTime: '',
//         accessEndTime: '',
//         acknowledgements: {
//             siteSafetyPlan: false,
//             complyOperatingHours: false,
//             emergencyProcedures: false
//         },
//         image: [] // should be array as per your data structure
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleCheckboxChange = (e) => {
//         const { name, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             acknowledgements: {
//                 ...prev.acknowledgements,
//                 [name]: checked
//             }
//         }));
//     };

//     const handleFileUpload = (e) => {
//         const files = Array.from(e.target.files);
//         setFormData(prev => ({
//             ...prev,
//             image: [...prev.image, ...files]
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!formData.fullName || !formData.emailAddress || !formData.contactNumber) {
//           alert('Please fill in all required fields');
//           return;
//         }

//         const submissionData = new FormData();
//         submissionData.append("fullName", formData.fullName);
//         submissionData.append("contactNumber", formData.contactNumber);
//         submissionData.append("emailAddress", formData.emailAddress);
//         submissionData.append("whiteCardNumber", formData.whiteCardNumber);
//         submissionData.append("siteLocation", formData.siteLocation);
//         submissionData.append("siteSupervisor", formData.siteSupervisor);
//         submissionData.append("inductionDate", formData.inductionDate);
//         submissionData.append("accessStartTime", formData.accessStartTime);
//         submissionData.append("accessEndTime", formData.accessEndTime);
//         submissionData.append("acknowledgements", JSON.stringify(formData.acknowledgements));

//         if (formData.image.length > 0) {
//           formData.image.forEach((file) => {
//             submissionData.append("image", file);
//           });
//         }

//         try {
//           await dispatch(createInduction(submissionData)).unwrap();
//           toast .success("Induction created successfully!");
//           navigate("/inductions");
//         } catch (error) {
//           toast.error("Failed to create induction. Please try again.");
//           console.error(error);
//         }
//       };

//     return (
//         <>
//         <ToastContainer />
//          <div className="container py-4">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h2>Add New Induction</h2>
//                 <button onClick={() => navigate(-1)} className="btn text-white" style={{backgroundColor:"#0d6efd"}}>
//                 <i class="fa-solid fa-arrow-left me-2"></i> Back to Overview
//                 </button>
//             </div>

//             <form onSubmit={handleSubmit} style={{backgroundColor:"white",padding:"20px",borderRadius:"8px"}}>
//                 <div className="row g-4">
//                     <div className="col-md-6">
//                         <div className="form-group">
//                             <label className="form-label">Full Name</label>
//                             <input  type="text"
//                                 className="form-control"
//                                 name="fullName"
//                                 placeholder="Enter full name"
//                                 value={formData.fullName}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div className="col-md-6">
//                         <div className="form-group">
//                             <label className="form-label">Contact Number</label>
//                             <input
//                                 type="tel"
//                                 className="form-control"
//                                 name="contactNumber"
//                                 placeholder="Enter contact number"
//                                 value={formData.contactNumber}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div className="col-md-6">
//                         <div className="form-group">
//                             <label className="form-label">Email Address</label>
//                             <input
//                                 type="email"
//                                 className="form-control"
//                                 name="emailAddress"
//                                 placeholder="Enter email address"
//                                 value={formData.emailAddress}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div className="col-md-6">
//                         <div className="form-group">
//                             <label className="form-label">White Card Number</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="whiteCardNumber"
//                                 placeholder="Enter white card number"
//                                 value={formData.whiteCardNumber}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div className="col-md-6">
//                         <div className="form-group">
//                             <label className="form-label">Site Location</label>
//                             <select
//                                 className="form-select"
//                                 name="siteLocation"
//                                 value={formData.siteLocation}
//                                 onChange={handleInputChange}
//                             >
//                                 <option value="">Select site location</option>
//                                 <option value="site1">Site 1</option>
//                                 <option value="site2">Site 2</option>
//                             </select>
//                         </div>
//                     </div>
//                     <div className="col-md-6">
//                         <div className="form-group">
//                             <label className="form-label">Site Supervisor</label>
//                             <select
//                                 className="form-select"
//                                 name="siteSupervisor"
//                                 value={formData.siteSupervisor}
//                                 onChange={handleInputChange}
//                             >
//                                 <option value="">Select site supervisor</option>
//                                 <option value="sup1">Supervisor 1</option>
//                                 <option value="sup2">Supervisor 2</option>
//                             </select>
//                         </div>
//                     </div>
//                     <div className="col-md-6">
//                         <div className="form-group">
//                             <label className="form-label">Induction Date</label>
//                             <input
//                                 type="date"
//                                 className="form-control"
//                                 name="inductionDate"
//                                 value={formData.inductionDate}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div className="col-md-6">
//     <div className="form-group">
//         <label className="form-label">Site Access Hours</label>
//         <div className="d-flex gap-2">
//             <input
//                 type="time"
//                 className="form-control"
//                 name="accessStartTime"
//                 value={formData.accessStartTime}
//                 onChange={handleInputChange}
//                 required
//             />
//             <span className="align-self-center">to</span>
//             <input
//                 type="time"
//                 className="form-control"
//                 name="accessEndTime"
//                 value={formData.accessEndTime}
//                 onChange={handleInputChange}
//                 required
//             />
//         </div>
//     </div>
// </div>

//                 </div>

//                 <div className="mt-4">
//                     <h3 className="h5 mb-3">Acknowledgements</h3>
//                     <div className="form-check mb-2">
//                         <input
//                             type="checkbox"
//                             className="form-check-input"
//                             name="siteSafetyPlan"
//                             checked={formData.acknowledgements.siteSafetyPlan}
//                             onChange={handleCheckboxChange}
//                             required
//                         />
//                         <label className="form-check-label">
//                             I have reviewed and understand the site safety plan
//                         </label>
//                     </div>
//                     <div className="form-check mb-2">
//                         <input
//                             type="checkbox"
//                             className="form-check-input"
//                             name="operatingHours"
//                             checked={formData.acknowledgements.operatingHours}
//                             onChange={handleCheckboxChange}
//                         />
//                         <label className="form-check-label">
//                             I agree to comply with site operating hours
//                         </label>
//                     </div>
//                     <div className="form-check mb-2">
//                         <input
//                             type="checkbox"
//                             className="form-check-input"
//                             name="emergencyProcedures"
//                             checked={formData.acknowledgements.emergencyProcedures}
//                             onChange={handleCheckboxChange}
//                         />
//                         <label className="form-check-label">
//                             I understand emergency procedures and contact protocols
//                         </label>
//                     </div>
//                 </div>

//                 <div className="mt-4">
//                     <h3 className="h5 mb-3">Upload Documents</h3>
//                     <div className="upload-box border rounded p-4 text-center">
//                     <input
//     type="file"
//     onChange={handleFileUpload}
//     accept=".pdf,.png,.jpg,.jpeg"
//     multiple  // ← allow multiple files
//     className="form-control"
//     style={{ opacity: 0, position: 'absolute' }}
// />

//                         <div className="py-3">
//                             <i className="fas fa-cloud-upload-alt fa-2x mb-2"></i>
//                             <p className="mb-1">Upload a file (drag and drop)</p>
//                             <p className="text-muted small">PDF, PNG, JPG up to 10MB</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="d-flex justify-content-end gap-2 mt-4">
//                     <button
//                         type="button"
//                         className="btn btn-light"
//                         onClick={() => navigate(-1)}
//                     >
//                         Cancel
//                     </button>
//                     <button type="submit" className="btn btn-dark">
//                         Create Induction
//                     </button>
//                 </div>
//             </form>
//         </div>
//         </>

//     );
// }

// export default AddnewInduction;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InductionForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    whiteCardNumber: "",
    siteLocation: "",
    siteSupervisor: "",
    inductionDate: "",
    accessFrom: "",
    accessTo: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.contactNumber || !/^\d{10}$/.test(formData.contactNumber))
      newErrors.contactNumber = "Valid 10-digit contact number required";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email address required";
    if (!formData.whiteCardNumber)
      newErrors.whiteCardNumber = "White Card Number is required";
    if (!formData.siteLocation)
      newErrors.siteLocation = "Site Location is required";
    if (!formData.siteSupervisor)
      newErrors.siteSupervisor = "Site Supervisor is required";
    if (!formData.inductionDate)
      newErrors.inductionDate = "Induction Date is required";
    if (!formData.accessFrom || !formData.accessTo)
      newErrors.accessHours = "Access hours (From/To) required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      alert("Induction details successfully submitted!");
      setSubmitting(false);
      setFormData({
        fullName: "",
        contactNumber: "",
        email: "",
        whiteCardNumber: "",
        siteLocation: "",
        siteSupervisor: "",
        inductionDate: "",
        accessFrom: "",
        accessTo: "",
      });
    }, 1500);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Add New Induction</h2>{" "}
        <button
          onClick={() => navigate(-1)}
          className="btn text-white"
          style={{ backgroundColor: "#0d6efd" }}
        >
          <i class="fa-solid fa-arrow-left me-2"></i> Back to Overview
        </button>
      </div>
      <div className="card shadow rounded-4 p-4">
        {/* <h2 className="mb-4 text-center">Induction Form</h2> */}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Full Name */}
            <div className="col-md-6">
              <label className="form-label">
                Full Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.fullName && "is-invalid"}`}
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />
              <div className="invalid-feedback">{errors.fullName}</div>
            </div>

            {/* Contact Number */}
            <div className="col-md-6">
              <label className="form-label">
                Contact Number<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.contactNumber && "is-invalid"
                }`}
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter 10-digit contact"
              />
              <div className="invalid-feedback">{errors.contactNumber}</div>
            </div>

            {/* Email Address */}
            <div className="col-md-6">
              <label className="form-label">
                Email Address<span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className={`form-control ${errors.email && "is-invalid"}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
              <div className="invalid-feedback">{errors.email}</div>
            </div>

            {/* White Card Number */}
            <div className="col-md-6">
              <label className="form-label">
                White Card Number<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.whiteCardNumber && "is-invalid"
                }`}
                name="whiteCardNumber"
                value={formData.whiteCardNumber}
                onChange={handleChange}
                placeholder="Enter white card number"
              />
              <div className="invalid-feedback">{errors.whiteCardNumber}</div>
            </div>

            {/* Site Location */}
            <div className="col-md-6">
              <label className="form-label">
                Select Site Location<span className="text-danger">*</span>
              </label>
              <select
                className={`form-select ${errors.siteLocation && "is-invalid"}`}
                name="siteLocation"
                value={formData.siteLocation}
                onChange={handleChange}
              >
                <option value="">Select location</option>
                <option value="Location 1">Location 1</option>
                <option value="Location 2">Location 2</option>
              </select>
              <div className="invalid-feedback">{errors.siteLocation}</div>
            </div>

            {/* Site Supervisor */}
            <div className="col-md-6">
              <label className="form-label">
                Select Site Supervisor<span className="text-danger">*</span>
              </label>
              <select
                className={`form-select ${
                  errors.siteSupervisor && "is-invalid"
                }`}
                name="siteSupervisor"
                value={formData.siteSupervisor}
                onChange={handleChange}
              >
                <option value="">Select supervisor</option>
                <option value="Supervisor 1">Supervisor 1</option>
                <option value="Supervisor 2">Supervisor 2</option>
              </select>
              <div className="invalid-feedback">{errors.siteSupervisor}</div>
            </div>

            {/* Induction Date */}
            <div className="col-md-6">
              <label className="form-label">
                Induction Date<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className={`form-control ${
                  errors.inductionDate && "is-invalid"
                }`}
                name="inductionDate"
                value={formData.inductionDate}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.inductionDate}</div>
            </div>

            {/* Site Access Hours */}
            <div className="col-md-3">
              <label className="form-label">
                Access From<span className="text-danger">*</span>
              </label>
              <input
                type="time"
                className={`form-control ${errors.accessHours && "is-invalid"}`}
                name="accessFrom"
                value={formData.accessFrom}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">
                Access To<span className="text-danger">*</span>
              </label>
              <input
                type="time"
                className={`form-control ${errors.accessHours && "is-invalid"}`}
                name="accessTo"
                value={formData.accessTo}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.accessHours}</div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-primary px-5"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InductionForm;
