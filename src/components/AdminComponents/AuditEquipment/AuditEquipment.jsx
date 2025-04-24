 import React from 'react'
import { Link } from 'react-router-dom'
 
 const AuditEquipment = () => {
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
      <div
        className="my-4 shadow-sm bg-white rounded-2"
        style={{
        
          padding: "1rem"
        }}
      >
        <p style={{ fontWeight: 600 }}>
          <span className="badge bg-warning">.</span> Status:Draft{" "}
        </p>
      </div>
      <form>
        {/* Audit Information */}
        <div className="mb-4">
  <div className="row g-4">
    {/* Left Column */}
    <div className="col-md-8">
      <div  className="p-3 bg-white rounded"
        style={{  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",}}>
        <h4 style={{ fontWeight: 600 }}>Audit Information</h4>
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="auditDate">Date of Audit</label>
              <input type="date"
                className="form-control"
                id="auditDate"
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
                required
              />
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label htmlFor="safetyManager">Safety Manager</label>
              <select className="form-control" id="safetyManager" required>
                <option>Select Safety Manager</option>
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
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Right Column */}
    <div className="col-md-4">
      <div
        className="p-3 bg-white rounded"
        style={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <h4>Document Upload</h4>
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            id="fileUpload"
            accept=".pdf,.jpg,.png"
          />
        </div>
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
            <tr>
              <td>Excavator</td>
              <td>Not OK</td>
              <td>2025-03-15</td>
              <td>2025-06-15</td>
              <td>
                <button className="btn btn-outline-secondary btn-sm">Add comments</button>
              </td>
            </tr>
            <tr>
              <td>Crane</td>
              <td>Not OK</td>
              <td>2025-02-20</td>
              <td>2025-05-20</td>
              <td>
                <button className="btn btn-outline-secondary btn-sm">Add comments</button>
              </td>
            </tr>
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
            style={{ height: "100px", backgroundColor: "#f8f9fa" }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Please sign above"
          />
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
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="followUpActions">Follow-up Actions Required</label>
        <textarea
          className="form-control"
          id="followUpActions"
          rows={3}
          placeholder="List any actions that need to be taken"
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
      <Link to="/submit-report">
        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Submit Report
        </button>
      </Link>
      <div className="mt-4">
        <button
          type="button"
          className="btn btn-secondary w-100"
        >
          Save as Draft
        </button>
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="btn btn-info w-100"
        >
          Print Report
        </button>
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="btn btn-danger w-100"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>

        {/* Submit Actions */}
      </form>
    </div>
  </div>

</div>

     </div>
   )
 }
 
 export default AuditEquipment
 