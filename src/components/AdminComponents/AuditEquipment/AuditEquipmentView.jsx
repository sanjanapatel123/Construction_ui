import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAuditById } from '../../../redux/slices/auditSlice';

const AuditEquipmentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedAudit, loading } = useSelector((state) => state.audit || {});

  useEffect(() => {
    if (id) {
      dispatch(fetchAuditById(id));
    }
  }, [dispatch, id]);

  // Render image previews
  const renderImagePreviews = () => {
    const images = selectedAudit?.data?.image || [];
    const imageArray = Array.isArray(images) ? images : [images];

    return (
      <div className="mt-3">
        <h5>Images</h5>
        <div className="d-flex flex-wrap">
          {imageArray && imageArray.length > 0 ? (
            imageArray.map((img, index) => (
              <div key={`existing-${index}`} className="me-2 mb-2 position-relative">
                <img 
                  src={typeof img === 'string' ? img : img.url} 
                  alt={`Audit image ${index}`} 
                  style={{ height: "100px", objectFit: "cover", borderRadius: "4px" }} 
                />
              </div>
            ))
          ) : (
            <p className="text-muted">No images available</p>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="text-center p-5"><div className="spinner-border" role="status"></div><p>Loading audit data...</p></div>;
  }

  if (!selectedAudit?.data) {
    return <div className="text-center p-5">No audit data found</div>;
  }

  const auditData = selectedAudit.data;
  
  // Convert equipment assessment to array if needed
  let equipmentList = [];
  if (auditData.equipmentAssessment) {
    if (Array.isArray(auditData.equipmentAssessment)) {
      equipmentList = auditData.equipmentAssessment;
    } else if (typeof auditData.equipmentAssessment === 'string') {
      try {
        equipmentList = JSON.parse(auditData.equipmentAssessment);
      } catch (e) {
        console.error("Error parsing equipment assessment:", e);
      }
    }
  }

  // Format the date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="mt-4 d-flex justify-content-between align-items-center">
              <div>
                <h2 className="text-start" style={{ fontWeight: 600 }}>
                  Security Audit Report
                </h2>
                <p className="text-start">
                  Detailed view of the security audit report
                </p>
              </div>
              <button 
                className="btn btn-secondary" 
                onClick={() => navigate("/auditreport")}
              >
                Back to List
              </button>
            </div>
            
            <div className="my-4 shadow-sm bg-white rounded-2" style={{ padding: "1rem" }}>
              <p style={{ fontWeight: 600 }}>
                <span className={`badge ${auditData.status === 'draft' ? 'bg-warning' : 'bg-success'}`}>.</span> 
                Status: {auditData.status === 'draft' ? 'Draft' : 'Submitted'}
              </p>
            </div>
            
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
                          <label className="fw-bold">Date of Audit</label>
                          <p>{formatDate(auditData.auditDate)}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="fw-bold">Audited By</label>
                          <p>{auditData.auditedBy || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="col-md-6 mt-3">
                        <div className="form-group">
                          <label className="fw-bold">Safety Manager</label>
                          <p>{auditData.safetyManager || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="col-md-6 mt-3">
                        <div className="form-group">
                          <label className="fw-bold">Location/Site</label>
                          <p>{auditData.location || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="col-md-4">
                  <div className="p-3 bg-white rounded" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                    <h4>Uploaded Documents</h4>
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
                    <h4 style={{ fontWeight: 600 }}>Equipment Assessment</h4>
                    <div className='table-responsive'>
                      <table className="table mt-4">
                        <thead>
                          <tr>
                            <th>Equipment</th>
                            <th>Status</th>
                            <th>Last Testing Date</th>
                            <th>Next Testing Due</th>
                            <th>Comments</th>
                          </tr>
                        </thead>
                        <tbody>
                          {equipmentList && equipmentList.length > 0 ? (
                            equipmentList.map((equipment, index) => (
                              <tr key={index}>
                                <td>{equipment.equipment}</td>
                                <td>
                                  <span className={`badge ${equipment.status === 'OK' ? 'bg-success' : 'bg-danger'}`}>
                                    {equipment.status}
                                  </span>
                                </td>
                                <td>{formatDate(equipment.lastTestingDate)}</td>
                                <td>{formatDate(equipment.nextTestingDue)}</td>
                                <td>{equipment.comments || 'N/A'}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="text-center">No equipment data available</td>
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
                    <div
                      className="signature-box border rounded mb-2"
                      style={{ 
                        height: "100px", 
                        backgroundColor: "#f8f9fa",
                        backgroundImage: auditData.safetyManagerSignature 
                          ? `url(${auditData.safetyManagerSignature})` 
                          : 'none',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                      }}
                    />
                    {!auditData.safetyManagerSignature && 
                      <p className="text-muted">No signature available</p>
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Notes & Observations */}
            <div className="mb-4 mt-5 row g-4">
              {/* Notes Section */}
              <div className="col-md-8">
                <div
                  className="p-3 bg-white rounded"
                  style={{
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                >
                  <h4>Notes &amp; Observations</h4>
                  <div className="form-group">
                    <label className="fw-bold">General Notes</label>
                    <div className="p-2 border rounded">
                      {auditData.generalNotes || 'No general notes provided'}
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <label className="fw-bold">Critical Observations</label>
                    <div className="p-2 border rounded" style={{ backgroundColor: "#f8d7da" }}>
                      {auditData.criticalObservations || 'No critical observations recorded'}
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <label className="fw-bold">Follow-up Actions Required</label>
                    <div className="p-2 border rounded">
                      {auditData.followUpActions || 'No follow-up actions specified'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="col-md-4">
                <div
                  className="p-3 bg-white rounded"
                  style={{
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-info w-100"
                    onClick={() => window.print()}
                  >
                    Print Report
                  </button>
                  
                  <div className="mt-4">
                    <button
                      type="button"
                      className="btn btn-secondary w-100"
                      onClick={() => navigate("/auditreport")}
                    >
                      Back to List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditEquipmentView;