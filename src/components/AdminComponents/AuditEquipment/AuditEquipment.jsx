

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom'; 
import { Modal, Button } from 'react-bootstrap';
import { addAudit, fetchAudit, fetchAuditById, updateAudit } from '../../../redux/slices/auditSlice';
import { toast } from 'react-toastify';

const AuditEquipment = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  
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
  
 
  const [safetyManagerSignature, setSafetyManagerSignature] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [existingSignature, setExistingSignature] = useState(null);
  const [removedImages, setRemovedImages] = useState([]);
  
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
  const { audit, selectedAudit, loading } = useSelector((state) => state.audit || {});

  console.log("Current audit data:", audit);
  console.log("Selected Audit:", selectedAudit);
  
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
    // Only proceed if we're editing AND we have data
    if (isEditing && selectedAudit && selectedAudit.data) {
      console.log("Populating form with audit data:", selectedAudit.data);
      
      // Handle existing images
      if (selectedAudit.data.image) {
        if (Array.isArray(selectedAudit.data.image)) {
          setExistingImages(selectedAudit.data.image);
        } else if (typeof selectedAudit.data.image === 'string') {
          setExistingImages([selectedAudit.data.image]);
        }
      }
      
      // Handle existing signature
      if (selectedAudit.data.safetyManagerSignature) {
        setExistingSignature(selectedAudit.data.safetyManagerSignature);
      }
      
      // Format the date properly if it exists
      const formattedDate = selectedAudit.data.auditDate ? 
        new Date(selectedAudit.data.auditDate).toISOString().split('T')[0] : '';
      
      let equipmentList = [];
      if (selectedAudit.data.equipmentAssessment) {
       
        if (Array.isArray(selectedAudit.data.equipmentAssessment)) {
          equipmentList = selectedAudit.data.equipmentAssessment;
        } else if (typeof selectedAudit.data.equipmentAssessment === 'string') {
          try {
            equipmentList = JSON.parse(selectedAudit.data.equipmentAssessment);
          } catch (e) {
            console.error("Error parsing equipment assessment:", e);
            equipmentList = [];
          }
        }
      }
      
      setFormData({
        auditDate: formattedDate,
        auditedBy: selectedAudit.data.auditedBy || '',
        safetyManager: selectedAudit.data.safetyManager || '',
        location: selectedAudit.data.location || '',
        equipmentAssessment: equipmentList,
        image: [], // New uploads will be added here
        generalNotes: selectedAudit.data.generalNotes || '',
        criticalObservations: selectedAudit.data.criticalObservations || '',
        followUpActions: selectedAudit.data.followUpActions || '',
        status: selectedAudit.data.status || 'draft',
      });
    }
  }, [selectedAudit, isEditing]);

  // Handle input changes for main form
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };
  
  // Add equipment to the assessment list
  const handleAddEquipment = () => {
    const updatedEquipment = [...formData.equipmentAssessment, equipmentData];
    setFormData(prevState => ({
      ...prevState,
      equipmentAssessment: updatedEquipment
    }));
    
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
        // Image files are handled separately
      } else {
        submitData.append(key, formData[key]);
      }
    });
    
    if (isEditing && id) {
      submitData.append('_id', id);
    }
    
    // Add new images
    if (formData.image && formData.image.length > 0) {
      formData.image.forEach((file) => {
        submitData.append('image', file);
      });
    }
    
    // Handle existing images
    if (existingImages && existingImages.length > 0) {
      const keptImages = existingImages.filter(
        (img) => !removedImages.includes(img._id || img)
      );
      
      if (keptImages.length > 0) {
        submitData.append('existingImages', JSON.stringify(keptImages));
      }
    }
    
    // Handle removed images
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
      dispatch(updateAudit({id, updatedForm:submitData})).unwrap().then(() => {
        toast.success("Audit updated successfully!");
        navigate("/auditreport");
      }).catch((error) => {
        toast.error(error?.message || "Failed to update audit");
        navigate("/auditreport");
      });
    } else {
      dispatch(addAudit(submitData)).unwrap().then(() => {
        toast.success("Audit created successfully!");
        navigate("/auditreport");
      }).catch((error) => {
        toast.error("Failed to create audit");
        navigate("/auditreport");
      });
    }
    
    // Change status to submitted
    setFormData(prevState => ({
      ...prevState,
      status: 'submitted'
    }));
  };
  
  // Save as draft
  const handleSaveDraft = () => {
    console.log('Saved as draft:', formData);
    // dispatch(saveDraft(formData));
    toast.info("Draft saved");
  };
  
  // Modal handlers
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  
  // Equipment form handlers
  const handleEquipmentInputChange = (e) => {
    const { name, value } = e.target;
    setEquipmentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Display preview of uploaded images
  const renderImagePreviews = () => {
    return (
      <div className="mt-3">
        <h5>Images</h5>
        <div className="d-flex flex-wrap">
          {/* Render existing images */}
          {existingImages && existingImages.length > 0 && existingImages.map((img, index) => (
            <div key={`existing-${index}`} className="me-2 mb-2 position-relative">
              <img 
                src={typeof img === 'string' ? img : img.url} 
                alt={`Existing ${index}`} 
                style={{ height: "100px", objectFit: "cover", borderRadius: "4px" }} 
              />
              <button 
                type="button" 
                className="btn btn-sm btn-danger position-absolute top-0 end-0"
                onClick={() => {
                  const imgId = img._id || img;
                  setRemovedImages([...removedImages, imgId]);
                  setExistingImages(existingImages.filter(i => i !== img));
                }}
                style={{ fontSize: "0.7rem", padding: "2px 5px" }}
              >
                ×
              </button>
            </div>
          ))}
          
          {/* Render newly uploaded images */}
          {formData.image && formData.image.length > 0 && formData.image.map((file, index) => (
            <div key={`new-${index}`} className="me-2 mb-2 position-relative">
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
          
          {(!existingImages || existingImages.length === 0) && 
           (!formData.image || formData.image.length === 0) && (
            <p className="text-muted">No images uploaded</p>
          )}
        </div>
      </div>
    );
  };

  if (loading && isEditing) {
    return <div className="text-center p-5"><div className="spinner-border" role="status"></div><p>Loading audit data...</p></div>;
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="mt-4">
              <h2 className="text-start" style={{ fontWeight: 600 }}>
                {isEditing ? "Edit Security Audit Report" : "Security Audit Report"}
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
                              <th>Comments</th>
                              <th>Actions</th>
                            </tr>
                          </thead>

                          
                          <tbody>
                            {formData.equipmentAssessment && formData.equipmentAssessment.length > 0 ? (
                              formData.equipmentAssessment.map((equipment, index) => (
                                <tr key={index}>
                                  <td>{equipment.equipment}</td>
                                  <td>{equipment.status}</td>
                                  <td>{new Date(equipment.lastTestingDate).toLocaleDateString()}</td>
                                  <td>{ new Date(equipment.nextTestingDue).toLocaleDateString()}</td>
                                  <td>{equipment.comments}</td>
                                  <td>
                                    <button 
                                      type="button"
                                      className="btn btn-outline-secondary btn-sm"
                                      onClick={() => {
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
                                <td colSpan="6" className="text-center">No equipment added yet</td>
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
                            backgroundImage: safetyManagerSignature 
                              ? `url(${URL.createObjectURL(safetyManagerSignature)})` 
                              : existingSignature 
                                ? `url(${existingSignature})` 
                                : 'none',
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
                      disabled={loading}
                    >
                      {isEditing ? 'Update Report' : 'Submit Report'}
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
                          if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
                            if (isEditing) {
                              // Redirect to list page or refetch original data
                              window.history.back();
                            } else {
                              // Reset form for new entry
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
                              setExistingImages([]);
                              setExistingSignature(null);
                              setRemovedImages([]);
                            }
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
 