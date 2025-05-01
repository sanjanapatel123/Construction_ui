//  import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { fetchAudit } from '../../../redux/slices/auditSlice';
// import { Modal,Button } from 'react-bootstrap';
// import { set } from 'date-fns';
 
//  const AuditEquipment = () => {
//   const [show, setShow] = useState(false);

//   const [formData, setFormData] = useState({
//     auditDate: '',
//     auditedBy: '',
//     safetyManager: '',
//     location: '',
//     equipmentAssessment: [],
//     safetyManagerSignature: '',
//     generalNotes: '',
//     criticalObservations: '',
//     followUpActions: '',
//     status: 'draft',
//   });
//   const [signatureFile, setSignatureFile] = useState(null);

  
//   const dispatch = useDispatch();

//   const { audit }= useSelector((state) => state.audit);
//   console.log(audit);

//   useEffect(() => {
//     dispatch(fetchAudit());
//   }, [dispatch]);


//   const handleClose = () => setShow(false);
//    return (
//      <div>
//        <div className="container">
//   <div className="row">
//     <div className="col-12">
    
//       <div className="mt-4">
//         <h2 className="text-start" style={{ fontWeight: 600 }}>
//           Security Audit Report
//         </h2>
//         <p className="text-start">
//           Complete all sections to ensure compliance with safety regulations
//         </p>
//       </div>
//       <div
//         className="my-4 shadow-sm bg-white rounded-2"
//         style={{
        
//           padding: "1rem"
//         }}
//       >
//         <p style={{ fontWeight: 600 }}>
//           <span className="badge bg-warning">.</span> Status:Draft{" "}
//         </p>
//       </div>
//       <form>
//         {/* Audit Information */}
//         <div className="mb-4">
//   <div className="row g-4">
//     {/* Left Column */}
//     <div className="col-md-8">
//       <div  className="p-3 bg-white rounded"
//         style={{  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",}}>
//         <h4 style={{ fontWeight: 600 }}>Audit Information</h4>
//         <div className="row mt-4">
//           <div className="col-md-6">
//             <div className="form-group">
//               <label htmlFor="auditDate">Date of Audit</label>
//               <input type="date"
//                 className="form-control"
//                 id="auditDate"
//                 required
//               />
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="form-group">
//               <label htmlFor="auditedBy">Audited By</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="auditedBy"
//                 placeholder="Enter full name"
//                 required
//               />
//             </div>
//           </div>
//           <div className="col-md-6 mt-3">
//             <div className="form-group">
//               <label htmlFor="safetyManager">Safety Manager</label>
//               <select className="form-control" id="safetyManager" required>
//                 <option>Select Safety Manager</option>
//               </select>
//             </div>
//           </div>
//           <div className="col-md-6 mt-3">
//             <div className="form-group">
//               <label htmlFor="location">Location/Site</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="location"
//                 placeholder="Enter construction site location"
//                 required
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Right Column */}
//     <div className="col-md-4">
//       <div
//         className="p-3 bg-white rounded"
//         style={{
//           boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//         }}
//       >
//         <h4>Document Upload</h4>
//         <div className="form-group">
//           <input
//             type="file"
//             className="form-control"
//             id="fileUpload"
//             accept=".pdf,.jpg,.png"
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// </div>


//         {/* Equipment Assessment */}
//         <div className="row g-4">
//   <div className="col-md-8">
//     <div
//       style={{
//         boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//         padding: "1rem",
//         backgroundColor: "#fff",
//         borderRadius: "0.5rem"
//       }}
//     >
//       <div className="mb-4">
//         <div className="d-flex justify-content-between align-items-center">
//         <h4 style={{ fontWeight: 600 }}>Equipment Assessment</h4>
//         <button className="btn btn-outline-secondary btn-sm" onClick={() => setShow(true)}>Add Equipment </button>
//         </div>
//         <div className='table-responsive'>
//         <table className="table mt-4">
//           <thead>
//             <tr>
//               <th>Equipment</th>
//               <th>Status</th>
//               <th>Last Testing Date</th>
//               <th>Next Testing Due</th>
//               <th>Comments</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Excavator</td>
//               <td>Not OK</td>
//               <td>2025-03-15</td>
//               <td>2025-06-15</td>
//               <td>
//                 <button className="btn btn-outline-secondary btn-sm">Add comments</button>
//               </td>
//             </tr>
//             <tr>
//               <td>Crane</td>
//               <td>Not OK</td>
//               <td>2025-02-20</td>
//               <td>2025-05-20</td>
//               <td>
//                 <button className="btn btn-outline-secondary btn-sm">Add comments</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         </div>
//       </div>
//     </div>
//   </div>

//   <div className="col-md-4">
//     <div
//       style={{
//         boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//         padding: "1rem",
//         backgroundColor: "#fff",
//         borderRadius: "0.5rem"
//       }}
//     >
//       <div className="mb-4">
//         <h4>Safety Manager Signature</h4>
//         <div className="form-group">
//           <div
//             className="signature-box border rounded mb-2"
//             style={{ height: "100px", backgroundColor: "#f8f9fa" }}
//           />
//           <input
//              type="file"
//   className="form-control"
//   accept="image/*"
//   onChange={(e) => setSignatureFile(e.target.files[0])}
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//         {/* Notes & Observations */}
//         <div className="mb-4 mt-5 row g-4">
//   {/* Left Section - Notes */}
//   <div className="col-md-8">
//     <div
//       className="p-3 bg-white rounded"
//       style={{
//         boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//       }}
//     >
//       <h4>Notes &amp; Observations</h4>
//       <div className="form-group">
//         <label htmlFor="generalNotes">General Notes</label>
//         <textarea
//           className="form-control"
//           id="generalNotes"
//           rows={3}
//           placeholder="Enter any general notes about the audit"
//         />
//       </div>
//       <div className="form-group mt-3">
//         <label htmlFor="criticalObservations">Critical Observations</label>
//         <textarea
//           className="form-control"
//           id="criticalObservations"
//           rows={3}
//           placeholder="Highlight any critical safety issues observed"
//           style={{ backgroundColor: "#f8d7da" }}
//         />
//       </div>
//       <div className="form-group mt-3">
//         <label htmlFor="followUpActions">Follow-up Actions Required</label>
//         <textarea
//           className="form-control"
//           id="followUpActions"
//           rows={3}
//           placeholder="List any actions that need to be taken"
//         />
//       </div>
//     </div>
//   </div>

//   {/* Right Section - Buttons */}
//   <div className="col-md-4">
//     <div
//       className="p-3 bg-white rounded"
//       style={{
//         boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//       }}
//     >
//       <Link to="/submit-report">
//         <button
//           type="submit"
//           className="btn btn-primary w-100"
//         >
//           Submit Report
//         </button>
//       </Link>
//       <div className="mt-4">
//         <button
//           type="button"
//           className="btn btn-secondary w-100"
//         >
//           Save as Draft
//         </button>
//       </div>
//       <div className="mt-4">
//         <button
//           type="button"
//           className="btn btn-info w-100"
//         >
//           Print Report
//         </button>
//       </div>
//       <div className="mt-4">
//         <button
//           type="button"
//           className="btn btn-danger w-100"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   </div>
// </div>

//         {/* Submit Actions */}
//       </form>
//     </div>
//   </div>

// </div>

// <Modal show={show} onHide={handleClose} centered>
//   <Modal.Header closeButton>
//     <Modal.Title>Add Equipment</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <div className="form-group">
//       <label>Equipment Name</label>
//       <input
//         type="text"
//         className="form-control"
//         value={equipmentData.name}
//         onChange={(e) => setEquipmentData({ ...equipmentData, name: e.target.value })}
//       />
//     </div>
//     <div className="form-group mt-2">
//       <label>Status</label>
//       <select
//         className="form-control"
//         value={equipmentData.status}
//         onChange={(e) => setEquipmentData({ ...equipmentData, status: e.target.value })}
//       >
//         <option value="">Select</option>
//         <option value="OK">OK</option>
//         <option value="Not OK">Not OK</option>
//       </select>
//     </div>
//     <div className="form-group mt-2">
//       <label>Last Testing Date</label>
//       <input
//         type="date"
//         className="form-control"
//         value={equipmentData.lastTestDate}
//         onChange={(e) => setEquipmentData({ ...equipmentData, lastTestDate: e.target.value })}
//       />
//     </div>
//     <div className="form-group mt-2">
//       <label>Next Testing Due</label>
//       <input
//         type="date"
//         className="form-control"
//         value={equipmentData.nextTestDate}
//         onChange={(e) => setEquipmentData({ ...equipmentData, nextTestDate: e.target.value })}
//       />
//     </div>
//   </Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={handleClose}>
//       Cancel
//     </Button>
//     <Button
//       variant="primary"
//       onClick={() => {
//         setEquipmentList([...equipmentList, equipmentData]);
//         setEquipmentData({ name: '', status: '', lastTestDate: '', nextTestDate: '' });
//         handleClose();
//       }}
//     >
//       Add
//     </Button>
//   </Modal.Footer>
// </Modal>


//      </div>
//    )
//  }
 
//  export default AuditEquipment


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap';
// import { addAudit, fetchAudit } from '../../../redux/slices/auditSlice';
// import { toast } from 'react-toastify';


// const AuditEquipment = () => {
//   const [showModal, setShowModal] = useState(false);
  
//   // Main form data state
//   const [formData, setFormData] = useState({
//     auditDate: '',
//     auditedBy: '',
//     safetyManager: '',
//     location: '',
//     equipmentAssessment: [],
//     // safetyManagerSignature: [],
//     image: [],
//     generalNotes: '',
//     criticalObservations: '',
//     followUpActions: '',
//     status: 'draft',
//   });
  
//   // // State for uploaded files
//   const [safetyManagerSignature, setsafetyManagerSignature] = useState(null);
//   // const [image, setImage] = useState(null);
  
//   // State for equipment being added in the modal
//   const [equipmentData, setEquipmentData] = useState({
//     equipment: '',
//     status: '',
//     lastTestingDate: '',
//     nextTestingDue: '',
//     comments: '',
//   });

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData((prev) => ({
//       ...prev,
//       image: [...prev.image, ...files],
//     }));
//   };

//   const dispatch = useDispatch();
//   const { audit } = useSelector((state) => state.audit || {});
  
//   useEffect(() => {
//     dispatch(fetchAudit());
//   }, [dispatch]);
  
//   // Populate form if audit data exists
//   useEffect(() => {
//     if (audit) {
//       setFormData({
//         ...formData,
//         ...audit,
//         equipmentAssessment: audit.equipmentAssessment || []
//       });
//     }
//   }, [audit]);

//   // Handle input changes for main form
//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({
//       ...formData,
//       [id]: value
//     });
//   };
  
//   // Add equipment to the assessment list
//   const handleAddEquipment = () => {
//     const updatedEquipment = [...formData.equipmentAssessment, equipmentData];
//     setFormData({
//       ...formData,
//       equipmentAssessment: updatedEquipment
//     });
    
//     // Reset equipment form
//     setEquipmentData({ equipment: '', status: '', lastTestingDate: '', nextTestingDue: '', comments: '' });
//     setShowModal(false);
//   };
  
//   // Handle submit form
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Create a FormData object to handle file uploads
//     const submitData = new FormData();
    
//     // Add all form fields
//     Object.keys(formData).forEach(key => {
//       if (key === 'equipmentAssessment') {
//         submitData.append(key, JSON.stringify(formData[key]));
//       } else {
//         submitData.append(key, formData[key]);
//       }
//     });
    
//     // Add files if they exist
//     if (safetyManagerSignature) {
//       submitData.append('safetyManagerSignature', safetyManagerSignature);
//     }
    
//     if (image) {
//       submitData.append('image', image);
//     }
    
//     // Submit the form - you would dispatch an action here
//     console.log('Form submitted:', submitData);
//      dispatch(addAudit(submitData)).unwrap().then(() => {
//        toast.success("Audit created successfully!");  
//      }).catch((error) => {
//        toast.error(error?.message || "Failed to create audit");
//      })
//     // dispatch(submitAudit(submitData));
    
//     // Change status to submitted
//     setFormData({
//       ...formData,
//       status: 'submitted'
//     });
//   };
  
//   // Save as draft
//   const handleSaveDraft = () => {
//     console.log('Saved as draft:', formData);
//     // dispatch(saveDraft(formData));
//   };
  
//   // Modal handlers
//   const handleCloseModal = () => setShowModal(false);
//   const handleShowModal = () => setShowModal(true);
  
//   // Equipment form handlers
//   const handleEquipmentInputChange = (e) => {
//     const { name, value } = e.target;
//     setEquipmentData({
//       ...equipmentData,
//       [name]: value
//     });
//   };

//   return (
//     <div>
//       <div className="container">
//         <div className="row">
//           <div className="col-12">
//             <div className="mt-4">
//               <h2 className="text-start" style={{ fontWeight: 600 }}>
//                 Security Audit Report
//               </h2>
//               <p className="text-start">
//                 Complete all sections to ensure compliance with safety regulations
//               </p>
//             </div>
            
//             <div className="my-4 shadow-sm bg-white rounded-2" style={{ padding: "1rem" }}>
//               <p style={{ fontWeight: 600 }}>
//                 <span className="badge bg-warning">.</span> Status: {formData.status === 'draft' ? 'Draft' : 'Submitted'}
//               </p>
//             </div>
            
//             <form onSubmit={handleSubmit}>
//               {/* Audit Information */}
//               <div className="mb-4">
//                 <div className="row g-4">
//                   {/* Left Column */}
//                   <div className="col-md-8">
//                     <div className="p-3 bg-white rounded" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
//                       <h4 style={{ fontWeight: 600 }}>Audit Information</h4>
//                       <div className="row mt-4">
//                         <div className="col-md-6">
//                           <div className="form-group">
//                             <label htmlFor="auditDate">Date of Audit</label>
//                             <input 
//                               type="date"
//                               className="form-control"
//                               id="auditDate"
//                               value={formData.auditDate}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-md-6">
//                           <div className="form-group">
//                             <label htmlFor="auditedBy">Audited By</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               id="auditedBy"
//                               placeholder="Enter full name"
//                               value={formData.auditedBy}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-md-6 mt-3">
//                           <div className="form-group">
//                             <label htmlFor="safetyManager">Safety Manager</label>
//                             <select 
//                               className="form-control" 
//                               id="safetyManager" 
//                               value={formData.safetyManager}
//                               onChange={handleInputChange}
//                               required
//                             >
//                               <option value="">Select Safety Manager</option>
//                               <option value="John Doe">John Doe</option>
//                               <option value="Jane Smith">Jane Smith</option>
//                               <option value="Mike Johnson">Mike Johnson</option>
//                             </select>
//                           </div>
//                         </div>
//                         <div className="col-md-6 mt-3">
//                           <div className="form-group">
//                             <label htmlFor="location">Location/Site</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               id="location"
//                               placeholder="Enter construction site location"
//                               value={formData.location}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right Column */}
//                   <div className="col-md-4">
//                     <div className="p-3 bg-white rounded" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
//                       <h4>Document Upload</h4>
//                       <div className="form-group">
//                         <input
//                           type="file"
//                           className="form-control"
//                           id="fileUpload"
//                           accept=".pdf,.jpg,.png"
//                           onChange={handleFileUpload}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Equipment Assessment */}
//               <div className="row g-4">
//                 <div className="col-md-8">
//                   <div
//                     style={{
//                       boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                       padding: "1rem",
//                       backgroundColor: "#fff",
//                       borderRadius: "0.5rem"
//                     }}
//                   >
//                     <div className="mb-4">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <h4 style={{ fontWeight: 600 }}>Equipment Assessment</h4>
//                         <button 
//                           type="button"
//                           className="btn btn-outline-secondary btn-sm" 
//                           onClick={handleShowModal}
//                         >
//                           Add Equipment
//                         </button>
//                       </div>
//                       <div className='table-responsive'>
//                         <table className="table mt-4">
//                           <thead>
//                             <tr>
//                               <th>Equipment</th>
//                               <th>Status</th>
//                               <th>Last Testing Date</th>
//                               <th>Next Testing Due</th>
//                               <th>Actions</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {formData.equipmentAssessment.length > 0 ? (
//                               formData.equipmentAssessment.map((equipment, index) => (
//                                 <tr key={index}>
//                                   <td>{equipment.equipment}</td>
//                                   <td>{equipment.status}</td>
//                                   <td>{equipment.lastTestingDate}</td>
//                                   <td>{equipment.nextTestingDue}</td>
//                                   <td>
//                                     <button 
//                                       type="button"
//                                       className="btn btn-outline-secondary btn-sm"
//                                       onClick={() => {
//                                         // Implement edit functionality here
//                                         // For simplicity, you can remove an item for now
//                                         const updatedEquipment = formData.equipmentAssessment.filter((_, i) => i !== index);
//                                         setFormData({
//                                           ...formData,
//                                           equipmentAssessment: updatedEquipment
//                                         });
//                                       }}
//                                     >
//                                       Remove
//                                     </button>
//                                   </td>
//                                 </tr>
//                               ))
//                             ) : (
//                               <tr>
//                                 <td colSpan="5" className="text-center">No equipment added yet</td>
//                               </tr>
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="col-md-4">
//                   <div
//                     style={{
//                       boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                       padding: "1rem",
//                       backgroundColor: "#fff",
//                       borderRadius: "0.5rem"
//                     }}
//                   >
//                     <div className="mb-4">
//                       <h4>Safety Manager Signature</h4>
//                       <div className="form-group">
//                         <div
//                           className="signature-box border rounded mb-2"
//                           style={{ 
//                             height: "100px", 
//                             backgroundColor: "#f8f9fa",
//                             backgroundImage: safetyManagerSignature ? `url(${URL.createObjectURL(safetyManagerSignature)})` : 'none',
//                             backgroundSize: 'contain',
//                             backgroundRepeat: 'no-repeat',
//                             backgroundPosition: 'center'
//                           }}
//                         />
//                         <input
//                           type="file"
//                           className="form-control"
//                           accept="image/*"
//                           onChange={(e) => setsafetyManagerSignature(e.target.files[0])}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Notes & Observations */}
//               <div className="mb-4 mt-5 row g-4">
//                 {/* Left Section - Notes */}
//                 <div className="col-md-8">
//                   <div
//                     className="p-3 bg-white rounded"
//                     style={{
//                       boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                     }}
//                   >
//                     <h4>Notes &amp; Observations</h4>
//                     <div className="form-group">
//                       <label htmlFor="generalNotes">General Notes</label>
//                       <textarea
//                         className="form-control"
//                         id="generalNotes"
//                         rows={3}
//                         placeholder="Enter any general notes about the audit"
//                         value={formData.generalNotes}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                     <div className="form-group mt-3">
//                       <label htmlFor="criticalObservations">Critical Observations</label>
//                       <textarea
//                         className="form-control"
//                         id="criticalObservations"
//                         rows={3}
//                         placeholder="Highlight any critical safety issues observed"
//                         style={{ backgroundColor: "#f8d7da" }}
//                         value={formData.criticalObservations}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                     <div className="form-group mt-3">
//                       <label htmlFor="followUpActions">Follow-up Actions Required</label>
//                       <textarea
//                         className="form-control"
//                         id="followUpActions"
//                         rows={3}
//                         placeholder="List any actions that need to be taken"
//                         value={formData.followUpActions}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Section - Buttons */}
//                 <div className="col-md-4">
//                   <div
//                     className="p-3 bg-white rounded"
//                     style={{
//                       boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                     }}
//                   >
//                     <button
//                       type="submit"
//                       className="btn btn-primary w-100"
//                     >
//                       Submit Report
//                     </button>
//                     <div className="mt-4">
//                       <button
//                         type="button"
//                         className="btn btn-secondary w-100"
//                         onClick={handleSaveDraft}
//                       >
//                         Save as Draft
//                       </button>
//                     </div>
//                     <div className="mt-4">
//                       <button
//                         type="button"
//                         className="btn btn-info w-100"
//                         onClick={() => window.print()}
//                       >
//                         Print Report
//                       </button>
//                     </div>
//                     <div className="mt-4">
//                       <button
//                         type="button"
//                         className="btn btn-danger w-100"
//                         onClick={() => {
//                           // Reset form or navigate away
//                           if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
//                             setFormData({
//                               auditDate: '',
//                               auditedBy: '',
//                               safetyManager: '',
//                               location: '',
//                               equipmentAssessment: [],
//                               // safetyManagerSignature: [],
//                               generalNotes: '',
//                               criticalObservations: '',
//                               followUpActions: '',
//                               status: 'draft',
//                             });
//                           }
//                         }}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Add Equipment Modal */}
//       <Modal show={showModal} onHide={handleCloseModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Equipment</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="form-group">
//             <label>Equipment Name</label>
//             <input
//               type="text"
//               name="equipment"
//               className="form-control"
//               value={equipmentData.equipment}
//               onChange={handleEquipmentInputChange}
//               required
//             />
//           </div>
//           <div className="form-group mt-2">
//             <label>Status</label>
//             <select
//               className="form-control"
//               name="status"
//               value={equipmentData.status}
//               onChange={handleEquipmentInputChange}
//               required
//             >
//               <option value="">Select</option>
//               <option value="OK">OK</option>
//               <option value="Not OK">Not OK</option>
//             </select>
//           </div>
//           <div className="form-group mt-2">
//             <label>Last Testing Date</label>
//             <input
//               type="date"
//               name="lastTestingDate"
//               className="form-control"
//               value={equipmentData.lastTestingDate}
//               onChange={handleEquipmentInputChange}
//               required
//             />
//           </div>
//           <div className="form-group mt-2">
//             <label>Next Testing Due</label>
//             <input
//               type="date"
//               name="nextTestingDue"
//               className="form-control"
//               value={equipmentData.nextTestingDue}
//               onChange={handleEquipmentInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label> Comments</label>
//             <input
//               type="text"
//               name="comments"
//               className="form-control"
//               value={equipmentData.comments}
//               onChange={handleEquipmentInputChange}
//               required
//             />
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Cancel
//           </Button>
//           <Button
//             variant="primary"
//             onClick={handleAddEquipment}
//             disabled={!equipmentData.equipment || !equipmentData.status || !equipmentData.lastTestingDate || !equipmentData.nextTestingDue}
//           >
//             Add
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default AuditEquipment;


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap';
// import { addAudit, fetchAudit } from '../../../redux/slices/auditSlice';
// import { toast } from 'react-toastify';


// const AuditEquipment = () => {
//   const [showModal, setShowModal] = useState(false);
  
//   // Main form data state
//   const [formData, setFormData] = useState({
//     auditDate: '',
//     auditedBy: '',
//     safetyManager: '',
//     location: '',
//     equipmentAssessment: [],
//     image: [],
//     generalNotes: '',
//     criticalObservations: '',
//     followUpActions: '',
//     status: 'draft',
//   });
  
//   // State for uploaded files
//   const [safetyManagerSignature, setSafetyManagerSignature] = useState(null);
  
//   // State for equipment being added in the modal
//   const [equipmentData, setEquipmentData] = useState({
//     equipment: '',
//     status: '',
//     lastTestingDate: '',
//     nextTestingDue: '',
//     comments: '',
//   });

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData((prev) => ({
//       ...prev,
//       image: [...prev.image, ...files],
//     }));
//   };

//   const handleSignatureUpload = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setSafetyManagerSignature(e.target.files[0]);
//     }
//   };

//   const dispatch = useDispatch();
//   const { audit } = useSelector((state) => state.audit || {});
  
//   useEffect(() => {
//     dispatch(fetchAudit());
//   }, [dispatch]);
  
//   // Populate form if audit data exists
//   useEffect(() => {
//     if (audit) {
//       setFormData({
//         ...formData,
//         ...audit,
//         equipmentAssessment: audit.equipmentAssessment || []
//       });
//     }
//   }, [audit]);

//   // Handle input changes for main form
//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({
//       ...formData,
//       [id]: value
//     });
//   };
  
//   // Add equipment to the assessment list
//   const handleAddEquipment = () => {
//     const updatedEquipment = [...formData.equipmentAssessment, equipmentData];
//     setFormData({
//       ...formData,
//       equipmentAssessment: updatedEquipment
//     });
    
//     // Reset equipment form
//     setEquipmentData({ equipment: '', status: '', lastTestingDate: '', nextTestingDue: '', comments: '' });
//     setShowModal(false);
//   };
  
//   // Handle submit form
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Create a FormData object to handle file uploads
//     const submitData = new FormData();
    
//     // Add all form fields
//     Object.keys(formData).forEach(key => {
//       if (key === 'equipmentAssessment') {
//         submitData.append(key, JSON.stringify(formData[key]));
//       } else if (key === 'image') {
//         // Skip this field, we'll handle images separately
//       } else {
//         submitData.append(key, formData[key]);
//       }
//     });
    
//     // Add images if they exist
//     if (formData.image && formData.image.length > 0) {
//       formData.image.forEach((file, index) => {
//         submitData.append(`image`, file);
//       });
//     }
    
//     // Add safety manager signature if it exists
//     if (safetyManagerSignature) {
//       submitData.append('safetyManagerSignature', safetyManagerSignature);
//     }
    
//     // Submit the form - you would dispatch an action here
//     console.log('Form submitted:', submitData);
//     dispatch(addAudit(submitData)).unwrap().then(() => {
//       toast.success("Audit created successfully!");  
//     }).catch((error) => {
//       toast.error("Failed to create audit");
//     });
    
//     // Change status to submitted
//     setFormData({
//       ...formData,
//       status: 'submitted'
//     });
//   };
  
//   // Save as draft
//   const handleSaveDraft = () => {
//     console.log('Saved as draft:', formData);
//     // dispatch(saveDraft(formData));
//   };
  
//   // Modal handlers
//   const handleCloseModal = () => setShowModal(false);
//   const handleShowModal = () => setShowModal(true);
  
//   // Equipment form handlers
//   const handleEquipmentInputChange = (e) => {
//     const { name, value } = e.target;
//     setEquipmentData({
//       ...equipmentData,
//       [name]: value
//     });
//   };

//   // Display preview of uploaded images
//   const renderImagePreviews = () => {
//     if (!formData.image || formData.image.length === 0) return null;
    
//     return (
//       <div className="mt-3">
//         <h5>Uploaded Images</h5>
//         <div className="d-flex flex-wrap">
//           {formData.image.map((file, index) => (
//             <div key={index} className="me-2 mb-2 position-relative">
//               <img 
//                 src={URL.createObjectURL(file)} 
//                 alt={`Preview ${index}`} 
//                 style={{ height: "100px", objectFit: "cover", borderRadius: "4px" }} 
//               />
//               <button 
//                 type="button" 
//                 className="btn btn-sm btn-danger position-absolute top-0 end-0"
//                 onClick={() => {
//                   const updatedImages = [...formData.image];
//                   updatedImages.splice(index, 1);
//                   setFormData({...formData, image: updatedImages});
//                 }}
//                 style={{ fontSize: "0.7rem", padding: "2px 5px" }}
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div className="container">
//         <div className="row">
//           <div className="col-12">
//             <div className="mt-4">
//               <h2 className="text-start" style={{ fontWeight: 600 }}>
//                 Security Audit Report
//               </h2>
//               <p className="text-start">
//                 Complete all sections to ensure compliance with safety regulations
//               </p>
//             </div>
            
//             <div className="my-4 shadow-sm bg-white rounded-2" style={{ padding: "1rem" }}>
//               <p style={{ fontWeight: 600 }}>
//                 <span className="badge bg-warning">.</span> Status: {formData.status === 'draft' ? 'Draft' : 'Submitted'}
//               </p>
//             </div>
            
//             <form onSubmit={handleSubmit}>
//               {/* Audit Information */}
//               <div className="mb-4">
//                 <div className="row g-4">
//                   {/* Left Column */}
//                   <div className="col-md-8">
//                     <div className="p-3 bg-white rounded" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
//                       <h4 style={{ fontWeight: 600 }}>Audit Information</h4>
//                       <div className="row mt-4">
//                         <div className="col-md-6">
//                           <div className="form-group">
//                             <label htmlFor="auditDate">Date of Audit</label>
//                             <input 
//                               type="date"
//                               className="form-control"
//                               id="auditDate"
//                               value={formData.auditDate}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-md-6">
//                           <div className="form-group">
//                             <label htmlFor="auditedBy">Audited By</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               id="auditedBy"
//                               placeholder="Enter full name"
//                               value={formData.auditedBy}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-md-6 mt-3">
//                           <div className="form-group">
//                             <label htmlFor="safetyManager">Safety Manager</label>
//                             <select 
//                               className="form-control" 
//                               id="safetyManager" 
//                               value={formData.safetyManager}
//                               onChange={handleInputChange}
//                               required
//                             >
//                               <option value="">Select Safety Manager</option>
//                               <option value="John Doe">John Doe</option>
//                               <option value="Jane Smith">Jane Smith</option>
//                               <option value="Mike Johnson">Mike Johnson</option>
//                             </select>
//                           </div>
//                         </div>
//                         <div className="col-md-6 mt-3">
//                           <div className="form-group">
//                             <label htmlFor="location">Location/Site</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               id="location"
//                               placeholder="Enter construction site location"
//                               value={formData.location}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right Column */}
//                   <div className="col-md-4">
//                     <div className="p-3 bg-white rounded" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
//                       <h4>Document Upload</h4>
//                       <div className="form-group">
//                         <label htmlFor="fileUpload">Upload Images/Documents</label>
//                         <input
//                           type="file"
//                           className="form-control"
//                           id="fileUpload"
//                           accept=".pdf,.jpg,.jpeg,.png"
//                           onChange={handleFileUpload}
//                           multiple
//                         />
//                         <small className="form-text text-muted">
//                           Upload multiple files if needed
//                         </small>
//                       </div>
                      
//                       {renderImagePreviews()}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Equipment Assessment */}
//               <div className="row g-4">
//                 <div className="col-md-8">
//                   <div
//                     style={{
//                       boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                       padding: "1rem",
//                       backgroundColor: "#fff",
//                       borderRadius: "0.5rem"
//                     }}
//                   >
//                     <div className="mb-4">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <h4 style={{ fontWeight: 600 }}>Equipment Assessment</h4>
//                         <button 
//                           type="button"
//                           className="btn btn-outline-secondary btn-sm" 
//                           onClick={handleShowModal}
//                         >
//                           Add Equipment
//                         </button>
//                       </div>
//                       <div className='table-responsive'>
//                         <table className="table mt-4">
//                           <thead>
//                             <tr>
//                               <th>Equipment</th>
//                               <th>Status</th>
//                               <th>Last Testing Date</th>
//                               <th>Next Testing Due</th>
//                               <th>Actions</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {formData.equipmentAssessment.length > 0 ? (
//                               formData.equipmentAssessment.map((equipment, index) => (
//                                 <tr key={index}>
//                                   <td>{equipment.equipment}</td>
//                                   <td>{equipment.status}</td>
//                                   <td>{equipment.lastTestingDate}</td>
//                                   <td>{equipment.nextTestingDue}</td>
//                                   <td>
//                                     <button 
//                                       type="button"
//                                       className="btn btn-outline-secondary btn-sm"
//                                       onClick={() => {
//                                         // Implement edit functionality here
//                                         // For simplicity, you can remove an item for now
//                                         const updatedEquipment = formData.equipmentAssessment.filter((_, i) => i !== index);
//                                         setFormData({
//                                           ...formData,
//                                           equipmentAssessment: updatedEquipment
//                                         });
//                                       }}
//                                     >
//                                       Remove
//                                     </button>
//                                   </td>
//                                 </tr>
//                               ))
//                             ) : (
//                               <tr>
//                                 <td colSpan="5" className="text-center">No equipment added yet</td>
//                               </tr>
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="col-md-4">
//                   <div
//                     style={{
//                       boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                       padding: "1rem",
//                       backgroundColor: "#fff",
//                       borderRadius: "0.5rem"
//                     }}
//                   >
//                     <div className="mb-4">
//                       <h4>Safety Manager Signature</h4>
//                       <div className="form-group">
//                         <div
//                           className="signature-box border rounded mb-2"
//                           style={{ 
//                             height: "100px", 
//                             backgroundColor: "#f8f9fa",
//                             backgroundImage: safetyManagerSignature ? `url(${URL.createObjectURL(safetyManagerSignature)})` : 'none',
//                             backgroundSize: 'contain',
//                             backgroundRepeat: 'no-repeat',
//                             backgroundPosition: 'center'
//                           }}
//                         />
//                         <input
//                           type="file"
//                           className="form-control"
//                           accept="image/*"
//                           onChange={handleSignatureUpload}
//                         />
//                         <small className="form-text text-muted">
//                           Upload signature image
//                         </small>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Notes & Observations */}
//               <div className="mb-4 mt-5 row g-4">
//                 {/* Left Section - Notes */}
//                 <div className="col-md-8">
//                   <div
//                     className="p-3 bg-white rounded"
//                     style={{
//                       boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                     }}
//                   >
//                     <h4>Notes &amp; Observations</h4>
//                     <div className="form-group">
//                       <label htmlFor="generalNotes">General Notes</label>
//                       <textarea
//                         className="form-control"
//                         id="generalNotes"
//                         rows={3}
//                         placeholder="Enter any general notes about the audit"
//                         value={formData.generalNotes}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                     <div className="form-group mt-3">
//                       <label htmlFor="criticalObservations">Critical Observations</label>
//                       <textarea
//                         className="form-control"
//                         id="criticalObservations"
//                         rows={3}
//                         placeholder="Highlight any critical safety issues observed"
//                         style={{ backgroundColor: "#f8d7da" }}
//                         value={formData.criticalObservations}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                     <div className="form-group mt-3">
//                       <label htmlFor="followUpActions">Follow-up Actions Required</label>
//                       <textarea
//                         className="form-control"
//                         id="followUpActions"
//                         rows={3}
//                         placeholder="List any actions that need to be taken"
//                         value={formData.followUpActions}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Section - Buttons */}
//                 <div className="col-md-4">
//                   <div
//                     className="p-3 bg-white rounded"
//                     style={{
//                       boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                     }}
//                   >
//                     <button
//                       type="submit"
//                       className="btn btn-primary w-100"
//                     >
//                       Submit Report
//                     </button>
//                     <div className="mt-4">
//                       <button
//                         type="button"
//                         className="btn btn-secondary w-100"
//                         onClick={handleSaveDraft}
//                       >
//                         Save as Draft
//                       </button>
//                     </div>
//                     <div className="mt-4">
//                       <button
//                         type="button"
//                         className="btn btn-info w-100"
//                         onClick={() => window.print()}
//                       >
//                         Print Report
//                       </button>
//                     </div>
//                     <div className="mt-4">
//                       <button
//                         type="button"
//                         className="btn btn-danger w-100"
//                         onClick={() => {
//                           // Reset form or navigate away
//                           if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
//                             setFormData({
//                               auditDate: '',
//                               auditedBy: '',
//                               safetyManager: '',
//                               location: '',
//                               equipmentAssessment: [],
//                               image: [],
//                               generalNotes: '',
//                               criticalObservations: '',
//                               followUpActions: '',
//                               status: 'draft',
//                             });
//                             setSafetyManagerSignature(null);
//                           }
//                         }}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Add Equipment Modal */}
//       <Modal show={showModal} onHide={handleCloseModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Equipment</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="form-group">
//             <label>Equipment Name</label>
//             <input
//               type="text"
//               name="equipment"
//               className="form-control"
//               value={equipmentData.equipment}
//               onChange={handleEquipmentInputChange}
//               required
//             />
//           </div>
//           <div className="form-group mt-2">
//             <label>Status</label>
//             <select
//               className="form-control"
//               name="status"
//               value={equipmentData.status}
//               onChange={handleEquipmentInputChange}
//               required
//             >
//               <option value="">Select</option>
//               <option value="OK">OK</option>
//               <option value="Not OK">Not OK</option>
//             </select>
//           </div>
//           <div className="form-group mt-2">
//             <label>Last Testing Date</label>
//             <input
//               type="date"
//               name="lastTestingDate"
//               className="form-control"
//               value={equipmentData.lastTestingDate}
//               onChange={handleEquipmentInputChange}
//               required
//             />
//           </div>
//           <div className="form-group mt-2">
//             <label>Next Testing Due</label>
//             <input
//               type="date"
//               name="nextTestingDue"
//               className="form-control"
//               value={equipmentData.nextTestingDue}
//               onChange={handleEquipmentInputChange}
//               required
//             />
//           </div>
//           <div className="form-group mt-2">
//             <label>Comments</label>
//             <input
//               type="text"
//               name="comments"
//               className="form-control"
//               value={equipmentData.comments}
//               onChange={handleEquipmentInputChange}
//               required
//             />
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Cancel
//           </Button>
//           <Button
//             variant="primary"
//             onClick={handleAddEquipment}
//             disabled={!equipmentData.equipment || !equipmentData.status || !equipmentData.lastTestingDate || !equipmentData.nextTestingDue}
//           >
//             Add
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default AuditEquipment;


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { addAudit, fetchAudit, fetchAuditById, updateAudit } from '../../../redux/slices/auditSlice';
import { toast } from 'react-toastify';


const AuditEquipment = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams(); // Get the ID from URL parameters if it exists
  
  // Main form data state
  const [formData, setFormData] = useState({
    auditDate: '',
    auditedBy: '',
    safetyManager: '',
    location: '',
    equipmentAssessment: [],
    image: [],
    generalNotes: '',
    criticalObservations: '',
    followUpActions: '',
    status: 'draft',
  });
  
  // State for uploaded files
  const [safetyManagerSignature, setSafetyManagerSignature] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [existingSignature, setExistingSignature] = useState(null);
  const [removedImages, setRemovedImages] = useState([]);
  
  // State for equipment being added in the modal
  const [equipmentData, setEquipmentData] = useState({
    equipment: '',
    status: '',
    lastTestingDate: '',
    nextTestingDue: '',
    comments: '',
  });

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, ...files],
    }));
  };

  const handleSignatureUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSafetyManagerSignature(e.target.files[0]);
    }
  };

  const dispatch = useDispatch();
  const { audit } = useSelector((state) => state.audit || []);

  console.log(audit);

  
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      dispatch(fetchAuditById(id));
    } else {
      dispatch(fetchAudit());
    }
  }, [dispatch, id]);
  
  // Populate form if audit data exists
  useEffect(() => {
    if (audit) {
      // Handle existing images differently from new uploads
      if (audit.image && Array.isArray(audit.image)) {
        setExistingImages(audit.image);
      } else if (audit.image && typeof audit.image === 'string') {
        setExistingImages([audit.image]);
      }
      
      // Handle existing signature
      if (audit.safetyManagerSignature) {
        setExistingSignature(audit?.safetyManagerSignature);
      }
      
      setFormData({
        ...formData,
        ...audit,
        image: [], 
        equipmentAssessment: audit.equipmentAssessment || []
      });
    }
  }, [audit]);

  // Handle input changes for main form
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };
  
  // Add equipment to the assessment list
  const handleAddEquipment = () => {
    const updatedEquipment = [...formData.equipmentAssessment, equipmentData];
    setFormData({
      ...formData,
      equipmentAssessment: updatedEquipment
    });
    
    // Reset equipment form
    setEquipmentData({ equipment: '', status: '', lastTestingDate: '', nextTestingDue: '', comments: '' });
    setShowModal(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    
 
    Object.keys(formData).forEach(key => {
      if (key === 'equipmentAssessment') {
        submitData.append(key, JSON.stringify(formData[key]));
      } else if (key === 'image') {
       
      } else {
        submitData.append(key, formData[key]);
      }
    });
    
     
    if (isEditing && id) {
      submitData.append('_id', id);
    }
    
    
    if (formData.image && formData.image.length > 0) {
      formData.image.forEach((file) => {
        submitData.append('image', file);
      });
    }
    

    if (existingImages && existingImages.length > 0) {
      const keptImages = existingImages.filter(
        (img) => !removedImages.includes(img._id || img)
      );
      
      if (keptImages.length > 0) {
        submitData.append('existingImages', JSON.stringify(keptImages));
      }
    }
    
    
    if (removedImages.length > 0) {
      submitData.append('removedImages', JSON.stringify(removedImages));
    }
    
    // Add safety manager signature if it exists
    if (safetyManagerSignature) {
      submitData.append('safetyManagerSignature', safetyManagerSignature);
    } else if (existingSignature && !formData.removeSignature) {
      // Keep existing signature
      submitData.append('existingSignature', existingSignature);
    }
    
    // Submit the form based on whether we're editing or creating
    console.log('Form submitted:', submitData);
    
    if (isEditing) {
      dispatch(updateAudit(submitData)).unwrap().then(() => {
        toast.success("Audit updated successfully!");
      }).catch((error) => {
        toast.error(error?.message || "Failed to update audit");
      });
    } else {
      dispatch(addAudit(submitData)).unwrap().then(() => {
        toast.success("Audit created successfully!");
      }).catch((error) => {
        toast.error(error?.message || "Failed to create audit");
      });
    }
    
    // Change status to submitted
    setFormData({
      ...formData,
      status: 'submitted'
    });
  };
  
  // Save as draft
  const handleSaveDraft = () => {
    console.log('Saved as draft:', formData);
    // dispatch(saveDraft(formData));
  };
  
  // Modal handlers
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  
  // Equipment form handlers
  const handleEquipmentInputChange = (e) => {
    const { name, value } = e.target;
    setEquipmentData({
      ...equipmentData,
      [name]: value
    });
  };

  // Display preview of uploaded images
  const renderImagePreviews = () => {
    if (!formData.image || formData.image.length === 0) return null;
    
    return (
      <div className="mt-3">
        <h5>Uploaded Images</h5>
        <div className="d-flex flex-wrap">
          {formData.image.map((file, index) => (
            <div key={index} className="me-2 mb-2 position-relative">
              <img 
                src={URL.createObjectURL(file)} 
                alt={`Preview ${index}`} 
                style={{ height: "100px", objectFit: "cover", borderRadius: "4px" }} 
              />
              <button 
                type="button" 
                className="btn btn-sm btn-danger position-absolute top-0 end-0"
                onClick={() => {
                  const updatedImages = [...formData.image];
                  updatedImages.splice(index, 1);
                  setFormData({...formData, image: updatedImages});
                }}
                style={{ fontSize: "0.7rem", padding: "2px 5px" }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="mt-4">
              <h2 className="text-start" style={{ fontWeight: 600 }}>
                Security Audit Report
              </h2>
              <p className="text-start">
                Complete all sections to ensure compliance with safety regulations
              </p>
            </div>
            
            <div className="my-4 shadow-sm bg-white rounded-2" style={{ padding: "1rem" }}>
              <p style={{ fontWeight: 600 }}>
                <span className="badge bg-warning">.</span> Status: {formData.status === 'draft' ? 'Draft' : 'Submitted'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Audit Information */}
              <div className="mb-4">
                <div className="row g-4">
                  {/* Left Column */}
                  <div className="col-md-8">
                    <div className="p-3 bg-white rounded" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                      <h4 style={{ fontWeight: 600 }}>Audit Information</h4>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="auditDate">Date of Audit</label>
                            <input 
                              type="date"
                              className="form-control"
                              id="auditDate"
                              value={formData.auditDate}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="auditedBy">Audited By</label>
                            <input
                              type="text"
                              className="form-control"
                              id="auditedBy"
                              placeholder="Enter full name"
                              value={formData.auditedBy}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mt-3">
                          <div className="form-group">
                            <label htmlFor="safetyManager">Safety Manager</label>
                            <select 
                              className="form-control" 
                              id="safetyManager" 
                              value={formData.safetyManager}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select Safety Manager</option>
                              <option value="John Doe">John Doe</option>
                              <option value="Jane Smith">Jane Smith</option>
                              <option value="Mike Johnson">Mike Johnson</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6 mt-3">
                          <div className="form-group">
                            <label htmlFor="location">Location/Site</label>
                            <input
                              type="text"
                              className="form-control"
                              id="location"
                              placeholder="Enter construction site location"
                              value={formData.location}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="col-md-4">
                    <div className="p-3 bg-white rounded" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                      <h4>Document Upload</h4>
                      <div className="form-group">
                        <label htmlFor="fileUpload">Upload Images/Documents</label>
                        <input
                          type="file"
                          className="form-control"
                          id="fileUpload"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          multiple
                        />
                        <small className="form-text text-muted">
                          Upload multiple files if needed
                        </small>
                      </div>
                      
                      {renderImagePreviews()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Equipment Assessment */}
              <div className="row g-4">
                <div className="col-md-8">
                  <div
                    style={{
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      padding: "1rem",
                      backgroundColor: "#fff",
                      borderRadius: "0.5rem"
                    }}
                  >
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <h4 style={{ fontWeight: 600 }}>Equipment Assessment</h4>
                        <button 
                          type="button"
                          className="btn btn-outline-secondary btn-sm" 
                          onClick={handleShowModal}
                        >
                          Add Equipment
                        </button>
                      </div>
                      <div className='table-responsive'>
                        <table className="table mt-4">
                          <thead>
                            <tr>
                              <th>Equipment</th>
                              <th>Status</th>
                              <th>Last Testing Date</th>
                              <th>Next Testing Due</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.equipmentAssessment.length > 0 ? (
                              formData.equipmentAssessment.map((equipment, index) => (
                                <tr key={index}>
                                  <td>{equipment.equipment}</td>
                                  <td>{equipment.status}</td>
                                  <td>{equipment.lastTestingDate}</td>
                                  <td>{equipment.nextTestingDue}</td>
                                  <td>
                                    <button 
                                      type="button"
                                      className="btn btn-outline-secondary btn-sm"
                                      onClick={() => {
                                        // Implement edit functionality here
                                        // For simplicity, you can remove an item for now
                                        const updatedEquipment = formData.equipmentAssessment.filter((_, i) => i !== index);
                                        setFormData({
                                          ...formData,
                                          equipmentAssessment: updatedEquipment
                                        });
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="5" className="text-center">No equipment added yet</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    style={{
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      padding: "1rem",
                      backgroundColor: "#fff",
                      borderRadius: "0.5rem"
                    }}
                  >
                    <div className="mb-4">
                      <h4>Safety Manager Signature</h4>
                      <div className="form-group">
                        <div
                          className="signature-box border rounded mb-2"
                          style={{ 
                            height: "100px", 
                            backgroundColor: "#f8f9fa",
                            backgroundImage: safetyManagerSignature ? `url(${URL.createObjectURL(safetyManagerSignature)})` : 'none',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                          }}
                        />
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={handleSignatureUpload}
                        />
                        <small className="form-text text-muted">
                          Upload signature image
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes & Observations */}
              <div className="mb-4 mt-5 row g-4">
                {/* Left Section - Notes */}
                <div className="col-md-8">
                  <div
                    className="p-3 bg-white rounded"
                    style={{
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    <h4>Notes &amp; Observations</h4>
                    <div className="form-group">
                      <label htmlFor="generalNotes">General Notes</label>
                      <textarea
                        className="form-control"
                        id="generalNotes"
                        rows={3}
                        placeholder="Enter any general notes about the audit"
                        value={formData.generalNotes}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="criticalObservations">Critical Observations</label>
                      <textarea
                        className="form-control"
                        id="criticalObservations"
                        rows={3}
                        placeholder="Highlight any critical safety issues observed"
                        style={{ backgroundColor: "#f8d7da" }}
                        value={formData.criticalObservations}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="followUpActions">Follow-up Actions Required</label>
                      <textarea
                        className="form-control"
                        id="followUpActions"
                        rows={3}
                        placeholder="List any actions that need to be taken"
                        value={formData.followUpActions}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Section - Buttons */}
                <div className="col-md-4">
                  <div
                    className="p-3 bg-white rounded"
                    style={{
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      Submit Report
                    </button>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="btn btn-secondary w-100"
                        onClick={handleSaveDraft}
                      >
                        Save as Draft
                      </button>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="btn btn-info w-100"
                        onClick={() => window.print()}
                      >
                        Print Report
                      </button>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="btn btn-danger w-100"
                        onClick={() => {
                          // Reset form or navigate away
                          if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
                            setFormData({
                              auditDate: '',
                              auditedBy: '',
                              safetyManager: '',
                              location: '',
                              equipmentAssessment: [],
                              image: [],
                              generalNotes: '',
                              criticalObservations: '',
                              followUpActions: '',
                              status: 'draft',
                            });
                            setSafetyManagerSignature(null);
                          }
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Add Equipment Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Equipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Equipment Name</label>
            <input
              type="text"
              name="equipment"
              className="form-control"
              value={equipmentData.equipment}
              onChange={handleEquipmentInputChange}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label>Status</label>
            <select
              className="form-control"
              name="status"
              value={equipmentData.status}
              onChange={handleEquipmentInputChange}
              required
            >
              <option value="">Select</option>
              <option value="OK">OK</option>
              <option value="Not OK">Not OK</option>
            </select>
          </div>
          <div className="form-group mt-2">
            <label>Last Testing Date</label>
            <input
              type="date"
              name="lastTestingDate"
              className="form-control"
              value={equipmentData.lastTestingDate}
              onChange={handleEquipmentInputChange}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label>Next Testing Due</label>
            <input
              type="date"
              name="nextTestingDue"
              className="form-control"
              value={equipmentData.nextTestingDue}
              onChange={handleEquipmentInputChange}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label>Comments</label>
            <input
              type="text"
              name="comments"
              className="form-control"
              value={equipmentData.comments}
              onChange={handleEquipmentInputChange}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddEquipment}
            disabled={!equipmentData.equipment || !equipmentData.status || !equipmentData.lastTestingDate || !equipmentData.nextTestingDue}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AuditEquipment;
 