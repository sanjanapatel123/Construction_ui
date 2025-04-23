import React from 'react'
import { Link } from 'react-router-dom'
const ViewSmws = () => {
  return (
    <div>
      <div className="container py-4">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h3 className="mb-0">SWMS Details</h3>
  <Link to="/swms"> <button className="btn " style={{backgroundColor:"#0d6efd" ,color:"white"}}><i class="fa-solid fa-arrow-left me-2"></i> Back to Overview</button></Link> 
  </div>

  <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
    <div className="row">
      <div className="mb-3 col-md-6"><strong>SWMS Name:</strong> Electrical Installation</div>
      <div className="mb-3 col-md-6"><strong>Site Address:</strong> 123 Smith Street, Sydney</div>
      <div className="mb-3 col-md-6"><strong>Company Name:</strong> ABC Constructions</div>
      <div className="mb-3 col-md-6"><strong>Person Responsible:</strong> John Doe</div>
      <div className="mb-3 col-md-6"><strong>Principal Contractor:</strong> BuildSafe Pty Ltd</div>
      <div className="mb-3 col-md-6"><strong>Reviewer:</strong> Jane Smith</div>
      <div className="mb-3 col-md-6"><strong>Date Created:</strong> 2024-04-01</div>
      <div className="mb-3 col-md-6"><strong>Date Reviewed:</strong> 2024-04-10</div>
      <div className="mb-3 col-md-6"><strong>ABN:</strong> 12 345 678 901</div>
    </div>

    <div className="mb-4">
      <h5>Hazards and Controls</h5>
      {[1, 2].map((i) => (
        <div key={i} className="card mb-3">
          <div className="card-body">
            <h6>Hazard {i}</h6>
            <p><strong>Description:</strong> {i === 1 ? "Electrical Shock" : "Working at Height"}</p>
            <p><strong>Risk Level:</strong> {i === 1 ? "High" : "Medium"}</p>
            <p><strong>Control Measures:</strong> {i === 1 ? "Use insulated tools, wear rubber gloves." : "Use harness, secure ladders properly."}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="row mb-4">
      <div className="col-md-6">
        <h5>PPE Requirements</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">✅ Hard Hat</li>
          <li className="list-group-item">✅ Safety Boots</li>
          <li className="list-group-item">✅ High Vis Vest</li>
          <li className="list-group-item">✅ Safety Glasses</li>
        </ul>
      </div>
      <div className="col-md-6">
        <h5>Required Permits</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">✅ Working at Heights</li>
          <li className="list-group-item">✅ Hot Work</li>
          <li className="list-group-item">❌ Confined Space</li>
          <li className="list-group-item">✅ Excavation</li>
        </ul>
      </div>
    </div>

   
  </div>
</div>

    </div>
  )
}

export default ViewSmws
