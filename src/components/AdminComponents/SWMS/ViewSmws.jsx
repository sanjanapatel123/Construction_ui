// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useParams } from 'react-router-dom'
// import { getswmsbyId } from "../../../redux/swmsSlice"


// const ViewSmws = () => {

//  const dispatch = useDispatch();
//   const { swms , loading ,error } = useSelector((state) => state.swms )

//   console.log(swms);

//   const { id } = useParams();


//   useEffect( () => {
//     dispatch(getswmsbyId(id));
//   }, [dispatch, id])

//   return (
//     <div>
//       <div className="container py-4">
//   <div className="d-flex justify-content-between align-items-center mb-4">
//     <h3 className="mb-0">SWMS Details</h3>
//   <Link to="/swms"> <button className="btn " style={{backgroundColor:"#0d6efd" ,color:"white"}}><i class="fa-solid fa-arrow-left me-2"></i> Back to Overview</button></Link> 
//   </div>

//   <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
//     <div className="row">
//       {/* <div className="mb-3 col-md-6"><strong>SWMS Name:</strong> Electrical Installation</div>
//       <div className="mb-3 col-md-6"><strong>Site Address:</strong> 123 Smith Street, Sydney</div>
//       <div className="mb-3 col-md-6"><strong>Company Name:</strong> ABC Constructions</div>
//       <div className="mb-3 col-md-6"><strong>Person Responsible:</strong> John Doe</div>
//       <div className="mb-3 col-md-6"><strong>Principal Contractor:</strong> BuildSafe Pty Ltd</div>
//       <div className="mb-3 col-md-6"><strong>Reviewer:</strong> Jane Smith</div>
//       <div className="mb-3 col-md-6"><strong>Date Created:</strong> 2024-04-01</div>
//       <div className="mb-3 col-md-6"><strong>Date Reviewed:</strong> 2024-04-10</div>
//       <div className="mb-3 col-md-6"><strong>ABN:</strong> 12 345 678 901</div> */}

//       {/* /new baesd on form */}

//       <div className="mb-3 col-md-6"><strong>SWMS Name:</strong> {swms?.title}</div>
//       <div className="mb-3 col-md-6"><strong>Site Address:</strong> {swms?.WorkArea}</div>
//       <div className="mb-3 col-md-6"><strong>Company Name:</strong> {swms?.project}</div>
//       <div className="mb-3 col-md-6"><strong>Person Responsible:</strong> John Doe</div>
//       <div className="mb-3 col-md-6"><strong>Principal Contractor:</strong> BuildSafe Pty Ltd</div>
//       <div className="mb-3 col-md-6"><strong>Reviewer:</strong> Jane Smith</div>
//       <div className="mb-3 col-md-6"><strong>Date Created:</strong> {new Date(swms.createdAt).toLocaleString()}</div>
//       <div className="mb-3 col-md-6"><strong>Date Reviewed:</strong> 2024-04-10</div>
//       <div className="mb-3 col-md-6"><strong>ABN:</strong> 12 345 678 901</div>
//     </div>

//     <div className="mb-4">
//       <h5>Hazards and Controls</h5>
//       {[1, 2].map((i) => (
//         <div key={i} className="card mb-3">
//           <div className="card-body">
//             <h6>Hazard {i}</h6>
//             <p><strong>Description:</strong> {swms?.hazardsandControls?.hazardDescription}</p>
//             <p><strong>Risk Level:</strong> {i === 1 ? "High" : "Medium"}</p>
//             <p><strong>Control Measures:</strong> {i === 1 ? "Use insulated tools, wear rubber gloves." : "Use harness, secure ladders properly."}</p>
//           </div>
//         </div>
//       ))}
//     </div>

//     <div className="row mb-4">
//       <div className="col-md-6">
//         <h5>PPE Requirements</h5>
//         <ul className="list-group list-group-flush">
//           <li className="list-group-item">✅ Hard Hat</li>
//           <li className="list-group-item">✅ Safety Boots</li>
//           <li className="list-group-item">✅ High Vis Vest</li>
//           <li className="list-group-item">✅ Safety Glasses</li>
//         </ul>
//       </div>
//       <div className="col-md-6">
//         <h5>Required Permits</h5>
//         <ul className="list-group list-group-flush">
//           <li className="list-group-item">✅ Working at Heights</li>
//           <li className="list-group-item">✅ Hot Work</li>
//           <li className="list-group-item">❌ Confined Space</li>
//           <li className="list-group-item">✅ Excavation</li>
//         </ul>
//       </div>
//     </div>

   
//   </div>
// </div>

//     </div>
//   )
// }

// export default ViewSmws


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getswmsbyId } from "../../../redux/slices/swmsSlice";

const ViewSwms = () => {
  const dispatch = useDispatch();
  const { singleSwms, loading, error } = useSelector((state) => state.swms);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getswmsbyId(id));
  }, [dispatch, id]);

  const renderPPE = (ppe) => {
    return Object.entries(ppe || {}).map(([key, value]) => (
      <li key={key} className="list-group-item">
        {value ? "✅" : "❌"} {key.replace(/([A-Z])/g, ' $1')}
      </li>
    ));
  };

  const renderPermits = (permits) => {
    return Object.entries(permits || {}).map(([key, value]) => (
      <li key={key} className="list-group-item">
        {value ? "✅" : "❌"} {key.replace(/([A-Z])/g, ' $1')}
      </li>
    ));
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">SWMS Details</h3>
        <Link to="/swms">
          <button className="btn" style={{ backgroundColor: "#0d6efd", color: "white" }}>
            <i className="fa-solid fa-arrow-left me-2"></i> Back to Overview
          </button>
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
          <div className="row">
            <div className="mb-3 col-md-6"><strong>SWMS Name:</strong> {singleSwms?.title}</div>
            <div className="mb-3 col-md-6"><strong>Site Address:</strong> {singleSwms?.workArea}</div>
            <div className="mb-3 col-md-6"><strong>Company Name:</strong> {singleSwms?.project}</div>
            {/* <div className="mb-3 col-md-6"><strong>Person Responsible:</strong> John Doe</div>
            <div className="mb-3 col-md-6"><strong>Principal Contractor:</strong> BuildSafe Pty Ltd</div>
            <div className="mb-3 col-md-6"><strong>Reviewer:</strong> Jane Smith</div> */}
            <div className="mb-3 col-md-6">
              <strong>Date Created:</strong> {new Date(singleSwms?.createdAt).toLocaleString()}
            </div>
            {/* <div className="mb-3 col-md-6"><strong>Date Reviewed:</strong> 2024-04-10</div>
            <div className="mb-3 col-md-6"><strong>ABN:</strong> 12 345 678 901</div> */}
          </div>

          <div className="mb-4">
            <h5>Hazards and Controls</h5>
            {(singleSwms?.hazardsandControls || []).map((hazard, index) => (
              <div key={hazard._id} className="card mb-3">
                <div className="card-body">
                  <h6>Hazard {index + 1}</h6>
                  <p><strong>Description:</strong> {hazard.hazardDescription}</p>
                  <p><strong>Risk Level:</strong> {hazard.riskLevel}</p>
                  <p><strong>Control Measures:</strong> {hazard.controlMeasures}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <h5>PPE Requirements</h5>
              <ul className="list-group list-group-flush">
                {renderPPE(singleSwms?.ppeRequirements)}
              </ul>
            </div>
            <div className="col-md-6">
              <h5>Required Permits</h5>
              <ul className="list-group list-group-flush">
                {renderPermits(singleSwms?.requiredPermits)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSwms;

